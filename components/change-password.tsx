"use client"

import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

export function ChangePassword() {
  const [current, setCurrent] = useState("")
  const [next, setNext] = useState("")
  const [confirm, setConfirm] = useState("")
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<{ type: "ok" | "error"; msg: string } | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus(null)

    if (next.length < 8) {
      setStatus({ type: "error", msg: "New password must be at least 8 characters." })
      return
    }
    if (next !== confirm) {
      setStatus({ type: "error", msg: "New password and confirmation do not match." })
      return
    }

    setSaving(true)
    const { error } = await authClient.changePassword({
      currentPassword: current,
      newPassword: next,
      revokeOtherSessions: true,
    })
    setSaving(false)

    if (error) {
      setStatus({ type: "error", msg: error.message || "Could not change password. Check your current password." })
      return
    }

    setStatus({ type: "ok", msg: "Password changed. Use it next time you sign in." })
    setCurrent("")
    setNext("")
    setConfirm("")
  }

  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <h3 className="mb-1 font-serif text-lg font-semibold text-foreground">Change password</h3>
      <p className="mb-4 text-sm text-muted-foreground">
        Update your admin login password. You&apos;ll need your current password to confirm.
      </p>
      <form onSubmit={onSubmit} className="flex max-w-md flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Current password</span>
          <input
            type="password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            autoComplete="current-password"
            required
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">New password</span>
          <input
            type="password"
            value={next}
            onChange={(e) => setNext(e.target.value)}
            autoComplete="new-password"
            required
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Confirm new password</span>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            autoComplete="new-password"
            required
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
          />
        </label>
        {status ? (
          <p className={cn("text-sm", status.type === "ok" ? "text-creative" : "text-destructive")}>{status.msg}</p>
        ) : null}
        <div>
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {saving ? "Updating..." : "Update password"}
          </button>
        </div>
      </form>
    </section>
  )
}
