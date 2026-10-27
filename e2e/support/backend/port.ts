import type { GroupLetters } from "../../../src/types/types";

export interface NewTraining {
  /** ISO date-time with offset, e.g. "2026-03-10T18:00:00+02:00" */
  start: string;
  end: string;
  groups: GroupLetters[];
  /** Groups shown with a Highlight; a Group is either here or in `groups` */
  highlightedGroups?: GroupLetters[];
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

/** An email the site sent, as the recipient's inbox shows it. */
export interface Mail {
  subject: string;
  to: string[];
  replyTo: string[];
  /** Plain-text body */
  body: string;
}

/**
 * Everything a scenario may ask of the backend. Backend-neutral on purpose: the same
 * scenarios run against Supabase now and Spring Boot later (docs/adr/0001).
 * Add operations only when a scenario needs them.
 */
export interface TestBackend {
  /**
   * Remove everything scenarios create, leaving only reference data such as Groups.
   * Also empties the test inbox and the rate limiter's store.
   */
  reset(): Promise<void>;
  aTraining(training: NewTraining): Promise<void>;
  anAllDayEvent(event: NewAllDayEvent): Promise<void>;
  aMultiDayEvent(event: NewMultiDayEvent): Promise<void>;
  /** The newest email sent to `address`, or undefined if none arrived. */
  lastMailTo(address: string): Promise<Mail | undefined>;
}
