/* eslint-disable no-shadow */
export interface Event {
  id: string;
  title: string;
  /*
   * time in timestamptz format
   */
  start: string;
  /*
   * time in timestamptz format
   */
  end?: string;
  /*
   * time in timestamptz format
   */
  createdAt?: string;
  /*
   * time in timestamptz format
   */
  updatedAt?: string;
  groupId: string;
}

export type GroupLetters = "S" | "V" | "A" | "E" | "N" | "M" | "K" | "T";

export type GroupFilters = GroupLetters | "all" | "none";

export interface Group {
  id?: string;
  letter: GroupLetters;
  description: string;
  color: "red" | "blue" | "green" | "yellow" | "orange" | "purple" | "pink" | "rose";
}

export interface SGroup {
  letter: GroupLetters;
}
export interface SHighLightedGroup {
  letter: GroupLetters;
}
export interface SEventTrailer {
  text: string;
}
export interface SAllDayEvent {
  id: number;
  title: string;
  sub_title: string;
}
export interface SMultiDayEvent {
  id: number;
  title: string;
}

export enum EventTypes {
  MULTI_DAY = "MULTI_DAY",
  ALL_DAY = "ALL_DAY",
  NORMAL = "NORMAL",
}

export interface EventData {
  id: number;
  start: string;
  long_event_end: string | null;
  description: string | null;
  normal_event_end: string | null;
  is_highlighted: boolean;
  event_trailer: SEventTrailer | null;
  all_day_event: SAllDayEvent | null;
  multi_day_event: SMultiDayEvent | null;
  group: SGroup[];
  highlighted_group: SHighLightedGroup[];
  event_type: EventTypes;
}

export interface JustRouter {
  to: string;
  element?: JSX.Element;
}

export interface UserType {
  id: string;
  email: string;
  username: string;
  avatar: string;
}
