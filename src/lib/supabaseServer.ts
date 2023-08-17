import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Database } from "../types/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const createServerClient = () =>
  createServerComponentClient<Database>(
    {
      cookies,
    },
    {
      // headers,
      supabaseKey,
      supabaseUrl,
    },
  );
