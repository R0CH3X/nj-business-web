"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView, useMotionValue, animate } from "framer-motion"

// ─── Design tokens ─────────────────────────────────────────────────────────────
const C = {
  canvas: "#040506",
  card: "#07080a",
  border: "#363739",
  primary: "#f0f0f0",
  secondary: "#9c9c9d",
  accent: "#3b9eff",
  accentBright: "#6db8ff",
} as const

const EXPO_OUT = [0.16, 1, 0.3, 1] as const

// ─── Assets ────────────────────────────────────────────────────────────────────
const IMG = {
  heroBg: "https://images.pexels.com/photos/8486944/pexels-photo-8486944.jpeg?auto=compress&w=1600",
  emergency: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  sewer: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80",
  drain: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80",
  waterHeater: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=400&q=80",
  pipeRepair: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&q=80",
  leakDetection: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80",
  about: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
} as const

// ─── Bilingual content ─────────────────────────────────────────────────────────
const content = {
  en: {
    meta: {
      title: "Pinnacle Plumbing Sewer & Drain | Ramsey NJ | 24/7 Emergency Plumber",
      desc: "Pinnacle Plumbing Sewer & Drain in Ramsey, NJ — 24/7 emergency plumbing, drain cleaning, sewer repair & water heater installation. 5.0★ on Google with 142 reviews. Serving Bergen County.",
    },
    nav: {
      cta: "Get a Quote",
      phone: "(201) 419-4016",
      links: [
        { label: "Services", href: "#services" },
        { label: "About", href: "#about" },
        { label: "Reviews", href: "#reviews" },
        { label: "Contact", href: "#contact" },
      ],
    },
    hero: {
      badge: "5.0  ★  142 Reviews on Google",
      words: ["Bergen", "County's", "Most", "Trusted", "Plumber"],
      accentFrom: 2,
      sub: "24/7 emergency response · Licensed & insured · Serving Ramsey, NJ and all of North Jersey",
      callCta: "Call Now",
      waCta: "WhatsApp Us",
    },
    trust: [
      { end: 142, suffix: "+", label: "Google Reviews" },
      { end: 5.0, suffix: "★", label: "Star Rating", decimal: true },
      { end: 24, suffix: "/7", label: "Emergency Service" },
    ],
    services: {
      eyebrow: "What We Do",
      title: "Full-Service Plumbing",
      sub: "Residential and commercial plumbing across Bergen, Passaic and Morris counties.",
      items: [
        { img: IMG.emergency, title: "Emergency Plumbing", desc: "Burst pipes, flooding, no hot water. On-site within the hour, any time of day or night." },
        { img: IMG.sewer, title: "Sewer Repair", desc: "Trenchless sewer repair and full line replacement. Camera inspection included." },
        { img: IMG.drain, title: "Drain Cleaning", desc: "Hydro-jetting and professional snake service to clear any blockage, guaranteed." },
        { img: IMG.waterHeater, title: "Water Heater Installation", desc: "Same-day replacement. Tank and tankless systems. All major brands serviced." },
        { img: IMG.pipeRepair, title: "Pipe Repair & Repiping", desc: "Leak repairs and whole-home repiping with minimal disruption to your property." },
        { img: IMG.leakDetection, title: "Leak Detection", desc: "Electronic detection finds hidden leaks before they become catastrophic damage." },
      ],
    },
    about: {
      eyebrow: "About Us",
      title: "Family-Owned. Bergen County's Best.",
      body: "Pinnacle Plumbing Sewer & Drain has been Ramsey's trusted plumbing company from day one. Every technician is licensed, insured, and background-checked. We show up when we say we will, price transparently, and stand behind every job.",
      areaLabel: "Service Area",
      areas: ["Bergen County", "Passaic County", "Morris County", "North Jersey"],
      ratingLabel: "Google Reviews",
    },
    reviews: {
      eyebrow: "Reviews",
      title: "What Customers Say",
      items: [
        { text: "Pinnacle showed up at midnight on a Saturday and fixed a burst pipe in under 2 hours. Absolute lifesaver.", author: "James M.", location: "Ramsey, NJ" },
        { text: "Best plumber in Bergen County. Fair pricing, no hidden fees, showed up exactly when they said they would.", author: "Sarah K.", location: "Paramus, NJ" },
        { text: "Fast, professional, and clean. Replaced my water heater same day. I won't call anyone else.", author: "Mike T.", location: "Ridgewood, NJ" },
      ],
    },
    cta: {
      eyebrow: "Get Help Now",
      title: "Need a Plumber Now?",
      sub: "We pick up. Every call. Day or night.",
      callCta: "Call (201) 419-4016",
      waCta: "Message on WhatsApp",
    },
    footer: {
      address: "Ramsey, NJ 07446",
      region: "Bergen County, New Jersey",
      hours: "24/7 Emergency Service",
      rights: "© 2025 Pinnacle Plumbing Sewer & Drain. All rights reserved.",
    },
    bar: { call: "📞 Call", wa: "💬 WhatsApp" },
    drawerLangSwitch: "Ver en Español",
  },
  es: {
    meta: {
      title: "Pinnacle Plumbing | Plomero 24/7 Ramsey NJ | Bergen County",
      desc: "Pinnacle Plumbing Sewer & Drain en Ramsey, NJ — plomería de emergencia 24/7, limpieza de drenaje, reparación de alcantarillado e instalación de calentadores de agua. 5.0★ en Google.",
    },
    nav: {
      cta: "Pedir Cotización",
      phone: "(201) 419-4016",
      links: [
        { label: "Servicios", href: "#services" },
        { label: "Nosotros", href: "#about" },
        { label: "Reseñas", href: "#reviews" },
        { label: "Contacto", href: "#contact" },
      ],
    },
    hero: {
      badge: "5.0  ★  142 Reseñas en Google",
      words: ["El", "Plomero", "Más", "Confiable", "del", "Condado"],
      accentFrom: 2,
      sub: "Emergencias 24/7 · Con licencia y asegurado · Sirviendo Ramsey, NJ y el norte de New Jersey",
      callCta: "Llamar Ahora",
      waCta: "WhatsApp",
    },
    trust: [
      { end: 142, suffix: "+", label: "Reseñas en Google" },
      { end: 5.0, suffix: "★", label: "Calificación", decimal: true },
      { end: 24, suffix: "/7", label: "Servicio de Emergencia" },
    ],
    services: {
      eyebrow: "Lo Que Hacemos",
      title: "Plomería Completa",
      sub: "Servicios residenciales y comerciales en los condados de Bergen, Passaic y Morris.",
      items: [
        { img: IMG.emergency, title: "Plomería de Emergencia", desc: "Tuberías reventadas, inundaciones, sin agua caliente. Llegamos en una hora, cualquier hora." },
        { img: IMG.sewer, title: "Reparación de Alcantarillado", desc: "Reparación sin zanjas y reemplazo completo. Inspección con cámara incluida." },
        { img: IMG.drain, title: "Limpieza de Drenaje", desc: "Hidro-jetting y servicio snake para despejar cualquier obstrucción, garantizado." },
        { img: IMG.waterHeater, title: "Instalación de Calentadores", desc: "Reemplazo el mismo día. Tanque y sin tanque. Todas las marcas principales." },
        { img: IMG.pipeRepair, title: "Reparación de Tuberías", desc: "Reparaciones de fugas y reemplazo completo con mínima interrupción." },
        { img: IMG.leakDetection, title: "Detección de Fugas", desc: "Detección electrónica localiza fugas ocultas antes de que causen daños mayores." },
      ],
    },
    about: {
      eyebrow: "Sobre Nosotros",
      title: "Empresa Familiar. Lo Mejor de Bergen.",
      body: "Pinnacle Plumbing Sewer & Drain ha sido la empresa de plomería de confianza en Ramsey desde el primer día. Cada técnico tiene licencia, seguro y verificación de antecedentes. Llegamos cuando decimos, precios transparentes y respaldamos cada trabajo.",
      areaLabel: "Área de Servicio",
      areas: ["Condado de Bergen", "Condado de Passaic", "Condado de Morris", "Norte de Jersey"],
      ratingLabel: "Reseñas en Google",
    },
    reviews: {
      eyebrow: "Reseñas",
      title: "Lo Que Dicen Nuestros Clientes",
      items: [
        { text: "Pinnacle llegó a medianoche un sábado y reparó una tubería reventada en menos de 2 horas. Un salvavidas.", author: "James M.", location: "Ramsey, NJ" },
        { text: "El mejor plomero del Condado de Bergen. Precios justos, sin costos ocultos, llegaron exactamente cuando dijeron.", author: "Sarah K.", location: "Paramus, NJ" },
        { text: "Rápido, profesional y limpio. Reemplazó mi calentador el mismo día. No llamaré a nadie más.", author: "Mike T.", location: "Ridgewood, NJ" },
      ],
    },
    cta: {
      eyebrow: "Ayuda Inmediata",
      title: "¿Necesita un Plomero Ahora?",
      sub: "Contestamos cada llamada. Día o noche.",
      callCta: "Llamar (201) 419-4016",
      waCta: "Mensaje por WhatsApp",
    },
    footer: {
      address: "Ramsey, NJ 07446",
      region: "Condado de Bergen, New Jersey",
      hours: "Servicio de Emergencia 24/7",
      rights: "© 2025 Pinnacle Plumbing Sewer & Drain. Todos los derechos reservados.",
    },
    bar: { call: "📞 Llamar", wa: "💬 WhatsApp" },
    drawerLangSwitch: "View in English",
  },
} as const

type Lang = keyof typeof content

// ─── Helpers ───────────────────────────────────────────────────────────────────

function Counter({ end, suffix, decimal = false }: { end: number; suffix: string; decimal?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const count = useMotionValue(0)
  const [display, setDisplay] = useState(decimal ? "0.0" : "0")

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, end, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        setDisplay(decimal ? latest.toFixed(1) : String(Math.floor(latest)))
      },
    })
    return () => controls.stop()
  }, [inView, count, end, decimal])

  return (
    <span ref={ref}>{display}{suffix}</span>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em",
      textTransform: "uppercase", color: C.accent,
      marginBottom: "16px", fontFamily: "'Inter', sans-serif",
    }}>
      {children}
    </p>
  )
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function PinnacleDemoClient() {
  const [lang, setLang] = useState<Lang>("en")
  const [menuOpen, setMenuOpen] = useState(false)
  const d = content[lang]

  const TEL = "tel:+12014194016"
  const WA = "https://wa.me/12014194016"

  // Persist language preference
  useEffect(() => {
    const saved = localStorage.getItem("pp-lang") as Lang | null
    if (saved === "en" || saved === "es") setLang(saved)
  }, [])

  // Sync document title + meta description
  useEffect(() => {
    document.title = d.meta.title
    const el = document.querySelector('meta[name="description"]')
    if (el) el.setAttribute("content", d.meta.desc)
  }, [lang, d.meta])

  const toggleLang = () => {
    const next: Lang = lang === "en" ? "es" : "en"
    setLang(next)
    localStorage.setItem("pp-lang", next)
    setMenuOpen(false)
  }

  return (
    <div style={{ background: C.canvas, color: C.primary, fontFamily: "'Inter', sans-serif", overflowX: "hidden" }}>

      {/* ─── GLOBAL STYLES ───────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
        body { margin: 0; padding-bottom: 68px; }
        @media (min-width: 768px) { body { padding-bottom: 0; } }

        .svc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: ${C.border}; }
        @media (max-width: 900px)  { .svc-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px)  { .svc-grid { grid-template-columns: 1fr; } }

        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        @media (max-width: 900px) { .about-grid { grid-template-columns: 1fr; gap: 48px; } }

        .reviews-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        @media (max-width: 900px) { .reviews-grid { grid-template-columns: 1fr; } }

        .trust-grid { display: grid; grid-template-columns: repeat(3, 1fr); }
        .trust-sep { border-right: 1px solid ${C.border}; }
        @media (max-width: 500px) {
          .trust-grid { grid-template-columns: 1fr; }
          .trust-sep { border-right: none; border-bottom: 1px solid ${C.border}; }
        }

        .nav-links  { display: flex; }
        .nav-phone  { display: block; }
        .nav-cta    { display: flex; }
        .nav-burger { display: none; }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-phone { display: none !important; }
          .nav-cta   { display: none !important; }
          .nav-burger { display: flex !important; }
        }

        .mobile-bar { display: none !important; }
        @media (max-width: 767px) { .mobile-bar { display: grid !important; } }

        img { display: block; }
        a { color: inherit; }
      `}</style>

      {/* ─── NAV ─────────────────────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: EXPO_OUT }}
        style={{
          position: "sticky", top: 0, zIndex: 100,
          height: "59px", display: "flex", alignItems: "center",
          backdropFilter: "blur(25px)", WebkitBackdropFilter: "blur(25px)",
          background: "rgba(4,5,6,0.82)",
          borderBottom: `1px solid ${C.border}`,
          padding: "0 32px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "1280px", margin: "0 auto" }}>

          {/* Logo */}
          <a href="#" aria-label="Pinnacle Plumbing home" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <rect width="28" height="28" rx="7" fill={C.accent} />
              <path d="M14 6 L17 11 L22 11 L18 15 L20 20 L14 17 L8 20 L10 15 L6 11 L11 11 Z" fill="white" fillRule="evenodd" />
            </svg>
            <span style={{ fontSize: "15px", fontWeight: 600, color: C.primary, letterSpacing: "-0.3px" }}>
              Pinnacle <span style={{ color: C.secondary, fontWeight: 400 }}>Plumbing</span>
            </span>
          </a>

          {/* Center nav links */}
          <nav className="nav-links" aria-label="Primary navigation" style={{ gap: "32px", alignItems: "center" }}>
            {d.nav.links.map((l) => (
              <a key={l.href} href={l.href}
                style={{ fontSize: "14px", color: C.secondary, textDecoration: "none", fontWeight: 500, transition: "color 0.15s" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = C.primary }}
                onMouseLeave={(e) => { e.currentTarget.style.color = C.secondary }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right cluster */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <a className="nav-phone" href={TEL}
              style={{ fontSize: "13px", color: C.secondary, textDecoration: "none", fontWeight: 500, transition: "color 0.15s" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = C.primary }}
              onMouseLeave={(e) => { e.currentTarget.style.color = C.secondary }}
            >
              {d.nav.phone}
            </a>

            <button
              onClick={toggleLang}
              aria-label="Toggle language"
              style={{
                background: "transparent", border: `1px solid ${C.border}`, borderRadius: "6px",
                color: C.secondary, fontSize: "12px", fontWeight: 500, padding: "5px 10px",
                cursor: "pointer", letterSpacing: "0.5px", transition: "border-color 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.primary }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.secondary }}
            >
              {lang === "en" ? "EN | ES" : "ES | EN"}
            </button>

            <motion.a
              href={TEL}
              className="nav-cta"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
              style={{
                background: C.accent, borderRadius: "6px", color: "#fff",
                fontSize: "13px", fontWeight: 600, padding: "8px 16px",
                textDecoration: "none", alignItems: "center", gap: "6px",
              }}
            >
              {d.nav.cta}
            </motion.a>

            <button
              className="nav-burger"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              style={{ background: "transparent", border: "none", color: C.primary, cursor: "pointer", padding: "4px" }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <line x1="3" y1="7"  x2="19" y2="7"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="3" y1="15" x2="19" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ─── MOBILE DRAWER ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.72)", zIndex: 199, backdropFilter: "blur(4px)" }}
              aria-hidden="true"
            />
            <motion.div
              key="drawer"
              role="dialog" aria-modal="true" aria-label="Navigation menu"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              style={{
                position: "fixed", top: 0, right: 0, bottom: 0, width: "288px",
                background: C.card, zIndex: 200, padding: "24px 28px",
                borderLeft: `1px solid ${C.border}`,
                display: "flex", flexDirection: "column",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
                <span style={{ fontSize: "14px", fontWeight: 600, color: C.primary, letterSpacing: "-0.2px" }}>Menu</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  style={{ background: "transparent", border: "none", color: C.secondary, cursor: "pointer", padding: "4px", display: "flex" }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <nav aria-label="Mobile navigation" style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0" }}>
                {d.nav.links.map((l, i) => (
                  <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                    style={{
                      fontSize: "20px", fontWeight: 500, color: C.primary, textDecoration: "none",
                      padding: "18px 0",
                      borderBottom: i < d.nav.links.length - 1 ? `1px solid ${C.border}` : undefined,
                      fontFamily: "'DM Serif Display', serif",
                    }}
                  >
                    {l.label}
                  </a>
                ))}
              </nav>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingTop: "32px", borderTop: `1px solid ${C.border}`, marginTop: "24px" }}>
                <a
                  href={TEL}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: C.accent, borderRadius: "8px", color: "#fff",
                    fontWeight: 600, fontSize: "15px", padding: "15px", textDecoration: "none",
                  }}
                >
                  📞 {d.nav.phone}
                </a>
                <button
                  onClick={toggleLang}
                  style={{
                    background: "transparent", border: `1px solid ${C.border}`, borderRadius: "8px",
                    color: C.secondary, fontSize: "13px", fontWeight: 500, padding: "11px", cursor: "pointer",
                  }}
                >
                  {d.drawerLangSwitch}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main>
        {/* ─── HERO ────────────────────────────────────────────────────────── */}
        <section
          aria-label="Hero"
          style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}
        >
          {/* Background photo */}
          <img
            src={IMG.heroBg}
            alt=""
            aria-hidden="true"
            loading="eager"
            width={1600} height={900}
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center 30%",
              opacity: 0.22,
            }}
          />

          {/* Gradient frame */}
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(to bottom,
              ${C.canvas} 0%,
              rgba(4,5,6,0.2) 25%,
              rgba(4,5,6,0.15) 60%,
              ${C.canvas} 100%)`,
          }} />

          {/* Radial atmospheric glow — pulsing */}
          <motion.div
            aria-hidden="true"
            animate={{ opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "50%", left: "40%",
              transform: "translate(-50%, -50%)",
              width: "860px", height: "480px",
              background: `radial-gradient(ellipse, rgba(59,158,255,0.13) 0%, transparent 70%)`,
              pointerEvents: "none",
            }}
          />

          {/* Content — left-aligned */}
          <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "1280px", margin: "0 auto", padding: "120px 32px 80px" }}>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: EXPO_OUT }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                border: `1px solid rgba(54,55,57,0.7)`, borderRadius: "100px",
                padding: "6px 16px", fontSize: "13px", color: C.secondary,
                background: "rgba(7,8,10,0.55)", backdropFilter: "blur(8px)",
                marginBottom: "44px",
              }}
            >
              <span style={{ color: "#f59e0b", fontSize: "12px" }}>★★★★★</span>
              <span>{d.hero.badge}</span>
            </motion.div>

            {/* Headline — word-by-word stagger */}
            <h1 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(48px, 6.5vw, 96px)",
              fontWeight: 400, letterSpacing: "-0.02em",
              lineHeight: 1.05, color: C.primary,
              marginBottom: "28px", maxWidth: "820px",
            }}>
              {d.hero.words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.25 + i * 0.08, ease: EXPO_OUT }}
                  style={{
                    display: "inline-block",
                    marginRight: "0.28em",
                    color: i >= d.hero.accentFrom ? C.accent : C.primary,
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              style={{
                fontSize: "clamp(14px, 1.4vw, 17px)", color: C.secondary,
                lineHeight: 1.7, marginBottom: "48px",
                maxWidth: "540px", fontWeight: 400,
              }}
            >
              {d.hero.sub}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75, ease: EXPO_OUT }}
              style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
            >
              <motion.a
                href={TEL}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  background: C.accent, borderRadius: "8px", color: "#fff",
                  fontSize: "16px", fontWeight: 600, padding: "15px 28px",
                  textDecoration: "none",
                }}
              >
                📞 {d.hero.callCta}
              </motion.a>
              <motion.a
                href={WA}
                whileHover={{ scale: 1.04, borderColor: C.accentBright } as never}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  background: "transparent", borderRadius: "8px", color: C.primary,
                  fontSize: "16px", fontWeight: 600, padding: "15px 28px",
                  textDecoration: "none", border: `1px solid ${C.border}`,
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accentBright }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border }}
              >
                💬 {d.hero.waCta}
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* ─── TRUST BAR ───────────────────────────────────────────────────── */}
        <section
          aria-label="Key statistics"
          style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}
        >
          <div className="trust-grid" style={{ maxWidth: "960px", margin: "0 auto" }}>
            {d.trust.map((stat, i) => (
              <motion.div
                key={i}
                className={i < 2 ? "trust-sep" : ""}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EXPO_OUT }}
                style={{ textAlign: "center", padding: "52px 24px" }}
              >
                <div style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "clamp(40px, 5vw, 60px)",
                  fontWeight: 400, color: C.accent, letterSpacing: "-0.02em",
                  marginBottom: "8px",
                }}>
                  <Counter end={stat.end} suffix={stat.suffix} decimal={"decimal" in stat ? !!(stat as { decimal?: boolean }).decimal : false} />
                </div>
                <div style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", color: C.secondary, textTransform: "uppercase" }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── SERVICES ────────────────────────────────────────────────────── */}
        <section
          id="services"
          aria-label="Services"
          style={{ padding: "96px 32px", borderBottom: `1px solid ${C.border}` }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EXPO_OUT }}
              style={{ marginBottom: "64px" }}
            >
              <Eyebrow>{d.services.eyebrow}</Eyebrow>
              <h2 style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(32px, 3.5vw, 52px)",
                fontWeight: 400, letterSpacing: "-0.02em",
                color: C.primary, marginBottom: "16px", lineHeight: 1.15,
              }}>
                {d.services.title}
              </h2>
              <p style={{ fontSize: "16px", color: C.secondary, lineHeight: 1.7, maxWidth: "540px" }}>
                {d.services.sub}
              </p>
            </motion.div>

            <div
              className="svc-grid"
              style={{ border: `1px solid ${C.border}`, borderRadius: "16px", overflow: "hidden" }}
            >
              {d.services.items.map((svc, i) => (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: EXPO_OUT }}
                  style={{ background: C.card, display: "flex", flexDirection: "column" }}
                >
                  {/* Card image */}
                  <div style={{ position: "relative", height: "180px", overflow: "hidden", flexShrink: 0 }}>
                    <img
                      src={svc.img}
                      alt={svc.title}
                      loading="lazy"
                      width={400} height={180}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <div aria-hidden="true" style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to bottom, transparent 45%, rgba(7,8,10,0.9) 100%)",
                    }} />
                  </div>
                  {/* Card body */}
                  <div style={{ padding: "24px 28px 32px", flex: 1 }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 600, color: C.primary, marginBottom: "10px", letterSpacing: "-0.2px" }}>
                      {svc.title}
                    </h3>
                    <p style={{ fontSize: "14px", color: C.secondary, lineHeight: 1.75, margin: 0 }}>
                      {svc.desc}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ─── ABOUT ───────────────────────────────────────────────────────── */}
        <section
          id="about"
          aria-label="About Pinnacle Plumbing"
          style={{
            padding: "96px 32px",
            borderBottom: `1px solid ${C.border}`,
            background: `radial-gradient(ellipse 55% 60% at 85% 50%, rgba(59,158,255,0.04) 0%, transparent 70%)`,
          }}
        >
          <div className="about-grid" style={{ maxWidth: "1280px", margin: "0 auto" }}>

            {/* Text column */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: EXPO_OUT }}
            >
              <Eyebrow>{d.about.eyebrow}</Eyebrow>
              <h2 style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(28px, 3.5vw, 48px)",
                fontWeight: 400, letterSpacing: "-0.02em",
                color: C.primary, marginBottom: "20px", lineHeight: 1.15,
              }}>
                {d.about.title}
              </h2>
              <p style={{ fontSize: "16px", color: C.secondary, lineHeight: 1.8, marginBottom: "40px", maxWidth: "64ch" }}>
                {d.about.body}
              </p>

              <div>
                <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", color: C.accent, textTransform: "uppercase", marginBottom: "16px" }}>
                  {d.about.areaLabel}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {d.about.areas.map((area, i) => (
                    <span key={i} style={{
                      fontSize: "13px", fontWeight: 500, color: C.secondary,
                      border: `1px solid ${C.border}`, borderRadius: "100px",
                      padding: "6px 14px", background: C.card,
                    }}>
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Photo column */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: 0.12, ease: EXPO_OUT }}
              style={{ position: "relative", borderRadius: "16px", overflow: "hidden" }}
            >
              <img
                src={IMG.about}
                alt="Pinnacle Plumbing technician at work"
                loading="lazy"
                width={800} height={600}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", aspectRatio: "4/3" }}
              />
              {/* Tint overlay */}
              <div aria-hidden="true" style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top right, rgba(59,158,255,0.12) 0%, transparent 55%)",
              }} />
              {/* Floating badge */}
              <div style={{
                position: "absolute", bottom: "24px", left: "24px",
                background: "rgba(7,8,10,0.88)", backdropFilter: "blur(12px)",
                borderRadius: "12px", padding: "14px 20px",
                border: `1px solid ${C.border}`,
              }}>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "22px", color: C.primary, letterSpacing: "-0.5px" }}>
                  5.0 ★
                </div>
                <div style={{ fontSize: "12px", color: C.secondary, marginTop: "2px" }}>
                  142 {d.about.ratingLabel}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── REVIEWS ─────────────────────────────────────────────────────── */}
        <section
          id="reviews"
          aria-label="Customer reviews"
          style={{ padding: "96px 32px", borderBottom: `1px solid ${C.border}` }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: EXPO_OUT }}
              style={{ marginBottom: "64px" }}
            >
              <Eyebrow>{d.reviews.eyebrow}</Eyebrow>
              <h2 style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(28px, 3.5vw, 48px)",
                fontWeight: 400, letterSpacing: "-0.02em",
                color: C.primary, lineHeight: 1.15,
              }}>
                {d.reviews.title}
              </h2>
            </motion.div>

            <div className="reviews-grid">
              {d.reviews.items.map((rev, i) => (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: EXPO_OUT }}
                  style={{
                    background: `linear-gradient(145deg, ${C.card} 0%, rgba(59,158,255,0.025) 100%)`,
                    border: `1px solid ${C.border}`, borderRadius: "16px",
                    padding: "32px", display: "flex", flexDirection: "column", gap: "20px",
                  }}
                >
                  <div style={{ display: "flex", gap: "2px" }}>
                    {Array.from({ length: 5 }).map((_, s) => (
                      <span key={s} style={{ color: "#f59e0b", fontSize: "15px" }}>★</span>
                    ))}
                  </div>
                  <p style={{ fontSize: "15px", color: C.primary, lineHeight: 1.75, flex: 1, fontStyle: "italic", margin: 0 }}>
                    "{rev.text}"
                  </p>
                  <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "16px" }}>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: C.primary, margin: 0 }}>{rev.author}</p>
                    <p style={{ fontSize: "13px", color: C.secondary, marginTop: "2px", marginBottom: 0 }}>{rev.location}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA FINAL ───────────────────────────────────────────────────── */}
        <section
          id="contact"
          aria-label="Contact us"
          style={{
            padding: "120px 32px",
            position: "relative", overflow: "hidden",
          }}
        >
          <div aria-hidden="true" style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "700px", height: "420px",
            background: `radial-gradient(ellipse, rgba(59,158,255,0.08) 0%, transparent 70%)`,
            pointerEvents: "none",
          }} />

          <div style={{ maxWidth: "680px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EXPO_OUT }}
            >
              <Eyebrow>{d.cta.eyebrow}</Eyebrow>
              <h2 style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(36px, 5vw, 68px)",
                fontWeight: 400, letterSpacing: "-0.02em",
                color: C.primary, marginBottom: "16px", lineHeight: 1.1,
              }}>
                {d.cta.title}
              </h2>
              <p style={{ fontSize: "18px", color: C.secondary, lineHeight: 1.65, marginBottom: "48px" }}>
                {d.cta.sub}
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <motion.a
                  href={TEL}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    background: C.accent, borderRadius: "8px", color: "#fff",
                    fontSize: "16px", fontWeight: 600, padding: "16px 32px",
                    textDecoration: "none",
                  }}
                >
                  📞 {d.cta.callCta}
                </motion.a>
                <motion.a
                  href={WA}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    background: "transparent", borderRadius: "8px", color: C.primary,
                    fontSize: "16px", fontWeight: 600, padding: "16px 32px",
                    textDecoration: "none", border: `1px solid ${C.border}`,
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accentBright }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border }}
                >
                  💬 {d.cta.waCta}
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ──────────────────────────────────────────────────────── */}
      <footer style={{ padding: "48px 32px", borderTop: `1px solid ${C.border}` }}>
        <div style={{
          maxWidth: "1280px", margin: "0 auto",
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-start", flexWrap: "wrap", gap: "32px",
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <rect width="28" height="28" rx="7" fill={C.accent} />
                <path d="M14 6 L17 11 L22 11 L18 15 L20 20 L14 17 L8 20 L10 15 L6 11 L11 11 Z" fill="white" fillRule="evenodd" />
              </svg>
              <span style={{ fontSize: "14px", fontWeight: 600, color: C.primary }}>Pinnacle Plumbing Sewer & Drain</span>
            </div>
            <address style={{ fontStyle: "normal" }}>
              <p style={{ fontSize: "14px", color: C.secondary, margin: 0 }}>{d.footer.address}</p>
              <p style={{ fontSize: "14px", color: C.secondary, margin: "2px 0 0" }}>{d.footer.region}</p>
              <p style={{ fontSize: "14px", color: C.secondary, margin: "6px 0 0" }}>{d.footer.hours}</p>
            </address>
          </div>
          <div style={{ textAlign: "right" }}>
            <a
              href={TEL}
              style={{ fontSize: "22px", fontWeight: 700, color: C.primary, textDecoration: "none", display: "block", letterSpacing: "-0.5px", marginBottom: "6px" }}
            >
              (201) 419-4016
            </a>
            <p style={{ fontSize: "12px", color: C.secondary, margin: 0 }}>{d.footer.rights}</p>
          </div>
        </div>
      </footer>

      {/* ─── MOBILE STICKY BAR ───────────────────────────────────────────── */}
      <div
        className="mobile-bar"
        role="navigation"
        aria-label="Mobile quick contact"
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 150,
          height: "64px", gridTemplateColumns: "1fr 1fr",
          backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          borderTop: `1px solid ${C.border}`,
          background: "rgba(7,8,10,0.96)",
          padding: "8px 12px",
          gap: "8px",
        }}
      >
        <a
          href={TEL}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
            background: C.accent, color: "#fff", fontSize: "15px", fontWeight: 600,
            textDecoration: "none", borderRadius: "8px",
          }}
        >
          {d.bar.call}
        </a>
        <a
          href={WA}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
            background: "#25d366", color: "#fff", fontSize: "15px", fontWeight: 600,
            textDecoration: "none", borderRadius: "8px",
          }}
        >
          {d.bar.wa}
        </a>
      </div>
    </div>
  )
}
