<!-- generated from 20cbc6e7a9d6, 2026-10-28 -->
<!-- c4-map config 77b83c238bd4 -->

# Components: web data access and auth

Drawn from [docs/c4/level-3.md](../c4/level-3.md). How the web app reaches the API. Pages and UI components call TanStack Query hooks (`src/hooks`, `hooks/queries` and `hooks/mutations` are merged here). The hooks, and the forms directly, go through the API client in `src/lib/api.ts`, which adds the stored token. Barrel modules (`components/index`, `components/elements`) are left out and their edges drawn straight through. Sibling: [API components](c4-components-api.md).

```mermaid
C4Component
  title Components - web data access and auth
  UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")

  Container_Boundary(web, "Browser app") {
    Component(pages, "Site pages", "Next.js App Router", "Public pages and calendar page")
    Component(nav, "Navigation", "Next.js", "Top bar, sidebar")
    Component(calendar, "Training calendar", "date-fns, Formik", "Views, Event editing")
    Component(user, "User account UI", "Google Identity Services", "Sign-in, profile")
    Component(hooks, "Data hooks", "TanStack Query", "Reads and writes")
    Component(forms, "Forms", "Formik, Yup", "Applications, Questions")
    Component(lib, "API client", "fetch", "Adds the stored token")
  }

  Boundary(ext, "Other containers", "") {
    Container_Ext(api, "API", "Spring Boot", "REST under /api/v1")
  }

  Rel(pages, nav, "Renders")
  Rel(pages, calendar, "Renders")
  Rel(nav, user, "Opens")
  Rel(calendar, hooks, "Uses")
  Rel(user, hooks, "Uses")
  Rel(hooks, lib, "Calls")
  Rel(forms, lib, "Posts via")
  Rel(lib, api, "Calls", "JSON/HTTPS")

  UpdateRelStyle(pages, nav, $offsetX="-30", $offsetY="-25")
  UpdateRelStyle(lib, api, $offsetX="-90", $offsetY="-50")
```
