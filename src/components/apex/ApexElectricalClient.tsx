"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView, useMotionValue, animate, AnimatePresence } from "framer-motion"

// ─── Three/Ember Design System ────────────────────────────────────────────────
const C = {
  canvas:  "#111111",
  card:    "#181818",
  panel:   "#2b2a2a",
  border:  "#343434",
  text:    "#ffffff",
  sec:     "#999999",
  ter:     "#8d8d8d",
  ember:   "#ff4300",
} as const

// Tracking: -0.056em @ 68px headlines, -0.025em @ 46-48px
const EXPO = [0.16, 1, 0.3, 1] as const

const IMG = {
  hero:    "https://images.pexels.com/photos/14319099/pexels-photo-14319099.jpeg?auto=compress&w=1600",
  panel:   "https://images.pexels.com/photos/5767595/pexels-photo-5767595.jpeg?auto=compress&w=600",
  ev:      "https://images.pexels.com/photos/27355826/pexels-photo-27355826.jpeg?auto=compress&w=600",
  emrg:    "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&w=600",
  light:   "https://images.pexels.com/photos/32391477/pexels-photo-32391477.jpeg?auto=compress&w=600",
  rewire:  "https://images.pexels.com/photos/5691588/pexels-photo-5691588.jpeg?auto=compress&w=600",
  inspect: "https://images.pexels.com/photos/32497160/pexels-photo-32497160.jpeg?auto=compress&w=600",
  about:   "https://images.pexels.com/photos/9679179/pexels-photo-9679179.jpeg?auto=compress&w=900",
}

const PHONE_RAW  = "2015550100"
const PHONE_DISP = "(201) 555-0100"
const CALL_URL   = `tel:+1${PHONE_RAW}`
const WA_URL     = `https://wa.me/${PHONE_RAW}?text=Hi!%20I%20need%20electrical%20service%20in%20North%20Jersey.`

const copy = {
  en: {
    badge: "Licensed & Fully Insured in NJ",
    pre:   "North Jersey's",
    h1:    "Electrical",
    h2:    "Contractors.",
    sub:   "Panel upgrades · EV chargers · Rewiring · 24/7 emergency. 5.0★ rated across Bergen, Hudson & Passaic County.",
    cta1:  `Call ${PHONE_DISP}`,
    cta2:  "WhatsApp",
    nav:   ["Services", "About", "Reviews", "Contact"],
    navCta: "Call Now",
    stats: [
      { n: 15,  sfx: "+", lbl: "Years Experience" },
      { n: 80,  sfx: "+", lbl: "Google Reviews"   },
      { n: 5,   sfx: ".0★", lbl: "Rating"         },
      { n: 24,  sfx: "/7",  lbl: "Emergency Line"  },
    ],
    svcTitle: "Services",
    svcSub:   "Residential & commercial electrical work — safe, clean, and code-compliant.",
    svcs: [
      { img: IMG.panel,   title: "Panel Upgrades",              desc: "200A upgrades, sub-panels, and load center replacements. All permits pulled, all inspections passed." },
      { img: IMG.ev,      title: "EV Charger Installation",     desc: "Level 2 home chargers for all major brands. We handle permits, conduit runs, and utility coordination." },
      { img: IMG.emrg,    title: "Emergency Service 24/7",      desc: "Sparks, outages, burning smell? We respond fast — day, night, weekends, holidays. No extra call-out fee." },
      { img: IMG.light,   title: "Lighting Installation",       desc: "Recessed lighting, ceiling fans, outdoor fixtures, and LED upgrades. Professional finish every time." },
      { img: IMG.rewire,  title: "Rewiring",                    desc: "Knob-and-tube or aluminum wiring? We rewire safely to current NEC code. Free assessment included." },
      { img: IMG.inspect, title: "Code Compliance Inspections", desc: "Buying or selling? Our licensed inspectors identify code violations before they become expensive problems." },
    ],
    aboutLabel: "About Us",
    aboutTitle: "15 Years of Precision\nElectrical Work.",
    aboutBody:  "Apex Electrical Contractors has served North Jersey homeowners and businesses for 15+ years with one guiding principle: safety first, always. Fully licensed, bonded, and insured. Our crews show up on time, work clean, and don't leave until the job passes inspection.",
    aboutBullets: ["Licensed & fully insured in NJ", "Same-day emergency response", "Up-front, transparent pricing"],
    aboutCta: "Schedule Inspection",
    revTitle: "5.0★ on Google.",
    revSub:   "80+ verified reviews from customers across North Jersey.",
    reviews: [
      { name: "Thomas B.", text: "Apex upgraded my 100A panel and installed 3 EV chargers in one day. Pulled all the permits. Crew was professional and spotless. My new go-to." },
      { name: "Rachel D.", text: "Called at 9pm — sparks from an outlet. They were at my door in under an hour. Fixed it, explained what caused it, fair price. Lifesavers." },
      { name: "Carlos V.", text: "Full house rewire, all permits, passed inspection first try. Price matched the quote exactly. That alone puts them ahead of every other contractor I've used." },
      { name: "Diane K.",  text: "Code inspection before selling my home found 2 violations. Fixed same day. Closed without a single issue. These guys know what they're doing." },
    ],
    contactTitle: "Get a Free Estimate.",
    contactSub:   "Call or WhatsApp anytime. Emergency line open 24/7.",
    contactDetails: [
      { icon: "📍", txt: "Bergen · Hudson · Passaic County, NJ" },
      { icon: "🕐", txt: "Mon–Fri 7am–7pm · Sat 8am–5pm · Emergency 24/7" },
    ],
    footerTag: "Licensed electrical contractors. North Jersey, 15+ years.",
    switchLang: "ES",
  },
  es: {
    badge: "Licenciados y Asegurados en NJ",
    pre:   "Electricistas de Confianza en",
    h1:    "North Jersey",
    h2:    "",
    sub:   "Paneles · Cargadores EV · Recableado · Emergencias 24/7. Calificación 5.0★ en Bergen, Hudson y Passaic County.",
    cta1:  `Llamar ${PHONE_DISP}`,
    cta2:  "WhatsApp",
    nav:   ["Servicios", "Nosotros", "Reseñas", "Contacto"],
    navCta: "Llamar",
    stats: [
      { n: 15,  sfx: "+",   lbl: "Años de Experiencia" },
      { n: 80,  sfx: "+",   lbl: "Reseñas en Google"   },
      { n: 5,   sfx: ".0★", lbl: "Calificación"        },
      { n: 24,  sfx: "/7",  lbl: "Línea de Emergencia" },
    ],
    svcTitle: "Servicios",
    svcSub:   "Trabajo eléctrico residencial y comercial — seguro, limpio y conforme al código.",
    svcs: [
      { img: IMG.panel,   title: "Actualización de Paneles",     desc: "Actualizaciones a 200A, sub-paneles y reemplazos de centros de carga. Todos los permisos y aprobaciones." },
      { img: IMG.ev,      title: "Instalación de Cargadores EV", desc: "Cargadores Nivel 2 para todas las marcas. Manejamos permisos, canalizaciones y coordinación con la empresa eléctrica." },
      { img: IMG.emrg,    title: "Emergencias 24/7",             desc: "¿Chispas, corte de luz, olor a quemado? Respondemos rápido — de día, de noche, fines de semana y feriados." },
      { img: IMG.light,   title: "Instalación de Iluminación",   desc: "Iluminación empotrada, ventiladores de techo, accesorios exteriores y actualizaciones LED. Acabado profesional." },
      { img: IMG.rewire,  title: "Recableado",                   desc: "¿Cableado antiguo? Recableamos de forma segura al código NEC vigente. Evaluación gratuita incluida." },
      { img: IMG.inspect, title: "Inspecciones de Cumplimiento", desc: "¿Comprando o vendiendo? Nuestros inspectores identifican violaciones al código antes de que cuesten más." },
    ],
    aboutLabel: "Nosotros",
    aboutTitle: "15 Años de Trabajo\nEléctrico de Precisión.",
    aboutBody:  "Apex Electrical Contractors ha servido a propietarios y negocios en North Jersey por 15+ años con un principio rector: la seguridad primero, siempre. Con licencia completa, afianzados y asegurados. Nuestros equipos llegan a tiempo, trabajan limpio y no se van hasta que el trabajo pase la inspección.",
    aboutBullets: ["Licenciados y totalmente asegurados en NJ", "Respuesta de emergencia el mismo día", "Precios transparentes desde el principio"],
    aboutCta: "Programar Inspección",
    revTitle: "5.0★ en Google.",
    revSub:   "Más de 80 reseñas verificadas de clientes en North Jersey.",
    reviews: [
      { name: "Thomas B.", text: "Apex actualizó mi panel e instaló 3 cargadores EV en un día. Sacaron todos los permisos. El equipo fue profesional y muy limpio. Mi primera llamada de ahora en adelante." },
      { name: "Rachel D.", text: "Llamé a las 9pm — chispas de un enchufe. Llegaron en menos de una hora. Lo arreglaron, explicaron la causa, precio justo. Unos salvadores." },
      { name: "Carlos V.", text: "Recableado completo de la casa, todos los permisos, inspección aprobada al primer intento. El precio fue exacto al presupuesto. Eso solo los pone por encima de todos." },
      { name: "Diane K.",  text: "Inspección antes de vender mi casa encontró 2 violaciones. Las arreglaron el mismo día. Cerré sin un solo problema. Saben lo que hacen." },
    ],
    contactTitle: "Obtenga un Presupuesto Gratis.",
    contactSub:   "Llame o escriba por WhatsApp en cualquier momento. Emergencias 24/7.",
    contactDetails: [
      { icon: "📍", txt: "Bergen · Hudson · Passaic County, NJ" },
      { icon: "🕐", txt: "Lun–Vie 7am–7pm · Sáb 8am–5pm · Emergencias 24/7" },
    ],
    footerTag: "Electricistas con licencia. North Jersey, 15+ años.",
    switchLang: "EN",
  },
}

type Lang = "en" | "es"

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref  = useRef<HTMLSpanElement>(null)
  const inV  = useInView(ref, { once: true, amount: 0.4 })
  const mv   = useMotionValue(0)
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

export default function ApexElectricalClient() {
  const [lang, setLang]       = useState<Lang>("en")
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
    <div style={{ fontFamily: "'Space Grotesk', sans-serif", background: C.canvas, color: C.text, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${C.ember}33; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(17,17,17,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        transition: "background 0.25s, border-color 0.25s",
        padding: "0 28px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, background: C.ember, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>⚡</div>
            <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.025em", color: C.text }}>APEX ELECTRICAL</span>
          </div>

          {/* Desktop */}
          <div className="apex-desk" style={{ display: "flex", alignItems: "center", gap: 36 }}>
            {t.nav.map((lnk, i) => (
              <button key={i} onClick={() => go(ids[i])} style={{
                background: "none", border: "none", cursor: "pointer", fontWeight: 700,
                fontSize: 13, color: C.sec, letterSpacing: "-0.01em", transition: "color 0.15s",
              }}
                onMouseEnter={e => (e.currentTarget.style.color = C.text)}
                onMouseLeave={e => (e.currentTarget.style.color = C.sec)}
              >{lnk}</button>
            ))}
            <button onClick={() => setLang(lang === "en" ? "es" : "en")} style={{
              background: C.card, border: `1px solid ${C.border}`, cursor: "pointer",
              color: C.sec, fontSize: 11, fontWeight: 700, padding: "5px 11px",
              borderRadius: 999, letterSpacing: "0.04em", transition: "color 0.15s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = C.text)}
              onMouseLeave={e => (e.currentTarget.style.color = C.sec)}
            >{t.switchLang}</button>
            <a href={CALL_URL} style={{
              background: C.ember, color: "#fff", padding: "9px 20px",
              borderRadius: 15, fontSize: 13, fontWeight: 700,
              textDecoration: "none", letterSpacing: "-0.01em",
              transition: "opacity 0.15s",
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >{t.navCta}</a>
          </div>

          {/* Hamburger */}
          <button className="apex-burger" onClick={() => setMenuOpen(!menuOpen)} style={{
            display: "none", background: "none", border: "none",
            cursor: "pointer", color: C.text, fontSize: 22,
          }}>☰</button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              style={{ background: C.card, borderTop: `1px solid ${C.border}`, padding: "16px 28px" }}>
              {t.nav.map((lnk, i) => (
                <button key={i} onClick={() => go(ids[i])} style={{
                  display: "block", width: "100%", textAlign: "left", background: "none",
                  border: "none", cursor: "pointer", color: C.text, fontSize: 16, fontWeight: 700,
                  padding: "13px 0", borderBottom: `1px solid ${C.border}`,
                }}>{lnk}</button>
              ))}
              <div style={{ display: "flex", gap: 10, paddingTop: 16 }}>
                <a href={CALL_URL} style={{ flex: 1, background: C.ember, color: "#fff", textAlign: "center", padding: "13px", borderRadius: 15, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>{t.navCta}</a>
                <button onClick={() => setLang(lang === "en" ? "es" : "en")} style={{ background: C.panel, border: `1px solid ${C.border}`, cursor: "pointer", color: C.sec, padding: "13px 16px", borderRadius: 999, fontWeight: 700, fontSize: 11 }}>{t.switchLang}</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${IMG.hero})`,
          backgroundSize: "cover", backgroundPosition: "center",
        }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(110deg, rgba(17,17,17,0.97) 48%, rgba(17,17,17,0.6) 100%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "128px 28px 96px", width: "100%" }}>
          {/* Badge */}
          <motion.div initial={{ y: 10 }} animate={{ y: 0 }} transition={{ duration: 0.45, ease: EXPO }}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, background: C.card, border: `1px solid ${C.border}`, borderRadius: 999, padding: "5px 14px 5px 10px", fontSize: 11, fontWeight: 700, color: C.sec, letterSpacing: "0.06em", marginBottom: 28 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.ember, display: "inline-block" }} />
            {t.badge}
          </motion.div>

          {/* Pre-line */}
          <motion.p initial={{ y: 10 }} animate={{ y: 0 }} transition={{ duration: 0.45, delay: 0.05, ease: EXPO }}
            style={{ fontSize: "clamp(14px, 1.8vw, 18px)", fontWeight: 700, color: C.sec, letterSpacing: "-0.01em", marginBottom: 4 }}>
            {t.pre}
          </motion.p>

          {/* H1 */}
          <motion.h1 initial={{ y: 32 }} animate={{ y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: EXPO }}
            style={{ fontWeight: 700, fontSize: "clamp(56px, 9.5vw, 96px)", lineHeight: 0.92, letterSpacing: "-0.056em", color: C.text }}>
            {t.h1}
          </motion.h1>
          {t.h2 && (
            <motion.h1 initial={{ y: 32 }} animate={{ y: 0 }} transition={{ duration: 0.6, delay: 0.16, ease: EXPO }}
              style={{ fontWeight: 700, fontSize: "clamp(56px, 9.5vw, 96px)", lineHeight: 0.92, letterSpacing: "-0.056em", color: C.ember }}>
              {t.h2}
            </motion.h1>
          )}

          {/* Sub */}
          <motion.p initial={{ y: 10 }} animate={{ y: 0 }} transition={{ duration: 0.45, delay: 0.28, ease: EXPO }}
            style={{ fontSize: "clamp(14px, 1.6vw, 16px)", color: C.sec, lineHeight: 1.65, marginTop: 20, maxWidth: 480, fontWeight: 700 }}>
            {t.sub}
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ y: 10 }} animate={{ y: 0 }} transition={{ duration: 0.45, delay: 0.36, ease: EXPO }}
            style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 36 }}>
            <a href={CALL_URL} style={{
              background: C.ember, color: "#fff", padding: "14px 28px",
              borderRadius: 15, fontSize: 14, fontWeight: 700,
              textDecoration: "none", letterSpacing: "-0.015em",
              display: "flex", alignItems: "center", gap: 8,
            }}>📞 {t.cta1}</a>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{
              background: "transparent", color: C.text, padding: "13px 28px",
              borderRadius: 15, fontSize: 14, fontWeight: 700,
              textDecoration: "none", letterSpacing: "-0.015em",
              border: `1px solid ${C.border}`,
              display: "flex", alignItems: "center", gap: 8,
            }}>💬 {t.cta2}</a>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "44px 28px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
          {t.stats.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "clamp(38px, 4.5vw, 56px)", fontWeight: 700, color: C.text, lineHeight: 1, letterSpacing: "-0.04em" }}>
                <Counter to={s.n} suffix={s.sfx} />
              </div>
              <div style={{ fontSize: 11, color: C.ter, marginTop: 6, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase" }}>{s.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ background: C.canvas, padding: "96px 28px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 52 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: C.ember, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>What We Do</p>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, letterSpacing: "-0.025em", color: C.text }}>{t.svcTitle}</h2>
            <p style={{ color: C.sec, fontSize: 14, marginTop: 10, maxWidth: 520, fontWeight: 700, lineHeight: 1.6 }}>{t.svcSub}</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 1, background: C.border, borderRadius: 20, overflow: "hidden" }}>
            {t.svcs.map((svc, i) => (
              <motion.div key={i}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                style={{ background: C.card, overflow: "hidden", position: "relative" }}>
                {/* Image */}
                <div style={{ height: 190, overflow: "hidden", position: "relative" }}>
                  <img src={svc.img} alt={svc.title} loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(0.75)" }} />
                  {/* ember top strip */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: C.ember }} />
                </div>
                <div style={{ padding: "20px 24px 28px" }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 8, letterSpacing: "-0.015em" }}>{svc.title}</h3>
                  <p style={{ fontSize: 13, color: C.sec, lineHeight: 1.65, fontWeight: 700 }}>{svc.desc}</p>
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
            <div style={{ borderRadius: 20, overflow: "hidden", border: `1px solid ${C.border}` }}>
              <img src={IMG.about} alt="Apex Electrical technician" style={{ width: "100%", display: "block", filter: "brightness(0.85)" }} />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55, delay: 0.1, ease: EXPO }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: C.ember, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>{t.aboutLabel}</p>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 700, color: C.text, marginBottom: 20, lineHeight: 1.05, letterSpacing: "-0.025em", whiteSpace: "pre-line" }}>{t.aboutTitle}</h2>
            <p style={{ fontSize: 14, color: C.sec, lineHeight: 1.75, marginBottom: 28, fontWeight: 700 }}>{t.aboutBody}</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
              {t.aboutBullets.map((b, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: C.text, fontWeight: 700 }}>
                  <span style={{ color: C.ember, fontSize: 12, flexShrink: 0 }}>●</span>
                  {b}
                </li>
              ))}
            </ul>
            <a href={CALL_URL} style={{
              display: "inline-block", background: C.ember, color: "#fff",
              padding: "13px 28px", borderRadius: 15, fontSize: 13, fontWeight: 700,
              textDecoration: "none", letterSpacing: "-0.01em",
            }}>{t.aboutCta}</a>
          </motion.div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" style={{ background: C.canvas, padding: "96px 28px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 52 }}>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, letterSpacing: "-0.025em", color: C.text }}>{t.revTitle}</h2>
            <p style={{ color: C.sec, fontSize: 13, marginTop: 8, fontWeight: 700 }}>{t.revSub}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
            {t.reviews.map((r, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.35, delay: i * 0.06 }}
                style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: "24px" }}>
                <div style={{ color: C.ember, fontSize: 12, letterSpacing: 3, marginBottom: 14 }}>★★★★★</div>
                <p style={{ fontSize: 13, color: C.sec, lineHeight: 1.7, marginBottom: 20, fontWeight: 700 }}>&ldquo;{r.text}&rdquo;</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.panel, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ color: C.ember, fontSize: 13, fontWeight: 700 }}>{r.name[0]}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{r.name}</div>
                    <div style={{ fontSize: 10, color: C.ter, fontWeight: 700 }}>Verified Google Review</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: C.panel, borderTop: `1px solid ${C.border}`, padding: "80px 28px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 700, color: C.text, marginBottom: 14, letterSpacing: "-0.025em" }}>{t.contactTitle}</h2>
          <p style={{ fontSize: 15, color: C.sec, marginBottom: 40, lineHeight: 1.6, fontWeight: 700 }}>{t.contactSub}</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginBottom: 40 }}>
            <a href={CALL_URL} style={{ background: C.ember, color: "#fff", padding: "14px 32px", borderRadius: 15, fontSize: 14, fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
              📞 {t.cta1}
            </a>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{ background: "transparent", color: C.text, padding: "13px 32px", borderRadius: 15, fontSize: 14, fontWeight: 700, textDecoration: "none", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 8 }}>
              💬 {t.cta2}
            </a>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 32 }}>
            {t.contactDetails.map((d, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 18, marginBottom: 4 }}>{d.icon}</div>
                <div style={{ fontSize: 12, color: C.ter, fontWeight: 700 }}>{d.txt}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: C.canvas, borderTop: `1px solid ${C.border}`, padding: "36px 28px 104px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.text, letterSpacing: "-0.02em", marginBottom: 4 }}>APEX ELECTRICAL</div>
            <div style={{ fontSize: 12, color: C.ter, fontWeight: 700 }}>{t.footerTag}</div>
          </div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {t.nav.map((lnk, i) => (
              <button key={i} onClick={() => go(ids[i])} style={{
                background: "none", border: "none", cursor: "pointer", color: C.ter,
                fontSize: 12, fontWeight: 700, transition: "color 0.15s",
              }}
                onMouseEnter={e => (e.currentTarget.style.color = C.text)}
                onMouseLeave={e => (e.currentTarget.style.color = C.ter)}
              >{lnk}</button>
            ))}
          </div>
        </div>
        <div style={{ maxWidth: 1200, margin: "20px auto 0", borderTop: `1px solid ${C.border}`, paddingTop: 20 }}>
          <div style={{ fontSize: 11, color: C.ter, fontWeight: 700, textAlign: "center" }}>
            © {new Date().getFullYear()} Apex Electrical Contractors. All rights reserved.
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 200,
        background: C.card, borderTop: `1px solid ${C.border}`,
        display: "grid", gridTemplateColumns: "1fr 1fr auto",
        padding: "10px 12px", gap: 8,
      }}>
        <a href={CALL_URL} style={{ background: C.ember, color: "#fff", borderRadius: 15, padding: "12px 0", textAlign: "center", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
          📞 {t.nav[0] === "Services" ? "Call Now" : "Llamar"}
        </a>
        <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{ background: "#25d366", color: "#fff", borderRadius: 15, padding: "12px 0", textAlign: "center", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
          💬 WhatsApp
        </a>
        <button onClick={() => setLang(lang === "en" ? "es" : "en")} style={{ background: C.panel, border: `1px solid ${C.border}`, cursor: "pointer", color: C.sec, borderRadius: 999, padding: "12px 14px", fontWeight: 700, fontSize: 11 }}>
          {t.switchLang}
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .apex-desk { display: none !important; }
          .apex-burger { display: block !important; }
        }
        @media (min-width: 769px) {
          .apex-desk { display: flex !important; }
          .apex-burger { display: none !important; }
        }
        @media (max-width: 680px) {
          #about > div > div:first-child,
          #about > div > div:last-child { grid-column: 1 / -1 !important; }
          #about > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
