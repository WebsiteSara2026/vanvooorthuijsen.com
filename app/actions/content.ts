"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { siteContent } from "@/lib/db/schema"
import { content as seedContent, type SiteContent } from "@/lib/content"
import { eq } from "drizzle-orm"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error("Unauthorized")
  return session.user.id
}

// Returns the current content for editing (DB row or seed fallback).
export async function loadContentForAdmin(): Promise<SiteContent> {
  await requireAdmin()
  const rows = await db.select().from(siteContent).where(eq(siteContent.id, 1)).limit(1)
  if (rows.length > 0 && rows[0].data) {
    return rows[0].data as SiteContent
  }
  return seedContent
}

export async function saveContent(data: SiteContent) {
  await requireAdmin()

  const existing = await db.select({ id: siteContent.id }).from(siteContent).where(eq(siteContent.id, 1)).limit(1)

  if (existing.length > 0) {
    await db.update(siteContent).set({ data, updatedAt: new Date() }).where(eq(siteContent.id, 1))
  } else {
    await db.insert(siteContent).values({ id: 1, data, updatedAt: new Date() })
  }

  revalidatePath("/")
  revalidatePath("/admin")
  return { success: true }
}
