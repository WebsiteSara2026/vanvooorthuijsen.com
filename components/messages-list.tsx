"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { markMessageRead, deleteMessage } from "@/app/actions/messages"

type Message = {
  id: number
  name: string
  email: string
  message: string
  emailStatus: string
  read: boolean
  createdAt: Date | string
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    sent: "bg-analytical/15 text-analytical",
    failed: "bg-creative/15 text-creative",
    skipped: "bg-muted text-muted-foreground",
    pending: "bg-muted text-muted-foreground",
  }
  const text: Record<string, string> = {
    sent: "Emailed",
    failed: "Email failed",
    skipped: "Saved only",
    pending: "Pending",
  }
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${map[status] ?? map.skipped}`}>
      {text[status] ?? status}
    </span>
  )
}

export function MessagesList({ initial }: { initial: Message[] }) {
  const [messages, setMessages] = useState(initial)
  const [isPending, startTransition] = useTransition()

  function toggleRead(id: number, read: boolean) {
    setMessages((m) => m.map((msg) => (msg.id === id ? { ...msg, read } : msg)))
    startTransition(() => markMessageRead(id, read))
  }

  function remove(id: number) {
    setMessages((m) => m.filter((msg) => msg.id !== id))
    startTransition(() => deleteMessage(id))
  }

  const unread = messages.filter((m) => !m.read).length

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold tracking-tight">Messages</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {messages.length} total{unread > 0 ? ` · ${unread} unread` : ""}
          </p>
        </div>
        <Link
          href="/admin"
          className="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-foreground"
        >
          Back to editor
        </Link>
      </div>

      {messages.length === 0 ? (
        <p className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
          No messages yet.
        </p>
      ) : (
        <ul className="flex flex-col gap-4">
          {messages.map((msg) => (
            <li
              key={msg.id}
              className={`rounded-2xl border p-5 transition-colors ${
                msg.read ? "border-border bg-card" : "border-foreground/20 bg-secondary/60"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{msg.name}</span>
                  <StatusBadge status={msg.emailStatus} />
                  {!msg.read && <span className="h-2 w-2 rounded-full bg-creative" aria-label="Unread" />}
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
              </div>
              <a
                href={`mailto:${msg.email}`}
                className="mt-1 inline-block text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground"
              >
                {msg.email}
              </a>
              <p className="mt-3 whitespace-pre-wrap text-pretty leading-relaxed">{msg.message}</p>
              <div className="mt-4 flex gap-4 text-sm">
                <button
                  type="button"
                  onClick={() => toggleRead(msg.id, !msg.read)}
                  disabled={isPending}
                  className="font-medium text-muted-foreground hover:text-foreground"
                >
                  {msg.read ? "Mark as unread" : "Mark as read"}
                </button>
                <button
                  type="button"
                  onClick={() => remove(msg.id)}
                  disabled={isPending}
                  className="font-medium text-creative hover:opacity-80"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
