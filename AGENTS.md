# AGENTS.md

Instructions for AI coding agents (and human contributors) working in this repository.
Detailed, topic-specific standards live in [docs/](docs/). This file covers project context and
rules that apply everywhere.

> [!IMPORTANT]
> It is CRITICAL that you read the relevant .md file(s) in [docs/](docs/) BEFORE generating
> ANY code, in full — not just before making changes. Never write authentication code without
> reading [docs/authentication.md](docs/authentication.md) first, and never write or modify UI
> components without reading [docs/ui-components.md](docs/ui-components.md) first. Skipping this
> step is not acceptable, even for what looks like a trivial or one-line change.

## Project

LinkLite is a Next.js App Router application using Clerk for authentication and
Drizzle ORM + Neon (Postgres) for data storage. The project is early-stage/scaffolded;
follow the conventions below as features are built out rather than inventing new patterns.

## Tech Stack

| Concern   | Choice                                                                      |
| --------- | --------------------------------------------------------------------------- |
| Framework | Next.js 16 (App Router), React 19                                           |
| Language  | TypeScript, `strict` mode                                                   |
| Styling   | Tailwind CSS v4, shadcn/ui (`base-nova` style, `@base-ui/react` primitives) |
| Icons     | lucide-react                                                                |
| Auth      | Clerk (`@clerk/nextjs`, `@clerk/ui`)                                        |
| Database  | Neon Postgres via Drizzle ORM (`neon-http` driver)                          |
| Lint      | ESLint flat config (`eslint-config-next`)                                   |

## Detailed Standards

- [docs/authentication.md](docs/authentication.md) — Clerk-only auth, protected
  routes, signed-in redirects, modal sign-in/sign-up
- [docs/ui-components.md](docs/ui-components.md) — shadcn/ui-only UI elements, adding
  and composing components

## Project Structure

```
app/            Next.js App Router routes, layouts, and pages
components/     Shared React components (components/ui/ = shadcn primitives)
db/             Drizzle schema (schema.ts) and db client (index.ts)
lib/            Framework-agnostic utilities (e.g. lib/utils.ts)
public/         Static assets
proxy.ts        Clerk middleware (Next.js 16's renamed middleware.ts)
```

Place new code in the matching folder above rather than introducing new top-level
directories. Use the `@/*` path alias for imports (e.g. `@/db`, `@/lib/utils`,
`@/components/ui/button`).

## General Rules

- ALWAYS read the applicable [docs/](docs/) file(s) in full before generating any code — do this
  first, before writing a single line, not as an afterthought or only when "unsure".
- Match existing patterns in neighboring files before introducing a new one; check
  [docs/](docs/) if unsure whether a convention already exists.
- Do not add new dependencies for functionality already covered by the current stack
  (Tailwind/shadcn for UI, Drizzle for data access, Clerk for auth).
- Run `npm run lint` before considering a change complete; fix lint errors rather than
  disabling rules inline.
- Keep changes minimal and scoped to what was requested — don't refactor unrelated code
  or add speculative abstractions/tests for functionality that doesn't exist yet.
- Never commit secrets. Environment variables belong in `.env` (already gitignored);
  only `NEXT_PUBLIC_`-prefixed variables may be read on the client.
