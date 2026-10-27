import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { useSupabase } from "@/context";

export const useGetGroups = () => {
  const { supabase } = useSupabase();
  const getQuery = async () => {
    const { data: groups, error: groupError } = await supabase
      .from("group")
      .select("id,letter")
      .order("letter", { ascending: true });

    if (groupError) {
      toast.error(`Error getting groups: ${groupError.message}`);
      throw new Error(groupError.message);
    }

    return {
      groups,
    };
  };

  return useQuery({ queryKey: ["groups"], queryFn: async () => getQuery() });
};
