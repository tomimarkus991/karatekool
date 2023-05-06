import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { supabase } from "@/lib";
import { EmailWhitelist } from "@/types";

export const useGetEmailWhitelist = () => {
  const getQuery = async () => {
    const { data, error } = await supabase.from("email_whitelist").select(
      `
    email
    `
    );

    if (error) {
      toast.error(`Error getting emails: ${error.message}`);
      throw new Error(error.message);
    }

    const _eventData = data as unknown as EmailWhitelist[];

    return _eventData || [];
  };

  return useQuery(["email"], async () => getQuery(), {
    enabled: false,
  });
};
