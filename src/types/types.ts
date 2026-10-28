export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
}

export interface SelectOption<T> {
  id: number;
  name: T;
}

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

export type GroupLetters = "S" | "S1" | "L" | "C" | "V" | "A" | "E" | "N" | "M" | "K" | "T";

export type GroupFilters = GroupLetters | "all" | "none";

/** Shows only the Named Trainings with this name */
export interface NamedTrainingFilter {
  name: string;
}

/** What the calendar shows: one Group, all of them, nothing yet, or one Named Training's name */
export type CalendarFilter = GroupFilters | NamedTrainingFilter;

export interface SEventTrailer {
  id: number;
  text: string;
}
interface SAllDayEvent {
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

export interface GroupData {
  id: number;
  letter: string;
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
  group: GroupData[];
  /** A Named Training's name; null for every other Event */
  name: string | null;
  event_type: EventTypes;
}

export interface JustRouter {
  href: string;
}

export interface UserType {
  id: string;
  email: string;
  username: string;
  avatar: string;
}

export interface Router {
  /**
   * @description Where the route will lead to
   */
  href: string;
  /**
   * @description Route name displayed on expanded sidebar
   */
  routeName: string;
  /**
   * @description Icon from react-icons
   */
  bigIcon: JSX.Element;
  /**
   * @description tooltip should be specified if you want it to be different from routeName
   * @default tooltip is routeName but smaller case
   */
  tooltip?: string;
}

export type NextLayoutProps = {
  children: React.ReactNode;
};
