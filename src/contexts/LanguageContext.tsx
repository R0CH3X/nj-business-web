"use client"
// Global EN/ES language context — persists to localStorage, drives every
// translatable string across nav, hero, services, reviews, about, contact, footer.

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type Lang = "en" | "es"

interface Dictionary {
  // Nav
  navServices: string
  navGallery: string
  navReviews: string
  navAbout: string
  navContact: string
  callNow: string
  // Hero / shared CTAs
  bookNow: string
  call: string
  whatsapp: string
  reviewsLabel: string
  perfectRating: string
  // Services
  servicesEyebrow: string
  servicesHeadline: string
  servicesQuestion: string
  bookingPrompt: string
  // Gallery
  galleryEyebrow: string
  galleryHeadline: string
  galleryCaption: string
  // Reviews
  reviewsEyebrow: string
  reviewsHeadline: string
  verifiedReviews: string
  basedOnGoogle: string
  // About
  aboutEyebrow: string
  aboutIntro: (city: string, state: string) => string
  ourTeam: string
  // Contact
  contactEyebrow: string
  contactHeadline: string
  addressLabel: string
  phoneLabel: string
  hoursLabel: string
  getDirections: string
  // Contact form
  formName: string
  formNamePlaceholder: string
  formPhone: string
  formPhonePlaceholder: string
  formMessage: string
  formMessagePlaceholder: string
  formSubmit: string
  // Footer
  footerNavigate: string
  footerVisitUs: string
  footerTagline: string
  footerPartOf: string
  // Mobile bar
  mobileCall: string
  mobileBook: string
}

const dictionaries: Record<Lang, Dictionary> = {
  en: {
    navServices: "Services",
    navGallery: "Gallery",
    navReviews: "Reviews",
    navAbout: "About",
    navContact: "Contact",
    callNow: "Call Now",
    bookNow: "Book Now",
    call: "Call",
    whatsapp: "WhatsApp",
    reviewsLabel: "reviews",
    perfectRating: "Perfect Rating",
    servicesEyebrow: "Services",
    servicesHeadline: "What We Offer",
    servicesQuestion: "Questions? Give us a call.",
    bookingPrompt: "Ready to book your appointment?",
    galleryEyebrow: "Gallery",
    galleryHeadline: "Our work.",
    galleryCaption: (city: string) => `Real results from real clients in ${city}, NJ.`,
    reviewsEyebrow: "Reviews",
    reviewsHeadline: "What our clients say.",
    verifiedReviews: "verified reviews",
    basedOnGoogle: "Based on Google Reviews",
    aboutEyebrow: "About",
    aboutIntro: (city, state) =>
      `Located in ${city}, ${state} — we're a neighborhood salon committed to making every client feel seen, cared for, and beautiful.`,
    ourTeam: "Our Team",
    contactEyebrow: "Contact",
    contactHeadline: "Come visit us.",
    addressLabel: "Address",
    phoneLabel: "Phone",
    hoursLabel: "Hours",
    getDirections: "Get directions",
    formName: "Name",
    formNamePlaceholder: "Your name",
    formPhone: "Phone",
    formPhonePlaceholder: "(201) 000-0000",
    formMessage: "Message",
    formMessagePlaceholder: "What service are you interested in?",
    formSubmit: "Send Message",
    footerNavigate: "Navigate",
    footerVisitUs: "Visit Us",
    footerTagline: "",
    footerPartOf: "Part of",
    mobileCall: "Call",
    mobileBook: "Book",
  } as unknown as Dictionary,
  es: {
    navServices: "Servicios",
    navGallery: "Galería",
    navReviews: "Reseñas",
    navAbout: "Nosotros",
    navContact: "Contacto",
    callNow: "Llamar Ahora",
    bookNow: "Reservar Ahora",
    call: "Llamar",
    whatsapp: "WhatsApp",
    reviewsLabel: "reseñas",
    perfectRating: "Calificación Perfecta",
    servicesEyebrow: "Servicios",
    servicesHeadline: "Lo Que Ofrecemos",
    servicesQuestion: "¿Preguntas? Llámanos.",
    bookingPrompt: "¿Lista para reservar tu cita?",
    galleryEyebrow: "Galería",
    galleryHeadline: "Nuestro trabajo.",
    galleryCaption: (city: string) => `Resultados reales de clientes reales en ${city}, NJ.`,
    reviewsEyebrow: "Reseñas",
    reviewsHeadline: "Lo que dicen nuestros clientes.",
    verifiedReviews: "reseñas verificadas",
    basedOnGoogle: "Basado en Reseñas de Google",
    aboutEyebrow: "Nosotros",
    aboutIntro: (city, state) =>
      `Ubicados en ${city}, ${state} — somos un salón de barrio comprometido en hacer que cada cliente se sienta visto, cuidado y hermoso.`,
    ourTeam: "Nuestro Equipo",
    contactEyebrow: "Contacto",
    contactHeadline: "Ven a visitarnos.",
    addressLabel: "Dirección",
    phoneLabel: "Teléfono",
    hoursLabel: "Horario",
    getDirections: "Cómo llegar",
    formName: "Nombre",
    formNamePlaceholder: "Tu nombre",
    formPhone: "Teléfono",
    formPhonePlaceholder: "(201) 000-0000",
    formMessage: "Mensaje",
    formMessagePlaceholder: "¿Qué servicio te interesa?",
    formSubmit: "Enviar Mensaje",
    footerNavigate: "Navegar",
    footerVisitUs: "Visítanos",
    footerTagline: "",
    footerPartOf: "Parte de",
    mobileCall: "Llamar",
    mobileBook: "Reservar",
  } as unknown as Dictionary,
}

interface LanguageContextValue {
  lang: Lang
  toggle: () => void
  setLang: (l: Lang) => void
  t: Dictionary
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = "nj-business-web:lang"

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en")
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved === "en" || saved === "es") setLangState(saved)
    } catch {
      /* ignore — localStorage unavailable */
    }
    setHydrated(true)
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    try {
      window.localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
  }

  const toggle = () => setLang(lang === "en" ? "es" : "en")

  return (
    <LanguageContext.Provider value={{ lang, toggle, setLang, t: dictionaries[lang] }}>
      <div
        key={lang}
        className={hydrated ? "lang-fade-in" : ""}
        style={{ minHeight: "100%" }}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider")
  return ctx
}

/** Helper: pick the right localized field from bilingual data objects. */
export function pick<T extends string | undefined>(lang: Lang, en: T, es: T): T {
  return lang === "es" && es ? es : en
}
