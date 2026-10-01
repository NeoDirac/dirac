"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { es as dateEs, enUS as dateEn } from "date-fns/locale";
import {
  ArrowRight,
  Atom,
  BookOpenCheck,
  Calculator,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  History,
  Lightbulb,
  Mail,
  Sigma,
  Target,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/lib/i18n/context";
import { href, sessionHref } from "@/lib/router";
import { computeStats, loadProgress, type OverallStats } from "@/lib/progress";
import { dueReviewEntries, type ReviewEntry } from "@/lib/review";
import { countToday, GOAL_CHOICES, loadDailyGoal, saveDailyGoal } from "@/lib/goal";
import { siteConfig } from "@/config/site";
import { mathCurriculum } from "@/content/curriculum/math";
import { physicsCurriculum } from "@/content/curriculum/physics";
import { cn } from "@/lib/utils";

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
        {/* quiet labels so the figure reads as a real graph, not decoration */}
        <text x="412" y="126" fontSize="13" fill="var(--diagram-muted)" textAnchor="end" fontStyle="italic">t</text>
        <text x="8" y="20" fontSize="13" fill="var(--diagram-muted)" fontStyle="italic">f(t)</text>
        <text x="150" y="26" fontSize="12" fill="var(--diagram-muted)" fontStyle="italic">max.</text>
        <text x="290" y="126" fontSize="12" fill="var(--diagram-muted)" fontStyle="italic">0</text>
      </g>
    </svg>
  );
}

/** Spaced-repetition band — topics whose review date has arrived. */
function ReviewDueCard({ entries }: { entries: ReviewEntry[] }) {
  const { t, lang, formatNumber } = useI18n();
  if (entries.length === 0) return null;

  const top = entries.slice(0, 3);
  const topicFor = (e: ReviewEntry) =>
    (e.subject === "math" ? mathCurriculum : physicsCurriculum).find((tp) => tp.id === e.topicId);
  const primaryHref = sessionHref({
    mode: "topic",
    subjects: [top[0].subject],
    topicId: top[0].topicId,
    difficulty: "any",
    count: 10,
    seed: 0,
  });

  return (
    <section
      aria-labelledby="review-due-heading"
      className="animate-in fade-in slide-in-from-bottom-2 duration-300 border-b border-diff-medium/25 bg-diff-medium/5"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-6 sm:px-6 sm:flex-row sm:items-center">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-diff-medium/15 text-diff-medium">
          <CalendarClock className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 id="review-due-heading" className="text-sm font-semibold uppercase tracking-wider text-diff-medium">
            {t("home.reviewDue.title")}
          </h2>
          <p className="mt-1.5 text-[15px] font-medium leading-snug">
            {entries.length === 1
              ? t("home.reviewDue.one")
              : t("home.reviewDue.many", { n: formatNumber(entries.length) })}
          </p>
          <ul className="mt-2 flex flex-wrap gap-1.5" aria-label={t("home.reviewDue.title")}>
            {top.map((e) => {
              const topic = topicFor(e);
              if (!topic) return null;
              return (
                <li key={`${e.subject}:${e.topicId}`}>
                  <a
                    href={sessionHref({
                      mode: "topic",
                      subjects: [e.subject],
                      topicId: e.topicId,
                      difficulty: "any",
                      count: 10,
                      seed: 0,
                    })}
                    className="inline-flex items-center gap-1.5 rounded-full border border-diff-medium/30 bg-card px-3 py-1 text-xs font-medium text-foreground transition-colors hover:border-diff-medium/60 hover:bg-diff-medium/10"
                  >
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full bg-diff-medium"
                      aria-hidden="true"
                    />
                    {topic.name[lang]}
                  </a>
                </li>
              );
            })}
            {entries.length > 3 ? (
              <li className="inline-flex items-center px-2 py-1 text-xs text-muted-foreground">
                +{formatNumber(entries.length - 3)}
              </li>
            ) : null}
          </ul>
        </div>
        <Button asChild className="shrink-0 gap-2 font-semibold">
          <a href={primaryHref}>
            {t("home.reviewDue.cta")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </Button>
      </div>
    </section>
  );
}

/** Daily-goal band — a progress ring toward today's problem target. */
function TodayGoalCard({
  goal,
  today,
  onGoalChange,
}: {
  goal: number;
  today: number;
  onGoalChange: (n: number) => void;
}) {
  const { t, formatNumber } = useI18n();
  const done = today >= goal;
  const pct = Math.min(today / goal, 1);

  return (
    <section
      aria-labelledby="goal-heading"
      className={cn(
        "animate-in fade-in slide-in-from-bottom-2 duration-300 border-b",
        done ? "border-success/25 bg-success/[0.06]" : "border-primary/20 bg-primary/[0.04]",
      )}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-6 sm:px-6 sm:flex-row sm:items-center">
        <GoalRing done={done} pct={pct} today={today} goal={goal} />
        <div className="min-w-0 flex-1">
          <h2
            id="goal-heading"
            className={cn(
              "text-sm font-semibold uppercase tracking-wider",
              done ? "text-success" : "text-primary",
            )}
          >
            {t("goal.title")}
          </h2>
          <p className="mt-1.5 text-[15px] font-medium leading-snug">
            {t("goal.of", { done: formatNumber(today), total: formatNumber(goal) })}
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              {done
                ? t("goal.done")
                : t("goal.remaining", { n: formatNumber(goal - today) })}
            </span>
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="gap-1 px-2.5 text-xs text-muted-foreground"
                aria-label={t("goal.edit")}
              >
                <Target className="h-3.5 w-3.5" aria-hidden="true" />
                {t("goal.perDay", { n: formatNumber(goal) })}
                <ChevronDown className="h-3 w-3" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuLabel>{t("goal.set")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={String(goal)}
                onValueChange={(v) => onGoalChange(Number(v))}
              >
                {GOAL_CHOICES.map((n) => (
                  <DropdownMenuRadioItem key={n} value={String(n)}>
                    {t("goal.setTo", { n: formatNumber(n) })}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {!done ? (
            <Button asChild className="gap-2 font-semibold">
              <a href={sessionHref({ mode: "mixed", subjects: ["math", "physics"], difficulty: "any", count: 5, seed: 0, easyWeighted: true })}>
                {today === 0 ? t("goal.start") : t("goal.continue")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/** SVG progress ring — animated stroke + count in the center. */
function GoalRing({ done, pct, today, goal }: { done: boolean; pct: number; today: number; goal: number }) {
  const { t, formatNumber } = useI18n();
  const R = 23;
  const C = 2 * Math.PI * R;
  return (
    <svg
      viewBox="0 0 56 56"
      className="h-14 w-14 shrink-0"
      role="img"
      aria-label={`${t("goal.ringLabel")}: ${formatNumber(today)}/${formatNumber(goal)}`}
    >
      <circle cx="28" cy="28" r={R} fill="none" stroke="var(--border)" strokeWidth="6" />
      <circle
        cx="28"
        cy="28"
        r={R}
        fill="none"
        stroke={done ? "var(--success)" : "var(--primary)"}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={C}
        strokeDashoffset={C * (1 - pct)}
        transform="rotate(-90 28 28)"
        style={{ transition: "stroke-dashoffset 700ms cubic-bezier(0.22, 1, 0.36, 1)" }}
      />
      {done ? (
        <g fill="none" stroke="var(--success)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 29l6.5 6.5L37 23.5" />
        </g>
      ) : (
        <text
          x="28"
          y="32.5"
          textAnchor="middle"
          fontSize="16"
          fontWeight="700"
          fill="var(--foreground)"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {today}
        </text>
      )}
    </svg>
  );
}

/** Smart-resume band — the most recently practiced topic, one click away. */
function ContinueCard({ stats }: { stats: OverallStats | null }) {
  const { t, lang, formatNumber } = useI18n();

  const last = (() => {
    if (!stats) return null;
    const entries = Object.values(stats.byTopic).filter((s) => s.attempts > 0 && s.lastTs > 0);
    entries.sort((a, b) => b.lastTs - a.lastTs);
    return entries[0] ?? null;
  })();
  if (!last) return null;

  const curriculum = last.subject === "math" ? mathCurriculum : physicsCurriculum;
  const topic = curriculum.find((tp) => tp.id === last.topicId);
  if (!topic) return null;

  const sessionLink = sessionHref({
    mode: "topic",
    subjects: [last.subject],
    topicId: last.topicId,
    difficulty: "any",
    count: 10,
    seed: 0,
  });

  let ago = "";
  try {
    ago = formatDistanceToNow(new Date(last.lastTs), {
      addSuffix: true,
      locale: lang === "es" ? dateEs : dateEn,
    });
  } catch {
    /* date-fns guard */
  }

  return (
    <section
      aria-labelledby="continue-heading"
      className="animate-in fade-in slide-in-from-bottom-2 duration-300 border-b bg-secondary/40"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-6 sm:px-6 sm:flex-row sm:items-center">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <History className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="flex-1">
          <h2 id="continue-heading" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {t("home.continue.title")}
          </h2>
          <p className="mt-1 text-lg font-medium leading-snug">
            <a
              href={href({ name: "topic", subject: last.subject, topicId: topic.id })}
              className="transition-colors hover:text-primary"
            >
              {topic.name[lang]}
            </a>
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              {last.attempts === 1
                ? t("progress.topic.oneAttempt")
                : t("progress.topic.attempts", { n: formatNumber(last.attempts) })}
              {ago ? ` · ${ago}` : ""}
            </span>
          </p>
        </div>
        <Button asChild className="shrink-0 gap-2 font-semibold">
          <a href={sessionLink}>
            {t("home.continue.cta")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </Button>
      </div>
    </section>
  );
}

export function HomeView() {
  const { t, lang } = useI18n();
  const [stats, setStats] = useState<OverallStats | null>(null);
  const [reviewDue, setReviewDue] = useState<ReviewEntry[]>([]);
  const [goal, setGoal] = useState<number | null>(null);
  const [today, setToday] = useState(0);

  // localStorage is an external system — read async after mount (no hydration
  // mismatch, and the band gracefully disappears when there's no history)
  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) {
        const state = loadProgress();
        setStats(computeStats(state));
        setReviewDue(dueReviewEntries());
        setGoal(loadDailyGoal());
        setToday(countToday(state.records));
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  function handleGoalChange(n: number) {
    saveDailyGoal(n);
    setGoal(n);
  }

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
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {t("home.hero.subtitle")}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 px-7 text-[15px] font-semibold">
                <a href={href({ name: "subject", subject: "math" })}>
                  {t("home.hero.ctaMain")}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 border-foreground/25 bg-card px-7 text-[15px] shadow-sm hover:border-foreground/40 hover:bg-secondary/60">
                <a href={quickHref}>{t("home.hero.ctaQuick")}</a>
              </Button>
            </div>
            <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-3 border-t pt-6">
              {[
                { value: mathCurriculum.length, label: t("home.hero.stat1") },
                { value: physicsCurriculum.length, label: t("home.hero.stat2") },
                { value: "∞", label: t("home.hero.stat3") },
              ].map((s, i) => (
                <div key={i}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-serif text-xl font-semibold leading-none tabular-nums text-foreground/80">{s.value}</dd>
                  <dd className="mt-1.5 text-xs text-muted-foreground">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <HeroCurve />
        </div>
      </section>

      {/* spaced repetition — topics whose review date has arrived */}
      <ReviewDueCard entries={reviewDue} />

      {/* daily goal — progress ring toward today's target */}
      {goal !== null ? (
        <TodayGoalCard goal={goal} today={today} onGoalChange={handleGoalChange} />
      ) : null}

      {/* smart resume — only when there is practice history */}
      <ContinueCard stats={stats} />

      {/* subjects */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6" aria-labelledby="subjects-heading">
        <h2 id="subjects-heading" className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
          {t("home.subjects.title")}
        </h2>
        <p className="mt-2 text-muted-foreground">{t("home.subjects.subtitle")}</p>
        <div className="mt-7 grid gap-5 md:grid-cols-2">
          <a
            href={href({ name: "subject", subject: "math" })}
            className="group rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:p-8"
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
            className="group rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:p-8"
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
