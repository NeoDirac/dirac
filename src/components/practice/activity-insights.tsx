"use client";

/**
 * Activity insights for the progress dashboard.
 *
 * - ActivityHeatmap: a GitHub-style calendar of the last 13 weeks, built
 *   from ProblemRecords. Pure markup (a CSS grid of cells), so it stays
 *   light and accessible; each cell carries a native title tooltip with
 *   the exact count and date.
 * - AccuracyTrend: first-try accuracy over the last 30 practice days,
 *   drawn with the shared shadcn chart component (recharts) — bars for
 *   volume, one line for overall accuracy plus thinner per-subject lines
 *   (math in teal, physics in orange), all language-aware.
 */

import { addDays, format, startOfWeek } from "date-fns";
import { es as dateEs, enUS as dateEn } from "date-fns/locale";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useI18n } from "@/lib/i18n/context";
import type { ProblemRecord } from "@/lib/types";
import { cn } from "@/lib/utils";

type Lang = "es" | "en";

/* ------------------------------------------------------------------ */
/* Activity heatmap                                                    */
/* ------------------------------------------------------------------ */

/** Activity level for one day: 0 none … 4 heavy (8+ problems). */
function levelFor(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0;
  if (count === 1) return 1;
  if (count <= 3) return 2;
  if (count <= 7) return 3;
  return 4;
}

const LEVEL_CLASSES: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "bg-border/50",
  1: "bg-primary/25",
  2: "bg-primary/50",
  3: "bg-primary/75",
  4: "bg-primary",
};

const WEEKS = 13;

export function ActivityHeatmap({ records }: { records: ProblemRecord[] }) {
  const { t, lang, formatNumber } = useI18n();
  const locale = lang === "es" ? dateEs : dateEn;

  // aggregate per local calendar day
  const perDay = new Map<string, number>();
  for (const r of records) {
    const key = new Date(r.timestamp).toDateString();
    perDay.set(key, (perDay.get(key) ?? 0) + 1);
  }

  // the grid starts on Monday of the week (WEEKS-1) weeks before this week
  const thisMonday = startOfWeek(new Date(), { weekStartsOn: 1 });
  const firstMonday = addDays(thisMonday, -7 * (WEEKS - 1));
  const today = new Date();

  const weekdayLabels = lang === "es" ? ["L", "X", "V"] : ["M", "W", "F"];
  const weekdayLabelRows = [1, 3, 5]; // Mon, Wed, Fri rows

  // month label per week column (only when the month changes within it)
  const monthLabels: (string | null)[] = [];
  let lastMonth = -1;
  for (let w = 0; w < WEEKS; w++) {
    const monday = addDays(firstMonday, 7 * w);
    const month = monday.getMonth();
    if (month !== lastMonth) {
      monthLabels.push(format(monday, "MMM", { locale }));
      lastMonth = month;
    } else {
      monthLabels.push(null);
    }
  }

  return (
    <div className="rounded-2xl border bg-card p-5 transition-colors hover:border-ring/50 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold">{t("activity.heatmap.title")}</h3>
        <p className="text-xs text-muted-foreground">
          {t("activity.heatmap.summary", { n: formatNumber(perDay.size) })}
        </p>
      </div>

      <div
        role="img"
        aria-label={t("activity.heatmap.a11y", { weeks: formatNumber(WEEKS) })}
        className="mt-4 overflow-x-auto"
      >
        <div className="min-w-max">
          {/* month labels row */}
          <div className="flex gap-[3px] pl-[26px] text-[10px] leading-3 text-muted-foreground" aria-hidden="true">
            {monthLabels.map((m, i) => (
              <span key={i} className="w-3 shrink-0">
                {m ? <span className="whitespace-nowrap">{m}</span> : null}
              </span>
            ))}
          </div>
          {/* weekday labels + weeks grid */}
          <div className="mt-1 flex gap-[3px]">
            <div
              className="mr-1.5 flex w-3.5 shrink-0 flex-col gap-[3px] text-[10px] text-muted-foreground"
              aria-hidden="true"
            >
              {Array.from({ length: 7 }).map((_, row) => {
                const idx = weekdayLabelRows.indexOf(row);
                return (
                  <span key={row} className="h-3 leading-3">
                    {idx >= 0 ? weekdayLabels[idx] : ""}
                  </span>
                );
              })}
            </div>
            {Array.from({ length: WEEKS }).map((_, w) => (
              <div key={w} className="flex w-3 shrink-0 flex-col gap-[3px]">
                {Array.from({ length: 7 }).map((_, d) => {
                  const date = addDays(firstMonday, 7 * w + d);
                  if (date > today) {
                    return <span key={d} className="h-3 w-3" aria-hidden="true" />;
                  }
                  const count = perDay.get(date.toDateString()) ?? 0;
                  const level = levelFor(count);
                  const isTodayCell = date.toDateString() === today.toDateString();
                  const label = isTodayCell
                    ? t("activity.heatmap.today", { n: formatNumber(count) })
                    : t("activity.heatmap.cell", {
                        n: formatNumber(count),
                        date: format(date, "EEE d MMM", { locale }),
                      });
                  return (
                    <span
                      key={d}
                      title={label}
                      className={cn(
                        "h-3 w-3 rounded-[3px] transition-colors",
                        LEVEL_CLASSES[level],
                        count > 0 && "hover:ring-1 hover:ring-ring",
                        isTodayCell && "ring-1 ring-primary/70",
                      )}
                    >
                      <span className="sr-only">{label}</span>
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* legend */}
      <div className="mt-4 flex items-center justify-end gap-1.5 text-[10px] text-muted-foreground">
        <span>{t("activity.heatmap.less")}</span>
        {([0, 1, 2, 3, 4] as const).map((l) => (
          <span key={l} className={cn("h-3 w-3 rounded-[3px]", LEVEL_CLASSES[l])} aria-hidden="true" />
        ))}
        <span>{t("activity.heatmap.more")}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Accuracy trend chart                                                */
/* ------------------------------------------------------------------ */

interface TrendPoint {
  label: string; // short axis label
  attempts: number;
  firstTryPct: number | null;
  mathPct: number | null;
  physicsPct: number | null;
}

function buildTrend(records: ProblemRecord[], lang: Lang, days: number): TrendPoint[] {
  const locale = lang === "es" ? dateEs : dateEn;
  const perDay = new Map<
    string,
    { attempts: number; firstTry: number; math: number; mathFirst: number; physics: number; physicsFirst: number; ts: number }
  >();
  const start = addDays(new Date(), -(days - 1));
  for (const r of records) {
    const d = new Date(r.timestamp);
    if (d < start) continue;
    const key = d.toDateString();
    const entry = perDay.get(key);
    if (entry) {
      entry.attempts += 1;
      if (r.firstTryCorrect) entry.firstTry += 1;
      if (r.subject === "math") {
        entry.math += 1;
        if (r.firstTryCorrect) entry.mathFirst += 1;
      } else {
        entry.physics += 1;
        if (r.firstTryCorrect) entry.physicsFirst += 1;
      }
    } else {
      perDay.set(key, {
        attempts: 1,
        firstTry: r.firstTryCorrect ? 1 : 0,
        math: r.subject === "math" ? 1 : 0,
        mathFirst: r.subject === "math" && r.firstTryCorrect ? 1 : 0,
        physics: r.subject === "physics" ? 1 : 0,
        physicsFirst: r.subject === "physics" && r.firstTryCorrect ? 1 : 0,
        ts: d.getTime(),
      });
    }
  }
  return [...perDay.values()]
    .sort((a, b) => a.ts - b.ts)
    .map((e) => ({
      label: format(e.ts, "d MMM", { locale }),
      attempts: e.attempts,
      firstTryPct: e.attempts > 0 ? Math.round((e.firstTry / e.attempts) * 100) : null,
      // per-subject accuracy is undefined on days without that subject
      mathPct: e.math > 0 ? Math.round((e.mathFirst / e.math) * 100) : null,
      physicsPct: e.physics > 0 ? Math.round((e.physicsFirst / e.physics) * 100) : null,
    }));
}

export function AccuracyTrend({ records }: { records: ProblemRecord[] }) {
  const { t, lang } = useI18n();
  const data = buildTrend(records, lang, 30);

  // subject lines only make sense when both subjects actually have data
  const hasMath = data.some((p) => p.mathPct !== null);
  const hasPhysics = data.some((p) => p.physicsPct !== null);
  const showSubjects = hasMath && hasPhysics;

  const chartConfig = {
    attempts: {
      label: t("activity.trend.attempts"),
      color: "var(--muted-foreground)",
    },
    firstTryPct: {
      label: t("activity.trend.firstTry"),
      color: "var(--primary)",
    },
    ...(showSubjects
      ? {
          mathPct: {
            label: t("activity.trend.math"),
            color: "var(--subject-math)",
          },
          physicsPct: {
            label: t("activity.trend.physics"),
            color: "var(--subject-physics)",
          },
        }
      : {}),
  } satisfies ChartConfig;

  if (data.length < 2) {
    return (
      <div className="flex min-h-44 flex-col items-center justify-center rounded-2xl border border-dashed bg-card/60 p-6 text-center">
        <p className="text-sm font-medium">{t("activity.trend.empty.title")}</p>
        <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-muted-foreground">
          {t("activity.trend.empty.desc")}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-card p-5 transition-colors hover:border-ring/50 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold">{t("activity.trend.title")}</h3>
        <p className="text-xs text-muted-foreground">{t("activity.trend.subtitle")}</p>
      </div>
      <ChartContainer config={chartConfig} className="mt-4 aspect-auto h-56 w-full">
        <ComposedChart data={data} margin={{ top: 8, right: 0, bottom: 0, left: -12 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            interval="preserveStartEnd"
            minTickGap={24}
          />
          <YAxis yAxisId="left" allowDecimals={false} tickLine={false} axisLine={false} width={42} />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, 100]}
            ticks={[0, 50, 100]}
            tickFormatter={(v: number) => `${v}%`}
            tickLine={false}
            axisLine={false}
            width={42}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            yAxisId="left"
            dataKey="attempts"
            name={t("activity.trend.attempts")}
            fill="var(--color-attempts)"
            fillOpacity={0.28}
            radius={[3, 3, 0, 0]}
            maxBarSize={22}
          />
          <Line
            yAxisId="right"
            dataKey="firstTryPct"
            name={t("activity.trend.firstTry")}
            stroke="var(--color-firstTryPct)"
            strokeWidth={2.5}
            dot={{ r: 3, strokeWidth: 1.5, fill: "var(--card)" }}
            activeDot={{ r: 4.5 }}
            connectNulls
          />
          {showSubjects ? (
            <Line
              yAxisId="right"
              dataKey="mathPct"
              name={t("activity.trend.math")}
              stroke="var(--color-mathPct)"
              strokeWidth={2}
              dot={{ r: 2.5, strokeWidth: 1, fill: "var(--card)" }}
              activeDot={{ r: 4 }}
              connectNulls
            />
          ) : null}
          {showSubjects ? (
            <Line
              yAxisId="right"
              dataKey="physicsPct"
              name={t("activity.trend.physics")}
              stroke="var(--color-physicsPct)"
              strokeWidth={2}
              strokeDasharray="5 3"
              dot={{ r: 2.5, strokeWidth: 1, fill: "var(--card)" }}
              activeDot={{ r: 4 }}
              connectNulls
            />
          ) : null}
        </ComposedChart>
      </ChartContainer>
    </div>
  );
}
