"use server";

import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { createLink } from "@/data/links";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { links } from "@/db/schema";
import { eq, and } from "drizzle-orm";

const createLinkSchema = z.object({
  originalUrl: z.string().url("Please enter a valid URL"),
  shortCode: z
    .string()
    .min(3, "Short code must be at least 3 characters")
    .max(20, "Short code must be at most 20 characters")
    .regex(
      /^[a-zA-Z0-9-_]+$/,
      "Short code can only contain letters, numbers, hyphens, and underscores",
    )
    .optional()
    .or(z.literal("")),
});

const updateLinkSchema = z.object({
  id: z.number(),
  originalUrl: z.string().url("Please enter a valid URL"),
  shortCode: z
    .string()
    .min(3, "Short code must be at least 3 characters")
    .max(20, "Short code must be at most 20 characters")
    .regex(
      /^[a-zA-Z0-9-_]+$/,
      "Short code can only contain letters, numbers, hyphens, and underscores",
    ),
});

export async function createLinkAction(data: {
  originalUrl: string;
  shortCode?: string;
}) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    const validated = createLinkSchema.parse(data);
    const link = await createLink(
      userId,
      validated.originalUrl,
      validated.shortCode || undefined,
    );

    // Revalidate the dashboard page to show the new link
    revalidatePath("/dashboard");

    return { success: true, data: link };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: "Failed to create link" };
  }
}

export async function updateLinkAction(data: {
  id: number;
  originalUrl: string;
  shortCode: string;
}) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    const validated = updateLinkSchema.parse(data);

    // Verify the link belongs to the user
    const [existingLink] = await db
      .select()
      .from(links)
      .where(and(eq(links.id, validated.id), eq(links.userId, userId)));

    if (!existingLink) {
      return { success: false, error: "Link not found" };
    }

    // Update the link
    try {
      const [updatedLink] = await db
        .update(links)
        .set({
          originalUrl: validated.originalUrl,
          shortCode: validated.shortCode,
          updatedAt: new Date(),
        })
        .where(eq(links.id, validated.id))
        .returning();

      revalidatePath("/dashboard");

      return { success: true, data: updatedLink };
    } catch {
      // If unique constraint violation on shortCode
      return {
        success: false,
        error:
          "This short code is already taken. Please choose a different one.",
      };
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: "Failed to update link" };
  }
}

export async function deleteLinkAction(id: number) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    // Verify the link belongs to the user before deleting
    const [existingLink] = await db
      .select()
      .from(links)
      .where(and(eq(links.id, id), eq(links.userId, userId)));

    if (!existingLink) {
      return { success: false, error: "Link not found" };
    }

    await db.delete(links).where(eq(links.id, id));

    revalidatePath("/dashboard");

    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete link" };
  }
}
