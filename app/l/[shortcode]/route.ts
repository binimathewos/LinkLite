import { db } from "@/db";
import { links } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /l/[shortcode]
 * Redirect handler for shortened links
 * 
 * Looks up the short code in the database and redirects to the original URL.
 * Returns 404 if the short code doesn't exist.
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ shortcode: string }> }
) {
  const { shortcode } = await context.params;

  // Query the database for the link with the given short code
  const result = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, shortcode))
    .limit(1);

  // If no link found, return 404
  if (result.length === 0) {
    return new NextResponse("Link not found", { status: 404 });
  }

  const link = result[0];

  // Redirect to the original URL with a 307 (Temporary Redirect)
  // Using 307 preserves the original HTTP method
  return NextResponse.redirect(link.originalUrl, { status: 307 });
}
