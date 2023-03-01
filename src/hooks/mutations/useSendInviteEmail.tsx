import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { definedRoutes } from "@/routes";
import { supabase } from "@/utils";

interface Props {
  email: string;
}

export const useSendInviteEmail = () => {
  const queryClient = useQueryClient();
  const redirectTo = `${window.location.origin}${definedRoutes.login}`;

  const sendInviteEmail = async (user: Props) => {
    const { email } = user;

    const { error } = await supabase.auth.admin.inviteUserByEmail(email, { redirectTo });
    if (error) {
      toast.error(error.message);
      throw new Error(error.message);
    }
  };

  return useMutation((user: Props) => sendInviteEmail(user), {
    onSuccess: () => {
      queryClient.removeQueries();
    },
  });
};
