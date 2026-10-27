<!-- generated from ac15630618e4, 2026-10-23 -->
<!-- c4-map config 3f246a9f97f3 -->

> **Agent context map.** Dense on purpose and not laid out for viewing; labels may overlap when rendered. Diagrams for people: [docs/architecture/](../architecture/).

# Database: Supabase Postgres (public schema)

No SQL migrations are versioned in this repo. Written by hand from the generated types in `src/types/supabase.ts` (`yarn supabase:types`); RLS policies, triggers and the whitelist check are not visible from here. `profile.id` references `auth.users.id`.

```mermaid
erDiagram
  all_day_event { bigint id PK
    text title
    text sub_title }
  multi_day_event { bigint id PK
    text title }
  event_trailer { bigint id PK
    text text }
  event { bigint id PK
    text event_type
    timestamptz start
    timestamptz normal_event_end
    timestamptz long_event_end
    text description
    boolean is_highlighted
    bigint all_day_event FK
    bigint multi_day_event FK
    bigint trailer_id FK
    timestamptz created_at
    timestamptz updated_at }
  group { bigint id PK
    text letter
    boolean highlighted }
  highlighted_group { bigint id PK
    text letter
    boolean highlighted }
  event_group { bigint id PK
    bigint event_id FK
    bigint group_id FK }
  event_highlighted_group { bigint id PK
    bigint event_id FK
    bigint highlighted_group_id FK }
  event_preset { bigint id PK
    text event_type
    timestamptz start
    text description
    boolean is_highlighted
    bigint_array group_ids
    bigint_array highlighted_group_ids
    bigint trailer_id FK
    timestamptz created_at
    timestamptz updated_at }
  profile { uuid id PK,FK
    text username
    text avatar
    text group
    text role
    text calendar_type
    timestamptz created_at
    timestamptz updated_at }
  auth_users { uuid id PK }
  email_whitelist { bigint id PK
    text email
    timestamptz created_at }
  new_applications { bigint id PK
    text name
    text email
    text group
    text reason
    timestamptz created_at }

  all_day_event ||--o{ event : "all_day_event"
  multi_day_event ||--o{ event : "multi_day_event"
  event_trailer ||--o{ event : "trailer_id"
  event_trailer ||--o{ event_preset : "trailer_id"
  event ||--o{ event_group : "event_id"
  group ||--o{ event_group : "group_id"
  event ||--o{ event_highlighted_group : "event_id"
  highlighted_group ||--o{ event_highlighted_group : "highlighted_group_id"
  auth_users ||--|| profile : "id"
```

- Column SQL types are inferred from TS types (`number` -> bigint, `string` timestamps -> timestamptz); exact types are not in the repo.
- Functions (custom claims helpers): `get_claim`, `get_claims`, `get_my_claim`, `get_my_claims`, `set_claim`, `delete_claim`, `is_claims_admin`. The app does not call them.
- `new_applications` is not referenced by app code. Storage bucket `materials` holds member files.
