"use client";

import Image from "next/image";
import {
  ArrowRight,
  Atom,
  BookOpenCheck,
  Calculator,
  CheckCircle2,
  Lightbulb,
  Mail,
  CalendarClock,
  Sigma,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/context";
import { href, sessionHref } from "@/lib/router";
import { siteConfig } from "@/config/site";
import { mathCurriculum } from "@/content/curriculum/math";
import { physicsCurriculum } from "@/content/curriculum/physics";

function HeroCurve() {
  // subtle decorative curve — sine + grid, restrained
  return (
    <svg
      viewBox="0 0 420 220"
      className="hidden h-auto w-full max-w-sm lg:block"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="hero-clip">
          <rect x="0" y="0" width="420" height="220" rx="14" />
        </clipPath>
      </defs>
      <g clipPath="url(#hero-clip)">
        <rect width="420" height="220" fill="var(--card)" />
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`v${i}`} x1={42 * i} y1="0" x2={42 * i} y2="220" stroke="var(--diagram-grid)" strokeWidth="1" />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={44 * i} x2="420" y2={44 * i} stroke="var(--diagram-grid)" strokeWidth="1" />
        ))}
        <line x1="0" y1="110" x2="420" y2="110" stroke="var(--diagram-axis)" strokeWidth="1.4" />
        <line x1="0" y1="176" x2="420" y2="44" stroke="var(--diagram-secondary)" strokeWidth="2" strokeDasharray="6 5" />
        <path
          d="M0,110 C60,110 80,30 140,30 C200,30 220,110 280,110 C340,110 360,190 420,190"
          fill="none"
          stroke="var(--diagram-primary)"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <circle cx="140" cy="30" r="4" fill="var(--diagram-primary)" />
        <circle cx="280" cy="110" r="4" fill="var(--diagram-primary)" />
      </g>
    </svg>
  );
}

export function HomeView() {
  const { t, lang } = useI18n();

  const quickHref = sessionHref({
    mode: "mixed",
    subjects: ["math", "physics"],
    difficulty: "any",
    count: 5,
    seed: 0,
    easyWeighted: true,
  });

  const steps = [
    { icon: BookOpenCheck, title: t("home.how.step1.title"), desc: t("home.how.step1.desc") },
    { icon: CheckCircle2, title: t("home.how.step2.title"), desc: t("home.how.step2.desc") },
    { icon: Lightbulb, title: t("home.how.step3.title"), desc: t("home.how.step3.desc") },
    { icon: Sigma, title: t("home.how.step4.title"), desc: t("home.how.step4.desc") },
  ];

  return (
    <div>
      {/* hero */}
      <section className="border-b bg-graph-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
              {t("home.hero.badge")}
            </p>
            <h1 className="mt-5 font-serif text-4xl font-semibold leading-[1.15] tracking-tight text-balance sm:text-5xl">
              {t("home.hero.title1")}
              <br />
              <span className="text-primary">{t("home.hero.title2")}</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {t("home.hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 px-7 text-[15px] font-semibold">
                <a href={href({ name: "subject", subject: "math" })}>
                  {t("home.hero.ctaMain")}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-7 text-[15px]">
                <a href={quickHref}>{t("home.hero.ctaQuick")}</a>
              </Button>
            </div>
            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-3">
              {[
                { value: mathCurriculum.length, label: t("home.hero.stat1") },
                { value: physicsCurriculum.length, label: t("home.hero.stat2") },
                { value: "∞", label: t("home.hero.stat3") },
              ].map((s, i) => (
                <div key={i}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-serif text-2xl font-semibold text-primary">{s.value}</dd>
                  <dd className="text-xs text-muted-foreground">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <HeroCurve />
        </div>
      </section>

      {/* subjects */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6" aria-labelledby="subjects-heading">
        <h2 id="subjects-heading" className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
          {t("home.subjects.title")}
        </h2>
        <p className="mt-2 text-muted-foreground">{t("home.subjects.subtitle")}</p>
        <div className="mt-7 grid gap-5 md:grid-cols-2">
          <a
            href={href({ name: "subject", subject: "math" })}
            className="group rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:p-8"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-subject-math/10 text-subject-math">
              <Calculator className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-serif text-2xl font-semibold">{t("subject.math.title")}</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">{t("home.subjects.mathDesc")}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-subject-math">
              {t("home.subjects.explore")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </a>
          <a
            href={href({ name: "subject", subject: "physics" })}
            className="group rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:p-8"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-subject-physics/10 text-subject-physics">
              <Atom className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-serif text-2xl font-semibold">{t("subject.physics.title")}</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">{t("home.subjects.physicsDesc")}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-subject-physics">
              {t("home.subjects.explore")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </a>
        </div>
      </section>

      {/* quick practice */}
      <section className="border-y bg-card/60" aria-labelledby="quick-heading">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-10 sm:px-6 sm:flex-row sm:items-center">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Zap className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="flex-1">
            <h2 id="quick-heading" className="text-lg font-semibold">
              {t("home.quick.title")}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t("home.quick.desc")}</p>
          </div>
          <Button asChild className="shrink-0 font-semibold">
            <a href={quickHref}>
              {t("home.quick.start")}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </section>

      {/* how it works */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6" aria-labelledby="how-heading">
        <h2 id="how-heading" className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
          {t("home.how.title")}
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">{t("home.how.desc")}</p>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={i} className="rounded-2xl border bg-card p-5">
              <div className="flex items-center justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <s.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-serif text-3xl font-semibold text-border" aria-hidden="true">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-4 font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* tutor */}
      <section className="border-t bg-card/60" aria-labelledby="tutor-heading">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[auto_1fr] lg:items-center">
          <Image
            src={siteConfig.photo}
            alt={`${siteConfig.tutorName}`}
            width={160}
            height={160}
            className="h-32 w-32 rounded-2xl border object-cover sm:h-40 sm:w-40"
          />
          <div>
            <h2 id="tutor-heading" className="font-serif text-2xl font-semibold tracking-tight">
              {t("home.tutor.title")}
            </h2>
            <p className="mt-1 text-sm font-medium text-primary">{siteConfig.role[lang]}</p>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
              {t("home.tutor.bio1", { tutorName: siteConfig.tutorName })}
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {t("home.tutor.bio2")}
            </p>
            <Button asChild className="mt-6 font-semibold">
              <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
                <CalendarClock className="mr-2 h-4 w-4" aria-hidden="true" />
                {t("home.tutor.cta")}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-primary text-primary-foreground" aria-labelledby="cta-heading">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-5 px-4 py-12 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 id="cta-heading" className="font-serif text-2xl font-semibold tracking-tight">
              {t("home.cta.title")}
            </h2>
            <p className="mt-1.5 text-primary-foreground/80">{t("home.cta.desc")}</p>
          </div>
          <Button
            asChild
            size="lg"
            className="shrink-0 bg-primary-foreground font-semibold text-primary hover:bg-primary-foreground/90"
          >
            <a href={`mailto:${siteConfig.email}`}>
              <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
              {t("home.cta.button")}
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
