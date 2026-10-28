import type { BrowserContext } from "@playwright/test";

import type { GroupLetters } from "../../../src/types/types";

import { mailpit } from "./local-services";
import type {
  Actor,
  DirectCalls,
  MemberPreferences,
  NewAllDayEvent,
  NewMultiDayEvent,
  NewPreset,
  NewTraining,
  Person,
  TestBackend,
} from "./port";
import { tallinnTime } from "./tallinn-time";

/** Where the site keeps the API token; src/lib/api.ts reads it */
const TOKEN_KEY = "karatekool-token";

interface ApiEvent {
  id: number;
  kind: "TRAINING" | "ALL_DAY" | "MULTI_DAY";
  start: string;
  highlighted: boolean;
  description: string | null;
  trailer: { id: number } | null;
  title: string | null;
  groups: { id: number; letter: string }[];
}

/**
 * The Spring Boot API under its 'e2e' profile, whose /test-support endpoints wipe the database and
 * sign people in without Google. Everything else goes through the same endpoints the site uses.
 */
export const springBackend = (browser: BrowserContext): TestBackend => {
  const api = (process.env.E2E_API_URL ?? "http://localhost:8080/api/v1").replace(/\/$/, "");
  // reset() deletes everything, so never point it at a deployed API
  const { hostname } = new URL(api);
  if (hostname !== "localhost" && hostname !== "127.0.0.1") {
    throw new Error(`Refusing to run E2E against non-local API at ${api}`);
  }
  const mail = mailpit();

  const call = async (path: string, { token, ...init }: RequestInit & { token?: string } = {}) => {
    const response = await fetch(`${api}${path}`, {
      ...init,
      headers: {
        ...(init.body ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }).catch(error => {
      throw new Error(`${api} is unreachable; is the API running with the e2e profile? (${error})`);
    });
    return response;
  };

  // For setup, which must never be refused
  const mustSucceed = async <T>(
    path: string,
    init?: RequestInit & { token?: string },
  ): Promise<T> => {
    const response = await call(path, init);
    if (!response.ok) {
      throw new Error(
        `${init?.method ?? "GET"} ${path}: ${response.status} ${await response.text()}`,
      );
    }
    return response.status === 204 ? (undefined as T) : response.json();
  };

  const groupIds = async (letters: GroupLetters[]) => {
    const groups = await mustSucceed<{ id: number; letter: string }[]>("/groups");
    return letters.map(letter => {
      const group = groups.find(g => g.letter === letter);
      if (!group) throw new Error(`Group ${letter} is missing from the API's seed data`);
      return group.id;
    });
  };

  const trailerId = async (text: string) => {
    const trailers = await mustSucceed<{ id: number; text: string }[]>("/trailers");
    const trailer = trailers.find(t => t.text === text);
    if (!trailer) throw new Error(`Trailer "${text}" is missing from the API's seed data`);
    return trailer.id;
  };

  const presetId = async (title: string) => {
    const presets = await mustSucceed<{ id: number; title: string }[]>("/presets");
    return presets.find(preset => preset.title === title)?.id;
  };

  const trainingAt = async (start: string) => {
    const from = new Date(start);
    const to = new Date(from.getTime() + 60_000);
    const events = await mustSucceed<ApiEvent[]>(
      `/events?from=${encodeURIComponent(from.toISOString())}&to=${encodeURIComponent(
        to.toISOString(),
      )}`,
    );
    return events.find(
      event => event.kind === "TRAINING" && new Date(event.start).getTime() === from.getTime(),
    );
  };

  const tokens = new Map<string, string>();
  let setupAdmin: Promise<string> | undefined;
  // An Admin of our own for setup, so scenarios' people stay exactly as they asked for them
  const setupToken = () => {
    setupAdmin ??= mustSucceed<{ token: string }>("/test-support/people", {
      method: "POST",
      body: JSON.stringify({ email: "e2e-setup@example.com", admin: true }),
    }).then(({ token }) => token);
    return setupAdmin;
  };

  // The site reads its token from localStorage. The script runs on every page load, so it only
  // writes once per sign-in; otherwise a person who signed out would be signed straight back in.
  let signIns = 0;
  const signInBrowser = async (token: string) => {
    signIns += 1;
    await browser.addInitScript(
      ({ key, value, signIn }) => {
        if (window.localStorage.getItem("karatekool-e2e-sign-in") === signIn) return;
        window.localStorage.setItem(key, value);
        window.localStorage.setItem("karatekool-e2e-sign-in", signIn);
      },
      { key: TOKEN_KEY, value: token, signIn: String(signIns) },
    );
  };

  let people = 0;
  const aPerson = async (admin: boolean, { group, calendarType }: MemberPreferences) => {
    people += 1;
    const email = `${admin ? "admin" : "member"}${people}@example.com`;
    const { token } = await mustSucceed<{ token: string }>("/test-support/people", {
      method: "POST",
      body: JSON.stringify({
        email,
        admin,
        groupLetter: group,
        calendarView: calendarType && (calendarType === "Päev" ? "DAY" : "MONTH"),
      }),
    });
    tokens.set(email, token);
    await signInBrowser(token);
    return { email };
  };

  const createTrainings = async (training: NewTraining, token?: string) => {
    // The API has no Training end; the site shows a start time only (#33)
    const { start, groups, highlightedTime = false, description, trailer } = training;
    return call("/trainings", {
      method: "POST",
      token,
      body: JSON.stringify({
        starts: [start],
        groupIds: await groupIds(groups),
        highlighted: highlightedTime,
        description,
        trailerId: trailer ? await trailerId(trailer) : undefined,
      }),
    });
  };

  const attemptAs = (actor: Actor): DirectCalls => {
    const token = actor === "visitor" ? undefined : tokens.get(actor.email);
    if (actor !== "visitor" && !token) throw new Error(`${actor.email} was never signed in`);

    return {
      async createTraining(training) {
        return (await createTrainings(training, token)).ok;
      },

      async changeTrainingDescription(start, description) {
        const training = await trainingAt(start);
        if (!training) return false;
        // A change replaces the whole Training, so everything else goes back unchanged
        const response = await call(`/trainings/${training.id}`, {
          method: "PUT",
          token,
          body: JSON.stringify({
            start: training.start,
            groupIds: training.groups.map(group => group.id),
            highlighted: training.highlighted,
            description,
            trailerId: training.trailer?.id,
            title: training.title,
          }),
        });
        return response.ok;
      },

      async deleteTraining(start) {
        const training = await trainingAt(start);
        if (!training) return false;
        return (await call(`/events/${training.id}`, { method: "DELETE", token })).ok;
      },

      async savePreset({ title }) {
        const response = await call("/presets", {
          method: "POST",
          token,
          body: JSON.stringify({ title }),
        });
        return response.ok;
      },

      async deletePreset({ title }) {
        const id = await presetId(title);
        if (id === undefined) return false;
        return (await call(`/presets/${id}`, { method: "DELETE", token })).ok;
      },
    };
  };

  return {
    async reset() {
      await mustSucceed("/test-support/reset", { method: "POST" });
      tokens.clear();
      setupAdmin = undefined;
      await mail.clear();
    },

    async aTraining(training: NewTraining) {
      const response = await createTrainings(training, await setupToken());
      if (!response.ok)
        throw new Error(`create Training: ${response.status} ${await response.text()}`);
    },

    async anAllDayEvent({ date, title, subtitle }: NewAllDayEvent) {
      await mustSucceed("/all-day-events", {
        method: "POST",
        token: await setupToken(),
        body: JSON.stringify({ start: tallinnTime(date), title, subtitle }),
      });
    },

    async aMultiDayEvent({ from, to, title }: NewMultiDayEvent) {
      const token = await setupToken();
      const id =
        (await presetId(title)) ??
        (
          await mustSucceed<{ id: number }>("/presets", {
            method: "POST",
            token,
            body: JSON.stringify({ title }),
          })
        ).id;
      // The date range picker stores both ends as midnight
      await mustSucceed("/multi-day-events", {
        method: "POST",
        token,
        body: JSON.stringify({ start: tallinnTime(from), end: tallinnTime(to), presetId: id }),
      });
    },

    async aPreset({ title }: NewPreset) {
      await mustSucceed("/presets", {
        method: "POST",
        token: await setupToken(),
        body: JSON.stringify({ title }),
      });
    },

    aMember: (preferences = {}) => aPerson(false, preferences),
    anAdmin: () => aPerson(true, {}),

    async signIn({ email }: Person) {
      const { token } = await mustSucceed<{ token: string }>("/test-support/sign-in", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      tokens.set(email, token);
      await signInBrowser(token);
    },

    attemptAs,

    lastMailTo: address => mail.lastMailTo(address),
    mailsTo: address => mail.mailsTo(address),
  };
};
