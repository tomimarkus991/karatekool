import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { useSupabase } from "@/context";

interface Props {
  id: number;
}

export const useDeleteNormalCalendarEvent = () => {
  const { supabase } = useSupabase();
  const queryClient = useQueryClient();

  const execute = async ({ id }: Props) => {
    const eventGroupRes = await supabase.from("event_group").delete().match({ event_id: id });

    if (eventGroupRes.error) {
      toast.error(eventGroupRes.error.message);
      throw new Error(eventGroupRes.error.message);
    }

    const eventHighlightedGroupRes = await supabase
      .from("event_highlighted_group")
      .delete()
      .match({ event_id: id });

    if (eventHighlightedGroupRes.error) {
      toast.error(eventHighlightedGroupRes.error.message);
      throw new Error(eventHighlightedGroupRes.error.message);
    }

    const res = await supabase.from("event").delete().match({ id });

    if (res.error) {
      toast.error(res.error.message);
      throw new Error(res.error.message);
    }

    return res;
  };

  return useMutation({
    mutationFn: (user: Props) => execute(user),
    onSuccess: () => {
      toast.success("Üritus kustutatud");
      queryClient.invalidateQueries({
        queryKey: ["get_calendar_events"],
      });
    },
  });
};
