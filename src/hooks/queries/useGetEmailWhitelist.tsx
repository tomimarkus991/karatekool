import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { useSupabase } from "@/context";
import { EmailWhitelist } from "@/types";

export const useGetEmailWhitelist = () => {
  const { supabase } = useSupabase();
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

  return useQuery(["get_email_whitelist"], async () => getQuery());
};
