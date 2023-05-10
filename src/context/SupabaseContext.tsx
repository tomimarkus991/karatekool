"use client";

import type { Session } from "@supabase/auth-helpers-nextjs";
import { createContext, useContext, useState } from "react";

import { createBrowserClient } from "@/lib";
import { TypedSupabaseClient } from "@/types";

type MaybeSession = Session | null;

type SupabaseContext = {
  supabase: TypedSupabaseClient;
  session: MaybeSession;
};

// @ts-ignore
const Context = createContext<SupabaseContext>();

interface Props {
  children: React.ReactNode;
  session: MaybeSession;
}

export const SupabaseProvider = ({ children, session }: Props) => {
  const [supabase] = useState(() => createBrowserClient());

  return (
    <Context.Provider value={{ supabase, session }}>
      <>{children}</>
    </Context.Provider>
  );
};

export const useSupabase = () => useContext(Context);
