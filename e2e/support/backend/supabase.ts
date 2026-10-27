import type { BrowserContext } from "@playwright/test";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";

import type { Database } from "../../../src/types/supabase";
import type { GroupLetters } from "../../../src/types/types";

import { mailpit, rateLimitStore } from "./local-services";
import type {
  Actor,
  DirectCalls,
  MemberPreferences,
  NewAllDayEvent,
  NewMultiDayEvent,
  NewTraining,
  Person,
  TestBackend,
} from "./port";

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

const PASSWORD = "e2e-password";

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

/**
 * @param browser where signed-in people end up
 * @param siteUrl the site's address, which the session cookies belong to
 */
export const supabaseBackend = (browser: BrowserContext, siteUrl: string): TestBackend => {
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

  // Signs in the way the site's server does and hands the resulting session cookies to the browser.
  // The auth helpers write the cookies themselves, so their format is never spelled out here.
  const signIn = async (email: string) => {
    const jar = new Map<string, string>();
    const cookies = {
      get: (name: string) => (jar.has(name) ? { name, value: jar.get(name) } : undefined),
      set: (name: string, value: string) => jar.set(name, value),
    };
    const { auth } = createRouteHandlerClient<Database>(
      // A stand-in for Next's cookie store; the helpers only call get and set
      { cookies: () => cookies as never },
      { supabaseUrl: url, supabaseKey: required("NEXT_PUBLIC_SUPABASE_ANON_KEY") },
    );
    const { error } = await auth.signInWithPassword({ email, password: PASSWORD });
    if (error) throw new Error(`sign in ${email}: ${error.message}`);

    await browser.addCookies(
      Array.from(jar.entries())
        .filter(([, value]) => value)
        .map(([name, value]) => ({ name, value, url: siteUrl })),
    );
  };

  let people = 0;
  const aPerson = async (
    role: "admin" | null,
    { group, calendarType }: MemberPreferences,
  ): Promise<Person> => {
    people += 1;
    const email = `${role ?? "member"}${people}@example.com`;

    // Sign-up is refused for addresses that are not on the Whitelist
    const { error: whitelistError } = await db.from("email_whitelist").insert({ email });
    if (whitelistError) throw new Error(whitelistError.message);

    const { data, error } = await db.auth.admin.createUser({
      email,
      password: PASSWORD,
      email_confirm: true,
    });
    if (error) throw new Error(`create ${email}: ${error.message}`);

    const { error: profileError } = await db.from("profile").insert({
      id: data.user.id,
      username: email.split("@")[0],
      role,
      group: group ?? null,
      calendar_type: calendarType ?? null,
    });
    if (profileError) throw new Error(profileError.message);

    await signIn(email);
    return { email };
  };

  // A client acting as `actor` with the public key, exactly as a browser could
  const clientFor = async (actor: Actor) => {
    const client = createClient<Database>(url, required("NEXT_PUBLIC_SUPABASE_ANON_KEY"), {
      auth: { persistSession: false },
    });
    if (actor !== "visitor") {
      const { error } = await client.auth.signInWithPassword({
        email: actor.email,
        password: PASSWORD,
      });
      if (error) throw new Error(`sign in ${actor.email}: ${error.message}`);
    }
    return client;
  };

  // Row level security hides rows instead of failing, so a refused change or delete touches nothing
  const attemptAs = (actor: Actor): DirectCalls => {
    const client = clientFor(actor);

    return {
      async createTraining({ start, end, groups }) {
        const { data: event, error } = await (await client)
          .from("event")
          .insert({ event_type: "NORMAL", start, normal_event_end: end })
          .select("id")
          .single();
        if (error) return false;

        const ids = await groupIds(groups);
        const { error: groupError } = await (await client)
          .from("event_group")
          .insert(ids.map(group_id => ({ event_id: event.id, group_id })));
        return !groupError;
      },

      async changeTrainingDescription(start, description) {
        const { data, error } = await (await client)
          .from("event")
          .update({ description })
          .eq("event_type", "NORMAL")
          .eq("start", start)
          .select("id");
        return !error && data.length > 0;
      },

      async deleteTraining(start) {
        const db = await client;
        const { data: events } = await db
          .from("event")
          .select("id")
          .eq("event_type", "NORMAL")
          .eq("start", start);
        const ids = (events ?? []).map(event => event.id);

        // Children first, as the site does
        await db.from("event_group").delete().in("event_id", ids);
        await db.from("event_highlighted_group").delete().in("event_id", ids);
        const { data, error } = await db.from("event").delete().in("id", ids).select("id");
        return !error && data.length > 0;
      },
    };
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

      const { error: profileError } = await db.from("profile").delete().not("id", "is", null);
      if (profileError) throw new Error(`reset profile: ${profileError.message}`);
      const { error: whitelistError } = await db.from("email_whitelist").delete().gte("id", 0);
      if (whitelistError) throw new Error(`reset email_whitelist: ${whitelistError.message}`);
      const { data, error: listError } = await db.auth.admin.listUsers({ perPage: 1000 });
      if (listError) throw new Error(`reset auth users: ${listError.message}`);
      await Promise.all(data.users.map(user => db.auth.admin.deleteUser(user.id)));

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

    attemptAs,

    aMember: (preferences = {}) => aPerson(null, preferences),
    anAdmin: () => aPerson("admin", {}),
    signIn: ({ email }) => signIn(email),

    lastMailTo: address => mail.lastMailTo(address),
    mailsTo: address => mail.mailsTo(address),
  };
};
