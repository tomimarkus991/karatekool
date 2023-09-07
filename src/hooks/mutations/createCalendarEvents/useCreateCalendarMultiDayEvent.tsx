import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { useSupabase } from "@/context";

interface Props {
  start: string;
  long_event_end: string;
  multi_day_event_id: number;
}

export const useCreateCalendarMultiDayEvent = () => {
  const { supabase } = useSupabase();
  const queryClient = useQueryClient();

  const execute = async ({ start, long_event_end, multi_day_event_id }: Props) => {
    const res = await supabase.from("event").insert({
      start,
      long_event_end,
      event_type: "MULTI_DAY",
      multi_day_event: multi_day_event_id,
    });

    if (res.error) {
      toast.error(res.error.message);
      throw new Error(res.error.message);
    }

    return res;
  };

  return useMutation((user: Props) => execute(user), {
    onSuccess: () => {
      toast.success("Uus mitme päeva üritus on loodud");
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: ["get_calendar_events"],
        });
      }, 200);
    },
  });
};
