import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { supabase } from "@/lib";

interface ResetPasswordProps {
  password: string;
  passwordConfirmation: string;
}

export const useResetPassword = () => {
  const queryClient = useQueryClient();

  const query = async (user: ResetPasswordProps) => {
    const { password, passwordConfirmation } = user;

    if (password !== passwordConfirmation) {
      toast.error("Paroolid ei kattu");
      throw new Error("Paroolid ei kattu");
    }

    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      toast.error(error.message);
      throw new Error(error.message);
    }
  };

  return useMutation((user: ResetPasswordProps) => query(user), {
    onSuccess: () => {
      queryClient.removeQueries();
    },
  });
};
