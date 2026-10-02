"use client";

/**
 * Language provider. Detects the browser language (Spanish fallback),
 * persists the choice in localStorage, and exposes a typed `t()` translator
 * with {placeholder} interpolation plus locale-aware number formatting.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { dictionaries, type Dictionary } from "./dictionary";
import type { Locale } from "@/lib/types";

const STORAGE_KEY = "aula-practice-lang";

export type Translate = (key: keyof Dictionary | string, params?: Record<string, string | number>) => string;

interface LanguageContextValue {
  lang: Locale;
  setLang: (l: Locale) => void;
  t: Translate;
  /** locale-aware number formatting for UI numbers */
  formatNumber: (n: number, opts?: Intl.NumberFormatOptions) => string;
  formatPercent: (n: number) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function detectInitialLocale(): Locale {
  return "es"; // SSR default; refined on mount
}

function detectLocale(): Locale {
  if (typeof navigator !== "undefined") {
    const langs = navigator.languages ?? [navigator.language];
    for (const l of langs) {
      const lower = l.toLowerCase();
      if (lower.startsWith("es")) return "es";
      if (lower.startsWith("en")) return "en";
    }
  }
  return "es"; // explicit fallback per requirements
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Locale>(detectInitialLocale);

  // on mount: stored preference > browser detection > 'es'
  // (deferred to a microtask so we don't setState synchronously in the effect)
  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      let stored: string | null = null;
      try {
        stored = window.localStorage.getItem(STORAGE_KEY);
      } catch {
        /* private mode */
      }
      if (stored === "es" || stored === "en") setLangState(stored);
      else setLangState(detectLocale());
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Locale) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* private mode */
    }
  }, []);

  const t = useCallback<Translate>(
    (key, params) => {
      const dict = dictionaries[lang] ?? dictionaries.es;
      let s = dict[key as string] ?? dictionaries.es[key as string] ?? (key as string);
      if (params) {
        for (const [k, v] of Object.entries(params)) {
          s = s.replaceAll(`{${k}}`, String(v));
        }
      }
      return s;
    },
    [lang],
  );

  const formatNumber = useCallback(
    (n: number, opts?: Intl.NumberFormatOptions) => {
      return new Intl.NumberFormat(lang === "es" ? "es-ES" : "en-US", opts).format(n);
    },
    [lang],
  );

  const formatPercent = useCallback(
    (n: number) => {
      return new Intl.NumberFormat(lang === "es" ? "es-ES" : "en-US", {
        style: "percent",
        maximumFractionDigits: 0,
      }).format(n);
    },
    [lang],
  );

  const value = useMemo(
    () => ({ lang, setLang, t, formatNumber, formatPercent }),
    [lang, setLang, t, formatNumber, formatPercent],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used inside <LanguageProvider>");
  return ctx;
}
