"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { clearToken } from "@/lib";

export const useSignOut = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    // The API keeps no sessions, so forgetting the token is all there is to it
    mutationFn: async () => clearToken(),
    onSuccess: () => {
      queryClient.removeQueries();
      push("/");
    },
  });
};
