"use client";

import { Mail, CalendarClock, ShieldCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { href } from "@/lib/router";
import { siteConfig } from "@/config/site";

export function Footer() {
  const { t, lang } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t bg-card/50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-serif text-xs font-bold text-primary-foreground">
                {siteConfig.initials}
              </span>
              <span className="font-serif font-semibold">{siteConfig.brandName}</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t("footer.tagline")}
            </p>
            <p className="flex max-w-xs items-start gap-2 text-xs leading-relaxed text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-diff-easy" aria-hidden="true" />
              {t("footer.privacy")}
            </p>
          </div>

          <nav aria-label={t("footer.navigation")}>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("footer.navigation")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a className="text-muted-foreground transition-colors hover:text-foreground" href={href({ name: "subject", subject: "math" })}>{t("nav.math")}</a></li>
              <li><a className="text-muted-foreground transition-colors hover:text-foreground" href={href({ name: "subject", subject: "physics" })}>{t("nav.physics")}</a></li>
              <li><a className="text-muted-foreground transition-colors hover:text-foreground" href={href({ name: "practice" })}>{t("nav.practice")}</a></li>
              <li><a className="text-muted-foreground transition-colors hover:text-foreground" href={href({ name: "progress" })}>{t("nav.progress")}</a></li>
              <li><a className="text-muted-foreground transition-colors hover:text-foreground" href={href({ name: "about" })}>{t("nav.about")}</a></li>
            </ul>
          </nav>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("footer.contact")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <CalendarClock className="h-4 w-4" aria-hidden="true" />
                  {lang === "es" ? "Reservar sesión" : "Book a session"}
                </a>
              </li>
              {siteConfig.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t pt-5">
          <p className="text-xs text-muted-foreground">
            {t("footer.rights", { year, name: siteConfig.tutorName })}
          </p>
        </div>
      </div>
    </footer>
  );
}
