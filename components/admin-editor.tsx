"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { saveContent } from "@/app/actions/content"
import { ChangePassword } from "@/components/change-password"
import type { Lang, SideKey, SiteContent } from "@/lib/content"
import { cn } from "@/lib/utils"

const SIDE_KEYS: SideKey[] = ["analytical", "creative"]

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
        />
      )}
    </label>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <h3 className="mb-4 font-serif text-lg font-semibold text-foreground">{title}</h3>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  )
}

export function AdminEditor({ initial }: { initial: SiteContent }) {
  const router = useRouter()
  const [data, setData] = useState<SiteContent>(initial)
  const [lang, setLang] = useState<Lang>("en")
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  const t = data[lang]

  // Immutable update helper scoped to the active language.
  function update(mutator: (draft: SiteContent[Lang]) => void) {
    setData((prev) => {
      const next = structuredClone(prev)
      mutator(next[lang])
      return next
    })
  }

  async function onSave() {
    setSaving(true)
    setStatus(null)
    try {
      await saveContent(data)
      setStatus("Saved. Your website is updated.")
    } catch (err) {
      setStatus((err as Error).message || "Something went wrong.")
    } finally {
      setSaving(false)
    }
  }

  async function onSignOut() {
    await authClient.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg font-semibold">Content admin</span>
            <div className="flex rounded-full border border-border p-0.5">
              {(["en", "nl"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold uppercase transition-colors",
                    lang === l ? "bg-creative text-creative-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-accent"
            >
              View site
            </a>
            <button
              onClick={onSave}
              disabled={saving}
              className="rounded-full bg-creative px-5 py-2 text-xs font-semibold text-creative-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
            <button
              onClick={onSignOut}
              className="rounded-full px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              Sign out
            </button>
          </div>
        </div>
        {status ? (
          <div className="mx-auto max-w-4xl px-4 pb-3">
            <p className="text-sm text-creative">{status}</p>
          </div>
        ) : null}
      </header>

      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-8">
        <p className="text-sm text-muted-foreground">
          Editing the <strong className="text-foreground">{lang === "en" ? "English" : "Dutch"}</strong> version. Switch
          languages with the toggle above. Remember to save.
        </p>

        <Section title="Navigation">
          <Field label="Both halves label" value={t.nav.both} onChange={(v) => update((d) => (d.nav.both = v))} />
          <Field label="Contact label" value={t.nav.contact} onChange={(v) => update((d) => (d.nav.contact = v))} />
        </Section>

        <Section title="Hero">
          <Field label="Kicker (name)" value={t.hero.kicker} onChange={(v) => update((d) => (d.hero.kicker = v))} />
          <Field label="Tagline" value={t.hero.tagline} onChange={(v) => update((d) => (d.hero.tagline = v))} />
          <Field label="Title" value={t.hero.title} onChange={(v) => update((d) => (d.hero.title = v))} />
          <Field
            label="Accent word — creative"
            value={t.hero.titleAccentCreative}
            onChange={(v) => update((d) => (d.hero.titleAccentCreative = v))}
          />
          <Field
            label="Accent word — analytical"
            value={t.hero.titleAccentAnalytical}
            onChange={(v) => update((d) => (d.hero.titleAccentAnalytical = v))}
          />
          <Field label="Intro" value={t.hero.intro} multiline onChange={(v) => update((d) => (d.hero.intro = v))} />
          <Field label="Prompt" value={t.hero.prompt} onChange={(v) => update((d) => (d.hero.prompt = v))} />
        </Section>

        {SIDE_KEYS.map((side) => (
          <Section key={side} title={side === "analytical" ? "Analytical side (left brain)" : "Creative side (right brain)"}>
            <Field label="Eyebrow" value={t.sides[side].eyebrow} onChange={(v) => update((d) => (d.sides[side].eyebrow = v))} />
            <Field label="Label" value={t.sides[side].label} onChange={(v) => update((d) => (d.sides[side].label = v))} />
            <Field
              label="Headline"
              value={t.sides[side].headline}
              onChange={(v) => update((d) => (d.sides[side].headline = v))}
            />
            <Field
              label="Tagline"
              value={t.sides[side].tagline}
              multiline
              onChange={(v) => update((d) => (d.sides[side].tagline = v))}
            />
            <div className="flex flex-col gap-4 rounded-xl border border-dashed border-border p-4">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Services</span>
              {t.sides[side].services.map((svc, i) => (
                <div key={i} className="flex flex-col gap-3 border-l-2 border-border pl-3">
                  <Field
                    label={`Service ${i + 1} title`}
                    value={svc.title}
                    onChange={(v) => update((d) => (d.sides[side].services[i].title = v))}
                  />
                  <Field
                    label={`Service ${i + 1} body`}
                    value={svc.body}
                    multiline
                    onChange={(v) => update((d) => (d.sides[side].services[i].body = v))}
                  />
                </div>
              ))}
            </div>
            <Field
              label="Hire line"
              value={t.sides[side].hireLine}
              onChange={(v) => update((d) => (d.sides[side].hireLine = v))}
            />
          </Section>
        ))}

        <Section title="Both halves">
          <Field label="Eyebrow" value={t.both.eyebrow} onChange={(v) => update((d) => (d.both.eyebrow = v))} />
          <Field label="Title" value={t.both.title} onChange={(v) => update((d) => (d.both.title = v))} />
          <Field label="Body" value={t.both.body} multiline onChange={(v) => update((d) => (d.both.body = v))} />
        </Section>

        <Section title="About">
          <Field label="Eyebrow" value={t.about.eyebrow} onChange={(v) => update((d) => (d.about.eyebrow = v))} />
          <Field label="Stat" value={t.about.stat} onChange={(v) => update((d) => (d.about.stat = v))} />
          <Field label="Stat label" value={t.about.statLabel} onChange={(v) => update((d) => (d.about.statLabel = v))} />
          <Field label="Body" value={t.about.body} multiline onChange={(v) => update((d) => (d.about.body = v))} />
        </Section>

        <Section title="Contact">
          <Field label="Title" value={t.cta.title} onChange={(v) => update((d) => (d.cta.title = v))} />
          <Field label="Body" value={t.cta.body} multiline onChange={(v) => update((d) => (d.cta.body = v))} />
          <Field label="Button label" value={t.cta.button} onChange={(v) => update((d) => (d.cta.button = v))} />
          <Field label="Email" value={t.cta.email} onChange={(v) => update((d) => (d.cta.email = v))} />
        </Section>

        <Section title="Footer">
          <Field label="Rights text" value={t.footer.rights} onChange={(v) => update((d) => (d.footer.rights = v))} />
        </Section>

        <ChangePassword />

        <div className="flex justify-end pb-12">
          <button
            onClick={onSave}
            disabled={saving}
            className="rounded-full bg-creative px-6 py-3 text-sm font-semibold text-creative-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>
    </main>
  )
}
