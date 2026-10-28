<!-- generated from 20cbc6e7a9d6, 2026-10-28 -->
<!-- c4-map config 77b83c238bd4 -->

# Components: API

Drawn from [docs/c4/level-3.md](../c4/level-3.md). Spring Security (`config`) sits in front of every controller. It checks the API's token and takes the caller's roles from the Whitelist on each request. Controllers hand work to services, and services use the JPA repositories. DTOs, entities and `util` are left out. The E2E test support exists only under the `e2e` profile. Sibling: [web components](c4-components-data.md).

```mermaid
C4Component
  title Components - Spring Boot API
  UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")

  Container_Ext(spa, "Browser app", "React", "Calls with token")

  Container_Boundary(api, "API") {
    Component(security, "Security and config", "Spring Security", "Token, Whitelist roles, CORS")
    Component(controllers, "REST controllers", "Spring Web MVC", "Auth, calendar, profile, forms")
    Component(e2e, "E2E test support", "e2e profile", "Wipes data, signs in")
    Component(services, "Services", "Spring, Spring Mail", "Calendar rules, sign-in, mail")
    Component(repos, "Repositories", "Spring Data JPA", "Entity queries")
  }

  Boundary(ext, "External", "") {
    ContainerDb(db, "Database", "PostgreSQL", "Flyway schema")
    System_Ext(google, "Google Identity", "Token keys")
    System_Ext(resend, "Resend", "SMTP relay")
  }

  Rel(spa, controllers, "Calls", "JSON/HTTPS")
  Rel(controllers, services, "Delegates to")
  Rel(services, security, "Checks Whitelist")
  Rel(e2e, services, "Issues tokens")
  Rel(e2e, repos, "Saves people")
  Rel(services, repos, "Uses")
  Rel(repos, db, "Queries", "JDBC")
  Rel(services, google, "Verifies tokens", "HTTPS")
  Rel(services, resend, "Sends mail", "SMTPS")

  UpdateRelStyle(spa, controllers, $offsetX="-110", $offsetY="-40")
  UpdateRelStyle(e2e, services, $offsetX="-30", $offsetY="-25")
  UpdateRelStyle(services, google, $offsetY="-50")
  UpdateRelStyle(repos, db, $offsetY="-50")
  UpdateRelStyle(services, resend, $offsetX="-90", $offsetY="-70")
```
