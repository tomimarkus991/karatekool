import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { useSupabase } from "@/context";

interface Props {
  id?: number;
  isHighlighted?: boolean;
  trailerId?: number;
  normalEventEnd?: string;
  description?: string;
  groupIds?: number[];
  highlightedGroupIds?: number[];
  selectedStartDates: string[];
}

export const useCreateCalendarEvent = () => {
  const { supabase } = useSupabase();
  const queryClient = useQueryClient();

  const execute = async ({
    id,
    selectedStartDates,
    isHighlighted = false,
    trailerId,
    normalEventEnd,
    description,
    groupIds = [],
    highlightedGroupIds = [],
  }: Props) => {
    // create as many events as there are in selectedStartDates
    console.log("123456", id);

    selectedStartDates.forEach(async start => {
      const createEventRes = await supabase
        .from("event")
        .upsert({
          id,
          start,
          is_highlighted: isHighlighted,
          trailer_id: trailerId,
          normal_event_end: normalEventEnd,
          description,
          event_type: "NORMAL",
        })
        .select()
        .single();

      if (createEventRes.error) {
        toast.error(createEventRes.error.message);
        throw new Error(createEventRes.error.message);
      }

      if (id) {
        await supabase.from("event_group").delete().eq("event_id", id);
        await supabase.from("event_highlighted_group").delete().eq("event_id", id);

        await supabase.from("event_group").insert(
          groupIds.map(groupId => ({
            event_id: id,
            group_id: groupId,
          })),
        );

        await supabase.from("event_highlighted_group").insert(
          highlightedGroupIds.map(groupId => ({
            event_id: id,
            highlighted_group_id: groupId,
          })),
        );
      } else if (createEventRes.data.id) {
        await supabase.from("event_group").insert(
          groupIds.map(groupId => ({
            event_id: createEventRes.data.id,
            group_id: groupId,
          })),
        );

        await supabase.from("event_highlighted_group").insert(
          highlightedGroupIds.map(groupId => ({
            event_id: createEventRes.data.id,
            highlighted_group_id: groupId,
          })),
        );
      }
    });
  };

  return useMutation((user: Props) => execute(user), {
    onSuccess: () => {
      toast.success("Uus üritus on loodud");
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: ["get_calendar_events"],
        });
      }, 200);
    },
  });
};
