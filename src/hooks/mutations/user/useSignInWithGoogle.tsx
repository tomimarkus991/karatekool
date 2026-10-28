"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { api, ApiError, setToken } from "@/lib";

export const useSignInWithGoogle = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (idToken: string) => {
      const { token } = await api<{ token: string }>("/auth/google", {
        method: "POST",
        body: { idToken },
      });
      setToken(token);
    },
    onSuccess: () => {
      queryClient.removeQueries();
      push("/karateka");
    },
    onError: error => {
      toast.error(
        error instanceof ApiError && error.status === 403
          ? "Selle e-postiga ei saa sisse logida. Küsi treenerilt ligipääsu."
          : "Sisselogimine ebaõnnestus",
      );
    },
  });
};
