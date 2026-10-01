import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/site/providers";
import { siteConfig } from "@/config/site";

const plexSans = IBM_Plex_Sans({
  variable: "--font-ui",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-serif-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.site.title,
    template: `%s · ${siteConfig.site.shortTitle}`,
  },
  description: siteConfig.site.description.es,
  keywords: [
    "profe dirac",
    "práctica matemáticas",
    "práctica física",
    "ejercicios resueltos",
    "clases particulares",
    "math practice",
    "physics practice",
    "precalculus",
    "tutoring",
  ],
  authors: [{ name: siteConfig.tutorName }],
  alternates: {
    canonical: "/",
    languages: {
      es: "/",
      en: "/?lang=en",
    },
  },
  openGraph: {
    title: siteConfig.site.title,
    description: siteConfig.site.description.es,
    url: siteConfig.site.url,
    siteName: siteConfig.site.shortTitle,
    type: "website",
    locale: "es_ES",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary",
    title: siteConfig.site.title,
    description: siteConfig.site.description.es,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f4ec" },
    { media: "(prefers-color-scheme: dark)", color: "#211e1a" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.tutorName,
  alternateName: siteConfig.brandName,
  jobTitle: "Tutor de matemáticas y física",
  description: siteConfig.bio.es,
  email: `mailto:${siteConfig.email}`,
  telephone: `+${siteConfig.whatsapp.number}`,
  url: siteConfig.site.url,
  knowsAbout: [
    "Mathematics",
    "Physics",
    "Pre-calculus",
    "Algebra",
    "Trigonometry",
    "Mechanics",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${plexSans.variable} ${fraunces.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
