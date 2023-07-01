import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { useSupabase } from "@/context";

export const useGetTrailers = () => {
  const { supabase } = useSupabase();
  const getQuery = async () => {
    const { data, error } = await supabase.from("event_trailer").select(`text`);

    if (error) {
      toast.error(`Error getting trailers: ${error.message}`);
      throw new Error(error.message);
    }

    return data.map(({ text }) => text || "") || [];
  };

  return useQuery(["trailers"], async () => getQuery());
};
