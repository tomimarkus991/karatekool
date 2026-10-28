"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

import { RealButton } from "@/components";
import { useSignInWithGoogle } from "@/hooks";

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

interface TokenClient {
  requestAccessToken(): void;
}

// The parts of Google Identity Services this button uses
interface GoogleIdentity {
  accounts: {
    oauth2: {
      initTokenClient(options: {
        client_id: string;
        scope: string;
        callback: (response: { access_token?: string; error?: string }) => void;
        error_callback?: (error: { type: string }) => void;
      }): TokenClient;
    };
  };
}

declare global {
  interface Window {
    google?: GoogleIdentity;
  }
}

/**
 * The site's own sign-in button: one click opens Google's popup, and the API checks the access
 * token Google gives back. Without a client ID (development, E2E) it signs in as the API's dev
 * user, which the dev profile accepts.
 */
export const GoogleSignInButton = () => {
  const tokenClient = useRef<TokenClient | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { mutate: signIn, isPending } = useSignInWithGoogle();

  useEffect(() => {
    if (!isLoaded || !CLIENT_ID || !window.google) return;
    tokenClient.current = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: "openid email profile",
      callback: ({ access_token: accessToken }) => accessToken && signIn(accessToken),
      error_callback: ({ type }) => {
        // Closing the popup is a choice, not an error
        if (type !== "popup_closed") toast.error("Sisselogimine ebaõnnestus");
      },
    });
  }, [isLoaded, signIn]);

  const onClick = () => (CLIENT_ID ? tokenClient.current?.requestAccessToken() : signIn("dev"));

  return (
    <>
      {CLIENT_ID && (
        <Script src="https://accounts.google.com/gsi/client" onReady={() => setIsLoaded(true)} />
      )}
      <RealButton
        variant="red"
        className="px-6"
        disabled={(!!CLIENT_ID && !isLoaded) || isPending}
        onClick={onClick}
      >
        Logi sisse
      </RealButton>
    </>
  );
};
