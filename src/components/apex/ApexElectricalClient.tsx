"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView, useMotionValue, animate, AnimatePresence } from "framer-motion"

const C = {
  canvas:   "#0a0a0a",
  card:     "#111111",
  cardHov:  "#161616",
  border:   "#222222",
  text:     "#f5f5f5",
  muted:    "#888888",
  yellow:   "#fbbf24",
  yellowDk: "#d97706",
  yellowBg: "#1a1500",
} as const

const EXPO = [0.16, 1, 0.3, 1] as const

const IMG = {
  heroBg:    "https://images.pexels.com/photos/5699823/pexels-photo-5699823.jpeg?auto=compress&w=1600",
  panel:     "https://images.pexels.com/photos/9856964/pexels-photo-9856964.jpeg?auto=compress&w=400",
  evCharger: "https://images.pexels.com/photos/7195266/pexels-photo-7195266.jpeg?auto=compress&w=400",
  lighting:  "https://images.pexels.com/photos/705070/pexels-photo-705070.jpeg?auto=compress&w=400",
  rewiring:  "https://images.pexels.com/photos/2539462/pexels-photo-2539462.jpeg?auto=compress&w=400",
  inspect:   "https://images.pexels.com/photos/4474052/pexels-photo-4474052.jpeg?auto=compress&w=400",
  emergency: "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&w=400",
  about:     "https://images.pexels.com/photos/5699822/pexels-photo-5699822.jpeg?auto=compress&w=800",
}

const PHONE_RAW  = "2015550100"
const PHONE_DISP = "(201) 555-0100"
const WHATSAPP   = `https://wa.me/${PHONE_RAW}?text=Hi!%20I%20found%20you%20online%20and%20need%20electrical%20service.`
const CALL_URL   = `tel:+1${PHONE_RAW}`

const content = {
  en: {
    nav: {
      links: ["Services", "About", "Reviews", "Contact"],
      cta: "Call Now",
    },
    hero: {
      badge: "Licensed & Fully Insured",
      pre: "North Jersey's Trusted",
      headline: "Electrical",
      headline2: "Contractors",
      sub: "Panel upgrades, EV chargers, rewiring, and 24/7 emergency electrical. 5.0★ rated, 15+ years serving Bergen, Hudson & Passaic County.",
      cta1: `Call ${PHONE_DISP}`,
      cta2: "WhatsApp",
    },
    stats: [
      { end: 15, suffix: "+", label: "Years Experience" },
      { end: 80, suffix: "+", label: "Google Reviews" },
      { end: 5, suffix: ".0★", label: "Rating" },
      { end: 24, suffix: "/7", label: "Emergency Service" },
    ],
    services: {
      title: "Our Services",
      sub: "Residential and commercial electrical work done right — safe, clean, and code-compliant.",
      items: [
        { img: IMG.panel,     title: "Panel Upgrades",               desc: "Outdated panel? We upgrade to 200A or higher — safely, to code, with permits pulled and inspections passed." },
        { img: IMG.evCharger, title: "EV Charger Installation",      desc: "Level 2 home EV charger installation for all major brands. We handle permits and utility coordination." },
        { img: IMG.emergency, title: "Emergency Electrical 24/7",    desc: "Power outage, tripped breakers, sparks? We respond fast, day or night, 365 days a year." },
        { img: IMG.lighting,  title: "Lighting Installation",        desc: "Recessed lighting, ceiling fans, outdoor fixtures, LED upgrades — professional installation every time." },
        { img: IMG.rewiring,  title: "Rewiring",                     desc: "Old knob-and-tube or aluminum wiring? We rewire safely and up to current NEC standards." },
        { img: IMG.inspect,   title: "Code Compliance Inspections",  desc: "Buying or selling a home? Our inspections identify code violations before they become costly problems." },
      ],
    },
    about: {
      label: "About Us",
      title: "15 Years of Precision Electrical Work",
      body: "Apex Electrical Contractors has served North Jersey homeowners and businesses for over 15 years with one guiding principle: safety first, always. We're fully licensed, bonded, and insured — and we treat every job, big or small, with the same attention to detail. Our crews show up on time, work clean, and don't leave until the job is right.",
      bullets: [
        "Licensed & fully insured in NJ",
        "Same-day emergency response",
        "Up-front, transparent pricing",
      ],
      cta: "Schedule Inspection",
    },
    reviews: {
      title: "5.0★ on Google",
      sub: "80+ reviews from real customers across North Jersey.",
      items: [
        { name: "Thomas B.",  rating: 5, text: "Apex upgraded my panel and installed 3 EV chargers in one day. Crew was professional, fast, and spotless. Will call them for everything." },
        { name: "Rachel D.",  rating: 5, text: "Called at 9pm for an emergency — sparks from an outlet. They were there in under an hour. Fixed it, explained what caused it, fair price." },
        { name: "Carlos V.",  rating: 5, text: "Had my whole house rewired. They pulled all the permits, passed inspection first try. Price was exactly what they quoted. Highly recommend." },
        { name: "Diane K.",   rating: 5, text: "Got a code inspection before selling my house. They found 2 issues, fixed them same day, and I closed without a problem. Lifesavers." },
      ],
    },
    contact: {
      title: "Get a Free Estimate",
      sub: "Call or WhatsApp anytime. Emergency line open 24/7.",
      address: "Serving Bergen, Hudson & Passaic County, NJ",
      hours: "Mon–Fri 7am–7pm · Sat 8am–5pm · Emergency 24/7",
      cta1: "Call Now",
      cta2: "WhatsApp",
    },
    footer: {
      tagline: "Licensed electrical contractors serving North Jersey for 15+ years.",
      links: ["Services", "About", "Reviews", "Contact"],
      copy: `© ${new Date().getFullYear()} Apex Electrical Contractors. All rights reserved. · North Jersey, NJ`,
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
      badge: "Licenciados y Asegurados",
      pre: "Electricistas de Confianza en",
      headline: "North Jersey",
      headline2: "",
      sub: "Actualización de paneles, cargadores para autos eléctricos, recableado y emergencias eléctricas 24/7. Calificación 5.0★, 15+ años sirviendo Bergen, Hudson y Passaic County.",
      cta1: `Llamar ${PHONE_DISP}`,
      cta2: "WhatsApp",
    },
    stats: [
      { end: 15, suffix: "+", label: "Años de Experiencia" },
      { end: 80, suffix: "+", label: "Reseñas en Google" },
      { end: 5, suffix: ".0★", label: "Calificación" },
      { end: 24, suffix: "/7", label: "Emergencias" },
    ],
    services: {
      title: "Nuestros Servicios",
      sub: "Trabajo eléctrico residencial y comercial hecho correctamente — seguro, limpio y conforme al código.",
      items: [
        { img: IMG.panel,     title: "Actualización de Paneles",        desc: "¿Panel desactualizado? Actualizamos a 200A o más — de forma segura, con permisos y aprobaciones." },
        { img: IMG.evCharger, title: "Instalación de Cargadores EV",    desc: "Instalación de cargador doméstico Nivel 2 para todas las marcas principales. Manejamos permisos y coordinación." },
        { img: IMG.emergency, title: "Emergencias Eléctricas 24/7",     desc: "¿Corte de luz, chispas o problemas? Respondemos rápido, de día o de noche, los 365 días del año." },
        { img: IMG.lighting,  title: "Instalación de Iluminación",      desc: "Iluminación empotrada, ventiladores, accesorios exteriores y actualizaciones LED — instalación profesional." },
        { img: IMG.rewiring,  title: "Recableado",                      desc: "¿Cableado antiguo? Recableamos de forma segura y según los estándares actuales del NEC." },
        { img: IMG.inspect,   title: "Inspecciones de Cumplimiento",    desc: "¿Comprando o vendiendo? Nuestras inspecciones identifican violaciones al código antes de que cuesten más." },
      ],
    },
    about: {
      label: "Sobre Nosotros",
      title: "15 Años de Trabajo Eléctrico de Precisión",
      body: "Apex Electrical Contractors ha servido a propietarios de viviendas y negocios en North Jersey por más de 15 años con un principio rector: la seguridad primero, siempre. Estamos completamente licenciados, afianzados y asegurados — y tratamos cada trabajo, grande o pequeño, con el mismo cuidado. Nuestros equipos llegan a tiempo, trabajan de forma limpia y no se van hasta que el trabajo esté correcto.",
      bullets: [
        "Licenciados y totalmente asegurados en NJ",
        "Respuesta de emergencia el mismo día",
        "Precios transparentes desde el principio",
      ],
      cta: "Programar Inspección",
    },
    reviews: {
      title: "5.0★ en Google",
      sub: "Más de 80 reseñas de clientes reales en North Jersey.",
      items: [
        { name: "Thomas B.", rating: 5, text: "Apex actualizó mi panel e instaló 3 cargadores EV en un día. El equipo fue profesional, rápido y muy limpio. Los llamaré para todo." },
        { name: "Rachel D.", rating: 5, text: "Llamé a las 9pm por una emergencia — chispas en un enchufe. Llegaron en menos de una hora. Lo arreglaron y explicaron la causa. Precio justo." },
        { name: "Carlos V.", rating: 5, text: "Tuve mi casa recableada por completo. Sacaron todos los permisos y pasaron la inspección al primer intento. El precio fue exacto al presupuesto." },
        { name: "Diane K.",  rating: 5, text: "Hice una inspección antes de vender mi casa. Encontraron 2 problemas, los arreglaron el mismo día y cerré sin problemas. ¡Los salvadores!" },
      ],
    },
    contact: {
      title: "Obtenga un Presupuesto Gratis",
      sub: "Llame o escriba por WhatsApp en cualquier momento. Línea de emergencia abierta 24/7.",
      address: "Sirviendo Bergen, Hudson y Passaic County, NJ",
      hours: "Lun–Vie 7am–7pm · Sáb 8am–5pm · Emergencias 24/7",
      cta1: "Llamar Ahora",
      cta2: "WhatsApp",
    },
    footer: {
      tagline: "Electricistas con licencia sirviendo North Jersey por 15+ años.",
      links: ["Servicios", "Nosotros", "Reseñas", "Contacto"],
      copy: `© ${new Date().getFullYear()} Apex Electrical Contractors. Todos los derechos reservados. · North Jersey, NJ`,
    },
    sticky: {
      call: "Llamar",
      whatsapp: "WhatsApp",
      lang: "EN",
    },
  },
}

type Lang = "en" | "es"

function Counter({ end, suffix }: { end: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const count = useMotionValue(0)
  const [display, setDisplay] = useState("0")
  useEffect(() => {
    if (!inView) return
    const ctrl = animate(count, end, {
      duration: 1.8,
      ease: EXPO as [number, number, number, number],
      onUpdate(v) { setDisplay(String(Math.floor(v))) },
    })
    return () => ctrl.stop()
  }, [inView, count, end])
  return <span ref={ref}>{display}{suffix}</span>
}

export default function ApexElectricalClient() {
  const [lang, setLang] = useState<Lang>("en")
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
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
    <div style={{ fontFamily: "'Inter', sans-serif", background: C.canvas, color: C.text, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* ─── NAV ─────────────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        transition: "all 0.3s ease",
        padding: "0 24px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 6, background: C.yellow, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#000", fontSize: 16, fontWeight: 700 }}>⚡</span>
            </div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 700, color: C.text, letterSpacing: "-0.02em" }}>APEX ELECTRICAL</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="apex-desktop-nav">
            {t.nav.links.map((link, i) => (
              <button key={i} onClick={() => scrollTo(sectionIds[i])} style={{
                background: "none", border: "none", cursor: "pointer",
                color: C.muted, fontSize: 13, fontWeight: 500, letterSpacing: "0.01em",
                transition: "color 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.color = C.yellow)}
                onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
              >{link}</button>
            ))}
            <button onClick={() => setLang(lang === "en" ? "es" : "en")} style={{
              background: C.yellowBg, border: `1px solid ${C.yellow}40`,
              cursor: "pointer", color: C.yellow, fontSize: 11, fontWeight: 700,
              padding: "4px 10px", borderRadius: 4, letterSpacing: "0.05em",
            }}>{t.sticky.lang}</button>
            <a href={CALL_URL} style={{
              background: C.yellow, color: "#000", padding: "8px 20px", borderRadius: 6,
              fontSize: 13, fontWeight: 700, textDecoration: "none", letterSpacing: "-0.01em",
            }}>{t.nav.cta}</a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            display: "none", background: "none", border: "none", cursor: "pointer",
            color: C.text, fontSize: 22,
          }} className="apex-hamburger">☰</button>
        </div>

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
                <a href={CALL_URL} style={{ flex: 1, background: C.yellow, color: "#000", textAlign: "center", padding: "12px", borderRadius: 6, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>{t.nav.cta}</a>
                <button onClick={() => setLang(lang === "en" ? "es" : "en")} style={{ background: C.yellowBg, border: `1px solid ${C.yellow}40`, cursor: "pointer", color: C.yellow, padding: "12px 16px", borderRadius: 6, fontWeight: 700, fontSize: 12 }}>{t.sticky.lang}</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ─── HERO ────────────────────────────────────────────── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        {/* Full-bleed BG */}
        <div style={{
          position: "absolute", inset: 0,
          background: `url(${IMG.heroBg}) center/cover no-repeat`,
        }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,10,10,0.96) 55%, rgba(10,10,10,0.6) 100%)" }} />
        </div>

        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "120px 24px 80px", width: "100%", zIndex: 1 }}>
          <motion.div
            initial={{ y: 12 }} animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: EXPO }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              border: `1px solid ${C.yellow}50`, color: C.yellow, borderRadius: 4,
              padding: "5px 12px", fontSize: 11, fontWeight: 700, marginBottom: 24,
              letterSpacing: "0.08em", textTransform: "uppercase",
              background: C.yellowBg,
            }}
          >⚡ {t.hero.badge}</motion.div>

          <motion.p
            initial={{ y: 8 }} animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: EXPO }}
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(14px, 2vw, 18px)", color: C.muted, marginBottom: 8, letterSpacing: "-0.01em" }}
          >{t.hero.pre}</motion.p>

          <div>
            <motion.h1
              initial={{ y: 40 }} animate={{ y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: EXPO }}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(52px, 10vw, 120px)",
                fontWeight: 700, lineHeight: 0.9,
                color: C.text, letterSpacing: "-0.04em",
              }}
            >{t.hero.headline}</motion.h1>
            {t.hero.headline2 && (
              <motion.h1
                initial={{ y: 40 }} animate={{ y: 0 }}
                transition={{ duration: 0.65, delay: 0.18, ease: EXPO }}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(52px, 10vw, 120px)",
                  fontWeight: 700, lineHeight: 0.9,
                  color: C.yellow, letterSpacing: "-0.04em",
                }}
              >{t.hero.headline2}</motion.h1>
            )}
          </div>

          <motion.p
            initial={{ y: 12 }} animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: EXPO }}
            style={{ fontSize: 16, color: C.muted, lineHeight: 1.65, marginTop: 24, maxWidth: 500 }}
          >{t.hero.sub}</motion.p>

          <motion.div
            initial={{ y: 12 }} animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: EXPO }}
            style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 32 }}
          >
            <a href={CALL_URL} style={{
              background: C.yellow, color: "#000", padding: "14px 28px",
              borderRadius: 6, fontSize: 14, fontWeight: 700, textDecoration: "none",
              display: "flex", alignItems: "center", gap: 8, letterSpacing: "-0.01em",
            }}>📞 {t.hero.cta1}</a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{
              background: "#25d366", color: "#fff", padding: "14px 28px",
              borderRadius: 6, fontSize: 14, fontWeight: 700, textDecoration: "none",
              display: "flex", alignItems: "center", gap: 8,
            }}>💬 {t.hero.cta2}</a>
          </motion.div>
        </div>
      </section>

      {/* ─── STATS ───────────────────────────────────────────── */}
      <section style={{ background: C.yellow, padding: "48px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
          {t.stats.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700, color: "#000", lineHeight: 1, letterSpacing: "-0.04em" }}>
                <Counter end={s.end} suffix={s.suffix} />
              </div>
              <div style={{ fontSize: 12, color: "rgba(0,0,0,0.55)", marginTop: 6, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SERVICES ────────────────────────────────────────── */}
      <section id="services" style={{ padding: "96px 24px", background: C.canvas }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 56 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: C.yellow, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Services</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: C.text, letterSpacing: "-0.03em" }}>{t.services.title}</h2>
            <p style={{ color: C.muted, fontSize: 15, marginTop: 12, maxWidth: 520 }}>{t.services.sub}</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 1, background: C.border }}>
            {t.services.items.map((svc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                style={{ background: C.card, padding: 0, overflow: "hidden" }}
                onMouseEnter={e => (e.currentTarget.style.background = C.cardHov)}
                onMouseLeave={e => (e.currentTarget.style.background = C.card)}
              >
                <div style={{ height: 200, overflow: "hidden", position: "relative" }}>
                  <img src={svc.img} alt={svc.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(transparent, rgba(10,10,10,0.8))" }} />
                </div>
                <div style={{ padding: "20px 24px 28px" }}>
                  <div style={{ width: 32, height: 2, background: C.yellow, marginBottom: 12 }} />
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 600, color: C.text, marginBottom: 8, letterSpacing: "-0.01em" }}>{svc.title}</h3>
                  <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.65 }}>{svc.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ───────────────────────────────────────────── */}
      <section id="about" style={{ padding: "96px 24px", background: "#050505" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EXPO }}
            style={{ order: 2 }}
          >
            <div style={{ borderRadius: 8, overflow: "hidden", border: `1px solid ${C.border}` }}>
              <img src={IMG.about} alt="Apex Electrical technician" style={{ width: "100%", display: "block" }} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EXPO }}
            style={{ order: 1 }}
          >
            <p style={{ fontSize: 11, fontWeight: 700, color: C.yellow, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>{t.about.label}</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 700, color: C.text, marginBottom: 20, lineHeight: 1.1, letterSpacing: "-0.03em" }}>{t.about.title}</h2>
            <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.75, marginBottom: 24 }}>{t.about.body}</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {t.about.bullets.map((b, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: C.text, fontWeight: 500 }}>
                  <span style={{ color: C.yellow, fontSize: 16, flexShrink: 0 }}>⚡</span>
                  {b}
                </li>
              ))}
            </ul>
            <a href={CALL_URL} style={{
              display: "inline-block", background: C.yellow, color: "#000",
              padding: "13px 28px", borderRadius: 6, fontSize: 14, fontWeight: 700, textDecoration: "none",
              letterSpacing: "-0.01em",
            }}>{t.about.cta}</a>
          </motion.div>
        </div>
      </section>

      {/* ─── REVIEWS ─────────────────────────────────────────── */}
      <section id="reviews" style={{ padding: "96px 24px", background: C.canvas }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 56 }}>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: C.text, letterSpacing: "-0.03em" }}>{t.reviews.title}</h2>
            <p style={{ color: C.muted, fontSize: 14, marginTop: 8 }}>{t.reviews.sub}</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {t.reviews.items.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                style={{
                  background: C.card, border: `1px solid ${C.border}`,
                  borderRadius: 8, padding: "24px",
                }}
              >
                <div style={{ color: C.yellow, fontSize: 13, marginBottom: 12, letterSpacing: 2 }}>{"★".repeat(r.rating)}</div>
                <p style={{ fontSize: 14, color: "rgba(245,245,245,0.8)", lineHeight: 1.65, marginBottom: 16 }}>&ldquo;{r.text}&rdquo;</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: C.yellow, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "#000", fontSize: 13, fontWeight: 700 }}>{r.name[0]}</span>
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
      <section id="contact" style={{ padding: "80px 24px", background: C.yellow }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 700, color: "#000", marginBottom: 16, letterSpacing: "-0.04em" }}>{t.contact.title}</h2>
          <p style={{ fontSize: 16, color: "rgba(0,0,0,0.6)", marginBottom: 40, lineHeight: 1.6 }}>{t.contact.sub}</p>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16, marginBottom: 40 }}>
            <a href={CALL_URL} style={{
              background: "#000", color: "#fff", padding: "14px 32px", borderRadius: 6,
              fontSize: 15, fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: 8,
            }}>📞 {t.contact.cta1}</a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{
              background: "#25d366", color: "#fff", padding: "14px 32px", borderRadius: 6,
              fontSize: 15, fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: 8,
            }}>💬 {t.contact.cta2}</a>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 32 }}>
            {[
              { icon: "📍", text: t.contact.address },
              { icon: "🕐", text: t.contact.hours },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>{item.icon}</div>
                <div style={{ fontSize: 13, color: "rgba(0,0,0,0.6)" }}>{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────────── */}
      <footer style={{ background: "#000", padding: "40px 24px 100px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24, marginBottom: 32, paddingBottom: 24, borderBottom: `1px solid ${C.border}` }}>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: C.text, letterSpacing: "-0.02em", marginBottom: 4 }}>APEX ELECTRICAL</div>
              <div style={{ fontSize: 12, color: C.muted }}>{t.footer.tagline}</div>
            </div>
            <div style={{ display: "flex", gap: 24 }}>
              {t.footer.links.map((link, i) => (
                <button key={i} onClick={() => scrollTo(sectionIds[i])} style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: C.muted, fontSize: 12, transition: "color 0.2s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = C.yellow)}
                  onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
                >{link}</button>
              ))}
            </div>
          </div>
          <div style={{ fontSize: 11, color: C.muted, textAlign: "center" }}>{t.footer.copy}</div>
        </div>
      </footer>

      {/* ─── MOBILE STICKY BAR ───────────────────────────────── */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
        background: C.card, borderTop: `1px solid ${C.border}`,
        display: "grid", gridTemplateColumns: "1fr 1fr auto",
        padding: "10px 12px", gap: 8,
        boxShadow: "0 -2px 16px rgba(0,0,0,0.4)",
      }}>
        <a href={CALL_URL} style={{
          background: C.yellow, color: "#000", borderRadius: 6, padding: "12px 0",
          textAlign: "center", fontSize: 13, fontWeight: 700, textDecoration: "none",
        }}>📞 {t.sticky.call}</a>
        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{
          background: "#25d366", color: "#fff", borderRadius: 6, padding: "12px 0",
          textAlign: "center", fontSize: 13, fontWeight: 700, textDecoration: "none",
        }}>💬 {t.sticky.whatsapp}</a>
        <button onClick={() => setLang(lang === "en" ? "es" : "en")} style={{
          background: C.yellowBg, border: `1px solid ${C.yellow}40`,
          cursor: "pointer", color: C.yellow, borderRadius: 6,
          padding: "12px 14px", fontWeight: 700, fontSize: 11,
        }}>{t.sticky.lang}</button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .apex-desktop-nav { display: none !important; }
          .apex-hamburger { display: block !important; }
        }
        @media (min-width: 769px) {
          .apex-desktop-nav { display: flex !important; }
          .apex-hamburger { display: none !important; }
        }
        @media (max-width: 640px) {
          #about > div > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
