import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

import { definedRoutes } from "@/routes";
import { supabase } from "@/utils";

interface SignUpProps {
  username: string;
  email: string;
  password: string;
}

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const emailRedirectTo = `${window.location.origin}${definedRoutes.emailConfirmed}`;

  const signUp = async (user: SignUpProps) => {
    const { email, password, username } = user;
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo },
    });

    if (error) {
      // when user is not whitelisted
      if (error.message.includes('insert or update on table "identities"')) {
        toast.error(
          <div className="">
            <p className="text-lg font-semibold max-w-[14rem]">
              Tundub, et sa pole veel klubi liikmete nimekirjas
            </p>
            <div className="flex flex-row">
              <Link to={definedRoutes.apply} onClick={() => toast.dismiss("whitelist-toast")}>
                <p className="text-lg font-semibold text-primary">Vajuta siia,</p>
              </Link>
              <p className="ml-1 text-lg font-semibold">et luba taodelda</p>
            </div>
          </div>,
          { duration: 30000, id: "whitelist-toast" }
        );
      } else {
        toast.error(error.message);
      }
      throw new Error(error.message);
    }

    const { error: insertError } = await supabase
      .from("profile")
      .insert({ id: data.user?.id, username });

    if (insertError) {
      toast.error(insertError.message);
      throw new Error(insertError.message);
    }
  };

  return useMutation((user: SignUpProps) => signUp(user), {
    onSuccess: () => {
      queryClient.removeQueries();
      // dont navigate show confirm email prompt
      // navigate(definedRoutes.karateka);
    },
  });
};
