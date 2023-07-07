import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { useSupabase } from "@/context";

export interface IHighlightedAndGroup {
  id: number;
  letter: string;
  highlighted: boolean;
}

export const useGetGroups = () => {
  const { supabase } = useSupabase();
  const getQuery = async () => {
    const { data: groups, error: groupError } = await supabase
      .from("group")
      .select("id,letter")
      .order("letter", { ascending: true });
    const { data: highlightedGroups, error: highlightedGroupError } = await supabase
      .from("highlighted_group")
      .select("id,letter")
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
      groups:
        (groups.map(group => {
          return { ...group, highlighted: false };
        }) as IHighlightedAndGroup[]) || [],
      highlightedGroups:
        (highlightedGroups.map(group => {
          return { ...group, highlighted: true };
        }) as IHighlightedAndGroup[]) || [],
    };
  };

  return useQuery(["groups"], async () => getQuery());
};
