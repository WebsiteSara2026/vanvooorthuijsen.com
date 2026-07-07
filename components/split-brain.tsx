"use client"

import { useState } from "react"
import Image from "next/image"
import { content, type Lang, type SideKey } from "@/lib/content"
import { cn } from "@/lib/utils"

type Selection = SideKey | "both"

export function SplitBrain() {
  const [lang, setLang] = useState<Lang>("en")
  const [hovered, setHovered] = useState<SideKey | null>(null)
  const [selected, setSelected] = useState<Selection>("analytical")
  const t = content[lang]

  const activeVisual = hovered ?? (selected === "both" ? null : selected)

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a href="#top" className="font-serif text-lg font-semibold tracking-tight">
          Home
        </a>
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline"
          >
            {t.nav.contact}
          </a>
          <div className="flex items-center rounded-full border border-border p-0.5 text-xs font-medium">
            {(["en", "nl"] as Lang[]).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={cn(
                  "rounded-full px-3 py-1 uppercase tracking-wide transition-colors",
                  lang === l ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
                )}
                aria-pressed={lang === l}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="mx-auto max-w-6xl px-6 pb-8 pt-6 md:pt-10">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">{t.hero.kicker}</p>
        <h1 className="mt-4 max-w-3xl text-balance font-serif text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
          {t.hero.title}
        </h1>
        <p className="mt-5 font-serif text-2xl font-medium italic tracking-tight text-creative md:text-3xl">
          {t.hero.tagline}
        </p>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">{t.hero.intro}</p>
      </section>

      {/* Interactive brain */}
      <section className="mx-auto max-w-6xl px-6 pb-6">
        <p className="mb-4 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
          {t.hero.prompt}
        </p>
        <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-border bg-card">
          {(["analytical", "creative"] as SideKey[]).map((side) => {
            const isActive = activeVisual === side
            const isDimmed = activeVisual !== null && activeVisual !== side
            const isAnalytical = side === "analytical"
            return (
              <button
                key={side}
                type="button"
                onMouseEnter={() => setHovered(side)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(side)}
                onBlur={() => setHovered(null)}
                onClick={() => setSelected(side)}
                aria-pressed={selected === side}
                className={cn(
                  "group relative aspect-[4/5] cursor-pointer overflow-hidden outline-none transition-all duration-500 sm:aspect-[16/10]",
                  isAnalytical ? "border-r border-border" : "",
                )}
              >
                <Image
                  src={isAnalytical ? "/brain-analytical.png" : "/brain-creative.png"}
                  alt={isAnalytical ? "Analytical left brain hemisphere illustration" : "Creative right brain hemisphere illustration"}
                  fill
                  priority
                  className={cn(
                    "object-cover transition-all duration-500",
                    isDimmed ? "scale-100 opacity-40 grayscale" : "opacity-100 grayscale-0",
                    isActive ? "scale-105" : "scale-100",
                  )}
                  sizes="(max-width: 768px) 50vw, 500px"
                />
                <div
                  className={cn(
                    "absolute inset-0 transition-opacity duration-500",
                    isActive
                      ? "opacity-100"
                      : "opacity-0",
                    isAnalytical
                      ? "bg-gradient-to-t from-analytical/25 to-transparent"
                      : "bg-gradient-to-t from-creative/25 to-transparent",
                  )}
                />
                <div
                  className={cn(
                    "absolute bottom-0 left-0 right-0 p-5 text-left transition-transform duration-500 md:p-7",
                    isAnalytical ? "text-analytical" : "text-creative",
                  )}
                >
                  <span
                    className={cn(
                      "inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest text-background",
                      isAnalytical ? "bg-analytical" : "bg-creative",
                    )}
                  >
                    {t.sides[side].eyebrow}
                  </span>
                  <p className="mt-3 font-serif text-2xl font-semibold text-foreground md:text-3xl">
                    {t.sides[side].label}
                  </p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Selector row */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {(["analytical", "creative", "both"] as Selection[]).map((key) => {
            const label =
              key === "both" ? t.nav.both : key === "analytical" ? t.sides.analytical.label : t.sides.creative.label
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelected(key)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  selected === key
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
                )}
              >
                {label}
              </button>
            )
          })}
        </div>
      </section>

      {/* Services for the selected side(s) */}
      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {(selected === "both" ? (["analytical", "creative"] as SideKey[]) : [selected]).map((side) => {
            const s = t.sides[side]
            const isAnalytical = side === "analytical"
            return (
              <div
                key={side}
                className={cn(
                  "rounded-3xl border p-7 md:p-9",
                  selected === "both" ? "" : "md:col-span-2",
                  isAnalytical ? "border-analytical/25 bg-analytical/5" : "border-creative/25 bg-creative/5",
                )}
              >
                <span
                  className={cn(
                    "text-xs font-semibold uppercase tracking-widest",
                    isAnalytical ? "text-analytical" : "text-creative",
                  )}
                >
                  {s.eyebrow}
                </span>
                <h2 className="mt-3 text-balance font-serif text-3xl font-semibold leading-tight md:text-4xl">
                  {s.headline}
                </h2>
                <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted-foreground">{s.tagline}</p>

                <ul className="mt-7 grid gap-5 sm:grid-cols-2">
                  {s.services.map((item) => (
                    <li key={item.title} className="rounded-2xl border border-border bg-card p-5">
                      <p className="font-medium">{item.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                    </li>
                  ))}
                </ul>

                <p
                  className={cn(
                    "mt-6 font-serif text-lg italic",
                    isAnalytical ? "text-analytical" : "text-creative",
                  )}
                >
                  {s.hireLine}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Both */}
      <section className="border-y border-border bg-secondary/50">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-[1fr_1.2fr] md:py-24">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {t.both.eyebrow}
            </span>
            <div className="mt-4 flex gap-2">
              <span className="h-3 w-3 rounded-full bg-analytical" />
              <span className="h-3 w-3 rounded-full bg-creative" />
            </div>
          </div>
          <div>
            <h2 className="text-balance font-serif text-3xl font-semibold leading-tight md:text-5xl">
              {t.both.title}
            </h2>
            <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">{t.both.body}</p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-center md:gap-16">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {t.about.eyebrow}
            </span>
            <p className="mt-3 font-serif text-7xl font-semibold tracking-tight md:text-8xl">{t.about.stat}</p>
            <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-muted-foreground">{t.about.statLabel}</p>
          </div>
          <p className="text-balance font-serif text-2xl font-medium leading-snug md:text-4xl">{t.about.body}</p>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="border-t border-border bg-foreground text-background">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center md:py-28">
          <h2 className="text-balance font-serif text-4xl font-semibold leading-tight md:text-6xl">{t.cta.title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed opacity-80">{t.cta.body}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={`mailto:${t.cta.email}`}
              className="rounded-full bg-background px-7 py-3 text-sm font-semibold text-foreground transition-opacity hover:opacity-90"
            >
              {t.cta.button}
            </a>
            <a href={`mailto:${t.cta.email}`} className="text-sm underline underline-offset-4 opacity-80 hover:opacity-100">
              {t.cta.email}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <span className="font-serif text-base font-semibold text-foreground">van voorthuijsen</span>
          <span className="text-xs uppercase tracking-widest text-creative">{t.hero.tagline}</span>
        </div>
        <span>
          © {new Date().getFullYear()} {t.footer.rights}
        </span>
      </footer>
    </main>
  )
}
