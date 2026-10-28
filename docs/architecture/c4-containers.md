<!-- generated from 20cbc6e7a9d6, 2026-10-28 -->
<!-- c4-map config 77b83c238bd4 -->

# Containers: Karatekool Nüke website

Drawn from [docs/c4/level-2.md](../c4/level-2.md). The browser app calls the Spring Boot API for everything: the calendar, Member preferences, sign-in and the forms. The browser exchanges a Google ID token for the API's own token and sends it with each call. It also embeds YouTube videos and Google Maps in iframes (not drawn). The API owns its Postgres database and deploys to a VPS behind Traefik at api.karatekool.alber.ee. See also [context](c4-context.md), [web components](c4-components-data.md) and [API components](c4-components-api.md).

```mermaid
C4Container
  title Containers - Karatekool Nüke website
  UpdateLayoutConfig($c4ShapeInRow="2", $c4BoundaryInRow="1")

  Person(visitor, "Visitor", "Prospective member or parent")
  Person(member, "Member / Admin", "Signed in with Google")

  System_Boundary(site, "Karatekool Nüke website") {
    Container(spa, "Browser app", "React, Next.js, TanStack Query", "Pages, calendar, forms")
    Container(next, "Next.js server", "Next.js 14", "Serves pages and assets")
    Container(api, "API", "Spring Boot 4, Java 25", "REST under /api/v1")
    ContainerDb(db, "Database", "PostgreSQL, Flyway", "Calendar, Members, mail limits")
  }

  Boundary(ext, "External", "") {
    System_Ext(resend, "Resend", "SMTP relay")
    System_Ext(google, "Google Identity", "Sign-in, token keys")
  }

  Rel(visitor, spa, "Uses", "HTTPS")
  Rel(member, spa, "Uses", "HTTPS")
  Rel(spa, next, "Loads pages", "HTTPS")
  Rel(spa, api, "Calls with token", "JSON/HTTPS")
  Rel(spa, google, "Gets ID token", "GIS")
  Rel(api, db, "Reads, writes", "JDBC")
  Rel(api, google, "Checks token keys", "HTTPS")
  Rel(api, resend, "Sends mail", "SMTPS")

  UpdateRelStyle(visitor, spa, $offsetX="-60", $offsetY="-40")
  UpdateRelStyle(member, spa, $offsetX="40", $offsetY="-40")
  UpdateRelStyle(spa, next, $offsetX="-40", $offsetY="-30")
  UpdateRelStyle(spa, api, $offsetX="-130")
  UpdateRelStyle(api, db, $offsetX="-40", $offsetY="-30")```
