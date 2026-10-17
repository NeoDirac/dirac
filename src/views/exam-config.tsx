"use client";

/**
 * ExamConfigView — the EXAM MODE setup page (#/exam).
 *
 * Pick a tutor-defined profile (e.g. Pedro's 1er parcial), choose which temas
 * go in, pick a version (A = the hardest problem of each tema, B = the second
 * hardest…), see the exact resulting deck as a live preview, and start.
 */

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock,
  GraduationCap,
  ListChecks,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useI18n } from "@/lib/i18n/context";
import { useAllTemplates } from "@/lib/use-templates";
import { examProfiles } from "@/content/exams/profiles";
import {
  buildExamDeck,
  examRankLabel,
  rankExamPool,
  examTemaPool,
} from "@/lib/exams";
import { navigate, sessionHref } from "@/lib/router";
import { cn, formatDuration } from "@/lib/utils";

export function ExamConfigView() {
  const { t, lang, formatNumber } = useI18n();
  const { templates, loading } = useAllTemplates();

  const [profileId, setProfileId] = useState(examProfiles[0]?.id ?? "");
  const [version, setVersion] = useState(0);
  const profile = examProfiles.find((p) => p.id === profileId) ?? examProfiles[0];
  const [temaIds, setTemaIds] = useState<string[]>(
    examProfiles[0]?.temas.map((tm) => tm.id) ?? [],
  );

  /** keep the tema selection valid when the profile changes */
  function selectProfile(id: string) {
    const p = examProfiles.find((x) => x.id === id);
    if (!p) return;
    setProfileId(id);
    setTemaIds(p.temas.map((tm) => tm.id));
    setVersion((v) => Math.min(v, p.versions.length - 1));
  }

  function toggleTema(id: string) {
    setTemaIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  /** live preview of the exact exam deck for the current choices */
  const preview = useMemo(() => {
    if (!profile || loading) return null;
    return buildExamDeck(profile, temaIds, version, templates);
  }, [profile, temaIds, version, templates, loading]);

  /** per-tema pool stats for the checklist */
  const temaStats = useMemo(() => {
    if (!profile || loading) return [];
    return profile.temas.map((tema) => {
      const pool = examTemaPool(tema, templates);
      const ranked = rankExamPool(pool);
      const top = ranked[0];
      return { tema, count: pool.length, top };
    });
  }, [profile, templates, loading]);

  const estimatedSec = preview?.problems.reduce((a, p) => a + p.estimatedTimeSec, 0) ?? 0;
  const canStart = Boolean(preview && preview.problems.length > 0);

  function start() {
    if (!canStart || !profile) return;
    navigate(
      sessionHref({
        mode: "exam",
        subjects: ["math"],
        difficulty: "any",
        count: preview!.problems.length,
        seed: 0,
        exam: { profileId: profile.id, version, temaIds },
      }),
    );
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-12 sm:px-6">
        <Skeleton className="h-10 w-72" />
        <Skeleton className="h-5 w-96 max-w-full" />
        <Skeleton className="h-40 w-full rounded-2xl" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <GraduationCap className="mx-auto h-10 w-10 text-muted-foreground/60" aria-hidden="true" />
        <h1 className="mt-4 font-serif text-2xl font-semibold">{t("exam.config.title")}</h1>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          {t("exam.config.noProfiles")}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      {/* heading */}
      <p className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/75">
        <GraduationCap className="h-4 w-4 text-primary" aria-hidden="true" />
        {t("exam.config.overline")}
      </p>
      <h1 className="mt-4 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
        {t("exam.config.title")}
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">{t("exam.config.subtitle")}</p>

      {/* 1 · profile */}
      <section className="mt-10" aria-labelledby="exam-profile-heading">
        <h2 id="exam-profile-heading" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          <Users className="h-4 w-4" aria-hidden="true" />
          {t("exam.config.profile")}
        </h2>
        <div className="mt-3 grid gap-3">
          {examProfiles.map((p) => {
            const active = p.id === profileId;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => selectProfile(p.id)}
                aria-pressed={active}
                className={cn(
                  "rounded-xl border p-4 text-left transition-all sm:p-5",
                  active
                    ? "border-primary/60 bg-primary/[0.06] shadow-sm"
                    : "bg-card hover:border-foreground/25 hover:shadow-sm",
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border",
                      active
                        ? "border-primary/40 bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground",
                    )}
                    aria-hidden="true"
                  >
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-semibold">
                      {p.student} — {p.title[lang]}
                    </p>
                    <p className="mt-0.5 text-sm leading-snug text-muted-foreground">
                      {p.subtitle[lang]}
                    </p>
                  </div>
                  {active ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      <Check className="h-3 w-3" aria-hidden="true" />
                      {t("exam.config.selected")}
                    </span>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2 · version */}
      <section className="mt-10" aria-labelledby="exam-version-heading">
        <h2 id="exam-version-heading" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          <ListChecks className="h-4 w-4" aria-hidden="true" />
          {t("exam.config.version")}
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {profile.versions.map((v, i) => {
            const active = i === version;
            return (
              <button
                key={v.label}
                type="button"
                onClick={() => setVersion(i)}
                aria-pressed={active}
                className={cn(
                  "rounded-xl border p-4 text-left transition-all",
                  active
                    ? "border-primary/60 bg-primary/[0.06] shadow-sm"
                    : "bg-card hover:border-foreground/25 hover:shadow-sm",
                )}
              >
                <p className="flex items-baseline gap-2">
                  <span className={cn("font-serif text-2xl font-bold", active ? "text-primary" : "text-foreground/80")}>
                    {t("exam.version")} {v.label}
                  </span>
                </p>
                <p className="mt-1 text-sm leading-snug text-muted-foreground">{v.description[lang]}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3 · temas */}
      <section className="mt-10" aria-labelledby="exam-temas-heading">
        <div className="flex flex-wrap items-center gap-3">
          <h2 id="exam-temas-heading" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <ListChecks className="h-4 w-4" aria-hidden="true" />
            {t("exam.config.temas")}
          </h2>
          <span className="text-xs text-muted-foreground">
            {formatNumber(temaIds.length)}/{formatNumber(profile.temas.length)}
          </span>
          <span className="ml-auto flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setTemaIds(profile.temas.map((tm) => tm.id))}
            >
              {t("exam.config.all")}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setTemaIds([])}
            >
              {t("exam.config.none")}
            </Button>
          </span>
        </div>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {temaStats.map(({ tema, count, top }) => {
            const checked = temaIds.includes(tema.id);
            const disabled = count === 0;
            return (
              <li key={tema.id}>
                <button
                  type="button"
                  onClick={() => !disabled && toggleTema(tema.id)}
                  aria-pressed={checked}
                  disabled={disabled}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all",
                    disabled && "cursor-not-allowed opacity-50",
                    checked
                      ? "border-primary/50 bg-primary/[0.06]"
                      : "bg-card hover:border-foreground/25",
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors",
                      checked ? "border-primary bg-primary text-primary-foreground" : "border-foreground/30",
                    )}
                    aria-hidden="true"
                  >
                    {checked ? <Check className="h-3.5 w-3.5" /> : null}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium leading-snug">{tema.name[lang]}</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {count > 0
                        ? t("exam.config.poolCount", {
                            n: formatNumber(count),
                            d: top ? t(`difficulty.${top.difficulty}`) : "",
                          })
                        : t("exam.config.noPool")}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {/* 4 · live preview */}
      {preview && preview.problems.length > 0 ? (
        <section className="mt-10" aria-labelledby="exam-preview-heading">
          <h2 id="exam-preview-heading" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
            {t("exam.config.preview")}
            <span className="ml-auto flex items-center gap-1.5 text-xs font-normal normal-case tracking-normal">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {t("exam.config.minutes", { t: formatDuration(estimatedSec, { compact: true }) })}
            </span>
          </h2>
          <ol className="mt-3 space-y-2">
            {preview.rows.map(({ tema, problem, rank }) => (
              <li
                key={`${problem.templateId}:${problem.seed}`}
                className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3"
              >
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold tabular-nums" aria-hidden="true">
                  {problem.difficulty === "challenge" ? "★" : problem.difficulty === "hard" ? "▲" : "•"}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium leading-snug">{tema.name[lang]}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {t(`difficulty.${problem.difficulty}`)} · {examRankLabel(rank)[lang]} ·{" "}
                    {t("practice.estimated", { n: Math.max(1, Math.round(problem.estimatedTimeSec / 60)) })}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ) : (
        <p className="mt-10 rounded-xl border border-diff-medium/40 bg-diff-medium/10 px-4 py-3 text-sm text-diff-medium">
          {t("exam.config.empty")}
        </p>
      )}

      {/* start */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {canStart
            ? t("exam.config.ready", { n: formatNumber(preview!.problems.length) })
            : t("exam.config.empty")}
        </p>
        <Button
          type="button"
          size="lg"
          disabled={!canStart}
          onClick={start}
          className="gap-2 text-[15px] font-semibold"
        >
          {t("exam.config.start")}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
