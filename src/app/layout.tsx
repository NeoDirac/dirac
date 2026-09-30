import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/site/providers";
import { siteConfig } from "@/config/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-serif-display",
  subsets: ["latin"],
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
    { media: "(prefers-color-scheme: light)", color: "#fcfbf8" },
    { media: "(prefers-color-scheme: dark)", color: "#1e1d1a" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.tutorName,
  jobTitle: "Tutor",
  description: siteConfig.bio.es,
  email: `mailto:${siteConfig.email}`,
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
        className={`${inter.variable} ${sourceSerif.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}
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
