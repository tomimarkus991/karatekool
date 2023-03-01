import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { supabase } from "@/utils";

interface ResetPasswordProps {
  password: string;
  passwordConfirmation: string;
}

export const useResetPassword = () => {
  const queryClient = useQueryClient();

  const sendPasswordResetEmail = async (user: ResetPasswordProps) => {
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

  return useMutation((user: ResetPasswordProps) => sendPasswordResetEmail(user), {
    onSuccess: () => {
      queryClient.removeQueries();
      // resize box and have a link to login page
    },
  });
};
