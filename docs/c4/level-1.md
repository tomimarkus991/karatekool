<!-- generated from 20cbc6e7a9d6, 2026-10-28 -->
<!-- c4-map config 77b83c238bd4 -->

> **Agent context map.** Dense on purpose and not laid out for viewing; labels may overlap when rendered. Diagrams for people: [docs/architecture/](../architecture/).

# Level 1: System context

Karatekool Nüke website (karatekool.ee): a public Estonian-language site for a karate club with a training calendar, Application and Question forms, and Google sign-in for Members and Admins. Its data, sign-in and mail go through the club's own Spring Boot API. Sources: `package.json`, `api/pom.xml`, `api/src/main/resources/application.yaml`, `api/src/main/resources/whitelist.yaml`, `src/app/sitemap.ts`.

```mermaid
C4Context
  title System context: Karatekool Nüke website

  Person(visitor, "Visitor", "Reads club info and the calendar, sends Applications and Questions")
  Person(member, "Member", "On the Whitelist; signs in with Google, saves Group, calendar view, avatar")
  Person(admin, "Admin", "Member marked Admin on the Whitelist; manages Trainings, Events, Presets")
  Person(staff, "Club inbox (info@karatekool.ee)", "Receives Applications and Questions by email")

  System(site, "Karatekool Nüke website", "Next.js 14 PWA on karatekool.ee plus Spring Boot API on api.karatekool.alber.ee")

  System_Ext(google, "Google Identity", "Sign-in button (Identity Services) and ID-token signing keys")
  System_Ext(resend, "Resend", "SMTP relay for club mail")
  System_Ext(youtube, "YouTube", "Embedded club videos")
  System_Ext(gmaps, "Google Maps", "Embedded dojo location maps")
  System_Ext(gfonts, "Google Fonts", "Fonts self-hosted at build time via next/font")

  Rel(visitor, site, "Browses, sends Applications and Questions", "HTTPS")
  Rel(member, site, "Signs in, views calendar, saves preferences", "HTTPS")
  Rel(admin, site, "Creates, changes and deletes calendar Events and Presets", "HTTPS")
  Rel(site, google, "Gets ID tokens in the browser; verifies them on the API", "HTTPS (GIS script, JWKS)")
  Rel(site, resend, "Sends Application and Question emails", "SMTPS 465")
  Rel(site, youtube, "Embeds videos", "iframe (react-player)")
  Rel(site, gmaps, "Embeds maps", "iframe")
  Rel(site, gfonts, "Downloads fonts at build", "HTTPS")
  Rel(resend, staff, "Delivers emails to", "SMTP")
```

- Who may sign in, and who is an Admin, is the Whitelist in `api/src/main/resources/whitelist.yaml`, read on every request; changes take effect on the next API deploy (#39 plans an Admin page instead).
- Hosted Supabase (project `wqdplpmiyvwmetnipmwd`) still holds the production data until it is moved to the API's database; this branch no longer talks to it. `supabase/migrations/` keeps its schema for that move.
- The website's hosting target is not declared in the repo; the API deploys to a VPS (see level 2).
