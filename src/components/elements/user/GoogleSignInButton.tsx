"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

import { RealButton } from "@/components";
import { useSignInWithGoogle } from "@/hooks";

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

// The parts of Google Identity Services this button uses
interface GoogleIdentity {
  accounts: {
    id: {
      initialize(options: {
        client_id: string;
        callback: (response: { credential: string }) => void;
      }): void;
      renderButton(parent: HTMLElement, options: Record<string, string>): void;
    };
  };
}

declare global {
  interface Window {
    google?: GoogleIdentity;
  }
}

/** Google's own sign-in button, so one click opens Google's dialog; the API turns Google's ID token into its own token */
export const GoogleSignInButton = () => {
  const container = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { mutate: signIn } = useSignInWithGoogle();

  useEffect(() => {
    if (!isLoaded || !container.current || !CLIENT_ID || !window.google) return;
    window.google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: ({ credential }) => signIn(credential),
    });
    window.google.accounts.id.renderButton(container.current, {
      theme: "outline",
      size: "large",
      shape: "pill",
      text: "signin",
      locale: "et",
    });
  }, [isLoaded, signIn]);

  if (!CLIENT_ID) {
    // Development and E2E have no client ID; the API's dev profile signs any token in as its dev user
    return (
      <RealButton variant="red" className="px-6" onClick={() => signIn("dev")}>
        Logi sisse
      </RealButton>
    );
  }

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" onReady={() => setIsLoaded(true)} />
      <div ref={container} />
    </>
  );
};
