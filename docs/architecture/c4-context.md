<!-- generated from 20cbc6e7a9d6, 2026-10-28 -->
<!-- c4-map config 77b83c238bd4 -->

# System Context: Karatekool Nüke website

Drawn from [docs/c4/level-1.md](../c4/level-1.md). The club's public website and its own API. Members and Admins share one box: both sign in with Google, and an Admin is a Member marked as one on the Whitelist who can manage the calendar. Resend delivers Applications and Questions to the club inbox (info@karatekool.ee). Fonts come from Google Fonts at build time only and are left out. See also [containers](c4-containers.md).

```mermaid
C4Context
  title System Context - Karatekool Nüke website
  UpdateLayoutConfig($c4ShapeInRow="2", $c4BoundaryInRow="2")

  Person(visitor, "Visitor", "Prospective member or parent")
  Person(member, "Member / Admin", "Signs in with Google")

  Boundary(sys, "Karatekool Nüke", "") {
    System(site, "Karatekool Nüke website", "Next.js site and Spring Boot API")
  }

  Boundary(ext, "External", "") {
    System_Ext(google, "Google Identity", "Sign-in and token keys")
    System_Ext(embeds, "YouTube / Google Maps", "Embedded videos and maps")
  }

  Boundary(mail, "Club mail", "") {
    System_Ext(resend, "Resend", "SMTP relay")
    Person_Ext(inbox, "Club inbox", "info@karatekool.ee")
  }

  Rel(visitor, site, "Reads, sends forms", "HTTPS")
  Rel(member, site, "Signs in, uses calendar", "HTTPS")
  Rel(site, google, "Verifies sign-in", "HTTPS")
  Rel(site, resend, "Sends club mail", "SMTPS")
  Rel(site, embeds, "Embeds", "iframe")
  Rel(resend, inbox, "Delivers to", "SMTP")

  UpdateRelStyle(visitor, site, $offsetX="-90", $offsetY="-40")
  UpdateRelStyle(member, site, $offsetY="-40")
  UpdateRelStyle(site, google, $offsetX="-50", $offsetY="-35")
  UpdateRelStyle(site, embeds, $offsetX="-60", $offsetY="10")
```
