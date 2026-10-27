<!-- generated from ac15630618e4, 2026-10-23 -->
<!-- c4-map config 3f246a9f97f3 -->

> **Agent context map.** Dense on purpose and not laid out for viewing; labels may overlap when rendered. Diagrams for people: [docs/architecture/](../architecture/).

# Level 1: System context

Karatekool Nüke website (karatekool.ee): a public Estonian-language site for a karate club, with a members-only area (training calendar, study materials) and email-based sign-up and question forms. Sources: `package.json`, `.env.example`, `src/app/sitemap.ts`, `src/app/api/*/route.ts`.

```mermaid
C4Context
  title System context: Karatekool Nüke website

  Person(visitor, "Visitor / prospective member", "Reads club info, signs up a child or adult, asks questions")
  Person(member, "Club member", "Whitelisted account; views training calendar and downloads materials")
  Person(admin, "Club admin / coach", "profile.role = 'admin'; manages calendar events, presets, invites")
  Person(staff, "Club inbox (info@karatekool.ee)", "Receives sign-up applications and questions by email")

  System(site, "Karatekool Nüke website", "Next.js 14 PWA on karatekool.ee")

  System_Ext(supabase, "Supabase", "Auth (email/password), Postgres, Storage bucket 'materials'")
  System_Ext(resend, "Resend", "Transactional email API")
  System_Ext(upstash, "Upstash Redis", "Serverless Redis for rate limiting")
  System_Ext(youtube, "YouTube", "Embedded club videos")
  System_Ext(gmaps, "Google Maps", "Embedded dojo location maps")
  System_Ext(gfonts, "Google Fonts", "Fonts self-hosted at build time via next/font")

  Rel(visitor, site, "Browses, submits sign-up and question forms", "HTTPS")
  Rel(member, site, "Logs in, views calendar, downloads materials", "HTTPS")
  Rel(admin, site, "Creates and deletes calendar events, invites users", "HTTPS")
  Rel(site, supabase, "Authenticates users, reads/writes data and files", "HTTPS (supabase-js)")
  Rel(site, resend, "Sends sign-up and question emails", "HTTPS REST")
  Rel(site, upstash, "Rate-limits form submissions", "HTTPS REST")
  Rel(site, youtube, "Embeds videos", "iframe (react-player)")
  Rel(site, gmaps, "Embeds maps", "iframe")
  Rel(site, gfonts, "Downloads fonts at build", "HTTPS")
  Rel(resend, staff, "Delivers emails to", "SMTP")
  Rel(supabase, member, "Sends confirmation, invite, password-reset emails", "SMTP")
```

- Sign-up to the members area is gated by `email_whitelist`: Supabase rejects `auth.signUp` for non-whitelisted emails (error handling in `src/hooks/mutations/user/useSignUp.tsx`; the DB trigger itself is not in the repo).
- "Admin" is a `profile.role` value checked in the UI (`src/components/elements/calendar/`); server-side enforcement must live in Supabase RLS, which is not in the repo.
- Hosting target is not declared in the repo (no Vercel/Docker config); README is the Next.js template mentioning Vercel and `.vercel` is gitignored.
