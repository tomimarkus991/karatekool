import { SupabaseClient } from "@supabase/supabase-js";

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

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
        Relationships: [];
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
        Relationships: [];
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
        Relationships: [
          {
            foreignKeyName: "event_all_day_event_fkey";
            columns: ["all_day_event"];
            referencedRelation: "all_day_event";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "event_multi_day_event_fkey";
            columns: ["multi_day_event"];
            referencedRelation: "multi_day_event";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "event_trailer_id_fkey";
            columns: ["trailer_id"];
            referencedRelation: "event_trailer";
            referencedColumns: ["id"];
          },
        ];
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
        Relationships: [
          {
            foreignKeyName: "event_group_event_id_fkey";
            columns: ["event_id"];
            referencedRelation: "event";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "event_group_group_id_fkey";
            columns: ["group_id"];
            referencedRelation: "group";
            referencedColumns: ["id"];
          },
        ];
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
        Relationships: [
          {
            foreignKeyName: "event_highlighted_group_event_id_fkey";
            columns: ["event_id"];
            referencedRelation: "event";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "event_highlighted_group_highlighted_group_id_fkey";
            columns: ["highlighted_group_id"];
            referencedRelation: "highlighted_group";
            referencedColumns: ["id"];
          },
        ];
      };
      event_preset: {
        Row: {
          created_at: string | null;
          description: string | null;
          event_type: string;
          group_ids: number[] | null;
          highlighted_group_ids: number[] | null;
          id: number;
          is_highlighted: boolean;
          start: string | null;
          trailer_id: number | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          event_type?: string;
          group_ids?: number[] | null;
          highlighted_group_ids?: number[] | null;
          id?: number;
          is_highlighted?: boolean;
          start?: string | null;
          trailer_id?: number | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          event_type?: string;
          group_ids?: number[] | null;
          highlighted_group_ids?: number[] | null;
          id?: number;
          is_highlighted?: boolean;
          start?: string | null;
          trailer_id?: number | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "event_preset_trailer_id_fkey";
            columns: ["trailer_id"];
            referencedRelation: "event_trailer";
            referencedColumns: ["id"];
          },
        ];
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
        Relationships: [];
      };
      group: {
        Row: {
          highlighted: boolean;
          id: number;
          letter: string;
        };
        Insert: {
          highlighted?: boolean;
          id?: number;
          letter: string;
        };
        Update: {
          highlighted?: boolean;
          id?: number;
          letter?: string;
        };
        Relationships: [];
      };
      highlighted_group: {
        Row: {
          highlighted: boolean;
          id: number;
          letter: string;
        };
        Insert: {
          highlighted?: boolean;
          id?: number;
          letter: string;
        };
        Update: {
          highlighted?: boolean;
          id?: number;
          letter?: string;
        };
        Relationships: [];
      };
      multi_day_event: {
        Row: {
          id: number;
          title: string | null;
        };
        Insert: {
          id?: number;
          title?: string | null;
        };
        Update: {
          id?: number;
          title?: string | null;
        };
        Relationships: [];
      };
      new_applications: {
        Row: {
          created_at: string | null;
          email: string | null;
          group: string | null;
          id: number;
          name: string | null;
          reason: string | null;
        };
        Insert: {
          created_at?: string | null;
          email?: string | null;
          group?: string | null;
          id?: number;
          name?: string | null;
          reason?: string | null;
        };
        Update: {
          created_at?: string | null;
          email?: string | null;
          group?: string | null;
          id?: number;
          name?: string | null;
          reason?: string | null;
        };
        Relationships: [];
      };
      profile: {
        Row: {
          avatar: string | null;
          calendar_type: string | null;
          created_at: string | null;
          group: string | null;
          id: string;
          role: string | null;
          updated_at: string | null;
          username: string | null;
        };
        Insert: {
          avatar?: string | null;
          calendar_type?: string | null;
          created_at?: string | null;
          group?: string | null;
          id: string;
          role?: string | null;
          updated_at?: string | null;
          username?: string | null;
        };
        Update: {
          avatar?: string | null;
          calendar_type?: string | null;
          created_at?: string | null;
          group?: string | null;
          id?: string;
          role?: string | null;
          updated_at?: string | null;
          username?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profile_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
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
