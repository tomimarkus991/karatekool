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
    // create as many events as there are rows in selectedStartDates, and only report success
    // once every one of them and its groups is saved
    await Promise.all(
      selectedStartDates.map(async start => {
        const createEventRes = await supabase
          .from("event")
          .upsert({
            id,
            start,
            is_highlighted: isHighlighted,
            // null removes a trailer that is already saved
            trailer_id: trailerId ?? null,
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

        const eventId = createEventRes.data.id;
        const throwIfFailed = (res: { error: { message: string } | null }) => {
          if (res.error) {
            toast.error(res.error.message);
            throw new Error(res.error.message);
          }
        };

        if (id) {
          throwIfFailed(await supabase.from("event_group").delete().eq("event_id", id));
          throwIfFailed(await supabase.from("event_highlighted_group").delete().eq("event_id", id));
        }

        throwIfFailed(
          await supabase
            .from("event_group")
            .insert(groupIds.map(groupId => ({ event_id: eventId, group_id: groupId }))),
        );

        throwIfFailed(
          await supabase.from("event_highlighted_group").insert(
            highlightedGroupIds.map(groupId => ({
              event_id: eventId,
              highlighted_group_id: groupId,
            })),
          ),
        );
      }),
    );
  };

  return useMutation({
    mutationFn: (user: Props) => execute(user),
    onSuccess: (_, { id }) => {
      toast.success(id ? "Üritus on uuendatud" : "Uus üritus on loodud");
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: ["get_calendar_events"],
        });
      }, 200);
    },
  });
};
