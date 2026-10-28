"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { api, ApiError, setToken } from "@/lib";

export const useSignInWithGoogle = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    // An access token from Google's popup; the API checks it was issued to our client
    mutationFn: async (accessToken: string) => {
      const { token } = await api<{ token: string }>("/auth/google", {
        method: "POST",
        body: { accessToken },
      });
      setToken(token);
    },
    onSuccess: () => {
      // Reset, not remove: the navbar and the page on screen refetch as the signed-in person
      queryClient.resetQueries();
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
