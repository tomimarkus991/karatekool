import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { api } from "@/lib";

interface Props {
  start: string;
  long_event_end: string;
  /** The Preset whose title the Multi-day event shows */
  multi_day_event_id: number;
}

export const useCreateCalendarMultiDayEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ start, long_event_end, multi_day_event_id }: Props) =>
      api("/multi-day-events", {
        method: "POST",
        body: { start, end: long_event_end, presetId: multi_day_event_id },
      }),
    onSuccess: () => {
      toast.success("Uus mitme päeva üritus on loodud");
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: ["get_calendar_events"],
        });
      }, 200);
    },
    onError: error => {
      toast.error(error.message);
    },
  });
};
