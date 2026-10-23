<!-- generated from ac15630618e4, 2026-10-23 -->
<!-- c4-map config 3f246a9f97f3 -->

# Components: forms and email

Drawn from [docs/c4/level-3.md](../c4/level-3.md). Sign-up and question forms post JSON to Route Handlers, which validate with the shared Yup schemas, rate-limit and email the club. The form-to-handler arrow is an HTTP `fetch`, not an import. Sibling: [data access and auth](c4-components-data.md).

```mermaid
C4Component
  title Components - forms and email
  UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")

  Container_Boundary(web, "Next.js web app") {
    Component(emails, "Email templates", "React JSX", "Email bodies")
    Component(schemas, "Form schemas", "Yup", "Values and validation")
    Component(forms, "Forms", "Formik, Yup", "Sign-up, question, login")
    Component(api, "API route handlers", "Route Handlers", "/api/sign-up, /api/send-question")
  }
  Boundary(ext, "External", "") {
    System_Ext(upstash, "Upstash Redis", "Rate limit")
    System_Ext(resend, "Resend", "Email API")
  }

  Rel(forms, api, "Posts form", "fetch JSON")
  Rel(forms, schemas, "Validates with")
  Rel(api, schemas, "Validates with")
  Rel(api, emails, "Renders")
  Rel(emails, schemas, "Uses types")
  Rel(api, upstash, "Checks limit", "REST")
  Rel(api, resend, "Sends", "REST")

  UpdateRelStyle(forms, schemas, $offsetX="-80", $offsetY="-20")
  UpdateRelStyle(api, emails, $offsetX="40", $offsetY="20")
  UpdateRelStyle(forms, api, $offsetX="-30", $offsetY="-45")
  UpdateRelStyle(emails, schemas, $offsetX="-30", $offsetY="-30")
  UpdateRelStyle(api, resend, $offsetX="60", $offsetY="0")

```
