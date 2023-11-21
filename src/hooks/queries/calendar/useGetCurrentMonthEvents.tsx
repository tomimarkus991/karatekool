import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { useSupabase } from "@/context";
import { EventData } from "@/types";

// must get events for only current month and long events if they are in both months
export const useGetCurrentMonthEvents = (
  firstDayOfCurrentMonth: string,
  lastDayOfCurrentMonth: string,
) => {
  const { supabase } = useSupabase();

  const getQuery = async () => {
    const { data, error } = await supabase
      .from("event")
      .select(
        `
    id,start,is_highlighted,long_event_end,normal_event_end,event_type,description,
    all_day_event (id, title, sub_title),
    multi_day_event (id, title),
    event_trailer (text),
    group (id, letter, highlighted),
    highlighted_group (id, letter, highlighted)
    `,
      )
      .or(
        `and(start.gte.${firstDayOfCurrentMonth},start.lte.${lastDayOfCurrentMonth}),and(long_event_end.gte.${firstDayOfCurrentMonth},long_event_end.lte.${lastDayOfCurrentMonth})`,
      )
      .order("start", { ascending: true });

    if (error) {
      toast.error(`Error getting events: ${error.message}`);
      throw new Error(error.message);
    }

    const _eventData = data as unknown as EventData[];

    return _eventData || [];
  };

  return useQuery({
    queryKey: ["get_calendar_events", firstDayOfCurrentMonth, lastDayOfCurrentMonth],
    queryFn: async () => getQuery(),
  });
};
