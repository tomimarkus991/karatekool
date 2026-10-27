import { createClient } from "@supabase/supabase-js";

import type { Database } from "../../../src/types/supabase";
import type { GroupLetters } from "../../../src/types/types";

import { mailpit, rateLimitStore } from "./local-services";
import type { NewAllDayEvent, NewMultiDayEvent, NewTraining, TestBackend } from "./port";

const required = (name: string) => {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set; is local Supabase running? See e2e/README.md`);
  return value;
};

// Tables scenarios write to, children first. Groups and trailers are reference data from seed.sql.
const scenarioTables = [
  "event_group",
  "event_highlighted_group",
  "event",
  "all_day_event",
  "multi_day_event",
  "event_preset",
] as const;

/** Midnight in Tallinn on an ISO date, as the site's date pickers store it */
const tallinnMidnight = (isoDate: string) => {
  const noonUtc = new Date(`${isoDate}T12:00:00Z`);
  const offset = new Intl.DateTimeFormat("en", {
    timeZone: "Europe/Tallinn",
    timeZoneName: "longOffset",
  })
    .formatToParts(noonUtc)
    .find(part => part.type === "timeZoneName")
    ?.value.replace("GMT", "");
  return new Date(`${isoDate}T00:00:00${offset}`).toISOString();
};

export const supabaseBackend = (): TestBackend => {
  const url = required("NEXT_PUBLIC_SUPABASE_URL");
  // reset() deletes everything, so never point it at the hosted project
  const { hostname } = new URL(url);
  if (hostname !== "localhost" && hostname !== "127.0.0.1") {
    throw new Error(`Refusing to run E2E against non-local Supabase at ${url}`);
  }

  const db = createClient<Database>(url, required("SUPABASE_SERVICE_ROLE_KEY"), {
    auth: { persistSession: false },
  });
  const mail = mailpit();
  const rateLimit = rateLimitStore();

  const groupIds = async (letters: GroupLetters[]) => {
    const { data, error } = await db.from("group").select("id, letter").in("letter", letters);
    if (error) throw new Error(error.message);
    return letters.map(letter => {
      const group = data.find(g => g.letter === letter);
      if (!group) throw new Error(`Group ${letter} is missing from seed data`);
      return group.id;
    });
  };

  const highlightedGroupIds = async (letters: GroupLetters[]) => {
    const { data, error } = await db
      .from("highlighted_group")
      .select("id, letter")
      .in("letter", letters);
    if (error) throw new Error(error.message);
    return letters.map(letter => {
      const group = data.find(g => g.letter === letter);
      if (!group) throw new Error(`Highlighted Group ${letter} is missing from seed data`);
      return group.id;
    });
  };

  const trailerId = async (text: string) => {
    const { data, error } = await db.from("event_trailer").select("id").eq("text", text).single();
    if (error) throw new Error(`Trailer "${text}" is missing from seed data: ${error.message}`);
    return data.id;
  };

  return {
    async reset() {
      for (const table of scenarioTables) {
        // Sequential on purpose: children must be gone before their parents
        // eslint-disable-next-line no-await-in-loop
        const { error } = await db.from(table).delete().gte("id", 0);
        if (error) throw new Error(`reset ${table}: ${error.message}`);
      }
      await Promise.all([mail.clear(), rateLimit.clear()]);
    },

    async aTraining({
      start,
      end,
      groups,
      highlightedGroups = [],
      highlightedTime = false,
      description,
      trailer,
    }: NewTraining) {
      const { data: event, error } = await db
        .from("event")
        .insert({
          event_type: "NORMAL",
          start,
          normal_event_end: end,
          description,
          is_highlighted: highlightedTime,
          trailer_id: trailer ? await trailerId(trailer) : null,
        })
        .select("id")
        .single();
      if (error) throw new Error(error.message);

      const ids = await groupIds(groups);
      const { error: groupError } = await db
        .from("event_group")
        .insert(ids.map(group_id => ({ event_id: event.id, group_id })));
      if (groupError) throw new Error(groupError.message);

      if (highlightedGroups.length > 0) {
        const highlightedIds = await highlightedGroupIds(highlightedGroups);
        const { error: highlightError } = await db.from("event_highlighted_group").insert(
          highlightedIds.map(highlighted_group_id => ({
            event_id: event.id,
            highlighted_group_id,
          })),
        );
        if (highlightError) throw new Error(highlightError.message);
      }
    },

    async anAllDayEvent({ date, title, subtitle }: NewAllDayEvent) {
      const { data: allDayEvent, error } = await db
        .from("all_day_event")
        .insert({ title, sub_title: subtitle })
        .select("id")
        .single();
      if (error) throw new Error(error.message);

      const { error: eventError } = await db.from("event").insert({
        event_type: "ALL_DAY",
        start: tallinnMidnight(date),
        all_day_event: allDayEvent.id,
      });
      if (eventError) throw new Error(eventError.message);
    },

    async aMultiDayEvent({ from, to, title }: NewMultiDayEvent) {
      const { data: multiDayEvent, error } = await db
        .from("multi_day_event")
        .insert({ title })
        .select("id")
        .single();
      if (error) throw new Error(error.message);

      // The date range picker stores both ends as midnight
      const { error: eventError } = await db.from("event").insert({
        event_type: "MULTI_DAY",
        start: tallinnMidnight(from),
        long_event_end: tallinnMidnight(to),
        multi_day_event: multiDayEvent.id,
      });
      if (eventError) throw new Error(eventError.message);
    },

    lastMailTo: address => mail.lastMailTo(address),
  };
};
