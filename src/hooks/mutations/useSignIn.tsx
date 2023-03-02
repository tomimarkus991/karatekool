import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { definedRoutes } from "@/config";
import { supabase } from "@/lib";

interface SignInProps {
  email: string;
  password: string;
}

export const useSignIn = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  const signIn = async (user: SignInProps) => {
    const { email, password } = user;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      toast.error(error.message);
      throw new Error(error.message);
    }
  };

  return useMutation((user: SignInProps) => signIn(user), {
    onSuccess: () => {
      window.location.reload();
      queryClient.removeQueries();
      push(definedRoutes.karateka);
    },
  });
};
