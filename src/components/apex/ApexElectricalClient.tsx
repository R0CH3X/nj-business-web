"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView, useMotionValue, animate } from "framer-motion"

// ─── Videos (stock gratuito, autohospedados en /public/videos) ────────────────
// Hero: electricistas trabajando con equipo eléctrico
const HERO_VIDEO = "/videos/apex-hero.mp4"
// Services: trabajadores eléctricos en planta, b-roll industrial
const SERVICES_VIDEO = "/videos/apex-services.mp4"

// ─── Design tokens ────────────────────────────────────────────────────────────
const ACCENT   = "#ff4300"
const CANVAS   = "#111111"
const CALL_URL = "tel:+12015550100"

// ─── FadingVideo (rAF-driven — NO CSS transitions) ───────────────────────────
const FADE_MS       = 500
const FADE_OUT_LEAD = 0.55

function FadingVideo({ src, style }: { src: string; style?: React.CSSProperties }) {
  const videoRef     = useRef<HTMLVideoElement>(null)
  const rafRef       = useRef<number>(0)
  const fadingOutRef = useRef(false)

  function fadeTo(target: number) {
    cancelAnimationFrame(rafRef.current)
    const video = videoRef.current
    if (!video) return
    const start = performance.now()
    const from  = parseFloat(video.style.opacity) || 0
    function step(now: number) {
      const p = Math.min((now - start) / FADE_MS, 1)
      video!.style.opacity = String(from + (target - from) * p)
      if (p < 1) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.style.opacity = "0"
    const onLoaded     = () => { video.play(); fadeTo(1) }
    const onTimeUpdate = () => {
      if (!fadingOutRef.current &&
          video.duration - video.currentTime <= FADE_OUT_LEAD &&
          video.duration - video.currentTime > 0) {
        fadingOutRef.current = true; fadeTo(0)
      }
    }
    const onEnded = () => {
      video.style.opacity = "0"
      setTimeout(() => { video.currentTime = 0; video.play(); fadingOutRef.current = false; fadeTo(1) }, 100)
    }
    video.addEventListener("loadeddata", onLoaded)
    video.addEventListener("timeupdate", onTimeUpdate)
    video.addEventListener("ended", onEnded)
    // Local files can finish loading before listeners attach — fire manually
    if (video.readyState >= 2) onLoaded()
    return () => {
      cancelAnimationFrame(rafRef.current)
      video.removeEventListener("loadeddata", onLoaded)
      video.removeEventListener("timeupdate", onTimeUpdate)
      video.removeEventListener("ended", onEnded)
    }
  }, [src])

  return (
    <video ref={videoRef} src={src} autoPlay muted playsInline preload="auto" loop={false}
      style={{ opacity: 0, ...style }} />
  )
}

// ─── BlurText (word-by-word IntersectionObserver + Framer Motion) ─────────────
function BlurText({ text, style }: { text: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <p ref={ref} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", rowGap: "0.1em", ...style }}>
      {text.split(" ").map((word, i) => (
        <motion.span key={i}
          initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
          animate={visible ? { filter: ["blur(10px)", "blur(5px)", "blur(0px)"], opacity: [0, 0.5, 1], y: [50, -5, 0] } : {}}
          transition={{ duration: 0.7, times: [0, 0.5, 1], ease: "easeOut", delay: i * 0.1 }}
          style={{ display: "inline-block", marginRight: "0.28em" }}
        >{word}</motion.span>
      ))}
    </p>
  )
}

// ─── Counter ─────────────────────────────────────────────────────────────────
function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inV = useInView(ref, { once: true, amount: 0.4 })
  const mv  = useMotionValue(0)
  const [d, setD] = useState("0")
  useEffect(() => {
    if (!inV) return
    const c = animate(mv, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], onUpdate: v => setD(String(Math.floor(v))) })
    return () => c.stop()
  }, [inV, mv, to])
  return <span ref={ref}>{d}{suffix}</span>
}

// ─── Bilingual content ────────────────────────────────────────────────────────
type Lang = "en" | "es"
const copy = {
  en: {
    badge: "5.0★ · 80 Reviews on Google",
    h1: "North Jersey's Expert Electrician",
    sub: "Panel upgrades, EV chargers, full rewires. 15+ years serving Bergen County — licensed, insured, on time.",
    cta1: "📞 Call (201) 555-0100", cta2: "💬 WhatsApp",
    nav: ["Services", "Reviews", "About", "Contact"], navCta: "📞 (201) 555-0100",
    trust: ["80+ Google Reviews", "5.0★ Rating", "15+ Years Exp."],
    svcTitle: "Every Electrical Job. Done Right.",
    svcs: [
      { icon: "⚡", title: "Panel Upgrades",       desc: "200A upgrades, breaker replacements, and full panel modernization.",                   cta: "Get Quote" },
      { icon: "🚗", title: "EV Charger Install",   desc: "Level 2 home charger installation. All brands, all vehicles, all municipalities.",    cta: "Get Quote" },
      { icon: "💡", title: "Lighting & Fixtures",  desc: "Recessed lighting, ceiling fans, dimmer systems, and smart home lighting.",           cta: "Get Quote" },
      { icon: "🔌", title: "Outlet & Wiring",      desc: "New outlets, GFCI, USB-C ports, and full home rewiring for older homes.",             cta: "Get Quote" },
      { icon: "🏠", title: "Whole-Home Rewire",    desc: "Safe, code-compliant rewiring of older homes with minimal wall disruption.",          cta: "Get Quote" },
      { icon: "🛡️", title: "Safety Inspections",  desc: "Pre-sale, post-purchase, and annual electrical inspections with written report.",     cta: "Get Quote" },
    ],
    midTitle: "Power Problems Fixed Fast.",
    midSub: "Licensed master electrician — same-week appointments available",
    midCta: "📞 Call (201) 555-0100",
    revTitle: "What North Jersey Says", revSub: "80+ verified Google reviews",
    reviews: [
      { name: "Lisa M.",     loc: "Paramus NJ",     text: "Installed our EV charger in half a day. Clean work, reasonable price, passed inspection first try." },
      { name: "Carlos R.",   loc: "Ramsey NJ",       text: "Panel upgrade done perfectly. Explained everything, no surprises on the bill. Great experience." },
      { name: "Jennifer K.", loc: "Hackensack NJ",   text: "Rewired our 1960s house. Professional, thorough, and incredibly clean. Highly recommend." },
      { name: "Tom W.",      loc: "Ridgewood NJ",    text: "Called for flickering lights, had it diagnosed and fixed same day. Knows his craft inside out." },
    ],
    aboutTitle: "15 Years. 80+ Perfect Reviews.",
    aboutBody: "Apex Electrical has served North Jersey homeowners since 2009. Licensed master electrician, fully insured, background-checked, and code-compliant on every job.",
    areas: ["Bergen County", "Passaic County", "Morris County", "Essex County"],
    bullets: ["Licensed Master Electrician NJ", "80+ Five-Star Reviews", "15+ Years in Business", "EV Charger Certified Installer"],
    finalTitle: "Ready to Power Up?", finalSub: "Free estimates. Same-week appointments. No surprises.",
    finalCta1: "📞 Call (201) 555-0100", finalCta2: "💬 Message on WhatsApp",
    finalInfo: "North Jersey · Licensed & Insured",
    footerLinks: ["Services", "About", "Reviews", "Contact"],
    switchLang: "ES", callLabel: "📞 Call", waLabel: "💬 WhatsApp",
  },
  es: {
    badge: "5.0★ · 80 Reseñas en Google",
    h1: "El Electricista Experto del Norte de Jersey",
    sub: "Mejoras de panel, cargadores EV, recableados completos. Más de 15 años sirviendo al Condado Bergen — con licencia, asegurado, puntual.",
    cta1: "📞 Llamar (201) 555-0100", cta2: "💬 WhatsApp",
    nav: ["Servicios", "Reseñas", "Nosotros", "Contacto"], navCta: "📞 (201) 555-0100",
    trust: ["80+ Reseñas en Google", "Calificación 5.0★", "+15 Años de Exp."],
    svcTitle: "Cada Trabajo Eléctrico. Hecho Bien.",
    svcs: [
      { icon: "⚡", title: "Mejoras de Panel",          desc: "Actualizaciones a 200A, reemplazo de breakers y modernización completa del panel.",          cta: "Cotizar" },
      { icon: "🚗", title: "Instalación Cargador EV",   desc: "Instalación de cargador de nivel 2 en el hogar. Todas las marcas y municipios.",             cta: "Cotizar" },
      { icon: "💡", title: "Iluminación y Accesorios",  desc: "Iluminación empotrada, ventiladores, dimmers y control de iluminación inteligente.",         cta: "Cotizar" },
      { icon: "🔌", title: "Salidas y Cableado",        desc: "Nuevas salidas, GFCI, puertos USB-C y recableado completo para hogares antiguos.",            cta: "Cotizar" },
      { icon: "🏠", title: "Recableado Completo",       desc: "Recableado seguro y conforme a código para hogares más antiguos con mínima interrupción.",    cta: "Cotizar" },
      { icon: "🛡️", title: "Inspecciones de Seguridad", desc: "Inspecciones preventa, post-compra y anuales con informe escrito.",                          cta: "Cotizar" },
    ],
    midTitle: "Problemas Eléctricos Resueltos Rápido.",
    midSub: "Electricista maestro con licencia — citas disponibles la misma semana",
    midCta: "📞 Llamar (201) 555-0100",
    revTitle: "Lo Que Dice el Norte de Jersey", revSub: "Más de 80 reseñas verificadas en Google",
    reviews: [
      { name: "Lisa M.",     loc: "Paramus NJ",     text: "Instaló nuestro cargador EV en medio día. Trabajo limpio, precio razonable, pasó la inspección a la primera." },
      { name: "Carlos R.",   loc: "Ramsey NJ",       text: "Mejora de panel perfecta. Explicó todo, sin sorpresas en la factura, excelente experiencia." },
      { name: "Jennifer K.", loc: "Hackensack NJ",   text: "Recableó nuestra casa de los años 60. Profesional, minucioso e increíblemente limpio. Lo recomiendo." },
      { name: "Tom W.",      loc: "Ridgewood NJ",    text: "Llamé por luces parpadeantes, lo diagnosticó y arregló el mismo día. Conoce su oficio a fondo." },
    ],
    aboutTitle: "15 Años. Más de 80 Reseñas Perfectas.",
    aboutBody: "Apex Electrical ha servido a los propietarios del Norte de Jersey desde 2009. Electricista maestro con licencia, completamente asegurado, verificado y cumpliendo el código en cada trabajo.",
    areas: ["Condado Bergen", "Condado Passaic", "Condado Morris", "Condado Essex"],
    bullets: ["Electricista Maestro con Licencia en NJ", "80+ Reseñas de Cinco Estrellas", "+15 Años en el Negocio", "Instalador Certificado de Cargadores EV"],
    finalTitle: "¿Listo para Encenderlo?", finalSub: "Presupuestos gratuitos. Citas la misma semana. Sin sorpresas.",
    finalCta1: "📞 Llamar (201) 555-0100", finalCta2: "💬 Mensaje en WhatsApp",
    finalInfo: "Norte de Jersey · Con Licencia y Asegurado",
    footerLinks: ["Servicios", "Nosotros", "Reseñas", "Contacto"],
    switchLang: "EN", callLabel: "📞 Llamar", waLabel: "💬 WhatsApp",
  },
}

// ─── Liquid-glass CSS (MotionSites exact spec) ────────────────────────────────
const FONT_URL = "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Barlow:wght@300;400;500;600&display=swap"
const LG_CSS = `
.ax-lg {
  background: rgba(255,255,255,0.01);
  background-blend-mode: luminosity;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: none;
  box-shadow: inset 0 1px 1px rgba(255,255,255,0.1);
  position: relative;
  overflow: hidden;
}
.ax-lg::before {
  content: "";
  position: absolute; inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(180deg,
    rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%,
    rgba(255,255,255,0) 40%,  rgba(255,255,255,0) 60%,
    rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  pointer-events: none;
}
.ax-lg-strong {
  background: rgba(255,255,255,0.01);
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);
  box-shadow: 4px 4px 4px rgba(0,0,0,0.05), inset 0 1px 1px rgba(255,255,255,0.15);
  position: relative;
  overflow: hidden;
}
.ax-lg-strong::before {
  content: "";
  position: absolute; inset: 0;
  border-radius: inherit; padding: 1.4px;
  background: linear-gradient(180deg,
    rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 20%,
    rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%,
    rgba(255,255,255,0.2) 80%, rgba(255,255,255,0.5) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  pointer-events: none;
}
`

const H: React.CSSProperties = { fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }
const B: React.CSSProperties = { fontFamily: "'Barlow', sans-serif" }

// ─── Component ────────────────────────────────────────────────────────────────
export default function ApexElectricalClient() {
  const [lang, setLang]         = useState<Lang>("en")
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const t   = copy[lang]
  const ids = ["services", "reviews", "about", "contact"]
  const go  = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false) }

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <div style={{ ...B, background: CANVAS, color: "#fff", overflowX: "hidden", minHeight: "100vh" }}>
      <style>{`
        @import url('${FONT_URL}');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ${LG_CSS}
        .ax-desk   { display: flex; }
        .ax-mob    { display: none; }
        .ax-sticky { display: none; }
        @media (max-width: 768px) {
          .ax-desk { display: none !important; }
          .ax-mob  { display: block !important; }
          .ax-sticky { display: grid !important; }
          .ax-svc-grid { grid-template-columns: 1fr !important; }
          .ax-rev-grid { grid-template-columns: 1fr !important; }
          .ax-about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)",
        zIndex: 100, maxWidth: 900, width: "calc(100% - 32px)",
        borderRadius: 9999, padding: "10px 20px",
        background: scrolled ? "rgba(17,17,17,0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        transition: "background 0.3s",
      }} className={scrolled ? "" : "ax-lg"}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ ...H, fontSize: 13, color: "#fff" }}>AE</span>
            </div>
            <span style={{ ...B, fontSize: 13, fontWeight: 600, color: "#fff" }}>Apex Electrical</span>
          </div>
          {/* desktop */}
          <div className="ax-desk" style={{ alignItems: "center", gap: 26 }}>
            {t.nav.map((lnk, i) => (
              <button key={i} onClick={() => go(ids[i])}
                style={{ ...B, background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.7)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              >{lnk}</button>
            ))}
            <button onClick={() => setLang(lang === "en" ? "es" : "en")}
              style={{ ...B, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 9999, cursor: "pointer", color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: 500, padding: "4px 10px" }}>
              {t.switchLang}
            </button>
            <a href={CALL_URL} style={{ ...B, background: ACCENT, color: "#fff", padding: "8px 18px", borderRadius: 9999, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>{t.navCta}</a>
          </div>
          {/* burger */}
          <button className="ax-mob" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", fontSize: 22 }}>☰</button>
        </div>
        {menuOpen && (
          <div style={{ marginTop: 12, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 12 }}>
            {t.nav.map((lnk, i) => (
              <button key={i} onClick={() => go(ids[i])}
                style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", color: "#fff", fontSize: 15, fontWeight: 500, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {lnk}
              </button>
            ))}
            <div style={{ display: "flex", gap: 8, paddingTop: 12 }}>
              <a href={CALL_URL} style={{ flex: 1, background: ACCENT, color: "#fff", textAlign: "center", padding: "11px", borderRadius: 9999, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>{t.cta1}</a>
              <button onClick={() => setLang(lang === "en" ? "es" : "en")}
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 9999, cursor: "pointer", color: "rgba(255,255,255,0.7)", padding: "11px 14px", fontSize: 11 }}>
                {t.switchLang}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <FadingVideo src={HERO_VIDEO} style={{ position: "absolute", left: "50%", top: 0, transform: "translateX(-50%)", width: "120%", height: "110%", objectFit: "cover", objectPosition: "center", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(17,17,17,0.65) 0%, rgba(17,17,17,0.32) 50%, rgba(17,17,17,0.9) 100%)", zIndex: 1 }} />
        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "96px 24px 80px", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
            <div className="ax-lg" style={{ display: "inline-flex", borderRadius: 9999, padding: "6px 16px", marginBottom: 24 }}>
              <span style={{ ...B, fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.85)" }}>{t.badge}</span>
            </div>
          </motion.div>
          <BlurText text={t.h1} style={{ ...H, fontSize: "clamp(38px, 5.5vw, 68px)", color: "#fff", lineHeight: 0.9, letterSpacing: "-3px", maxWidth: 680, marginBottom: 20 }} />
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.45 }}
            style={{ ...B, fontSize: 15, color: "rgba(255,255,255,0.72)", lineHeight: 1.65, maxWidth: 480, marginBottom: 28, fontWeight: 300 }}>
            {t.sub}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 0.4 }}
            style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 28 }}>
            <a href={CALL_URL} className="ax-lg-strong" style={{ ...B, borderRadius: 9999, padding: "12px 24px", fontSize: 14, fontWeight: 600, color: "#fff", textDecoration: "none" }}>{t.cta1}</a>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25, duration: 0.4 }}
            style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            {[{ num: "80+", lbl: lang === "en" ? "Five-Star Reviews" : "Reseñas de 5 Estrellas" },
              { num: "15+", lbl: lang === "en" ? "Years Experience"  : "Años de Experiencia" }].map((s, i) => (
              <div key={i} className="ax-lg" style={{ padding: "16px 20px", borderRadius: "1.25rem", minWidth: 158, textAlign: "center" }}>
                <div style={{ ...H, fontSize: 28, color: "#fff", marginBottom: 4 }}>{s.num}</div>
                <div style={{ ...B, fontSize: 10, color: "rgba(255,255,255,0.52)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.lbl}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TRUST COUNTERS ── */}
      <section style={{ background: CANVAS, borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "52px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 28 }}>
          {[{ n: 80, sfx: "+", lbl: t.trust[0] }, { n: 5, sfx: ".0★", lbl: t.trust[1] }, { n: 15, sfx: "+", lbl: t.trust[2] }].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ ...H, fontSize: "clamp(38px, 4.5vw, 56px)", color: ACCENT, lineHeight: 1 }}>
                <Counter to={s.n} suffix={s.sfx} />
              </div>
              <div style={{ ...B, fontSize: 10, color: "rgba(255,255,255,0.42)", marginTop: 6, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ position: "relative", minHeight: "85vh", overflow: "hidden", padding: "88px 24px" }}>
        <FadingVideo src={SERVICES_VIDEO} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0, filter: "brightness(0.18)" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(17,17,17,0.65)", zIndex: 1 }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1080, margin: "0 auto" }}>
          <BlurText text={t.svcTitle} style={{ ...H, fontSize: "clamp(30px, 4vw, 58px)", color: "#fff", lineHeight: 0.9, letterSpacing: "-2.5px", textAlign: "center", marginBottom: 48 }} />
          <div className="ax-svc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {t.svcs.map((s, i) => (
              <motion.div key={i} className="ax-lg" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.4, delay: i * 0.07 }}
                style={{ borderRadius: "1.25rem", padding: "22px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 240 }}>
                <div>
                  <div style={{ fontSize: 24, marginBottom: 10 }}>{s.icon}</div>
                  <h3 style={{ ...H, fontSize: 18, color: "#fff", marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ ...B, fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.65 }}>{s.desc}</p>
                </div>
                <a href={CALL_URL} style={{ ...B, display: "block", marginTop: 14, border: `1px solid ${ACCENT}`, color: ACCENT, borderRadius: 9999, padding: "7px 14px", fontSize: 12, fontWeight: 600, textDecoration: "none", textAlign: "center" }}>{s.cta}</a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA MID ── */}
      <section style={{ background: CANVAS, textAlign: "center", padding: "76px 24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <h2 style={{ ...H, fontSize: "clamp(24px, 3.8vw, 44px)", color: "#fff", marginBottom: 10 }}>{t.midTitle}</h2>
        <p style={{ ...B, fontSize: 14, color: "rgba(255,255,255,0.52)", marginBottom: 26, fontWeight: 300 }}>{t.midSub}</p>
        <a href={CALL_URL} className="ax-lg-strong" style={{ ...B, display: "inline-block", borderRadius: 9999, padding: "13px 28px", fontSize: 15, fontWeight: 600, color: "#fff", textDecoration: "none" }}>{t.midCta}</a>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" style={{ background: CANVAS, padding: "76px 24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <h2 style={{ ...H, fontSize: "clamp(24px, 3.8vw, 44px)", color: "#fff", textAlign: "center", marginBottom: 6 }}>{t.revTitle}</h2>
          <p style={{ ...B, fontSize: 12, color: "rgba(255,255,255,0.38)", textAlign: "center", marginBottom: 40 }}>{t.revSub}</p>
          <div className="ax-rev-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
            {t.reviews.map((r, i) => (
              <motion.div key={i} className="ax-lg" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.35, delay: i * 0.06 }}
                style={{ borderRadius: "1.25rem", padding: "22px" }}>
                <div style={{ color: ACCENT, fontSize: 11, letterSpacing: 2, marginBottom: 10 }}>★★★★★</div>
                <p style={{ ...B, fontSize: 13, color: "rgba(255,255,255,0.72)", lineHeight: 1.7, marginBottom: 14 }}>&ldquo;{r.text}&rdquo;</p>
                <div style={{ ...B, fontSize: 12, fontWeight: 600, color: "#fff" }}>{r.name}</div>
                <div style={{ ...B, fontSize: 11, color: "rgba(255,255,255,0.36)" }}>{r.loc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ background: CANVAS, padding: "76px 24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="ax-about-grid" style={{ maxWidth: 980, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
          <div>
            <h2 style={{ ...H, fontSize: "clamp(22px, 3.2vw, 36px)", color: "#fff", marginBottom: 14 }}>{t.aboutTitle}</h2>
            <p style={{ ...B, fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, marginBottom: 18 }}>{t.aboutBody}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 18 }}>
              {t.areas.map((a, i) => <span key={i} className="ax-lg" style={{ ...B, borderRadius: 9999, padding: "4px 12px", fontSize: 11, color: "rgba(255,255,255,0.62)", fontWeight: 500 }}>{a}</span>)}
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
              {t.bullets.map((b, i) => (
                <li key={i} style={{ ...B, fontSize: 13, color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", gap: 7 }}>
                  <span style={{ color: ACCENT, fontWeight: 700 }}>✓</span>{b}
                </li>
              ))}
            </ul>
          </div>
          <div className="ax-lg" style={{ borderRadius: "1.25rem", padding: "36px 28px", textAlign: "center" }}>
            <div style={{ ...H, fontSize: 68, color: ACCENT, lineHeight: 1 }}>5.0★</div>
            <div style={{ ...B, fontSize: 12, color: "rgba(255,255,255,0.42)", marginTop: 7, fontWeight: 500 }}>80 Google Reviews</div>
            <a href={CALL_URL} style={{ ...B, display: "inline-block", marginTop: 22, background: ACCENT, color: "#fff", borderRadius: 9999, padding: "11px 22px", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>{t.cta1}</a>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section id="contact" style={{ background: CANVAS, padding: "88px 24px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <BlurText text={t.finalTitle} style={{ ...H, fontSize: "clamp(34px, 5vw, 62px)", color: "#fff", lineHeight: 0.9, letterSpacing: "-3px", marginBottom: 14 }} />
        <p style={{ ...B, fontSize: 14, color: "rgba(255,255,255,0.52)", marginBottom: 30, fontWeight: 300 }}>{t.finalSub}</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 18 }}>
          <a href={CALL_URL} className="ax-lg-strong" style={{ ...B, borderRadius: 9999, padding: "13px 26px", fontSize: 15, fontWeight: 600, color: "#fff", textDecoration: "none" }}>{t.finalCta1}</a>
        </div>
        <div style={{ ...B, fontSize: 12, color: "rgba(255,255,255,0.28)" }}>{t.finalInfo}</div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: CANVAS, borderTop: "1px solid rgba(255,255,255,0.08)", padding: "44px 24px 140px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{ ...H, fontSize: 15, color: "#fff", marginBottom: 3 }}>Apex Electrical</div>
            <div style={{ ...B, fontSize: 11, color: "rgba(255,255,255,0.32)" }}>Bergen County NJ</div>
          </div>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center" }}>
            {t.footerLinks.map((lnk, i) => (
              <button key={i} onClick={() => go(ids[i])} style={{ ...B, background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.36)", fontSize: 12 }}>{lnk}</button>
            ))}
            <span style={{ ...B, fontSize: 11, color: "rgba(255,255,255,0.22)" }}>· (201) 555-0100 · © 2025</span>
          </div>
        </div>
      </footer>

      {/* ── MOBILE STICKY BAR ── */}
      <div className="ax-sticky" style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 200, gridTemplateColumns: "1fr", height: 64, background: "rgba(17,17,17,0.92)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <a href={CALL_URL} style={{ ...B, background: ACCENT, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>{t.callLabel}</a>
      </div>
    </div>
  )
}
