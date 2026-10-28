import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { api } from "@/lib";

export const useGetTrailers = () => {
  const getQuery = async () => {
    try {
      return await api<{ id: number; text: string }[]>("/trailers");
    } catch (error) {
      toast.error(`Error getting trailers: ${(error as Error).message}`);
      throw error;
    }
  };

  return useQuery({ queryKey: ["trailers"], queryFn: async () => getQuery() });
};
