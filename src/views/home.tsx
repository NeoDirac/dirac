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
  MessageCircle,
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
  // The profe's chalkboard — Dirac notation, drawn by hand.
  // Board + clay frame + chalk writing + a piece of chalk and an eraser on the tray.
  const chalk = "#ece5d3";
  return (
    <svg
      viewBox="0 0 420 260"
      className="hidden h-auto w-full max-w-md lg:block"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="board-clip">
          <rect x="10" y="8" width="400" height="226" rx="7" />
        </clipPath>
      </defs>
      {/* clay wooden frame */}
      <rect x="0" y="0" width="420" height="242" rx="10" fill="#a4552e" />
      <rect x="10" y="8" width="400" height="226" rx="7" fill="#292420" />
      {/* faint chalk dust ghosts (older lessons) */}
      <g clipPath="url(#board-clip)" opacity="0.09">
        <text x="48" y="200" fontFamily="Georgia, serif" fontStyle="italic" fontSize="20" fill={chalk}>(x+y)² = x² + 2xy + y²</text>
        <text x="250" y="228" fontFamily="Georgia, serif" fontStyle="italic" fontSize="17" fill={chalk}>v = v₀ + at</text>
        <circle cx="330" cy="52" r="26" fill="none" stroke={chalk} strokeWidth="2" />
      </g>
      {/* the delta spike sketch */}
      <g clipPath="url(#board-clip)">
        <line x1="150" y1="180" x2="150" y2="60" stroke={chalk} strokeWidth="2.4" strokeLinecap="round" transform="rotate(-1 150 120)" />
        <path d="M150,60 l-5,11 h10 z" fill={chalk} transform="rotate(-1 150 120)" />
        {/* x-axis */}
        <line x1="86" y1="181" x2="218" y2="178" stroke={chalk} strokeWidth="1.8" strokeLinecap="round" transform="rotate(-1 150 120)" />
        <path d="M218,178 l-9,-3.5 v7 z" fill={chalk} transform="rotate(-1 150 120)" />
        <text x="224" y="184" fontFamily="Georgia, serif" fontStyle="italic" fontSize="16" fill={chalk}>x</text>
        <text x="140" y="52" fontFamily="Georgia, serif" fontStyle="italic" fontSize="17" fill={chalk}>δ(x−a)</text>
        <text x="141" y="203" fontFamily="Georgia, serif" fontStyle="italic" fontSize="15" fill={chalk}>a</text>
        {/* chalk circle around the spike — the profe's emphasis */}
        <ellipse cx="152" cy="132" rx="52" ry="64" fill="none" stroke={chalk} strokeWidth="1.7" opacity="0.85" transform="rotate(-4 152 132)" />
      </g>
      {/* the signature equation */}
      <text
        x="278"
        y="132"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontStyle="italic"
        fontSize="21"
        fill={chalk}
        transform="rotate(0.6 278 132)"
      >
        ∫ δ(x−a) f(x) dx
      </text>
      <text x="278" y="164" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="21" fill={chalk} transform="rotate(0.6 278 148)">
        = f(a)
      </text>
      {/* bra-ket doodle */}
      <text x="62" y="70" fontFamily="Georgia, serif" fontStyle="italic" fontSize="19" fill={chalk} opacity="0.92" transform="rotate(-2 62 70)">⟨ψ|φ⟩</text>
      {/* chalk tray */}
      <rect x="36" y="242" width="348" height="10" rx="3" fill="#8f4a27" />
      {/* a piece of chalk */}
      <rect x="96" y="238" width="34" height="6" rx="3" fill={chalk} transform="rotate(-2 96 238)" />
      {/* the eraser */}
      <g transform="rotate(1.5 300 240)">
        <rect x="284" y="231" width="42" height="12" rx="2.5" fill="#5c4a3a" />
        <rect x="284" y="231" width="42" height="5" rx="2.5" fill="#3f3129" />
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
      <section className="bg-paper-grain border-b bg-graph-paper">
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            <p className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/75">
              <span className="font-serif text-[16px] italic leading-none text-subject-physics" aria-hidden="true">δ</span>
              {t("home.hero.badge")}
            </p>
            <h1 className="mt-5 font-serif text-[2.55rem] font-semibold leading-[1.12] tracking-tight text-balance sm:text-5xl">
              {t("home.hero.title1")}
              <br />
              <span className="accent-serif text-subject-physics">{t("home.hero.title2")}</span>
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
            <dl className="mt-13 grid max-w-lg grid-cols-3 gap-x-8 gap-y-4 border-t pt-6.5">
              {[
                { value: String(mathCurriculum.length), label: t("home.hero.stat1") },
                { value: String(physicsCurriculum.length), label: t("home.hero.stat2") },
                { value: "∞", label: t("home.hero.stat3") },
              ].map((s, i) => (
                <div key={i} className={cn("min-w-0 border-l border-foreground/15 pl-4", i === 0 && "border-l-0 pl-0")}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-serif text-xl font-semibold leading-none tabular-nums text-foreground/85">{s.value}</dd>
                  <dd className="mt-2 text-xs leading-snug text-muted-foreground">{s.label}</dd>
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
        <p className="rule-label">{t("home.section.subjects")}</p>
        <h2 id="subjects-heading" className="mt-3 font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
          {t("home.subjects.title")}
        </h2>
        <p className="mt-2 text-muted-foreground">{t("home.subjects.subtitle")}</p>
        <div className="mt-7 grid gap-5 md:grid-cols-2">
          <a
            href={href({ name: "subject", subject: "math" })}
            className="group rounded-lg border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:p-8"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-subject-math/20 bg-subject-math/5 text-subject-math">
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
            className="group rounded-lg border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:p-8"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-subject-physics/25 bg-subject-physics/[0.07] text-subject-physics">
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
        <p className="rule-label">{t("home.section.method")}</p>
        <h2 id="how-heading" className="mt-3 font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
          {t("home.how.title")}
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">{t("home.how.desc")}</p>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={i} className="relative rounded-lg border bg-card p-5">
              <div className="flex items-center justify-between">
                <s.icon className="h-5 w-5 text-subject-physics" aria-hidden="true" />
                <span className="font-serif text-3xl font-semibold italic text-border" aria-hidden="true">
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
            alt={`${siteConfig.brandName} — ${siteConfig.tutorName}`}
            width={160}
            height={160}
            className="h-32 w-32 rounded-lg border object-cover sm:h-40 sm:w-40"
          />
          <div>
            <p className="rule-label">{t("home.section.tutor")}</p>
            <h2 id="tutor-heading" className="mt-3 font-serif text-2xl font-semibold tracking-tight">
              {t("home.tutor.title")}
            </h2>
            <p className="mt-1 text-sm font-medium text-primary">{siteConfig.role[lang]}</p>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
              {t("home.tutor.bio1", { tutorName: siteConfig.tutorName })}
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {t("home.tutor.bio2")}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild className="gap-2 font-semibold">
                <a href={`https://wa.me/${siteConfig.whatsapp.number}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  {t("home.tutor.cta")}
                </a>
              </Button>
              <span className="font-mono text-sm tabular-nums text-muted-foreground" aria-label={siteConfig.whatsapp.display}>
                {siteConfig.whatsapp.display}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — ink band, chalk delta watermark */}
      <section className="relative overflow-hidden border-t bg-primary text-primary-foreground" aria-labelledby="cta-heading">
        <span
          className="pointer-events-none absolute -right-2 -top-10 select-none font-serif text-[11rem] italic leading-none text-primary-foreground/[0.07] sm:text-[15rem]"
          aria-hidden="true"
        >
          δ
        </span>
        <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-5 px-4 py-12 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 id="cta-heading" className="font-serif text-2xl font-semibold tracking-tight">
              {t("home.cta.title")}
            </h2>
            <p className="mt-1.5 text-primary-foreground/80">{t("home.cta.desc")}</p>
          </div>
          <Button
            asChild
            size="lg"
            className="shrink-0 gap-2 bg-primary-foreground font-semibold text-primary hover:bg-primary-foreground/90"
          >
            <a href={`https://wa.me/${siteConfig.whatsapp.number}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {t("home.cta.button")}
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
