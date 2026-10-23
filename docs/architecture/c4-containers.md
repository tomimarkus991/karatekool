<!-- generated from ac15630618e4, 2026-10-23 -->
<!-- c4-map config 3f246a9f97f3 -->

# Containers: Karatekool Nüke website

Drawn from [docs/c4/level-2.md](../c4/level-2.md). One Next.js 14.0.3 app: the browser part talks to Supabase directly with the anon key and the user's JWT (authorization rests on Supabase RLS); the server part renders pages and handles the two email form endpoints. YouTube/Maps iframes are left out. See also [context](c4-context.md), [components](README.md).

```mermaid
C4Container
  title Containers - Karatekool Nüke website
  UpdateLayoutConfig($c4ShapeInRow="2", $c4BoundaryInRow="2")

  Person(user, "Visitor / member", "Uses the site")

  System_Boundary(site, "Karatekool Nüke website") {
    Container(spa, "Browser app (PWA)", "React 18, TanStack Query 5", "Pages, calendar, forms")
    Container(server, "Next.js server", "Next.js 14 App Router, Node", "SSR, /api/sign-up, /api/send-question")
  }

  Boundary(managed, "Managed services", "") {
    Container(auth, "Supabase Auth", "GoTrue, JWT", "Sign-up, login, invites")
    ContainerDb(db, "Supabase Postgres", "PostgREST, RLS", "Calendar, profiles")
    Container(storage, "Supabase Storage", "Bucket 'materials'", "Member files")
    System_Ext(upstash, "Upstash Redis", "5 per email per day")
    System_Ext(resend, "Resend", "Email to club inbox")
  }

  Rel(user, spa, "Uses", "HTTPS")
  Rel(spa, server, "Loads pages, posts forms", "HTTPS/JSON")
  Rel(spa, auth, "Signs in/up", "supabase-js")
  Rel(spa, db, "Reads/writes", "PostgREST")
  Rel(spa, storage, "Downloads", "HTTPS")
  Rel(server, auth, "Reads session", "cookies")
  Rel(server, upstash, "Checks limit", "REST")
  Rel(server, resend, "Sends email", "REST")

  UpdateRelStyle(user, spa, $offsetX="-60", $offsetY="-40")
  UpdateRelStyle(server, auth, $offsetX="-20", $offsetY="40")
  UpdateRelStyle(spa, auth, $offsetX="-20", $offsetY="-40")
  UpdateRelStyle(spa, db, $offsetX="70", $offsetY="-40")

```
