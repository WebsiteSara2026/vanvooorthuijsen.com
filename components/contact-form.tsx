"use client"

import { useActionState, useEffect, useRef } from "react"
import { useFormStatus } from "react-dom"
import { submitContactMessage } from "@/app/actions/contact"
import type { Lang } from "@/lib/content"

const labels: Record<Lang, Record<string, string>> = {
  en: {
    name: "Your name",
    email: "Your email",
    message: "Your message",
    send: "Send message",
    sending: "Sending…",
    success: "Thanks — your message has been sent. I'll get back to you soon.",
    errMissing: "Please fill in all fields.",
    errEmail: "Please enter a valid email address.",
    errServer: "Something went wrong. Please try again or email me directly.",
  },
  nl: {
    name: "Je naam",
    email: "Je e-mailadres",
    message: "Je bericht",
    send: "Verstuur bericht",
    sending: "Versturen…",
    success: "Bedankt — je bericht is verstuurd. Ik neem snel contact op.",
    errMissing: "Vul alle velden in.",
    errEmail: "Voer een geldig e-mailadres in.",
    errServer: "Er ging iets mis. Probeer het opnieuw of mail me direct.",
  },
}

function SubmitButton({ lang }: { lang: Lang }) {
  const { pending } = useFormStatus()
  const l = labels[lang]
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-background px-7 py-3 text-sm font-semibold text-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
    >
      {pending ? l.sending : l.send}
    </button>
  )
}

export function ContactForm({ lang }: { lang: Lang }) {
  const l = labels[lang]
  const [state, formAction] = useActionState(submitContactMessage, null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state?.ok) formRef.current?.reset()
  }, [state])

  const errorText =
    state && !state.ok
      ? state.error === "email"
        ? l.errEmail
        : state.error === "missing"
          ? l.errMissing
          : l.errServer
      : null

  return (
    <form ref={formRef} action={formAction} className="mx-auto mt-10 max-w-xl text-left">
      {/* Honeypot field, hidden from humans */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium opacity-80">
            {l.name}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-xl border border-background/30 bg-background/10 px-4 py-3 text-background placeholder:text-background/50 outline-none focus:border-background/70"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium opacity-80">
            {l.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-background/30 bg-background/10 px-4 py-3 text-background placeholder:text-background/50 outline-none focus:border-background/70"
          />
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium opacity-80">
          {l.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full resize-y rounded-xl border border-background/30 bg-background/10 px-4 py-3 text-background placeholder:text-background/50 outline-none focus:border-background/70"
        />
      </div>

      <div className="mt-6 flex flex-col items-start gap-3">
        <SubmitButton lang={lang} />
        {state?.ok && (
          <p role="status" className="text-sm font-medium text-creative">
            {l.success}
          </p>
        )}
        {errorText && (
          <p role="alert" className="text-sm font-medium text-creative">
            {errorText}
          </p>
        )}
      </div>
    </form>
  )
}
