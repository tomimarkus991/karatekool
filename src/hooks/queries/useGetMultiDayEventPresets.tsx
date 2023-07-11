import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { useSupabase } from "@/context";

export const useGetMultiDayEventPresets = () => {
  const { supabase } = useSupabase();
  const getQuery = async () => {
    const { data, error } = await supabase
      .from("multi_day_event")
      .select(`id,title`);

    if (error) {
      toast.error(`Error getting multi_day_event: ${error.message}`);
      throw new Error(error.message);
    }

    return data || [];
  };

  return useQuery(["multi_day_event_presets"], async () => getQuery());
};
