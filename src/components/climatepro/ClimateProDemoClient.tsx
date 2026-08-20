"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView, useMotionValue, animate, AnimatePresence } from "framer-motion"

// ─── Raycast Design System ─────────────────────────────────────────────────────
const C = {
  canvas:  "#040506",
  card:    "#07080a",
  elev:    "#111214",
  border:  "#363739",
  borderA: "rgba(255,255,255,0.06)",
  text:    "#ffffff",
  sec:     "#9c9c9d",
  ter:     "#6a6b6c",
  blue:    "#3b9eff",
  ctaBg:   "#E6E6E6",
  ctaTxt:  "#2F3031",
} as const

const EXPO = [0.16, 1, 0.3, 1] as const

// Placeholder for pending approval — will be replaced with 31726758 on approval
const AIRQUALITY_IMG = "https://images.pexels.com/photos/32079707/pexels-photo-32079707.jpeg?auto=compress&w=600"

const IMG = {
  hero:    "https://images.pexels.com/photos/5463575/pexels-photo-5463575.jpeg?auto=compress&w=1600",
  ac:      "https://images.pexels.com/photos/5463581/pexels-photo-5463581.jpeg?auto=compress&w=600",
  heat:    "https://images.pexels.com/photos/20046689/pexels-photo-20046689.jpeg?auto=compress&w=600",
  duct:    "https://images.pexels.com/photos/11538226/pexels-photo-11538226.jpeg?auto=compress&w=600",
  therm:   "https://images.pexels.com/photos/7616651/pexels-photo-7616651.jpeg?auto=compress&w=600",
  airq:    AIRQUALITY_IMG,
  maint:   "https://images.pexels.com/photos/6471913/pexels-photo-6471913.jpeg?auto=compress&w=600",
  about:   "https://images.pexels.com/photos/32497161/pexels-photo-32497161.jpeg?auto=compress&w=900",
}

const PHONE_RAW  = "6095550371"
const PHONE_DISP = "(609) 555-0371"
const CALL_URL   = `tel:+1${PHONE_RAW}`

const copy = {
  en: {
    badge:   "NATE-Certified · Licensed · Insured",
    h1a:     "Stay Comfortable",
    h1b:     "Year-Round.",
    sub:     "Expert heating, cooling & air quality solutions for New Jersey homes. 4.9★ rated across 220+ Google reviews. 18+ years serving Trenton and all of NJ.",
    cta1:    `Call ${PHONE_DISP}`,
    cta2:    "WhatsApp",
    nav:     ["Services", "About", "Reviews", "Contact"],
    navCta:  "Call Now",
    stats: [
      { n: 18,  sfx: "+",   lbl: "Years in Business" },
      { n: 220, sfx: "+",   lbl: "Google Reviews"    },
      { n: 4,   sfx: ".9★", lbl: "Avg. Rating"       },
      { n: 100, sfx: "%",   lbl: "Licensed & Insured" },
    ],
    svcTitle: "Services",
    svcSub:   "Comprehensive HVAC solutions for New Jersey homes and businesses.",
    svcs: [
      { img: IMG.ac,    title: "AC Repair & Install",   desc: "All major brands serviced and installed. Energy-efficient systems sized right for your home. Emergency AC service available." },
      { img: IMG.heat,  title: "Heating Services",      desc: "Furnaces, heat pumps, and boilers. We keep you warm when it matters most — with emergency heat response available." },
      { img: IMG.duct,  title: "Duct Cleaning",         desc: "Certified technicians remove years of buildup safely. Clean ducts mean cleaner air and better system efficiency." },
      { img: IMG.therm, title: "Thermostat Upgrades",   desc: "Nest, Ecobee, and all major smart systems installed and programmed. Save money on every energy bill." },
      { img: IMG.airq,  title: "Indoor Air Quality",    desc: "Whole-home air purifiers, UV systems, and humidifiers. Real solutions for allergy season and year-round health." },
      { img: IMG.maint, title: "Maintenance Plans",     desc: "Annual tune-ups that prevent breakdowns and extend equipment life. Priority scheduling for plan members." },
    ],
    aboutLabel:   "Our Story",
    aboutTitle:   "18 Years Keeping NJ\nComfortable.",
    aboutBody:    "For 18 years, ClimatePro HVAC has been keeping New Jersey families comfortable through scorching summers and freezing winters. Our NATE-certified technicians combine old-school craftsmanship with the latest energy-efficient technology. We don't just fix systems — we build relationships based on honest advice, fair pricing, and work that stands the test of time.",
    aboutBullets: ["Upfront pricing — no hidden fees", "Same-day service available", "NATE-certified technicians"],
    aboutCta:     "Schedule Service",
    revTitle:     "What Customers Say.",
    revSub:       "220+ verified Google reviews from New Jersey homeowners.",
    reviews: [
      { name: "Maria T.",   text: "ClimatePro was at my door within 2 hours on a 95-degree day. Fixed my AC fast, fair price. They're the only HVAC company I call now." },
      { name: "James R.",   text: "Full system replacement — crew was professional, clean, finished on time. My energy bill dropped 30% the first month. Remarkable." },
      { name: "Sandra L.",  text: "Signed up for the maintenance plan. Two tune-ups in and my 15-year-old furnace is running better than ever. Worth every penny." },
      { name: "Kevin M.",   text: "Called at 11pm for a heating emergency. They came, no attitude, got it done. Genuine people who care about their customers." },
    ],
    contactTitle:   "Ready to Schedule?",
    contactSub:     "Call, text, or WhatsApp. We respond within 30 minutes during business hours.",
    contactDetails: [
      { icon: "📍", txt: "890 Route 33, Trenton, NJ 08619" },
      { icon: "✉",  txt: "info@climateprohvac.com" },
      { icon: "🕐", txt: "Mon–Sat 7am–8pm · Emergency 24/7" },
    ],
    footerTag:  "Keeping New Jersey comfortable for 18 years.",
    switchLang: "ES",
  },
  es: {
    badge:   "Certificados NATE · Con Licencia · Asegurados",
    h1a:     "Comodidad en",
    h1b:     "Cualquier Temporada.",
    sub:     "Soluciones expertas de calefacción, refrigeración y calidad del aire para hogares en Nueva Jersey. Calificación 4.9★ con 220+ reseñas en Google. 18+ años sirviendo Trenton y todo NJ.",
    cta1:    `Llamar ${PHONE_DISP}`,
    cta2:    "WhatsApp",
    nav:     ["Servicios", "Nosotros", "Reseñas", "Contacto"],
    navCta:  "Llamar",
    stats: [
      { n: 18,  sfx: "+",   lbl: "Años de Experiencia" },
      { n: 220, sfx: "+",   lbl: "Reseñas en Google"   },
      { n: 4,   sfx: ".9★", lbl: "Calificación Promedio" },
      { n: 100, sfx: "%",   lbl: "Licenciados y Asegurados" },
    ],
    svcTitle: "Servicios",
    svcSub:   "Soluciones completas de HVAC para hogares y negocios en Nueva Jersey.",
    svcs: [
      { img: IMG.ac,    title: "Reparación e Instalación de AC",  desc: "Todas las marcas principales. Sistemas de alta eficiencia instalados correctamente. Servicio de emergencia de AC disponible." },
      { img: IMG.heat,  title: "Servicios de Calefacción",         desc: "Hornos, bombas de calor y calderas. Lo mantenemos cálido cuando más lo necesita — con servicio de emergencia disponible." },
      { img: IMG.duct,  title: "Limpieza de Ductos",               desc: "Técnicos certificados eliminan años de acumulación de forma segura. Ductos limpios = mejor calidad de aire y eficiencia." },
      { img: IMG.therm, title: "Actualización de Termostatos",     desc: "Nest, Ecobee y todos los sistemas inteligentes principales instalados y programados. Ahorre en cada factura de energía." },
      { img: IMG.airq,  title: "Calidad del Aire Interior",        desc: "Purificadores de aire completos, sistemas UV y humidificadores. Soluciones reales para la temporada de alergias y la salud." },
      { img: IMG.maint, title: "Planes de Mantenimiento",          desc: "Mantenimientos anuales que previenen averías y prolongan la vida del equipo. Programación prioritaria para miembros." },
    ],
    aboutLabel:   "Nuestra Historia",
    aboutTitle:   "18 Años Cuidando\nNueva Jersey.",
    aboutBody:    "Durante 18 años, ClimatePro HVAC ha mantenido cómodas a las familias de Nueva Jersey a través de veranos sofocantes e inviernos helados. Nuestros técnicos certificados NATE combinan la artesanía de la vieja escuela con la tecnología más eficiente en energía. No solo reparamos sistemas — construimos relaciones basadas en consejos honestos, precios justos y trabajo que perdura.",
    aboutBullets: ["Precios transparentes — sin costos ocultos", "Servicio disponible el mismo día", "Técnicos certificados NATE"],
    aboutCta:     "Programar Servicio",
    revTitle:     "Lo Que Dicen los Clientes.",
    revSub:       "Más de 220 reseñas verificadas de propietarios en Nueva Jersey.",
    reviews: [
      { name: "Maria T.",  text: "ClimatePro llegó en 2 horas en un día de 95 grados. Arreglaron mi AC rápido y a buen precio. Son los únicos a los que llamo ahora." },
      { name: "James R.",  text: "Reemplazo completo del sistema — el equipo fue profesional, limpio, terminó a tiempo. Mi factura de electricidad bajó 30% el primer mes." },
      { name: "Sandra L.", text: "Me inscribí en el plan de mantenimiento. Dos servicios después y mi calefactor de 15 años funciona mejor que nunca. Vale cada centavo." },
      { name: "Kevin M.",  text: "Llamé a las 11pm por emergencia de calefacción. Vinieron sin problema y lo resolvieron. Gente genuina que se preocupa por sus clientes." },
    ],
    contactTitle:   "¿Listo para Programar?",
    contactSub:     "Llame, envíe mensaje o escriba por WhatsApp. Respondemos en 30 minutos en horario laboral.",
    contactDetails: [
      { icon: "📍", txt: "890 Route 33, Trenton, NJ 08619" },
      { icon: "✉",  txt: "info@climateprohvac.com" },
      { icon: "🕐", txt: "Lun–Sáb 7am–8pm · Emergencias 24/7" },
    ],
    footerTag:  "Manteniendo a Nueva Jersey cómoda por 18 años.",
    switchLang: "EN",
  },
}

type Lang = "en" | "es"

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inV = useInView(ref, { once: true, amount: 0.4 })
  const mv  = useMotionValue(0)
  const [d, setD] = useState("0")
  useEffect(() => {
    if (!inV) return
    const c = animate(mv, to, {
      duration: 1.6,
      ease: EXPO as [number, number, number, number],
      onUpdate: v => setD(String(Math.floor(v))),
    })
    return () => c.stop()
  }, [inV, mv, to])
  return <span ref={ref}>{d}{suffix}</span>
}

export default function ClimateProDemoClient() {
  const [lang, setLang]         = useState<Lang>("en")
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const t = copy[lang]

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMenuOpen(false)
  }
  const ids = ["services", "about", "reviews", "contact"]

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: C.canvas, color: C.text, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${C.blue}33; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(4,5,6,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        transition: "background 0.25s, border-color 0.25s",
        padding: "0 28px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: C.blue, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>❄</div>
            <span style={{ fontSize: 14, fontWeight: 600, color: C.text, letterSpacing: "-0.03em" }}>ClimatePro HVAC</span>
          </div>

          <div className="cp-desk" style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {t.nav.map((lnk, i) => (
              <button key={i} onClick={() => go(ids[i])} style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: 13, fontWeight: 500, color: C.sec, transition: "color 0.15s",
              }}
                onMouseEnter={e => (e.currentTarget.style.color = C.text)}
                onMouseLeave={e => (e.currentTarget.style.color = C.sec)}
              >{lnk}</button>
            ))}
            <button onClick={() => setLang(lang === "en" ? "es" : "en")} style={{
              background: C.card, border: `1px solid ${C.border}`, cursor: "pointer",
              color: C.sec, fontSize: 11, fontWeight: 500, padding: "4px 10px",
              borderRadius: 6, transition: "color 0.15s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = C.text)}
              onMouseLeave={e => (e.currentTarget.style.color = C.sec)}
            >{t.switchLang}</button>
            <a href={CALL_URL} style={{
              background: C.ctaBg, color: C.ctaTxt, padding: "8px 18px",
              borderRadius: 8, fontSize: 13, fontWeight: 600,
              textDecoration: "none",
            }}>{t.navCta}</a>
          </div>

          <button className="cp-burger" onClick={() => setMenuOpen(!menuOpen)} style={{
            display: "none", background: "none", border: "none", cursor: "pointer", color: C.text, fontSize: 22,
          }}>☰</button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              style={{ background: C.card, borderTop: `1px solid ${C.border}`, padding: "16px 28px" }}>
              {t.nav.map((lnk, i) => (
                <button key={i} onClick={() => go(ids[i])} style={{
                  display: "block", width: "100%", textAlign: "left", background: "none",
                  border: "none", cursor: "pointer", color: C.text, fontSize: 15, fontWeight: 500,
                  padding: "12px 0", borderBottom: `1px solid ${C.border}`,
                }}>{lnk}</button>
              ))}
              <div style={{ display: "flex", gap: 10, paddingTop: 16 }}>
                <a href={CALL_URL} style={{ flex: 1, background: C.ctaBg, color: C.ctaTxt, textAlign: "center", padding: "12px", borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>{t.navCta}</a>
                <button onClick={() => setLang(lang === "en" ? "es" : "en")} style={{ background: C.card, border: `1px solid ${C.border}`, cursor: "pointer", color: C.sec, padding: "12px 14px", borderRadius: 6, fontWeight: 500, fontSize: 11 }}>{t.switchLang}</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        {/* Atmospheric radial gradient behind content */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(84.6% 73.49% at 50% 26.51%, rgba(4,63,150,0.7) 0%, rgba(6,18,37,0.25) 60%, transparent 100%)",
          zIndex: 1,
        }} />

        {/* Hero image — right side, subdued */}
        <div style={{
          position: "absolute", top: 0, right: 0, width: "50%", height: "100%",
          backgroundImage: `url(${IMG.hero})`,
          backgroundSize: "cover", backgroundPosition: "center",
          zIndex: 0,
        }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #040506 0%, rgba(4,5,6,0.85) 30%, rgba(4,5,6,0.4) 100%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "128px 28px 96px", width: "100%" }}>
          {/* Badge */}
          <motion.div initial={{ y: 10 }} animate={{ y: 0 }} transition={{ duration: 0.45, ease: EXPO }}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(59,158,255,0.08)", border: `1px solid rgba(59,158,255,0.18)`, borderRadius: 999, padding: "5px 14px", fontSize: 11, fontWeight: 500, color: C.blue, marginBottom: 28, letterSpacing: "0.02em" }}>
            {t.badge}
          </motion.div>

          {/* Headlines */}
          <motion.h1 initial={{ y: 28 }} animate={{ y: 0 }} transition={{ duration: 0.6, delay: 0.08, ease: EXPO }}
            style={{ fontSize: "clamp(42px, 6.5vw, 72px)", fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.11em", color: C.text, maxWidth: 580 }}>
            {t.h1a}
          </motion.h1>
          <motion.h1 initial={{ y: 28 }} animate={{ y: 0 }} transition={{ duration: 0.6, delay: 0.15, ease: EXPO }}
            style={{ fontSize: "clamp(42px, 6.5vw, 72px)", fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.11em", color: C.text, maxWidth: 580 }}>
            {t.h1b}
          </motion.h1>

          <motion.p initial={{ y: 10 }} animate={{ y: 0 }} transition={{ duration: 0.45, delay: 0.3, ease: EXPO }}
            style={{ fontSize: 15, color: C.sec, lineHeight: 1.65, marginTop: 20, maxWidth: 460, fontWeight: 400 }}>
            {t.sub}
          </motion.p>

          <motion.div initial={{ y: 10 }} animate={{ y: 0 }} transition={{ duration: 0.45, delay: 0.38, ease: EXPO }}
            style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 32 }}>
            <a href={CALL_URL} style={{
              background: C.ctaBg, color: C.ctaTxt, padding: "12px 24px",
              borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none",
              display: "flex", alignItems: "center", gap: 8,
            }}>📞 {t.cta1}</a>
          </motion.div>

          {/* Trust pills */}
          <motion.div initial={{ y: 8 }} animate={{ y: 0 }} transition={{ duration: 0.45, delay: 0.48, ease: EXPO }}
            style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 28 }}>
            {["NATE Certified", "Same-Day Service", "Upfront Pricing"].map((p, i) => (
              <span key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 999, padding: "4px 12px", fontSize: 11, color: C.ter, fontWeight: 500 }}>{p}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "44px 28px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
          {t.stats.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "clamp(34px, 4vw, 52px)", fontWeight: 600, color: C.blue, lineHeight: 1, letterSpacing: "-0.04em" }}>
                <Counter to={s.n} suffix={s.sfx} />
              </div>
              <div style={{ fontSize: 11, color: C.ter, marginTop: 6, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>{s.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ background: C.canvas, padding: "96px 28px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 52 }}>
            <p style={{ fontSize: 11, fontWeight: 500, color: C.blue, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>What We Do</p>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 600, letterSpacing: "-0.04em", color: C.text }}>{t.svcTitle}</h2>
            <p style={{ color: C.sec, fontSize: 14, marginTop: 10, maxWidth: 500, lineHeight: 1.65 }}>{t.svcSub}</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 12 }}>
            {t.svcs.map((svc, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: EXPO }}
                style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 11, overflow: "hidden" }}>
                <div style={{ height: 188, overflow: "hidden" }}>
                  <img src={svc.img} alt={svc.title} loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(0.72)" }} />
                </div>
                <div style={{ padding: "18px 20px 24px" }}>
                  <div style={{ width: 24, height: 2, background: C.blue, marginBottom: 10, borderRadius: 999 }} />
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 7, letterSpacing: "-0.02em" }}>{svc.title}</h3>
                  <p style={{ fontSize: 13, color: C.sec, lineHeight: 1.65 }}>{svc.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 28px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55, ease: EXPO }}>
            <div style={{ borderRadius: 11, overflow: "hidden", border: `1px solid ${C.border}` }}>
              <img src={IMG.about} alt="ClimatePro HVAC technician" style={{ width: "100%", display: "block", filter: "brightness(0.8)" }} />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55, delay: 0.1, ease: EXPO }}>
            <p style={{ fontSize: 11, fontWeight: 500, color: C.blue, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>{t.aboutLabel}</p>
            <h2 style={{ fontSize: "clamp(26px, 3.2vw, 40px)", fontWeight: 600, color: C.text, marginBottom: 20, lineHeight: 1.1, letterSpacing: "-0.04em", whiteSpace: "pre-line" }}>{t.aboutTitle}</h2>
            <p style={{ fontSize: 14, color: C.sec, lineHeight: 1.75, marginBottom: 24 }}>{t.aboutBody}</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
              {t.aboutBullets.map((b, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: C.sec }}>
                  <span style={{ width: 16, height: 16, borderRadius: "50%", background: "rgba(59,158,255,0.12)", border: `1px solid rgba(59,158,255,0.3)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ color: C.blue, fontSize: 8, fontWeight: 600 }}>✓</span>
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <a href={CALL_URL} style={{
              display: "inline-block", background: C.ctaBg, color: C.ctaTxt,
              padding: "12px 24px", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none",
            }}>{t.aboutCta}</a>
          </motion.div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" style={{ background: C.canvas, padding: "96px 28px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 52 }}>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 600, letterSpacing: "-0.04em", color: C.text }}>{t.revTitle}</h2>
            <p style={{ color: C.ter, fontSize: 13, marginTop: 8 }}>{t.revSub}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 10 }}>
            {t.reviews.map((r, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.35, delay: i * 0.06 }}
                style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 11, padding: "22px" }}>
                <div style={{ color: C.blue, fontSize: 11, letterSpacing: 2, marginBottom: 12 }}>★★★★★</div>
                <p style={{ fontSize: 13, color: C.sec, lineHeight: 1.7, marginBottom: 18 }}>&ldquo;{r.text}&rdquo;</p>
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: C.elev, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ color: C.blue, fontSize: 12, fontWeight: 600 }}>{r.name[0]}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{r.name}</div>
                    <div style={{ fontSize: 10, color: C.ter }}>Verified Google Review</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: C.card, borderTop: `1px solid ${C.border}`, padding: "80px 28px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 44px)", fontWeight: 600, color: C.text, marginBottom: 12, letterSpacing: "-0.04em" }}>{t.contactTitle}</h2>
          <p style={{ fontSize: 15, color: C.sec, marginBottom: 36, lineHeight: 1.6 }}>{t.contactSub}</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginBottom: 40 }}>
            <a href={CALL_URL} style={{ background: C.ctaBg, color: C.ctaTxt, padding: "13px 28px", borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
              📞 {t.cta1}
            </a>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 28 }}>
            {t.contactDetails.map((d, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 18, marginBottom: 4 }}>{d.icon}</div>
                <div style={{ fontSize: 12, color: C.ter }}>{d.txt}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: C.canvas, borderTop: `1px solid ${C.border}`, padding: "36px 28px 104px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.text, letterSpacing: "-0.02em", marginBottom: 4 }}>ClimatePro HVAC</div>
            <div style={{ fontSize: 12, color: C.ter }}>{t.footerTag}</div>
          </div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {t.nav.map((lnk, i) => (
              <button key={i} onClick={() => go(ids[i])} style={{
                background: "none", border: "none", cursor: "pointer", color: C.ter,
                fontSize: 12, fontWeight: 500, transition: "color 0.15s",
              }}
                onMouseEnter={e => (e.currentTarget.style.color = C.text)}
                onMouseLeave={e => (e.currentTarget.style.color = C.ter)}
              >{lnk}</button>
            ))}
          </div>
        </div>
        <div style={{ maxWidth: 1200, margin: "20px auto 0", borderTop: `1px solid ${C.border}`, paddingTop: 20 }}>
          <div style={{ fontSize: 11, color: C.ter, textAlign: "center" }}>
            © {new Date().getFullYear()} ClimatePro HVAC. All rights reserved. · Trenton, NJ
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 200,
        background: C.card, borderTop: `1px solid ${C.border}`,
        display: "grid", gridTemplateColumns: "1fr auto",
        padding: "10px 12px", gap: 8,
      }}>
        <a href={CALL_URL} style={{ background: C.ctaBg, color: C.ctaTxt, borderRadius: 8, padding: "12px 0", textAlign: "center", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
          📞 {lang === "en" ? "Call Now" : "Llamar"}
        </a>
        <button onClick={() => setLang(lang === "en" ? "es" : "en")} style={{ background: C.elev, border: `1px solid ${C.border}`, cursor: "pointer", color: C.sec, borderRadius: 6, padding: "12px 14px", fontWeight: 500, fontSize: 11 }}>
          {t.switchLang}
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cp-desk { display: none !important; }
          .cp-burger { display: block !important; }
        }
        @media (min-width: 769px) {
          .cp-desk { display: flex !important; }
          .cp-burger { display: none !important; }
        }
        @media (max-width: 680px) {
          #about > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
