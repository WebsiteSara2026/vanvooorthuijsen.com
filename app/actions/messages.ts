"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { contactMessage } from "@/lib/db/schema"
import { desc, eq } from "drizzle-orm"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error("Unauthorized")
}

export async function loadMessages() {
  await requireAdmin()
  return db.select().from(contactMessage).orderBy(desc(contactMessage.createdAt))
}

export async function markMessageRead(id: number, read: boolean) {
  await requireAdmin()
  await db.update(contactMessage).set({ read }).where(eq(contactMessage.id, id))
  revalidatePath("/admin/messages")
  return { success: true }
}

export async function deleteMessage(id: number) {
  await requireAdmin()
  await db.delete(contactMessage).where(eq(contactMessage.id, id))
  revalidatePath("/admin/messages")
  return { success: true }
}
