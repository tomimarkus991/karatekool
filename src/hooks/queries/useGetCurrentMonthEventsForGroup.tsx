import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { EventData, GroupLetters } from "types";
import { supabase } from "utils";

export const useGetCurrentMonthEventsForGroup = (group: GroupLetters) => {
  const getEvents = async () => {
    const { data, error } = await supabase
      .from("event")
      .select(
        `
    id,start,is_highlighted,long_event_end,normal_event_end,event_type,
    all_day_event (title, sub_title),
    multi_day_event (title),
    event_trailer (text),
    group (letter),
    highlighted_group (letter)
    `
      )
      .eq("group.letter", group)
      .eq("highlighted_group.letter", group)
      .order("start", { ascending: true });

    console.log(data);

    if (error) {
      toast.error(`Error getting events: ${error.message}`);
      throw new Error(error.message);
    }

    const _eventData = data as unknown as EventData[];

    return _eventData || [];
  };

  return useQuery([`current_month_events`, group], () => getEvents());
};
