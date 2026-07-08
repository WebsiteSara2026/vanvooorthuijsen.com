"use server"

import { db } from "@/lib/db"
import { contactMessage } from "@/lib/db/schema"

const NOTIFY_TO = "info@vanvoorthuijsen.com"
// Resend's shared onboarding sender works without domain verification.
// Switch to an address on your verified domain (e.g. website@vanvoorthuijsen.com) once set up.
const FROM = "Van Voorthuijsen Website <onboarding@resend.dev>"

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function submitContactMessage(_prevState: unknown, formData: FormData) {
  const name = String(formData.get("name") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const message = String(formData.get("message") ?? "").trim()
  // Honeypot: bots fill hidden fields, humans don't.
  const trap = String(formData.get("company") ?? "").trim()

  if (trap) return { ok: true as const } // silently drop spam
  if (!name || !email || !message) {
    return { ok: false as const, error: "missing" }
  }
  if (!isValidEmail(email)) {
    return { ok: false as const, error: "email" }
  }
  if (message.length > 5000) {
    return { ok: false as const, error: "long" }
  }

  // Attempt email delivery (only if a Resend key is configured).
  let emailStatus: "sent" | "failed" | "skipped" = "skipped"
  const apiKey = process.env.RESEND_API_KEY
  if (apiKey) {
    try {
      const { Resend } = await import("resend")
      const resend = new Resend(apiKey)
      const { error } = await resend.emails.send({
        from: FROM,
        to: NOTIFY_TO,
        replyTo: email,
        subject: `New message from ${name} — vanvoorthuijsen.com`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      })
      emailStatus = error ? "failed" : "sent"
      if (error) console.log("[v0] Resend error:", error)
    } catch (err) {
      emailStatus = "failed"
      console.log("[v0] Resend threw:", err)
    }
  }

  // Always persist to the database as the source of truth / backup.
  try {
    await db.insert(contactMessage).values({ name, email, message, emailStatus })
  } catch (err) {
    console.log("[v0] Failed to save message:", err)
    return { ok: false as const, error: "server" }
  }

  return { ok: true as const }
}
