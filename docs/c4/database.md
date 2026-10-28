<!-- generated from 20cbc6e7a9d6, 2026-10-28 -->
<!-- c4-map config 77b83c238bd4 -->

> **Agent context map.** Dense on purpose and not laid out for viewing; labels may overlap when rendered. Diagrams for people: [docs/architecture/](../architecture/).

# Database schema

Generated from 4 SQL migrations in `api/src/main/resources/db/migration` (latest: `V4__mail_sent.sql`). Columns only: no defaults or checks. PK primary key, FK foreign key, UK unique.

```mermaid
erDiagram
  app_user {
    bigserial id PK
    text google_sub UK
    text email
    text name "nullable"
    timestamptz created_at
    bigint group_id FK "nullable"
    text calendar_view "nullable"
    text avatar
  }
  club_group {
    bigint id PK
    text letter UK
  }
  event {
    bigint id PK
    text kind
    timestamptz starts_at
    timestamptz ends_at "nullable"
    boolean highlighted
    text description "nullable"
    bigint trailer_id FK "nullable"
    text title "nullable"
    text subtitle "nullable"
    bigint preset_id FK "nullable"
    timestamptz created_at
    timestamptz updated_at
  }
  event_group {
    bigint event_id PK,FK
    bigint group_id PK,FK
  }
  mail_sent {
    bigint id PK
    text rate_key
    timestamptz sent_at
  }
  preset {
    bigint id PK
    text title
  }
  trailer {
    bigint id PK
    text text
  }
  club_group ||--o{ app_user : "group_id"
  club_group ||--o{ event_group : "group_id"
  event ||--o{ event_group : "event_id"
  preset ||--o{ event : "preset_id"
  trailer ||--o{ event : "trailer_id"
```
