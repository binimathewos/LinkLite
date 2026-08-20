---
description: Read this before implementing or modifying authentication in this project.
---

# Authentication Guidelines

## Rule: Clerk Only

All authentication and session handling is done through Clerk (`@clerk/nextjs`). Do
not introduce another auth method (custom JWT, NextAuth, Passport, roll-your-own
sessions, etc.) for any part of the app.

## Protected Routes

- `/dashboard` (and everything under it) requires a signed-in user.
- Enforce this in `proxy.ts` using `clerkMiddleware` with `auth.protect()` for
  matching routes, e.g.:

  ```typescript
  import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

  const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

  export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) {
      await auth.protect({
        unauthenticatedUrl: new URL("/", req.url).toString(),
      });
    }
  });
  ```

- Unauthenticated users hitting a protected route are redirected to `/` (the
  homepage), not a dedicated sign-in page, via `unauthenticatedUrl`.
- Do not duplicate this check with ad-hoc `auth()` calls in every page under
  `/dashboard` — the middleware is the source of truth. Use `await auth()` in
  Server Components only when you need the `userId` or other session data, not to
  re-guard the route.

## Signed-in Redirect from Home

- If a signed-in user visits `/` (the homepage), redirect them to `/dashboard`.
- Implement this as a server-side check in `app/page.tsx` using `auth()` +
  `redirect()` from `next/navigation`, not client-side redirects.

## Sign In / Sign Up UI

- Sign in and sign up must always launch as a **modal**, never as a dedicated
  full-page flow.
- Use `SignInButton` / `SignUpButton` with `mode="modal"`:

  ```tsx
  <SignInButton mode="modal" />
  <SignUpButton mode="modal" />
  ```

- Do not link to `/sign-in` or `/sign-up` as standalone pages for the primary
  auth entry points; those routes may still exist as fallbacks but modal is the
  default UX.
- Apply the `shadcn` theme from `@clerk/ui/themes` via `ClerkProvider` so modals
  match the app's existing shadcn/ui styling.

## See Also

- [proxy.ts](../proxy.ts) — Clerk middleware configuration
- [app/layout.tsx](../app/layout.tsx) — `ClerkProvider` setup
