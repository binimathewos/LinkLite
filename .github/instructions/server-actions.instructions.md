---
description: Read this before implementing or modifying server actions for data mutations in this project.
---

# Server Actions

## Overview

All data mutations in this app MUST be handled via Next.js server actions.

## File Structure

- Server action files MUST be named `actions.ts`
- Colocate `actions.ts` in the same directory as the component that calls it

## Implementation Rules

### 1. Client Component Invocation

Server actions MUST be called from client components only.

### 2. Type Safety

- All data passed to server actions MUST have explicit TypeScript types
- **DO NOT** use the `FormData` TypeScript type

### 3. Validation

ALL incoming data MUST be validated using **zod** schemas before processing.

### 4. Error Handling

Server actions MUST NOT throw errors. Instead, return an object with either:

- `{ success: true, data: ... }` for successful operations
- `{ success: false, error: string }` for failures

### 5. Authentication Check

Every server action MUST verify a logged-in user exists **before** any database operations:

```ts
import { auth } from "@clerk/nextjs/server";

const { userId } = await auth();
if (!userId) {
  return { success: false, error: "Unauthorized" };
}
```

### 6. Database Operations

- Server actions MUST NOT contain direct Drizzle queries
- Use helper functions from the `/data` directory that wrap Drizzle queries
- Keep server actions focused on validation, auth checks, and orchestration

## Example Structure

```ts
"use server";

import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { createLink } from "@/data/links";

const linkSchema = z.object({
  url: z.string().url(),
  title: z.string().min(1),
});

export async function addLink(data: { url: string; title: string }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    const validated = linkSchema.parse(data);
    const link = await createLink(userId, validated);

    return { success: true, data: link };
  } catch (error) {
    return { success: false, error: "Failed to create link" };
  }
}
```
