"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { useRoute, href, type Route } from "@/lib/router";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/types";

function isActive(route: Route, key: string): boolean {
  switch (key) {
    case "math":
      return route.name === "subject" && route.subject === "math" || route.name === "topic" && route.subject === "math";
    case "physics":
      return route.name === "subject" && route.subject === "physics" || route.name === "topic" && route.subject === "physics";
    case "practice":
      return route.name === "practice" || route.name === "session";
    case "progress":
      return route.name === "progress";
    case "about":
      return route.name === "about";
    default:
      return false;
  }
}

function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground",
        className,
      )}
      aria-hidden="true"
    >
      {/* inner hairline — the frame of a stamp */}
      <span className="absolute inset-[3px] rounded-[3px] border border-primary-foreground/30" />
      <span className="font-serif text-[19px] italic leading-none">{siteConfig.monogram}</span>
    </span>
  );
}

function LanguageToggle() {
  const { lang, setLang, t } = useI18n();
  return (
    <div
      className="inline-flex items-center rounded-full border bg-card p-0.5"
      role="group"
      aria-label={t("lang.switch")}
    >
      {(["es", "en"] as Locale[]).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide transition-colors",
            lang === l
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { t } = useI18n();
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);
  const isDark = mounted && theme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={t("theme.toggle")}
      title={t("theme.toggle")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-card text-muted-foreground transition-colors hover:text-foreground"
    >
      {mounted && isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

export function Header() {
  const { t, lang } = useI18n();
  const route = useRoute();
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  const navItems = [
    { key: "math", label: t("nav.math"), href: href({ name: "subject", subject: "math" }) },
    { key: "physics", label: t("nav.physics"), href: href({ name: "subject", subject: "physics" }) },
    { key: "practice", label: t("nav.practice"), href: href({ name: "practice" }) },
    { key: "progress", label: t("nav.progress"), href: href({ name: "progress" }) },
    { key: "about", label: t("nav.about"), href: href({ name: "about" }) },
  ];

  return (
    <header className="site-header sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <a href={href({ name: "home" })} className="flex min-w-0 items-center gap-2.5" aria-label={siteConfig.brandName}>
          <BrandMark />
          <span className="min-w-0">
            <span className="block truncate font-serif text-[17px] font-semibold leading-tight">
              {siteConfig.brandName}
            </span>
            <span className="hidden text-[11px] leading-tight text-muted-foreground sm:block">
              {siteConfig.role[lang]}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label={t("nav.home")}>
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                isActive(route, item.key)
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
              )}
              aria-current={isActive(route, item.key) ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-card text-muted-foreground md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? t("nav.closeMenu") : t("nav.menu")}
          >
            {open ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t bg-background md:hidden" aria-label={t("nav.menu")}>
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={closeMenu}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-[15px] font-medium",
                  isActive(route, item.key)
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
                )}
                aria-current={isActive(route, item.key) ? "page" : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
