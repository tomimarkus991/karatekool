import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { useSupabase } from "@/context";

interface SignInProps {
  email: string;
  password: string;
}

export const useSignIn = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const { supabase } = useSupabase();

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

  return useMutation({
    mutationFn: (user: SignInProps) => signIn(user),
    onSuccess: () => {
      if (typeof window !== "undefined") {
        window.location.reload();
      }
      queryClient.removeQueries();
      push("/karateka");
    },
  });
};
