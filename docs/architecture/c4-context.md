<!-- generated from ac15630618e4, 2026-10-23 -->
<!-- c4-map config 3f246a9f97f3 -->

# System Context: Karatekool Nüke website

Drawn from [docs/c4/level-1.md](../c4/level-1.md). The club's public website with a members-only area. Members and admins share one box: an admin is a member whose `profile.role` is `admin` and who can edit calendar events. Resend delivers sign-up applications and questions to the club inbox (info@karatekool.ee). Fonts are fetched from Google Fonts at build time only and are left out. See also [containers](c4-containers.md).

```mermaid
C4Context
  title System Context - Karatekool Nüke website
  UpdateLayoutConfig($c4ShapeInRow="2", $c4BoundaryInRow="2")

  Person(visitor, "Visitor", "Prospective member or parent")
  Person(member, "Member / admin", "Whitelisted; admins edit calendar")

  Boundary(sys, "Karatekool Nüke", "") {
    System(site, "Karatekool Nüke website", "Next.js 14 PWA, karatekool.ee")
  }

  Boundary(ext, "External", "") {
    System_Ext(supabase, "Supabase", "Auth, Postgres, Storage")
    System_Ext(upstash, "Upstash Redis", "Rate limiting")
    System_Ext(resend, "Resend", "Email to club inbox")
    System_Ext(embeds, "YouTube / Google Maps", "Embedded media")
  }

  Rel(visitor, site, "Signs up, asks questions", "HTTPS")
  Rel(member, site, "Views calendar, materials", "HTTPS")
  Rel(site, supabase, "Auth, data, files", "HTTPS")
  Rel(site, upstash, "Rate-limits forms", "HTTPS")
  Rel(site, resend, "Sends emails", "HTTPS")
  Rel(site, embeds, "Embeds", "iframe")

  UpdateRelStyle(visitor, site, $offsetX="-170", $offsetY="-70")
  UpdateRelStyle(member, site, $offsetX="30", $offsetY="-70")
  UpdateRelStyle(site, supabase, $offsetX="-30", $offsetY="-35")
```
