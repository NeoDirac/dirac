"use client";

/**
 * MathText — renders bilingual content strings containing:
 *   $...$            inline LaTeX
 *   $$...$$          display LaTeX
 *   {{number}}       locale-aware number token (2.5 → "2,5" in es)
 *   **bold**         strong emphasis
 *   <br> or \n       line breaks
 *
 * The raw LaTeX is never shown to the student: KaTeX renders it, and its
 * hidden MathML output keeps expressions accessible to screen readers.
 */

import katex from "katex";
import { Fragment, useMemo, type ReactNode } from "react";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

type Segment =
  | { type: "text"; content: string }
  | { type: "inline"; content: string }
  | { type: "display"; content: string };

const MATH_SPLIT = /(\$\$[\s\S]*?\$\$|\$[^$\n]+?\$)/g;
const TOKEN = /\{\{([^}]+)\}\}/g;

function splitMath(src: string): Segment[] {
  const segments: Segment[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  MATH_SPLIT.lastIndex = 0;
  while ((m = MATH_SPLIT.exec(src)) !== null) {
    if (m.index > last) segments.push({ type: "text", content: src.slice(last, m.index) });
    const raw = m[0];
    if (raw.startsWith("$$")) {
      segments.push({ type: "display", content: raw.slice(2, -2).trim() });
    } else {
      segments.push({ type: "inline", content: raw.slice(1, -1).trim() });
    }
    last = m.index + raw.length;
  }
  if (last < src.length) segments.push({ type: "text", content: src.slice(last) });
  return segments;
}

function formatToken(value: string, locale: "es" | "en", mathMode: boolean): string {
  const n = Number(value);
  if (!Number.isFinite(n)) return value;
  let s = String(n);
  // trim floating noise like 0.30000000000000004
  if (s.includes(".") && s.length > 12) s = String(Math.round(n * 1e6) / 1e6);
  if (locale === "es") {
    return mathMode ? s.replace(".", "{,}") : s.replace(".", ",");
  }
  return s;
}

function renderPlainText(text: string, locale: "es" | "en"): ReactNode[] {
  const withTokens = text.replace(TOKEN, (_m, v) => formatToken(v, locale, false));
  const lines = withTokens.split(/(?:<br\s*\/?>|\n)/g);
  return lines.flatMap((line, li) => {
    const boldParts = line.split(/(\*\*[^*]+\*\*)/g);
    const nodes: ReactNode[] = boldParts.map((b, bi) => {
      if (b.startsWith("**") && b.endsWith("**") && b.length > 4) {
        return (
          <strong key={`${li}-${bi}`} className="font-semibold text-foreground">
            {b.slice(2, -2)}
          </strong>
        );
      }
      return b ? <Fragment key={`${li}-${bi}`}>{b}</Fragment> : null;
    });
    if (li < lines.length - 1) nodes.push(<br key={`br-${li}`} />);
    return nodes;
  });
}

function renderMathSegment(tex: string, locale: "es" | "en", displayMode: boolean): ReactNode {
  const processed = tex.replace(TOKEN, (_m, v) => formatToken(v, locale, true));
  try {
    const html = katex.renderToString(processed, {
      throwOnError: false,
      displayMode,
      strict: "ignore",
      trust: false,
    });
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  } catch {
    return <code className="text-sm text-muted-foreground">{tex}</code>;
  }
}

export function MathText({
  children: source,
  className,
}: {
  children: string;
  className?: string;
}) {
  const { lang } = useI18n();
  const segments = useMemo(() => splitMath(source), [source]);

  return (
    <div className={cn("math-text", className)}>
      {segments.map((seg, i) => {
        if (seg.type === "text") {
          return <Fragment key={i}>{renderPlainText(seg.content, lang)}</Fragment>;
        }
        return (
          <Fragment key={i}>{renderMathSegment(seg.content, lang, seg.type === "display")}</Fragment>
        );
      })}
    </div>
  );
}

/** Compact one-line variant for answers/badges */
export function MathInline({ children: source, className }: { children: string; className?: string }) {
  return <MathText className={className}>{source.replace(/\$\$([\s\S]*?)\$\$/g, "$$$1$$")}</MathText>;
}
