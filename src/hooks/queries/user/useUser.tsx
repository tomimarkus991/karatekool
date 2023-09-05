"use client";
import { useQuery } from "@tanstack/react-query";

import { useSupabase } from "@/context";

export const useUser = () => {
  const { supabase, session } = useSupabase();

  const fetchUser = async () => {
    // if (localStorage.getItem("sb-wqdplpmiyvwmetnipmwd-auth-token") === null) {
    //   return null;
    // }

    const { data } = await supabase
      .from("profile")
      .select(
        `
          id,
          username,
          avatar,
          role,
          group,
          calendar_type
        `,
      )
      .eq("id", session?.user.id)
      .single();

    // if (error) {
    //   toast.error("Error fetching user");
    //   throw new Error(error.message);
    // }

    // if (!data) {
    //   toast.error("User not Found");
    //   throw new Error("User not Found");
    // }

    return data;
  };

  return useQuery(["user"], () => fetchUser());
};
