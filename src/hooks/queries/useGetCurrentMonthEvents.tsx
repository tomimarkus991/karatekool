import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { EventData } from "types";
import { supabase } from "utils";

export const useGetCurrentMonthEvents = () => {
  const getEvents = async () => {
    const { data, error } = await supabase
      .from("event")
      .select(
        `
    id,start,is_highlighted,title,long_event_end,
    all_day_event (title, description),
    event_trailer (text),
    group (color, letter)
    `
      )
      .order("start", { ascending: true });

    if (error) {
      toast.error(`Error getting events: ${error.message}`);
      throw new Error(error.message);
    }

    const _eventData = data as unknown as EventData[];

    return _eventData || [];
  };

  return useQuery(["current_month_events"], () => getEvents());
};
