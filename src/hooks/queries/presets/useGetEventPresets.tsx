import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { useSupabase } from "@/context";
import { SEventTrailer } from "@/types";

import { useGetGroups } from "../useGetGroups";
import { useGetTrailers } from "../useGetTrailers";

export const useGetEventPresets = () => {
  const { supabase } = useSupabase();
  const { data: allGroups, refetch: getGroups } = useGetGroups();
  const { data: allTrailers, refetch: getTrailers } = useGetTrailers();

  const getQuery = async () => {
    await getGroups();
    await getTrailers();
    const { data: presets, error } = await supabase.from("event_preset").select(`*`);

    if (error) {
      toast.error(`Error getting event_preset: ${error.message}`);
      throw new Error(error.message);
    }

    const finalPresets = presets.map(preset => {
      const groups = allGroups?.groups?.filter(group => preset?.group_ids?.includes(group.id));
      const highlightedGroups = allGroups?.highlightedGroups?.filter(
        group => preset?.highlighted_group_ids?.includes(group.id),
      );
      const trailer = allTrailers?.find(
        _trailer => _trailer.id === preset.trailer_id,
      ) as SEventTrailer;

      return {
        ...preset,
        trailer,
        groups: groups || [],
        highlightedGroups: highlightedGroups || [],
      };
    });

    return finalPresets || [];
  };

  return useQuery(["event_presets"], async () => getQuery(), {
    enabled: !!allGroups && !!allTrailers,
  });
};
