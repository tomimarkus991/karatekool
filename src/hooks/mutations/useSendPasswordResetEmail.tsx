import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { definedRoutes } from "routes";
import { supabase } from "utils";

interface SendResetPasswordProps {
  email: string;
}

export const useSendPasswordResetEmail = () => {
  const queryClient = useQueryClient();
  const redirectTo = `${window.location.origin}${definedRoutes.resetPassword}`;

  const sendPasswordResetEmail = async (user: SendResetPasswordProps) => {
    const { email } = user;

    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    if (error) {
      toast.error(error.message);
      throw new Error(error.message);
    }
  };

  return useMutation((user: SendResetPasswordProps) => sendPasswordResetEmail(user), {
    onSuccess: () => {
      queryClient.removeQueries();
    },
  });
};
