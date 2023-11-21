import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { definedRoutes } from "@/config";
import { useSupabase } from "@/context";

interface Props {
  email: string;
}

export const useSendInviteEmail = () => {
  const queryClient = useQueryClient();
  let redirectTo = "";
  const { supabase } = useSupabase();
  if (typeof window !== "undefined") {
    redirectTo = `${window.location.origin}${definedRoutes.login}`;
  }

  const sendInviteEmail = async (user: Props) => {
    const { email } = user;

    const { error } = await supabase.auth.admin.inviteUserByEmail(email, { redirectTo });
    if (error) {
      toast.error(error.message);
      throw new Error(error.message);
    }
  };

  return useMutation({
    mutationFn: (user: Props) => sendInviteEmail(user),
    onSuccess: () => {
      queryClient.removeQueries();
    },
  });
};
