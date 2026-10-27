<!-- generated from ac15630618e4, 2026-10-23 -->
<!-- c4-map config 3f246a9f97f3 -->

# Components: data access and auth

Drawn from [docs/c4/level-3.md](../c4/level-3.md). How UI reaches Supabase: components call TanStack Query hooks (`src/hooks`, `hooks/queries`, `hooks/mutations`, merged here), which take the browser client from the Supabase context. Sibling: [forms and email](c4-components-forms-email.md).

```mermaid
C4Component
  title Components - data access and auth
  UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")

  Container_Boundary(web, "Next.js web app") {
    Component(calendar, "Training calendar", "date-fns, Formik", "Views, create, delete")
    Component(userui, "User account UI", "Formik", "Login, profile")
    Component(hooks, "Data hooks", "TanStack Query", "Queries and mutations")
    Component(pages, "Site pages", "App Router", "app/(children)")
    Component(ctx, "Supabase context", "React context", "Client + session")
    Component(listener, "Auth listener", "supabase-js", "Refreshes on auth change")
    Component(lib, "Supabase clients", "auth-helpers", "Browser/server clients")
    Component(layout, "Root layout", "App Router", "Reads session on server")
  }
  Boundary(ext, "External", "") {
    System_Ext(supabase, "Supabase", "Auth, Postgres, Storage")
  }

  Rel(pages, hooks, "Uses")
  Rel(calendar, hooks, "Uses")
  Rel(userui, hooks, "Uses")
  Rel(hooks, ctx, "Gets client")
  Rel(layout, ctx, "Provides session")
  Rel(listener, ctx, "Subscribes")
  Rel(layout, lib, "Server client")
  Rel(ctx, lib, "Browser client")
  Rel(lib, supabase, "Calls", "HTTPS")

  UpdateRelStyle(pages, hooks, $offsetX="-20", $offsetY="-25")
  UpdateRelStyle(listener, ctx, $offsetX="-30", $offsetY="-25")
  UpdateRelStyle(layout, lib, $offsetX="-30", $offsetY="-25")
  UpdateRelStyle(lib, supabase, $offsetY="-45")

```
