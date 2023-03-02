import { useQuery } from "@tanstack/react-query";

import { UserType } from "@/types";
import { supabase } from "@/lib";

export const useUser = () => {
  const getUserId = async () => {
    const { data } = await supabase.auth.getUser();

    return data.user?.id;
  };

  const fetchUser = async () => {
    if (localStorage.getItem("sb-wqdplpmiyvwmetnipmwd-auth-token") === null) {
      return null;
    }
    const user = getUserId().then(async id => {
      if (!id) return null;
      const { data: _data } = await supabase
        .from("profile")
        .select(
          `
          id,
          username,
          avatar
        `
        )
        .eq("id", id)
        .single();

      const data = _data as UserType;

      // if (error) {
      //   toast.error("Error fetching user");
      //   throw new Error(error.message);
      // }

      // if (!data) {
      //   toast.error("User not Found");
      //   throw new Error("User not Found");
      // }

      return data;
    });

    return user;
  };

  return useQuery(["user"], () => fetchUser());
};
