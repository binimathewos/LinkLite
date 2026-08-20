import { pgTable, text, varchar, timestamp, integer, index, uniqueIndex } from 'drizzle-orm/pg-core';

/**
 * Shortened links schema
 * 
 * Design decisions:
 * - Single table approach: stores original URLs with their short codes
 * - No click/analytics tracking: schema focused on link metadata only
 * - Globally unique short codes: simplifies redirect logic and enables link sharing
 * - userId as string: Clerk user ID (external system, not a foreign key)
 * - Auto-incrementing identity column (SQL standard)
 * - Automatic timestamps: createdAt and updatedAt default to now
 * - updatedAt must be manually set during updates (application-level)
 */

export const links = pgTable(
  'links',
  {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    userId: text('user_id').notNull(),
    originalUrl: text('original_url').notNull(),
    shortCode: varchar('short_code', { length: 12 }).notNull().unique(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    // Index for fast lookups by user (listing their links)
    index('idx_links_user_id').on(table.userId),
    // Index for fast redirects by short code
    uniqueIndex('idx_links_short_code').on(table.shortCode),
  ],
);
