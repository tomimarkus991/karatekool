import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { definedRoutes } from "@/routes";
import { supabase } from "@/utils";

interface SignInProps {
  email: string;
  password: string;
}

export const useSignIn = () => {
  const navigate = useNavigate();
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
      navigate(definedRoutes.karateka);
    },
  });
};
