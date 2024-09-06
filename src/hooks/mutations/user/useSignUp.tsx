import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { definedRoutes } from "@/config";
import { useSupabase } from "@/context";

interface SignUpProps {
  username: string;
  email: string;
  password: string;
}

export const useSignUp = () => {
  const queryClient = useQueryClient();

  const { supabase } = useSupabase();

  let redirectTo = "";
  if (typeof window !== "undefined") {
    redirectTo = `${window.location.origin}${definedRoutes.emailConfirmed}`;
  }

  const signUp = async (user: SignUpProps) => {
    const { email, password, username } = user;
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: redirectTo },
    });

    if (error) {
      // when user is not whitelisted
      if (
        error.message.includes('insert or update on table "identities"') ||
        error.message.includes("Database error loading user after sign-up")
      ) {
        toast.error(
          <div className="">
            <p className="text-lg font-semibold max-w-56">
              Tundub, et sa pole veel klubi liikmete nimekirjas. Kirjuta info@karatekool.ee
            </p>
          </div>,
          { duration: 30000, id: "whitelist-toast" },
        );
      } else {
        toast.error(error.message);
      }
      throw new Error(error.message);
    }

    const { error: insertError } = await supabase
      .from("profile")
      .insert({ id: (data.user as any)?.id, username });

    if (insertError) {
      toast.error(insertError.message);
      throw new Error(insertError.message);
    }
  };

  return useMutation({
    mutationFn: (user: SignUpProps) => signUp(user),
    onSuccess: () => {
      queryClient.removeQueries();
      // dont navigate show confirm email prompt
      // navigate(definedRoutes.karateka);
    },
  });
};
