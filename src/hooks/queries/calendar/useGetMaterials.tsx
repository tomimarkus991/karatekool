import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { useSupabase } from "@/context";

export const useGetMaterials = () => {
  const { supabase } = useSupabase();
  const getQuery = async () => {
    const { data, error } = await supabase.storage.from("materials").list("");

    if (error) {
      toast.error(`Error getting emails: ${error.message}`);
      throw new Error(error.message);
    }

    return data || [];
  };

  return useQuery({ queryKey: ["get_materials"], queryFn: async () => getQuery() });
};
