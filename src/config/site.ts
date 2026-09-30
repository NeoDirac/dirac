/**
 * SITE CONFIGURATION — edit these values to rebrand the whole site.
 * No other file needs to change when you update your name, contact or brand.
 */

export const siteConfig = {
  /** Your name as students know you */
  tutorName: "Alejandro Vega",
  /** Brand shown in the header next to the mark */
  brandName: "Aula Vega",
  /** Two/three-letter monogram for the logo mark */
  initials: "AV",
  /** One-line role shown under your name */
  role: {
    es: "Matemáticas y Física · Clases particulares",
    en: "Mathematics & Physics · Private tutoring",
  },
  /** Short bio shown on the homepage and About page */
  bio: {
    es: "Más de diez años enseñando matemáticas y física a estudiantes de secundaria y primeros cursos universitarios. Las clases sientan los conceptos; esta plataforma los convierte en destreza.",
    en: "Over ten years teaching mathematics and physics to secondary-school and first-year university students. Lessons build the concepts; this platform turns them into skill.",
  },
  /** Path to your profile photo (replace /tutor.svg with e.g. /tutor.jpg) */
  photo: "/tutor.svg",
  email: "hola@aulavega.example",
  /** booking / calendar link */
  bookingUrl: "https://cal.com/example",
  socials: [
    { label: "Instagram", url: "https://instagram.com/example" },
    { label: "LinkedIn", url: "https://linkedin.com/in/example" },
  ],
  site: {
    title: "Aula Vega — Práctica de Matemáticas y Física",
    shortTitle: "Aula Vega",
    description: {
      es: "Plataforma de práctica de matemáticas y física con pistas graduadas, corrección inmediata y soluciones paso a paso. Clases particulares.",
      en: "Mathematics and physics practice platform with graduated hints, instant checking and step-by-step solutions. Private tutoring.",
    },
    url: "https://aulavega.example",
  },
  /** Accent identity: 'math' (teal) and 'physics' (rust) are wired in globals.css */
  locale: { default: "es" as const, alternate: "en" as const },
} as const;

export type SiteConfig = typeof siteConfig;
