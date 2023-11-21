"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { useSupabase } from "@/context";

import { useIsMobile } from "../../useIsMobile";

export const useSignOut = () => {
  const { push, refresh } = useRouter();
  const queryClient = useQueryClient();
  const { supabase } = useSupabase();
  const { isMobile } = useIsMobile();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Error signing out");
      throw new Error(error.message);
    }
  };

  return useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => {
      queryClient.removeQueries();
      if (isMobile) {
        refresh();
      }
      push("/");
    },
  });
};
