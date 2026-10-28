import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { api } from "@/lib";

export const useGetMultiDayEventPresets = () => {
  const getQuery = async () => {
    try {
      return await api<{ id: number; title: string }[]>("/presets");
    } catch (error) {
      toast.error(`Error getting multi_day_event: ${(error as Error).message}`);
      throw error;
    }
  };

  return useQuery({ queryKey: ["multi_day_event_presets"], queryFn: async () => getQuery() });
};
