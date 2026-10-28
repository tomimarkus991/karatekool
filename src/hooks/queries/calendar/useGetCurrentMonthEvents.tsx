import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { api, ApiEvent } from "@/lib";
import { EventData, EventTypes } from "@/types";

// The calendar components still speak the shape Supabase used to return
const toEventData = (event: ApiEvent): EventData => ({
  id: event.id,
  start: event.start,
  long_event_end: event.end,
  description: event.description,
  normal_event_end: null,
  is_highlighted: event.highlighted,
  event_trailer: event.trailer,
  // Deleting goes by the Event's id, so the All-day event carries it too
  all_day_event:
    event.kind === "ALL_DAY"
      ? { id: event.id, title: event.title ?? "", sub_title: event.subtitle ?? "" }
      : null,
  multi_day_event: event.preset,
  group: event.groups,
  event_type: {
    TRAINING: EventTypes.NORMAL,
    ALL_DAY: EventTypes.ALL_DAY,
    MULTI_DAY: EventTypes.MULTI_DAY,
  }[event.kind],
});

/**
 * Every Event in the calendar's visible weeks, including Multi-day events that only overlap them.
 * Both bounds are local times as "yyyy-MM-dd HH:mm:ss"; the last one is inclusive.
 */
export const useGetCurrentMonthEvents = (
  firstDayOfCurrentMonth: string,
  lastDayOfCurrentMonth: string,
) => {
  const getQuery = async () => {
    const from = new Date(firstDayOfCurrentMonth.replace(" ", "T"));
    const to = new Date(new Date(lastDayOfCurrentMonth.replace(" ", "T")).getTime() + 1000);

    try {
      const events = await api<ApiEvent[]>(
        `/events?from=${encodeURIComponent(from.toISOString())}&to=${encodeURIComponent(
          to.toISOString(),
        )}`,
      );
      return events.map(toEventData);
    } catch (error) {
      toast.error(`Error getting events: ${(error as Error).message}`);
      throw error;
    }
  };

  return useQuery({
    queryKey: ["get_calendar_events", firstDayOfCurrentMonth, lastDayOfCurrentMonth],
    queryFn: async () => getQuery(),
  });
};
