"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView, useMotionValue, animate } from "framer-motion"

// ─── Video URLs (Higgsfield cinematic_studio_video_v2) ────────────────────────
const HERO_VIDEO     = "https://d8j0ntlcm91z4.cloudfront.net/user_3FQadVcSPbghpSFvkjgD2Hf8Alt/hf_20260622_044703_df20c5bb-ea09-4eaf-bf17-c5dbfee2f748.mp4"
const SERVICES_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_3FQadVcSPbghpSFvkjgD2Hf8Alt/hf_20260622_044714_37314e2a-ac8d-4198-8296-8277220f432e.mp4"

// ─── Design tokens ────────────────────────────────────────────────────────────
const ACCENT  = "#3b9eff"
const CANVAS  = "#000000"
const WA_URL  = "https://wa.me/12014194016"
const CALL_URL = "tel:+12014194016"

// ─── FadingVideo (rAF-driven, no CSS transitions) ────────────────────────────
const FADE_MS = 500
const FADE_OUT_LEAD = 0.55

function FadingVideo({ src, className, style }: { src: string; className?: string; style?: React.CSSProperties }) {
  const videoRef    = useRef<HTMLVideoElement>(null)
  const rafRef      = useRef<number>(0)
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
        fadingOutRef.current = true
        fadeTo(0)
      }
    }
    const onEnded = () => {
      video.style.opacity = "0"
      setTimeout(() => {
        video.currentTime = 0
        video.play()
        fadingOutRef.current = false
        fadeTo(1)
      }, 100)
    }
    video.addEventListener("loadeddata", onLoaded)
    video.addEventListener("timeupdate", onTimeUpdate)
    video.addEventListener("ended", onEnded)
    return () => {
      cancelAnimationFrame(rafRef.current)
      video.removeEventListener("loadeddata", onLoaded)
      video.removeEventListener("timeupdate", onTimeUpdate)
      video.removeEventListener("ended", onEnded)
    }
  }, [src])

  return (
    <video ref={videoRef} src={src} autoPlay muted playsInline preload="auto" loop={false}
      className={className} style={{ opacity: 0, ...style }} />
  )
}

// ─── BlurText (word-by-word IntersectionObserver) ────────────────────────────
function BlurText({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  const words = text.split(" ")
  return (
    <p ref={ref} className={className} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", rowGap: "0.1em", ...style }}>
      {words.map((word, i) => (
        <motion.span key={i}
          initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
          animate={visible ? { filter: ["blur(10px)", "blur(5px)", "blur(0px)"], opacity: [0, 0.5, 1], y: [50, -5, 0] } : {}}
          transition={{ duration: 0.7, times: [0, 0.5, 1], ease: "easeOut", delay: (i * 100) / 1000 }}
          style={{ display: "inline-block", marginRight: "0.28em" }}
        >{word}</motion.span>
      ))}
    </p>
  )
}

// ─── Counter ─────────────────────────────────────────────────────────────────
const EXPO = [0.16, 1, 0.3, 1] as const
function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inV = useInView(ref, { once: true, amount: 0.4 })
  const mv  = useMotionValue(0)
  const [d, setD] = useState("0")
  useEffect(() => {
    if (!inV) return
    const c = animate(mv, to, { duration: 1.6, ease: EXPO as [number,number,number,number], onUpdate: v => setD(String(Math.floor(v))) })
    return () => c.stop()
  }, [inV, mv, to])
  return <span ref={ref}>{d}{suffix}</span>
}

// ─── Content ──────────────────────────────────────────────────────────────────
type Lang = "en" | "es"

const copy = {
  en: {
    badge:      "5.0★ · 142 Reviews on Google",
    h1:         "Bergen County's Emergency Plumber",
    sub:        "Burst pipe? No hot water? On-site within the hour — day or night. Serving Ramsey NJ and Bergen County.",
    cta1:       "📞 Call (201) 419-4016",
    cta2:       "💬 WhatsApp",
    nav:        ["Services", "Reviews", "About", "Contact"],
    navCta:     "📞 (201) 419-4016",
    trustItems: ["142+ Google Reviews", "5.0★ Rating", "24/7 Emergency"],
    svcTitle:   "Every Plumbing Problem. Solved.",
    svcs: [
      { icon: "🔧", title: "Emergency Plumbing",  desc: "Burst pipes, flooding, no hot water. On-site within the hour, any time.",          cta: "Book Now" },
      { icon: "🔩", title: "Sewer Repair",        desc: "Trenchless repair and full line replacement. Camera inspection included.",           cta: "Book Now" },
      { icon: "🌊", title: "Drain Cleaning",      desc: "Hydro-jetting and snake service to clear any blockage, guaranteed.",                cta: "Book Now" },
      { icon: "♨️", title: "Water Heater",        desc: "Same-day replacement. Tank and tankless. All major brands.",                        cta: "Book Now" },
      { icon: "🔨", title: "Pipe Repair",         desc: "Leak repairs and whole-home repiping with minimal disruption.",                     cta: "Book Now" },
      { icon: "🔍", title: "Leak Detection",      desc: "Electronic detection finds hidden leaks before catastrophic damage.",                cta: "Book Now" },
    ],
    midTitle:   "Pipes Don't Wait. Neither Do We.",
    midSub:     "We answer 24/7 — no voicemail, no waiting",
    midCta:     "📞 Call (201) 419-4016",
    revTitle:   "What Bergen County Says",
    revSub:     "142+ verified Google reviews",
    reviews: [
      { name: "James M.", loc: "Ramsey NJ",     text: "Showed up at midnight on a Saturday and fixed a burst pipe in under 2 hours. Absolute lifesaver." },
      { name: "Sarah K.", loc: "Paramus NJ",    text: "Best plumber in Bergen County. Fair pricing, no hidden fees, showed up exactly when they said they would." },
      { name: "Mike T.",  loc: "Ridgewood NJ",  text: "Fast, professional, and clean. Replaced my water heater same day. Won't call anyone else." },
      { name: "David R.", loc: "Hackensack NJ", text: "Called at 2am for a burst pipe. There in 45 minutes. Incredible response time, incredible work." },
    ],
    aboutTitle:  "Family-Owned. Bergen County's Best.",
    aboutBody:   "Pinnacle Plumbing Sewer & Drain has been Ramsey's trusted plumbing company from day one. Licensed, insured, background-checked.",
    areas:       ["Bergen County", "Passaic County", "Morris County", "North Jersey"],
    bullets:     ["Licensed & Insured in NJ", "Same-Day Service Available", "5.0★ Rated on Google", "142+ Happy Customers"],
    finalTitle:  "Need a Plumber Now?",
    finalSub:    "We pick up. Every call. Day or night.",
    finalCta1:   "📞 Call (201) 419-4016",
    finalCta2:   "💬 Message on WhatsApp",
    finalInfo:   "Ramsey, NJ 07446 · Emergency 24/7",
    footerTag:   "Ramsey NJ 07446",
    footerLinks: ["Services", "About", "Reviews", "Contact"],
    switchLang:  "ES",
    callLabel:   "📞 Call",
    waLabel:     "💬 WhatsApp",
  },
  es: {
    badge:      "5.0★ · 142 Reseñas en Google",
    h1:         "El Plomero de Emergencia del Condado Bergen",
    sub:        "¿Tubería reventada? ¿Sin agua caliente? En su lugar en menos de una hora — de día o de noche. Sirviendo Ramsey NJ y el Condado Bergen.",
    cta1:       "📞 Llamar (201) 419-4016",
    cta2:       "💬 WhatsApp",
    nav:        ["Servicios", "Reseñas", "Nosotros", "Contacto"],
    navCta:     "📞 (201) 419-4016",
    trustItems: ["142+ Reseñas en Google", "Calificación 5.0★", "Emergencias 24/7"],
    svcTitle:   "Cada Problema de Plomería. Resuelto.",
    svcs: [
      { icon: "🔧", title: "Plomería de Emergencia",      desc: "Tuberías reventadas, inundaciones, sin agua caliente. En el lugar en menos de una hora.",       cta: "Reservar" },
      { icon: "🔩", title: "Reparación de Alcantarilla",  desc: "Reparación sin trinchera y reemplazo completo de líneas. Inspección por cámara incluida.",        cta: "Reservar" },
      { icon: "🌊", title: "Limpieza de Drenajes",        desc: "Servicio de hydro-jet y serpiente para eliminar cualquier obstrucción, garantizado.",               cta: "Reservar" },
      { icon: "♨️", title: "Calentador de Agua",          desc: "Reemplazo el mismo día. Tanque y sin tanque. Todas las marcas principales.",                        cta: "Reservar" },
      { icon: "🔨", title: "Reparación de Tuberías",      desc: "Reparaciones de fugas y re-tubería completa del hogar con mínima interrupción.",                    cta: "Reservar" },
      { icon: "🔍", title: "Detección de Fugas",          desc: "Detección electrónica encuentra fugas ocultas antes de que causen daños catastróficos.",             cta: "Reservar" },
    ],
    midTitle:   "Las Tuberías No Esperan. Nosotros Tampoco.",
    midSub:     "Respondemos 24/7 — sin buzón de voz, sin espera",
    midCta:     "📞 Llamar (201) 419-4016",
    revTitle:   "Lo Que Dice el Condado Bergen",
    revSub:     "Más de 142 reseñas verificadas en Google",
    reviews: [
      { name: "James M.", loc: "Ramsey NJ",     text: "Llegó a medianoche un sábado y arregló una tubería reventada en menos de 2 horas. Un verdadero salvavidas." },
      { name: "Sarah K.", loc: "Paramus NJ",    text: "El mejor plomero del Condado Bergen. Precios justos, sin cargos ocultos, llegó exactamente cuando dijo." },
      { name: "Mike T.",  loc: "Ridgewood NJ",  text: "Rápido, profesional y limpio. Reemplazó mi calentador de agua el mismo día. No llamaré a nadie más." },
      { name: "David R.", loc: "Hackensack NJ", text: "Llamé a las 2am por una tubería reventada. Llegó en 45 minutos. Tiempo de respuesta increíble, trabajo increíble." },
    ],
    aboutTitle:  "Familia Propietaria. Lo Mejor del Condado Bergen.",
    aboutBody:   "Pinnacle Plumbing Sewer & Drain ha sido la empresa de plomería de confianza de Ramsey desde el primer día. Con licencia, asegurados y verificados.",
    areas:       ["Condado Bergen", "Condado Passaic", "Condado Morris", "Norte de Jersey"],
    bullets:     ["Con Licencia y Asegurados en NJ", "Servicio el Mismo Día Disponible", "Calificación 5.0★ en Google", "142+ Clientes Satisfechos"],
    finalTitle:  "¿Necesita un Plomero Ahora?",
    finalSub:    "Contestamos. Cada llamada. Día y noche.",
    finalCta1:   "📞 Llamar (201) 419-4016",
    finalCta2:   "💬 Mensaje en WhatsApp",
    finalInfo:   "Ramsey, NJ 07446 · Emergencias 24/7",
    footerTag:   "Ramsey NJ 07446",
    footerLinks: ["Servicios", "Nosotros", "Reseñas", "Contacto"],
    switchLang:  "EN",
    callLabel:   "📞 Llamar",
    waLabel:     "💬 WhatsApp",
  },
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const FONT_URL = "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Barlow:wght@300;400;500;600&display=swap"

const LIQUID_GLASS_CSS = `
.pp-lg {
  background: rgba(255,255,255,0.01);
  background-blend-mode: luminosity;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: none;
  box-shadow: inset 0 1px 1px rgba(255,255,255,0.1);
  position: relative;
  overflow: hidden;
}
.pp-lg::before {
  content: "";
  position: absolute; inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(180deg,
    rgba(255,255,255,0.45) 0%,
    rgba(255,255,255,0.15) 20%,
    rgba(255,255,255,0) 40%,
    rgba(255,255,255,0) 60%,
    rgba(255,255,255,0.15) 80%,
    rgba(255,255,255,0.45) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
.pp-lg-strong {
  background: rgba(255,255,255,0.01);
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);
  box-shadow: 4px 4px 4px rgba(0,0,0,0.05), inset 0 1px 1px rgba(255,255,255,0.15);
  position: relative;
  overflow: hidden;
}
.pp-lg-strong::before {
  content: "";
  position: absolute; inset: 0;
  border-radius: inherit; padding: 1.4px;
  background: linear-gradient(180deg,
    rgba(255,255,255,0.5) 0%,
    rgba(255,255,255,0.2) 20%,
    rgba(255,255,255,0) 40%,
    rgba(255,255,255,0) 60%,
    rgba(255,255,255,0.2) 80%,
    rgba(255,255,255,0.5) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
`

const H: React.CSSProperties = { fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }
const B: React.CSSProperties = { fontFamily: "'Barlow', sans-serif" }

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PinnacleDemoClient() {
  const [lang, setLang]         = useState<Lang>("en")
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const t = copy[lang]

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const ids = ["services", "reviews", "about", "contact"]
  const go  = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false) }

  return (
    <div style={{ ...B, background: CANVAS, color: "#fff", overflowX: "hidden", minHeight: "100vh" }}>
      <style>{`
        @import url('${FONT_URL}');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ${LIQUID_GLASS_CSS}
        .pp-desk { display: flex; }
        .pp-burger { display: none; }
        @media (max-width: 768px) {
          .pp-desk { display: none !important; }
          .pp-burger { display: block !important; }
          .pp-hero-h1 { font-size: clamp(34px, 9vw, 56px) !important; letter-spacing: -2px !important; }
          .pp-svc-grid { grid-template-columns: 1fr !important; }
          .pp-about-grid { grid-template-columns: 1fr !important; }
          .pp-rev-grid { grid-template-columns: 1fr !important; }
          .pp-sticky { display: grid !important; }
        }
        @media (min-width: 769px) { .pp-sticky { display: none !important; } }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)",
        zIndex: 100, maxWidth: 900, width: "calc(100% - 32px)",
        borderRadius: 9999, padding: "10px 20px",
        background: scrolled ? "rgba(0,0,0,0.75)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        transition: "background 0.3s, backdrop-filter 0.3s",
      }} className={scrolled ? "" : "pp-lg"}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ ...H, fontSize: 13, color: "#fff" }}>PP</span>
            </div>
            <span style={{ ...B, fontSize: 13, fontWeight: 600, color: "#fff" }}>Pinnacle Plumbing</span>
          </div>
          <div className="pp-desk" style={{ alignItems: "center", gap: 28 }}>
            {t.nav.map((lnk, i) => (
              <button key={i} onClick={() => go(ids[i])} style={{ ...B, background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.7)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              >{lnk}</button>
            ))}
            <button onClick={() => setLang(lang === "en" ? "es" : "en")} style={{ ...B, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 9999, cursor: "pointer", color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: 500, padding: "4px 10px" }}>{t.switchLang}</button>
            <a href={CALL_URL} style={{ ...B, background: ACCENT, color: "#fff", padding: "8px 18px", borderRadius: 9999, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>{t.navCta}</a>
          </div>
          <button className="pp-burger" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", fontSize: 22 }}>☰</button>
        </div>
        {menuOpen && (
          <div style={{ marginTop: 12, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 12 }}>
            {t.nav.map((lnk, i) => (
              <button key={i} onClick={() => go(ids[i])} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", color: "#fff", fontSize: 15, fontWeight: 500, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{lnk}</button>
            ))}
            <div style={{ display: "flex", gap: 8, paddingTop: 12 }}>
              <a href={CALL_URL} style={{ flex: 1, background: ACCENT, color: "#fff", textAlign: "center", padding: "11px", borderRadius: 9999, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>{t.cta1}</a>
              <button onClick={() => setLang(lang === "en" ? "es" : "en")} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 9999, cursor: "pointer", color: "rgba(255,255,255,0.7)", padding: "11px 14px", fontWeight: 500, fontSize: 11 }}>{t.switchLang}</button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", height: "100vh", background: CANVAS, overflow: "hidden" }}>
        <FadingVideo src={HERO_VIDEO} style={{ position: "absolute", left: "50%", top: 0, transform: "translateX(-50%)", width: "120%", height: "110%", objectFit: "cover", objectPosition: "top", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.85) 100%)", zIndex: 1 }} />
        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "96px 24px 80px", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
            <div className="pp-lg" style={{ display: "inline-flex", alignItems: "center", borderRadius: 9999, padding: "6px 16px", marginBottom: 24 }}>
              <span style={{ ...B, fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.85)" }}>{t.badge}</span>
            </div>
          </motion.div>

          <BlurText text={t.h1} className="pp-hero-h1"
            style={{ ...H, fontSize: "clamp(42px, 5.5vw, 68px)", color: "#fff", lineHeight: 0.9, letterSpacing: "-3px", maxWidth: 680, marginBottom: 20 }} />

          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.45 }}
            style={{ ...B, fontSize: 15, color: "rgba(255,255,255,0.72)", lineHeight: 1.65, maxWidth: 480, marginBottom: 28, fontWeight: 300 }}>
            {t.sub}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.4 }}
            style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 28 }}>
            <a href={CALL_URL} className="pp-lg-strong" style={{ ...B, borderRadius: 9999, padding: "12px 24px", fontSize: 14, fontWeight: 600, color: "#fff", textDecoration: "none", display: "inline-block" }}>{t.cta1}</a>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{ ...B, color: "#fff", padding: "12px 24px", borderRadius: 9999, fontSize: 14, fontWeight: 500, textDecoration: "none", border: "1px solid rgba(255,255,255,0.25)" }}>{t.cta2}</a>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.4 }}
            style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { num: "142+", lbl: lang === "en" ? "Five-Star Reviews" : "Reseñas de 5 Estrellas" },
              { num: "< 1hr", lbl: lang === "en" ? "Emergency Response" : "Respuesta de Emergencia" },
            ].map((s, i) => (
              <div key={i} className="pp-lg" style={{ padding: "16px 20px", borderRadius: "1.25rem", minWidth: 160, textAlign: "center" }}>
                <div style={{ ...H, fontSize: 28, color: "#fff", marginBottom: 4 }}>{s.num}</div>
                <div style={{ ...B, fontSize: 11, color: "rgba(255,255,255,0.55)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.lbl}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TRUST COUNTERS */}
      <section style={{ background: CANVAS, borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "56px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 32 }}>
          {[
            { n: 142, sfx: "+", lbl: t.trustItems[0] },
            { n: 5,   sfx: ".0★", lbl: t.trustItems[1] },
            { n: 24,  sfx: "/7", lbl: t.trustItems[2] },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ ...H, fontSize: "clamp(40px, 5vw, 58px)", color: ACCENT, lineHeight: 1 }}>
                <Counter to={s.n} suffix={s.sfx} />
              </div>
              <div style={{ ...B, fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 6, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ position: "relative", minHeight: "100vh", background: CANVAS, overflow: "hidden", padding: "96px 24px" }}>
        <FadingVideo src={SERVICES_VIDEO} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0, filter: "brightness(0.22)" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1 }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1100, margin: "0 auto" }}>
          <BlurText text={t.svcTitle}
            style={{ ...H, fontSize: "clamp(32px, 4.5vw, 60px)", color: "#fff", lineHeight: 0.9, letterSpacing: "-2.5px", textAlign: "center", marginBottom: 52 }} />
          <div className="pp-svc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {t.svcs.map((s, i) => (
              <motion.div key={i} className="pp-lg" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.4, delay: i * 0.07 }}
                style={{ borderRadius: "1.25rem", padding: "24px", minHeight: 260, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 26, marginBottom: 12 }}>{s.icon}</div>
                  <h3 style={{ ...H, fontSize: 19, color: "#fff", marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ ...B, fontSize: 13, color: "rgba(255,255,255,0.62)", lineHeight: 1.65 }}>{s.desc}</p>
                </div>
                <a href={CALL_URL} style={{ ...B, display: "inline-block", marginTop: 16, background: "transparent", border: `1px solid ${ACCENT}`, color: ACCENT, borderRadius: 9999, padding: "8px 16px", fontSize: 12, fontWeight: 600, textDecoration: "none", textAlign: "center" }}>{s.cta}</a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA MID */}
      <section style={{ background: CANVAS, textAlign: "center", padding: "80px 24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <h2 style={{ ...H, fontSize: "clamp(26px, 4vw, 46px)", color: "#fff", marginBottom: 12 }}>{t.midTitle}</h2>
        <p style={{ ...B, fontSize: 14, color: "rgba(255,255,255,0.55)", marginBottom: 28, fontWeight: 300 }}>{t.midSub}</p>
        <a href={CALL_URL} className="pp-lg-strong" style={{ ...B, display: "inline-block", borderRadius: 9999, padding: "14px 28px", fontSize: 15, fontWeight: 600, color: "#fff", textDecoration: "none" }}>{t.midCta}</a>
      </section>

      {/* REVIEWS */}
      <section id="reviews" style={{ background: CANVAS, padding: "80px 24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ ...H, fontSize: "clamp(26px, 4vw, 46px)", color: "#fff", textAlign: "center", marginBottom: 8 }}>{t.revTitle}</h2>
          <p style={{ ...B, fontSize: 12, color: "rgba(255,255,255,0.4)", textAlign: "center", marginBottom: 44 }}>{t.revSub}</p>
          <div className="pp-rev-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
            {t.reviews.map((r, i) => (
              <motion.div key={i} className="pp-lg" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.35, delay: i * 0.06 }}
                style={{ borderRadius: "1.25rem", padding: "24px" }}>
                <div style={{ color: ACCENT, fontSize: 11, letterSpacing: 2, marginBottom: 12 }}>★★★★★</div>
                <p style={{ ...B, fontSize: 13, color: "rgba(255,255,255,0.72)", lineHeight: 1.7, marginBottom: 16 }}>&ldquo;{r.text}&rdquo;</p>
                <div style={{ ...B, fontSize: 12, fontWeight: 600, color: "#fff" }}>{r.name}</div>
                <div style={{ ...B, fontSize: 11, color: "rgba(255,255,255,0.38)" }}>{r.loc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ background: CANVAS, padding: "80px 24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="pp-about-grid" style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <h2 style={{ ...H, fontSize: "clamp(24px, 3.5vw, 38px)", color: "#fff", marginBottom: 16 }}>{t.aboutTitle}</h2>
            <p style={{ ...B, fontSize: 14, color: "rgba(255,255,255,0.62)", lineHeight: 1.75, marginBottom: 20 }}>{t.aboutBody}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
              {t.areas.map((a, i) => (
                <span key={i} className="pp-lg" style={{ ...B, borderRadius: 9999, padding: "5px 14px", fontSize: 11, color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>{a}</span>
              ))}
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
              {t.bullets.map((b, i) => (
                <li key={i} style={{ ...B, fontSize: 13, color: "rgba(255,255,255,0.62)", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: ACCENT, fontWeight: 700 }}>✓</span>{b}
                </li>
              ))}
            </ul>
          </div>
          <div className="pp-lg" style={{ borderRadius: "1.25rem", padding: "40px 32px", textAlign: "center" }}>
            <div style={{ ...H, fontSize: 72, color: ACCENT, lineHeight: 1 }}>5.0★</div>
            <div style={{ ...B, fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 8, fontWeight: 500 }}>142 Google Reviews</div>
            <a href={CALL_URL} style={{ ...B, display: "inline-block", marginTop: 24, background: ACCENT, color: "#fff", borderRadius: 9999, padding: "12px 24px", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>{t.cta1}</a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="contact" style={{ background: CANVAS, padding: "96px 24px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <BlurText text={t.finalTitle}
          style={{ ...H, fontSize: "clamp(36px, 5.5vw, 66px)", color: "#fff", lineHeight: 0.9, letterSpacing: "-3px", marginBottom: 16 }} />
        <p style={{ ...B, fontSize: 14, color: "rgba(255,255,255,0.55)", marginBottom: 32, fontWeight: 300 }}>{t.finalSub}</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
          <a href={CALL_URL} className="pp-lg-strong" style={{ ...B, borderRadius: 9999, padding: "14px 28px", fontSize: 15, fontWeight: 600, color: "#fff", textDecoration: "none" }}>{t.finalCta1}</a>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{ ...B, color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: 500, textDecoration: "none", display: "flex", alignItems: "center" }}>{t.finalCta2}</a>
        </div>
        <div style={{ ...B, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{t.finalInfo}</div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: CANVAS, borderTop: "1px solid rgba(255,255,255,0.08)", padding: "48px 24px 140px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ ...H, fontSize: 16, color: "#fff", marginBottom: 4 }}>Pinnacle Plumbing Sewer & Drain</div>
            <div style={{ ...B, fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{t.footerTag}</div>
          </div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
            {t.footerLinks.map((lnk, i) => (
              <button key={i} onClick={() => go(ids[i])} style={{ ...B, background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.38)", fontSize: 12, fontWeight: 500 }}>{lnk}</button>
            ))}
            <span style={{ ...B, fontSize: 12, color: "rgba(255,255,255,0.25)" }}>· (201) 419-4016 · © 2025</span>
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY BAR */}
      <div className="pp-sticky" style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 200, gridTemplateColumns: "1fr 1fr", height: 64, background: "rgba(0,0,0,0.88)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <a href={CALL_URL} style={{ background: ACCENT, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600, textDecoration: "none", ...B }}>{t.callLabel}</a>
        <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{ background: "#25D366", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600, textDecoration: "none", ...B }}>{t.waLabel}</a>
      </div>
    </div>
  )
}
