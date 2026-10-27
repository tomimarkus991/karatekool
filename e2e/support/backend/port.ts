import type { GroupLetters } from "../../../src/types/types";

export interface NewTraining {
  /** ISO date-time with offset, e.g. "2026-03-10T18:00:00+02:00" */
  start: string;
  end: string;
  groups: GroupLetters[];
  highlightedTime?: boolean;
  description?: string;
  /** One of the club's standard trailer texts, e.g. "- EKSAM" */
  trailer?: string;
}

export interface NewAllDayEvent {
  /** Calendar date in Tallinn, e.g. "2026-03-14" */
  date: string;
  title: string;
  subtitle: string;
}

export interface NewMultiDayEvent {
  /** First and last calendar day in Tallinn, inclusive, e.g. "2026-03-12" */
  from: string;
  to: string;
  title: string;
}

/** A saved Multi-day event title an Admin picks when creating a Multi-day event */
export interface NewPreset {
  title: string;
}

/** An email the site sent, as the recipient's inbox shows it. */
export interface Mail {
  subject: string;
  to: string[];
  replyTo: string[];
  /** Plain-text body */
  body: string;
}

export interface MemberPreferences {
  group?: GroupLetters;
  /** The view the calendar opens in */
  calendarType?: "Kuu" | "Päev";
}

/** A Whitelisted person the backend created and signed in to the browser */
export interface Person {
  email: string;
}

/** Someone acting against the backend: a signed-up person, or a visitor who is not signed in */
export type Actor = Person | "visitor";

/**
 * Calls made straight to the backend, bypassing the site. Each resolves to true when the
 * backend carried the call out and false when it refused.
 */
export interface DirectCalls {
  createTraining(training: NewTraining): Promise<boolean>;
  /** Changes the description of the Training that starts at `start` */
  changeTrainingDescription(start: string, description: string): Promise<boolean>;
  /** Deletes the Training that starts at `start` */
  deleteTraining(start: string): Promise<boolean>;
  savePreset(preset: NewPreset): Promise<boolean>;
  /** Deletes the Preset with the same title */
  deletePreset(preset: NewPreset): Promise<boolean>;
}

/**
 * Everything a scenario may ask of the backend. Backend-neutral on purpose: the same
 * scenarios run against Supabase now and Spring Boot later (docs/adr/0001).
 * Add operations only when a scenario needs them.
 */
export interface TestBackend {
  /**
   * Remove everything scenarios create, including people, leaving only reference data such as Groups.
   * Also empties the test inbox and the rate limiter's store.
   */
  reset(): Promise<void>;
  aTraining(training: NewTraining): Promise<void>;
  anAllDayEvent(event: NewAllDayEvent): Promise<void>;
  aMultiDayEvent(event: NewMultiDayEvent): Promise<void>;
  /** A Preset that Admins are offered in the Event dialog */
  aPreset(preset: NewPreset): Promise<void>;
  /** A Member on the Whitelist, signed in to the browser */
  aMember(preferences?: MemberPreferences): Promise<Person>;
  /** An Admin on the Whitelist, signed in to the browser */
  anAdmin(): Promise<Person>;
  /** Signs an existing person in to the browser again, keeping everything saved for them */
  signIn(person: Person): Promise<void>;
  /** Direct backend calls made as `actor`, to check who may change what */
  attemptAs(actor: Actor): DirectCalls;
  /** The newest email sent to `address`, or undefined if none arrived. */
  lastMailTo(address: string): Promise<Mail | undefined>;
  /** Every email sent to `address`, newest first. */
  mailsTo(address: string): Promise<Mail[]>;
}
