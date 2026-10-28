import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { api, ApiGroup } from "@/lib";

export const useGetGroups = () => {
  const getQuery = async () => {
    try {
      // Already sorted by letter
      return { groups: await api<ApiGroup[]>("/groups") };
    } catch (error) {
      toast.error(`Error getting groups: ${(error as Error).message}`);
      throw error;
    }
  };

  return useQuery({ queryKey: ["groups"], queryFn: async () => getQuery() });
};
