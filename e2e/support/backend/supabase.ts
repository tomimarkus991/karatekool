import { createClient } from "@supabase/supabase-js";

import type { Database } from "../../../src/types/supabase";
import type { GroupLetters } from "../../../src/types/types";

import type { NewTraining, TestBackend } from "./port";

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

  const groupIds = async (letters: GroupLetters[]) => {
    const { data, error } = await db.from("group").select("id, letter").in("letter", letters);
    if (error) throw new Error(error.message);
    return letters.map(letter => {
      const group = data.find(g => g.letter === letter);
      if (!group) throw new Error(`Group ${letter} is missing from seed data`);
      return group.id;
    });
  };

  return {
    async reset() {
      for (const table of scenarioTables) {
        // Sequential on purpose: children must be gone before their parents
        // eslint-disable-next-line no-await-in-loop
        const { error } = await db.from(table).delete().gte("id", 0);
        if (error) throw new Error(`reset ${table}: ${error.message}`);
      }
    },

    async aTraining({ start, end, groups, description }: NewTraining) {
      const { data: event, error } = await db
        .from("event")
        .insert({ event_type: "NORMAL", start, normal_event_end: end, description })
        .select("id")
        .single();
      if (error) throw new Error(error.message);

      const ids = await groupIds(groups);
      const { error: groupError } = await db
        .from("event_group")
        .insert(ids.map(group_id => ({ event_id: event.id, group_id })));
      if (groupError) throw new Error(groupError.message);
    },
  };
};
