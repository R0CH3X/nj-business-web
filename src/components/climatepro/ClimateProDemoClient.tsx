"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView, useMotionValue, animate, AnimatePresence } from "framer-motion"

const C = {
  canvas:  "#fafafa",
  card:    "#ffffff",
  border:  "#e5e7eb",
  text:    "#111827",
  muted:   "#6b7280",
  teal:    "#0891b2",
  tealDk:  "#0e7490",
  tealLt:  "#e0f2fe",
  amber:   "#d97706",
  amberLt: "#fef3c7",
} as const

const EXPO = [0.16, 1, 0.3, 1] as const

const IMG = {
  heroBg:      "https://images.pexels.com/photos/5708882/pexels-photo-5708882.jpeg?auto=compress&w=1600",
  ac:          "https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg?auto=compress&w=400",
  heating:     "https://images.pexels.com/photos/3811082/pexels-photo-3811082.jpeg?auto=compress&w=400",
  duct:        "https://images.pexels.com/photos/5486523/pexels-photo-5486523.jpeg?auto=compress&w=400",
  thermostat:  "https://images.pexels.com/photos/6489083/pexels-photo-6489083.jpeg?auto=compress&w=400",
  airQuality:  "https://images.pexels.com/photos/5490276/pexels-photo-5490276.jpeg?auto=compress&w=400",
  maintenance: "https://images.pexels.com/photos/7641842/pexels-photo-7641842.jpeg?auto=compress&w=400",
  about:       "https://images.pexels.com/photos/5108376/pexels-photo-5108376.jpeg?auto=compress&w=800",
}

const PHONE_RAW  = "6095550371"
const PHONE_DISP = "(609) 555-0371"
const WHATSAPP   = `https://wa.me/${PHONE_RAW}?text=Hi!%20I%20found%20you%20online%20and%20I'm%20interested%20in%20HVAC%20service.`
const CALL_URL   = `tel:+1${PHONE_RAW}`

const content = {
  en: {
    nav: {
      links: ["Services", "About", "Reviews", "Contact"],
      cta: "Call Now",
    },
    hero: {
      badge: "NATE-Certified Technicians",
      headline: ["Stay Comfortable", "Year-Round"],
      sub: "Expert heating, cooling & air quality solutions. Licensed technicians keeping New Jersey homes comfortable in every season.",
      cta1: "Call (609) 555-0371",
      cta2: "WhatsApp Us",
    },
    trust: {
      items: [
        { icon: "★", label: "4.9 Google Rating" },
        { icon: "🏅", label: "NATE Certified" },
        { icon: "⚡", label: "Same-Day Service" },
        { icon: "💲", label: "Upfront Pricing" },
      ],
    },
    stats: [
      { end: 18, suffix: "+", label: "Years in Business" },
      { end: 220, suffix: "+", label: "Google Reviews" },
      { end: 4, suffix: ".9★", label: "Avg. Rating", decimal: false },
      { end: 100, suffix: "%", label: "Licensed & Insured" },
    ],
    services: {
      title: "What We Do",
      sub: "Comprehensive HVAC services for New Jersey homes and businesses.",
      items: [
        { img: IMG.ac,          title: "AC Repair & Install",   desc: "Keep cool all summer. We service all major AC brands and install energy-efficient systems sized right for your home." },
        { img: IMG.heating,     title: "Heating Services",      desc: "Furnaces, heat pumps, and boilers — we keep you warm when it matters most. Emergency heat service available." },
        { img: IMG.duct,        title: "Duct Cleaning",         desc: "Clean ducts mean cleaner air and better efficiency. Our certified technicians remove years of buildup safely." },
        { img: IMG.thermostat,  title: "Thermostat Upgrades",   desc: "Smart thermostats save you money. We install and program Nest, Ecobee, and all major smart home systems." },
        { img: IMG.airQuality,  title: "Indoor Air Quality",    desc: "Allergy season? We install whole-home air purifiers, UV systems, and humidifiers for healthier indoor air." },
        { img: IMG.maintenance, title: "Maintenance Plans",     desc: "Annual tune-ups that prevent breakdowns and extend equipment life. Priority scheduling for plan members." },
      ],
    },
    about: {
      label: "Our Story",
      title: "18 Years Keeping NJ Comfortable",
      body: "For 18 years, ClimatePro HVAC has been keeping New Jersey families comfortable through scorching summers and freezing winters. Our NATE-certified technicians combine old-school craftsmanship with the latest energy-efficient technology. We don't just fix systems — we build relationships based on honest advice, fair pricing, and work that stands the test of time.",
      bullets: [
        "Upfront pricing — no hidden fees",
        "Same-day service available",
        "NATE-certified technicians",
      ],
      cta: "Schedule Service",
    },
    reviews: {
      title: "What Customers Say",
      items: [
        { name: "Maria T.",    rating: 5, text: "ClimatePro was at my door within 2 hours on a 95-degree day. Fixed my AC fast, fair price. They're the only HVAC company I call." },
        { name: "James R.",   rating: 5, text: "Used them for a full system replacement. The crew was professional, clean, and finished on time. My energy bill dropped 30%." },
        { name: "Sandra L.",  rating: 5, text: "Signed up for the maintenance plan last year. Two tune-ups in and my 15-year-old furnace is running better than ever. Worth every penny." },
        { name: "Kevin M.",   rating: 5, text: "Called at 11pm for a heating emergency. They came, no attitude, got it done. Genuine people who care about their customers." },
      ],
    },
    contact: {
      title: "Ready to Schedule?",
      sub: "Call, text, or WhatsApp us. We typically respond within 30 minutes.",
      address: "890 Route 33, Trenton, NJ 08619",
      email: "info@climateprohvac.com",
      hours: "Mon–Sat 7am–8pm · Emergency 24/7",
      cta1: "Call Now",
      cta2: "WhatsApp",
    },
    footer: {
      tagline: "Keeping New Jersey comfortable for 18 years.",
      links: ["Services", "About", "Reviews", "Contact"],
      copy: `© ${new Date().getFullYear()} ClimatePro HVAC. All rights reserved. · Trenton, NJ`,
    },
    sticky: {
      call: "Call Now",
      whatsapp: "WhatsApp",
      lang: "ES",
    },
  },
  es: {
    nav: {
      links: ["Servicios", "Nosotros", "Reseñas", "Contacto"],
      cta: "Llamar",
    },
    hero: {
      badge: "Técnicos Certificados NATE",
      headline: ["Comodidad en", "Cualquier Temporada"],
      sub: "Soluciones expertos de calefacción, refrigeración y calidad del aire. Técnicos con licencia manteniendo hogares en Nueva Jersey cómodos en cada estación.",
      cta1: "Llamar (609) 555-0371",
      cta2: "WhatsApp",
    },
    trust: {
      items: [
        { icon: "★", label: "4.9 en Google" },
        { icon: "🏅", label: "Certificados NATE" },
        { icon: "⚡", label: "Servicio el Mismo Día" },
        { icon: "💲", label: "Precios Transparentes" },
      ],
    },
    stats: [
      { end: 18, suffix: "+", label: "Años de Experiencia" },
      { end: 220, suffix: "+", label: "Reseñas en Google" },
      { end: 4, suffix: ".9★", label: "Calificación Promedio", decimal: false },
      { end: 100, suffix: "%", label: "Con Licencia y Seguro" },
    ],
    services: {
      title: "Nuestros Servicios",
      sub: "Servicios completos de HVAC para hogares y negocios en Nueva Jersey.",
      items: [
        { img: IMG.ac,          title: "Reparación e Instalación de AC", desc: "Manténgase fresco todo el verano. Atendemos todas las marcas principales e instalamos sistemas de alta eficiencia." },
        { img: IMG.heating,     title: "Servicios de Calefacción",        desc: "Hornos, bombas de calor y calderas — lo mantenemos cálido cuando más lo necesita. Servicio de emergencia disponible." },
        { img: IMG.duct,        title: "Limpieza de Ductos",              desc: "Ductos limpios significan mejor calidad del aire y mayor eficiencia. Nuestros técnicos eliminan años de acumulación." },
        { img: IMG.thermostat,  title: "Actualización de Termostatos",    desc: "Los termostatos inteligentes ahorran dinero. Instalamos y programamos Nest, Ecobee y todos los sistemas principales." },
        { img: IMG.airQuality,  title: "Calidad del Aire Interior",       desc: "¿Temporada de alergias? Instalamos purificadores de aire completos, sistemas UV y humidificadores." },
        { img: IMG.maintenance, title: "Planes de Mantenimiento",         desc: "Mantenimientos anuales que previenen averías y prolongan la vida del equipo. Programación prioritaria para miembros." },
      ],
    },
    about: {
      label: "Nuestra Historia",
      title: "18 Años Cuidando NJ",
      body: "Durante 18 años, ClimatePro HVAC ha mantenido cómodas a las familias de Nueva Jersey a través de veranos sofocantes e inviernos helados. Nuestros técnicos certificados NATE combinan la artesanía de la vieja escuela con la tecnología más eficiente en energía. No solo reparamos sistemas — construimos relaciones basadas en consejos honestos, precios justos y trabajo que perdura.",
      bullets: [
        "Precios transparentes — sin costos ocultos",
        "Servicio disponible el mismo día",
        "Técnicos certificados NATE",
      ],
      cta: "Programar Servicio",
    },
    reviews: {
      title: "Opiniones de Clientes",
      items: [
        { name: "Maria T.",   rating: 5, text: "ClimatePro llegó en 2 horas en un día de 95 grados. Arreglaron mi AC rápido y a buen precio. Son los únicos que llamo." },
        { name: "James R.",  rating: 5, text: "Los usé para reemplazar todo el sistema. El equipo fue profesional, limpio y terminó a tiempo. Mi factura de electricidad bajó 30%." },
        { name: "Sandra L.", rating: 5, text: "Me inscribí en el plan de mantenimiento el año pasado. Mi calefactor de 15 años funciona mejor que nunca. Vale cada centavo." },
        { name: "Kevin M.",  rating: 5, text: "Llamé a las 11pm por emergencia de calefacción. Vinieron sin problema y lo resolvieron. Gente genuina que se preocupa." },
      ],
    },
    contact: {
      title: "¿Listo para Programar?",
      sub: "Llame, envíe un mensaje o escríbanos por WhatsApp. Respondemos en 30 minutos.",
      address: "890 Route 33, Trenton, NJ 08619",
      email: "info@climateprohvac.com",
      hours: "Lun–Sáb 7am–8pm · Emergencias 24/7",
      cta1: "Llamar Ahora",
      cta2: "WhatsApp",
    },
    footer: {
      tagline: "Manteniendo a Nueva Jersey cómoda por 18 años.",
      links: ["Servicios", "Nosotros", "Reseñas", "Contacto"],
      copy: `© ${new Date().getFullYear()} ClimatePro HVAC. Todos los derechos reservados. · Trenton, NJ`,
    },
    sticky: {
      call: "Llamar",
      whatsapp: "WhatsApp",
      lang: "EN",
    },
  },
}

type Lang = "en" | "es"

function Counter({ end, suffix, decimal = false }: { end: number; suffix: string; decimal?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const count = useMotionValue(0)
  const [display, setDisplay] = useState(decimal ? "0.0" : "0")
  useEffect(() => {
    if (!inView) return
    const ctrl = animate(count, end, {
      duration: 1.8,
      ease: EXPO as [number, number, number, number],
      onUpdate(v) { setDisplay(decimal ? v.toFixed(1) : String(Math.floor(v))) },
    })
    return () => ctrl.stop()
  }, [inView, count, end, decimal])
  return <span ref={ref}>{display}{suffix}</span>
}

export default function ClimateProDemoClient() {
  const [lang, setLang] = useState<Lang>("en")
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [reviewIdx, setReviewIdx] = useState(0)
  const t = content[lang]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMenuOpen(false)
  }

  const sectionIds = ["services", "about", "reviews", "contact"]

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: C.canvas, color: C.text, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* ─── NAV ─────────────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? "rgba(250,250,250,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        transition: "all 0.3s ease",
        padding: "0 24px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: C.teal, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: 16 }}>❄</span>
            </div>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, fontWeight: 400, color: C.text }}>ClimatePro HVAC</span>
          </div>

          {/* Desktop links */}
          <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="desktop-nav">
            {t.nav.links.map((link, i) => (
              <button key={i} onClick={() => scrollTo(sectionIds[i])} style={{
                background: "none", border: "none", cursor: "pointer",
                color: C.muted, fontSize: 14, fontWeight: 500, transition: "color 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.color = C.teal)}
                onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
              >{link}</button>
            ))}
            <button onClick={() => setLang(lang === "en" ? "es" : "en")} style={{
              background: C.tealLt, border: "none", cursor: "pointer",
              color: C.tealDk, fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 4,
            }}>{t.sticky.lang}</button>
            <a href={CALL_URL} style={{
              background: C.teal, color: "#fff", padding: "8px 20px", borderRadius: 6,
              fontSize: 14, fontWeight: 600, textDecoration: "none",
            }}>{t.nav.cta}</a>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            display: "none", background: "none", border: "none", cursor: "pointer",
            color: C.text, fontSize: 22,
          }} className="mobile-hamburger">☰</button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              style={{ background: C.card, borderTop: `1px solid ${C.border}`, padding: "16px 24px" }}
            >
              {t.nav.links.map((link, i) => (
                <button key={i} onClick={() => scrollTo(sectionIds[i])} style={{
                  display: "block", width: "100%", textAlign: "left", background: "none",
                  border: "none", cursor: "pointer", color: C.text, fontSize: 16,
                  padding: "12px 0", borderBottom: `1px solid ${C.border}`,
                }}>{link}</button>
              ))}
              <div style={{ display: "flex", gap: 12, paddingTop: 16 }}>
                <a href={CALL_URL} style={{ flex: 1, background: C.teal, color: "#fff", textAlign: "center", padding: "12px", borderRadius: 6, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>{t.nav.cta}</a>
                <button onClick={() => setLang(lang === "en" ? "es" : "en")} style={{ background: C.tealLt, border: "none", cursor: "pointer", color: C.tealDk, padding: "12px 16px", borderRadius: 6, fontWeight: 600 }}>{t.sticky.lang}</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ─── HERO ────────────────────────────────────────────── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 64 }}>
        {/* Background image — right half */}
        <div style={{
          position: "absolute", top: 0, right: 0, width: "52%", height: "100%",
          background: `url(${IMG.heroBg}) center/cover no-repeat`,
        }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #fafafa 0%, transparent 30%)" }} />
        </div>

        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "80px 24px", width: "100%", zIndex: 1 }}>
          <div style={{ maxWidth: 580 }}>
            <motion.div
              initial={{ y: 12 }} animate={{ y: 0 }}
              transition={{ duration: 0.5, ease: EXPO }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: C.tealLt, color: C.tealDk, borderRadius: 20,
                padding: "5px 14px", fontSize: 12, fontWeight: 600, marginBottom: 24,
                letterSpacing: "0.05em", textTransform: "uppercase",
              }}
            >
              <span>🏅</span> {t.hero.badge}
            </motion.div>

            <div style={{ overflow: "hidden" }}>
              {t.hero.headline.map((line, i) => (
                <motion.h1
                  key={i}
                  initial={{ y: 40 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: EXPO }}
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "clamp(40px, 5.5vw, 72px)",
                    fontWeight: 400, lineHeight: 1.05,
                    color: C.text, letterSpacing: "-0.02em",
                  }}
                >{line}</motion.h1>
              ))}
            </div>

            <motion.p
              initial={{ y: 12 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: EXPO }}
              style={{ fontSize: 17, color: C.muted, lineHeight: 1.65, marginTop: 20, maxWidth: 480 }}
            >{t.hero.sub}</motion.p>

            <motion.div
              initial={{ y: 12 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: EXPO }}
              style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 32 }}
            >
              <a href={CALL_URL} style={{
                background: C.teal, color: "#fff", padding: "14px 28px",
                borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: "none",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span>📞</span> {t.hero.cta1}
              </a>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{
                background: "#25d366", color: "#fff", padding: "14px 28px",
                borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: "none",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span>💬</span> {t.hero.cta2}
              </a>
            </motion.div>

            {/* Mobile: trust pills */}
            <motion.div
              initial={{ y: 8 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: EXPO }}
              style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 28 }}
            >
              {t.trust.items.map((item, i) => (
                <span key={i} style={{
                  background: C.card, border: `1px solid ${C.border}`,
                  borderRadius: 20, padding: "5px 12px", fontSize: 12,
                  color: C.muted, fontWeight: 500,
                }}>{item.icon} {item.label}</span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── STATS ───────────────────────────────────────────── */}
      <section style={{ background: C.teal, padding: "48px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
          {t.stats.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 400, color: "#fff", lineHeight: 1 }}>
                <Counter end={s.end} suffix={s.suffix} decimal={s.decimal} />
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginTop: 6, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SERVICES ────────────────────────────────────────── */}
      <section id="services" style={{ padding: "96px 24px", background: C.canvas }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: C.teal, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Services</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, color: C.text }}>{t.services.title}</h2>
            <p style={{ color: C.muted, fontSize: 16, marginTop: 12, maxWidth: 520, margin: "12px auto 0" }}>{t.services.sub}</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            {t.services.items.map((svc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: EXPO }}
                style={{
                  background: C.card, border: `1px solid ${C.border}`, borderRadius: 12,
                  overflow: "hidden",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                }}
              >
                <div style={{ height: 200, overflow: "hidden" }}>
                  <img
                    src={svc.img} alt={svc.title} loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s ease" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                  />
                </div>
                <div style={{ padding: "20px 24px 24px" }}>
                  <h3 style={{ fontSize: 17, fontWeight: 600, color: C.text, marginBottom: 8 }}>{svc.title}</h3>
                  <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{svc.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ───────────────────────────────────────────── */}
      <section id="about" style={{ padding: "96px 24px", background: "#f0f9ff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EXPO }}
            style={{ borderRadius: 12, overflow: "hidden", boxShadow: "0 8px 32px rgba(8,145,178,0.12)" }}
          >
            <img src={IMG.about} alt="ClimatePro HVAC technician" style={{ width: "100%", display: "block" }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EXPO }}
          >
            <p style={{ fontSize: 12, fontWeight: 600, color: C.teal, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>{t.about.label}</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 400, color: C.text, marginBottom: 20, lineHeight: 1.2 }}>{t.about.title}</h2>
            <p style={{ fontSize: 16, color: C.muted, lineHeight: 1.7, marginBottom: 24 }}>{t.about.body}</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
              {t.about.bullets.map((b, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: C.text, fontWeight: 500 }}>
                  <span style={{ width: 20, height: 20, borderRadius: "50%", background: C.teal, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ color: "#fff", fontSize: 10 }}>✓</span>
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <a href={CALL_URL} style={{
              display: "inline-block", background: C.teal, color: "#fff",
              padding: "13px 28px", borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: "none",
            }}>{t.about.cta}</a>
          </motion.div>
        </div>
      </section>

      {/* ─── REVIEWS ─────────────────────────────────────────── */}
      <section id="reviews" style={{ padding: "96px 24px", background: C.canvas }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: C.teal, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Testimonials</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 400, color: C.text }}>{t.reviews.title}</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {t.reviews.items.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EXPO }}
                style={{
                  background: C.card, border: `1px solid ${C.border}`, borderRadius: 12,
                  padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                }}
              >
                <div style={{ color: C.amber, fontSize: 14, marginBottom: 12 }}>{"★".repeat(r.rating)}</div>
                <p style={{ fontSize: 14, color: C.text, lineHeight: 1.65, marginBottom: 16 }}>&ldquo;{r.text}&rdquo;</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: C.teal, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>{r.name[0]}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{r.name}</div>
                    <div style={{ fontSize: 11, color: C.muted }}>Verified Google Review</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─────────────────────────────────────────── */}
      <section id="contact" style={{ padding: "80px 24px", background: C.text }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, color: "#fff", marginBottom: 16 }}>{t.contact.title}</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", marginBottom: 40, lineHeight: 1.6 }}>{t.contact.sub}</p>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16, marginBottom: 40 }}>
            <a href={CALL_URL} style={{
              background: C.teal, color: "#fff", padding: "14px 32px", borderRadius: 8,
              fontSize: 15, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 8,
            }}>📞 {t.contact.cta1}</a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{
              background: "#25d366", color: "#fff", padding: "14px 32px", borderRadius: 8,
              fontSize: 15, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 8,
            }}>💬 {t.contact.cta2}</a>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 32 }}>
            {[
              { icon: "📍", text: t.contact.address },
              { icon: "✉", text: t.contact.email },
              { icon: "🕐", text: t.contact.hours },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>{item.icon}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────────── */}
      <footer style={{ background: "#0a0a0a", padding: "40px 24px 100px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24, marginBottom: 32, paddingBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <div>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#fff", marginBottom: 4 }}>ClimatePro HVAC</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{t.footer.tagline}</div>
            </div>
            <div style={{ display: "flex", gap: 24 }}>
              {t.footer.links.map((link, i) => (
                <button key={i} onClick={() => scrollTo(sectionIds[i])} style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "rgba(255,255,255,0.4)", fontSize: 13, transition: "color 0.2s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                >{link}</button>
              ))}
            </div>
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", textAlign: "center" }}>{t.footer.copy}</div>
        </div>
      </footer>

      {/* ─── MOBILE STICKY BAR ───────────────────────────────── */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
        background: C.card, borderTop: `1px solid ${C.border}`,
        display: "grid", gridTemplateColumns: "1fr 1fr auto",
        padding: "10px 12px", gap: 8,
        boxShadow: "0 -2px 16px rgba(0,0,0,0.08)",
      }}>
        <a href={CALL_URL} style={{
          background: C.teal, color: "#fff", borderRadius: 8, padding: "12px 0",
          textAlign: "center", fontSize: 13, fontWeight: 600, textDecoration: "none",
        }}>📞 {t.sticky.call}</a>
        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{
          background: "#25d366", color: "#fff", borderRadius: 8, padding: "12px 0",
          textAlign: "center", fontSize: 13, fontWeight: 600, textDecoration: "none",
        }}>💬 {t.sticky.whatsapp}</a>
        <button onClick={() => setLang(lang === "en" ? "es" : "en")} style={{
          background: C.tealLt, border: "none", cursor: "pointer",
          color: C.tealDk, borderRadius: 8, padding: "12px 14px", fontWeight: 700, fontSize: 12,
        }}>{t.sticky.lang}</button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: block !important; }
        }
        @media (min-width: 769px) {
          .desktop-nav { display: flex !important; }
          .mobile-hamburger { display: none !important; }
        }
        @media (max-width: 640px) {
          #about > div > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
