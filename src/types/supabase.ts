import { SupabaseClient } from "@supabase/supabase-js";

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      all_day_event: {
        Row: {
          id: number;
          sub_title: string | null;
          title: string | null;
        };
        Insert: {
          id?: number;
          sub_title?: string | null;
          title?: string | null;
        };
        Update: {
          id?: number;
          sub_title?: string | null;
          title?: string | null;
        };
      };
      email_whitelist: {
        Row: {
          created_at: string | null;
          email: string | null;
          id: number;
        };
        Insert: {
          created_at?: string | null;
          email?: string | null;
          id?: number;
        };
        Update: {
          created_at?: string | null;
          email?: string | null;
          id?: number;
        };
      };
      event: {
        Row: {
          all_day_event: number | null;
          created_at: string | null;
          description: string | null;
          event_type: string | null;
          id: number;
          is_highlighted: boolean | null;
          long_event_end: string | null;
          multi_day_event: number | null;
          normal_event_end: string | null;
          start: string | null;
          trailer_id: number | null;
          updated_at: string | null;
        };
        Insert: {
          all_day_event?: number | null;
          created_at?: string | null;
          description?: string | null;
          event_type?: string | null;
          id?: number;
          is_highlighted?: boolean | null;
          long_event_end?: string | null;
          multi_day_event?: number | null;
          normal_event_end?: string | null;
          start?: string | null;
          trailer_id?: number | null;
          updated_at?: string | null;
        };
        Update: {
          all_day_event?: number | null;
          created_at?: string | null;
          description?: string | null;
          event_type?: string | null;
          id?: number;
          is_highlighted?: boolean | null;
          long_event_end?: string | null;
          multi_day_event?: number | null;
          normal_event_end?: string | null;
          start?: string | null;
          trailer_id?: number | null;
          updated_at?: string | null;
        };
      };
      event_group: {
        Row: {
          event_id: number;
          group_id: number;
          id: number;
        };
        Insert: {
          event_id: number;
          group_id: number;
          id?: number;
        };
        Update: {
          event_id?: number;
          group_id?: number;
          id?: number;
        };
      };
      event_highlighted_group: {
        Row: {
          event_id: number;
          highlighted_group_id: number;
          id: number;
        };
        Insert: {
          event_id: number;
          highlighted_group_id: number;
          id?: number;
        };
        Update: {
          event_id?: number;
          highlighted_group_id?: number;
          id?: number;
        };
      };
      event_trailer: {
        Row: {
          id: number;
          text: string | null;
        };
        Insert: {
          id?: number;
          text?: string | null;
        };
        Update: {
          id?: number;
          text?: string | null;
        };
      };
      group: {
        Row: {
          id: number;
          letter: string | null;
        };
        Insert: {
          id?: number;
          letter?: string | null;
        };
        Update: {
          id?: number;
          letter?: string | null;
        };
      };
      highlighted_group: {
        Row: {
          id: number;
          letter: string | null;
        };
        Insert: {
          id?: number;
          letter?: string | null;
        };
        Update: {
          id?: number;
          letter?: string | null;
        };
      };
      multi_day_event: {
        Row: {
          id: number;
          title: string;
        };
        Insert: {
          id?: number;
          title?: string;
        };
        Update: {
          id?: number;
          title?: string;
        };
      };
      profile: {
        Row: {
          avatar: string | null;
          created_at: string | null;
          id: string;
          role: string | null;
          updated_at: string | null;
          username: string | null;
        };
        Insert: {
          avatar?: string | null;
          created_at?: string | null;
          id: string;
          role?: string | null;
          updated_at?: string | null;
          username?: string | null;
        };
        Update: {
          avatar?: string | null;
          created_at?: string | null;
          id?: string;
          role?: string | null;
          updated_at?: string | null;
          username?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      delete_claim: {
        Args: {
          uid: string;
          claim: string;
        };
        Returns: string;
      };
      get_claim: {
        Args: {
          uid: string;
          claim: string;
        };
        Returns: Json;
      };
      get_claims: {
        Args: {
          uid: string;
        };
        Returns: Json;
      };
      get_my_claim: {
        Args: {
          claim: string;
        };
        Returns: Json;
      };
      get_my_claims: {
        Args: Record<PropertyKey, never>;
        Returns: Json;
      };
      is_claims_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      set_claim: {
        Args: {
          uid: string;
          claim: string;
          value: Json;
        };
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type TypedSupabaseClient = SupabaseClient<Database>;
