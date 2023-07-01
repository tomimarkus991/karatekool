import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { useSupabase } from "@/context";

export const useGetGroups = () => {
  const { supabase } = useSupabase();
  const getQuery = async () => {
    const { data: groups, error: groupError } = await supabase
      .from("group")
      .select("letter")
      .order("letter", { ascending: true });
    const { data: highlightedGroups, error: highlightedGroupError } = await supabase
      .from("highlighted_group")
      .select("letter")
      .order("letter", { ascending: true });

    if (groupError) {
      toast.error(`Error getting groups: ${groupError.message}`);
      throw new Error(groupError.message);
    }
    if (highlightedGroupError) {
      toast.error(`Error getting highlighted groups: ${highlightedGroupError.message}`);
      throw new Error(highlightedGroupError.message);
    }

    return {
      groups: groups.map(({ letter }) => letter || "") || [],
      highlightedGroups: highlightedGroups.map(({ letter }) => letter || "") || [],
    };
  };

  return useQuery(["groups"], async () => getQuery());
};
