"use client";

import { Mail, MessageCircle, ShieldCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { href } from "@/lib/router";
import { siteConfig } from "@/config/site";

export function Footer() {
  const { t, lang } = useI18n();
  const year = new Date().getFullYear();
  const waHref = `https://wa.me/${siteConfig.whatsapp.number}`;

  return (
    <footer className="site-footer mt-auto border-t bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span
                className="relative inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground"
                aria-hidden="true"
              >
                <span className="absolute inset-[2.5px] rounded-[3px] border border-primary-foreground/30" />
                <span className="font-serif text-[16px] italic leading-none">{siteConfig.monogram}</span>
              </span>
              <span className="font-serif font-semibold">{siteConfig.brandName}</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t("footer.tagline")}
            </p>
            <p className="flex max-w-xs items-start gap-2 text-xs leading-relaxed text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" aria-hidden="true" />
              {t("footer.privacy")}
            </p>
          </div>

          <nav aria-label={t("footer.navigation")}>
            <h3 className="rule-label mb-4">
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
            <h3 className="rule-label mb-4">
              {t("footer.contact")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-foreground transition-colors hover:text-subject-physics"
                >
                  <MessageCircle className="h-4 w-4 shrink-0 text-subject-physics" aria-hidden="true" />
                  <span className="font-medium">{siteConfig.whatsapp.display}</span>
                  <span className="text-xs text-muted-foreground group-hover:text-subject-physics">
                    · {t("footer.contact.fastest")}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {siteConfig.email}
                </a>
              </li>
              <li className="pt-1 text-xs leading-relaxed text-muted-foreground">
                {t("footer.contact.note", { name: siteConfig.tutorName })}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            {t("footer.rights", { year, name: siteConfig.tutorName })}
          </p>
          <p className="font-serif text-xs italic text-muted-foreground">
            {lang === "es" ? "Hecho a mano — sin plantillas ni relleno." : "Handcrafted — no templates, no filler."}
          </p>
        </div>
      </div>
    </footer>
  );
}
