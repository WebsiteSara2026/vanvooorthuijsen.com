import "server-only"
import { db } from "@/lib/db"
import { siteContent } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { content as seedContent, type SiteContent } from "@/lib/content"

// Reads the single site-content row. Falls back to the bundled seed content
// if the row doesn't exist yet (e.g. before the first save).
export async function getSiteContent(): Promise<SiteContent> {
  try {
    const rows = await db.select().from(siteContent).where(eq(siteContent.id, 1)).limit(1)
    if (rows.length > 0 && rows[0].data) {
      return rows[0].data as SiteContent
    }
  } catch (err) {
    console.log("[v0] getSiteContent failed, using seed:", (err as Error).message)
  }
  return seedContent
}
