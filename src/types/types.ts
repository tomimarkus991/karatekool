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

export interface Group {
  id?: string;
  letter: "S" | "V" | "A" | "E" | "N" | "M" | "K" | "T";
  description: string;
  color: "red" | "blue" | "green" | "yellow" | "orange" | "purple" | "pink" | "rose";
}

export interface SGroup {
  letter: "S" | "V" | "A" | "E" | "N" | "M" | "K" | "T";
  color: "red" | "blue" | "green" | "yellow" | "orange" | "purple" | "pink" | "rose";
}
export interface SEventTrailer {
  text: string;
}
export interface SAllDayEvent {
  title: string;
  sub_title: string;
}
export interface SMultiDayEvent {
  title: string;
}

export interface EventData {
  id: number;
  start: string;
  long_event_end: string | null;
  is_highlighted: boolean;
  event_trailer: SEventTrailer | null;
  all_day_event: SAllDayEvent | null;
  multi_day_event: SMultiDayEvent | null;
  group: Partial<SGroup[]>;
}
