/**
 * SITE CONFIGURATION — edit these values to rebrand the whole site.
 * No other file needs to change when you update your name, contact or brand.
 */

export const siteConfig = {
  /** Your name as it appears on legal lines (©) */
  tutorName: "Sebastián Calderón",
  /** Brand shown in the header next to the mark */
  brandName: "Profe Dirac",
  /** Brand mark glyph — the Dirac delta, rendered in the serif display font */
  monogram: "δ",
  /** One-line role shown under your name */
  role: {
    es: "Sebastián Calderón · Matemáticas y Física",
    en: "Sebastián Calderón · Mathematics & Physics",
  },
  /** Short bio shown on the homepage and About page */
  bio: {
    es: "En clase explico los conceptos, resolvemos dudas y afilamos la técnica juntos. Esta plataforma es la sala de entrenamiento: aquí lo aprendido se vuelve destreza, problema a problema.",
    en: "In class I explain the concepts, answer questions and sharpen technique together. This platform is the training room: what you learn becomes skill, one problem at a time.",
  },
  /** Path to your profile image (replace /tutor.svg with e.g. /tutor.jpg) */
  photo: "/tutor.svg",
  email: "asecald@gmail.com",
  /** Preferred contact — WhatsApp first, always */
  whatsapp: {
    /** full international number, digits only (used for wa.me links) */
    number: "593999595175",
    /** how the number is displayed */
    display: "+593 99 959 5175",
  },
  site: {
    title: "Profe Dirac — Práctica de Matemáticas y Física",
    shortTitle: "Profe Dirac",
    description: {
      es: "Plataforma de práctica de matemáticas y física del Profe Dirac (Sebastián Calderón): pistas graduadas, corrección inmediata y soluciones paso a paso. Clases particulares por WhatsApp.",
      en: "Mathematics and physics practice platform by Profe Dirac (Sebastián Calderón): graduated hints, instant checking and step-by-step solutions. Private tutoring — WhatsApp preferred.",
    },
    url: "https://profedirac.com",
  },
  /** Accent identity: 'math' (ink) and 'physics' (clay) are wired in globals.css */
  locale: { default: "es" as const, alternate: "en" as const },
} as const;

export type SiteConfig = typeof siteConfig;
