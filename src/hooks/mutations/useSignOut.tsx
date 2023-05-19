"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { useSupabase } from "@/context";

export const useSignOut = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const { supabase } = useSupabase();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Error signing out");
      throw new Error(error.message);
    }
  };

  return useMutation(() => signOut(), {
    onSuccess: () => {
      queryClient.removeQueries();
      push("/");
    },
  });
};
