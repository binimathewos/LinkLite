import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { links } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

/**
 * Generate a random short code for a link
 * Uses alphanumeric characters (a-z, A-Z, 0-9)
 */
function generateShortCode(length: number = 6): string {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Get all links for the currently authenticated user
 * Ordered by most recently created first
 */
export async function getUserLinks() {
  const { userId } = await auth();

  if (!userId) {
    return [];
  }

  const userLinks = await db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.createdAt));

  return userLinks;
}

/**
 * Create a new shortened link for a user
 * Generates a unique short code and inserts the link into the database
 * @param customShortCode - Optional custom short code provided by the user
 */
export async function createLink(
  userId: string,
  originalUrl: string,
  customShortCode?: string,
) {
  // Use custom short code if provided, otherwise generate one
  let shortCode = customShortCode || generateShortCode();
  let attempts = 0;
  const maxAttempts = 5;

  while (attempts < maxAttempts) {
    try {
      const [newLink] = await db
        .insert(links)
        .values({
          userId,
          originalUrl,
          shortCode,
        })
        .returning();

      return newLink;
    } catch {
      // If unique constraint violation, handle based on whether it was custom or generated
      if (customShortCode) {
        throw new Error(
          "This short code is already taken. Please choose a different one.",
        );
      }
      // If auto-generated, try a new code
      attempts++;
      if (attempts >= maxAttempts) {
        throw new Error("Failed to generate unique short code");
      }
      shortCode = generateShortCode();
    }
  }

  throw new Error("Failed to create link");
}
