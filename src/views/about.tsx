"use client";

import Image from "next/image";
import { BookOpenCheck, CalendarClock, CheckCircle2, Lightbulb, Mail, Sigma } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/context";
import { siteConfig } from "@/config/site";

export function AboutView() {
  const { t, lang } = useI18n();

  const method = [
    { icon: BookOpenCheck, title: t("about.method.1.title"), desc: t("about.method.1.desc") },
    { icon: Lightbulb, title: t("about.method.2.title"), desc: t("about.method.2.desc") },
    { icon: Sigma, title: t("about.method.3.title"), desc: t("about.method.3.desc") },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-serif text-4xl font-semibold tracking-tight">{t("about.title")}</h1>
      <p className="mt-2 text-muted-foreground">{t("about.subtitle")}</p>

      {/* tutor */}
      <section className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-start" aria-labelledby="bio-heading">
        <Image
          src={siteConfig.photo}
          alt={siteConfig.tutorName}
          width={128}
          height={128}
          className="h-28 w-28 rounded-2xl border object-cover"
        />
        <div>
          <h2 id="bio-heading" className="font-serif text-2xl font-semibold">
            {siteConfig.tutorName}
          </h2>
          <p className="mt-0.5 text-sm font-medium text-primary">{siteConfig.role[lang]}</p>
          <p className="mt-3 leading-relaxed text-muted-foreground">{siteConfig.bio[lang]}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {t("home.tutor.bio2")}
          </p>
        </div>
      </section>

      {/* method */}
      <section className="mt-12" aria-labelledby="method-heading">
        <h2 id="method-heading" className="font-serif text-2xl font-semibold">
          {t("about.method.title")}
        </h2>
        <ol className="mt-5 grid gap-4 sm:grid-cols-3">
          {method.map((m, i) => (
            <li key={i} className="rounded-2xl border bg-card p-5">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <m.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-3.5 font-semibold">{m.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* privacy */}
      <section className="mt-12 rounded-2xl border border-dashed bg-secondary/40 p-6" aria-labelledby="privacy-heading">
        <h2 id="privacy-heading" className="flex items-center gap-2 font-semibold">
          <CheckCircle2 className="h-5 w-5 text-diff-easy" aria-hidden="true" />
          {t("about.privacy.title")}
        </h2>
        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{t("about.privacy.desc")}</p>
      </section>

      {/* contact */}
      <section className="mt-12" aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="font-serif text-2xl font-semibold">
          {t("about.contact.title")}
        </h2>
        <p className="mt-2 text-muted-foreground">{t("about.contact.desc")}</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Button asChild className="gap-2 font-semibold">
            <a href={`mailto:${siteConfig.email}`}>
              <Mail className="h-4 w-4" aria-hidden="true" />
              {t("about.contact.email")}
            </a>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
              <CalendarClock className="h-4 w-4" aria-hidden="true" />
              {t("about.contact.book")}
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
