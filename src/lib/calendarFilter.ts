import { isSameMonth, parseISO } from "date-fns";

import { CalendarFilter, EventData, EventTypes, NamedTrainingFilter } from "@/types";

export const isNamedTrainingFilter = (filter: CalendarFilter): filter is NamedTrainingFilter =>
  typeof filter === "object";

/**
 * Whether the calendar shows a Training under `filter`. A Named Training shows under its own name
 * and under "all"; a Group shows only the Trainings it is in.
 */
export const showsTraining = (
  filter: CalendarFilter,
  { group, name }: Pick<EventData, "group" | "name">,
) => {
  if (filter === "none") return false;
  if (filter === "all") return true;
  if (isNamedTrainingFilter(filter)) return name === filter.name;
  return group.some(({ letter }) => letter === filter);
};

/** Every name a Named Training in `month` uses, once each, in alphabetical order */
export const namedTrainingNames = (events: EventData[], month: Date) =>
  Array.from(
    new Set(
      events
        .filter(
          ({ event_type, name, start }) =>
            event_type === EventTypes.NORMAL && name && isSameMonth(parseISO(start), month),
        )
        .map(({ name }) => name as string),
    ),
  ).sort((a, b) => a.localeCompare(b, "et"));

/** The filter as text, e.g. "A", "all" or "Falco Cup" */
export const filterLabel = (filter: CalendarFilter) =>
  isNamedTrainingFilter(filter) ? filter.name : filter;
