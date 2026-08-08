import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   NJ Business Web — Trades System Landing Page
   Design System: Modal · Bilingual EN/ES · Framer Motion animations
   Changes: cancel policy updated · EN/ES toggle added
───────────────────────────────────────────────────────────────── */

// ── Design tokens ─────────────────────────────────────────────
const C = {
  voidBlack:     "#000000",
  groundIron:    "#181818",
  carbonVeil:    "#212525",
  circuitBorder: "#485346",
  limePulse:     "#7fee64",
  phosphorWhite: "#ddffdc",
  sage60:        "#8cab87",
  moss70:        "#9cbf93",
  moss80:        "#aed2a4",
  fernLink:      "#859984",
} as const;

const headingFont = "'Space Grotesk', 'Inter Tight', system-ui, sans-serif";
const bodyFont    = "'Inter', system-ui, sans-serif";

// ── Translation types ─────────────────────────────────────────
type Lang = "en" | "es";
interface HeadlineWord { word: string; color: string; }
interface Step         { label: string; desc: string; }
interface FaqItem      { q: string; a: string; }
interface ValueRow     { item: string; value: string; }

interface Copy {
  badge: string;
  headlineWords: HeadlineWord[];
  subhead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  pillWebsite: string; pillWebsiteSub: string;
  pillChatbot: string; pillChatbotSub: string;
  systemEyebrow: string;
  systemHeading: string;
  systemSub: string;
  tab1Label: string; tab1Sub: string;
  tab2Label: string; tab2Sub: string;
  card1H3: string; card1Sub: string; card1Value: string;
  card1Features: string[];
  card2H3: string; card2Sub: string; card2Value: string;
  card2Features: string[];
  mathEyebrow: string;
  mathHeading: string;
  tableColItem: string; tableColValue: string;
  valueRows: ValueRow[];
  totalLabel: string; totalStrike: string;
  allOfThis: string;
  cancelNote: string;           // ← updated in all 3 locations
  pricingEyebrow: string;
  pricingHeading: string;
  stepsLabel: string;
  steps: Step[];
  monthly: string; perMonth: string;
  cancelNote2: string;          // ← pricing card
  includedItems: string[];
  getStartedBtn: string;
  trust: string[];
  faqHeading: string;
  faqItems: FaqItem[];
  footer: string;
  mobileNo: string; mobileGet: string;
}

// ── Translations ──────────────────────────────────────────────
const COPY: Record<Lang, Copy> = {
  en: {
    badge: "Limited Availability",
    headlineWords: [
      { word: "THE",      color: C.phosphorWhite },
      { word: "COMPLETE", color: C.phosphorWhite },
      { word: "LEAD",     color: C.limePulse },
      { word: "SYSTEM",   color: C.limePulse },
      { word: "FOR",      color: C.phosphorWhite },
      { word: "LOCAL",    color: C.phosphorWhite },
      { word: "TRADES",   color: C.phosphorWhite },
    ],
    subhead: "A professional website + AI chatbot that captures leads 24/7 — all for $697/month. 6-month minimum, then cancel anytime with 30 days notice.",
    ctaPrimary:   "Get Started — $697/mo",
    ctaSecondary: "See What's Included ↓",
    pillWebsite: "Website",    pillWebsiteSub: "Turn leads into customers",
    pillChatbot: "AI Chatbot", pillChatbotSub: "Answer customers 24/7",
    systemEyebrow: "The System",
    systemHeading: "A Complete Growth Stack",
    systemSub:     "Two parts. One system. All your leads.",
    tab1Label: "Website",    tab1Sub: "Turn leads into customers",
    tab2Label: "AI Chatbot", tab2Sub: "Answer customers 24/7",
    card1H3:    "Website — The Conversion Machine",
    card1Sub:   "Not a brochure. A machine that books calls while you sleep.",
    card1Value: "$1,500 value",
    card1Features: [
      "Custom design built for your trade",
      "Click-to-call and WhatsApp buttons",
      "Photo gallery of your work",
      "Mobile-optimized — most searches happen on phone",
      "Bilingual EN/ES available",
    ],
    card2H3:    "AI Chatbot — Answers Customers 24/7",
    card2Sub:   "Captures leads even when you're on a job. Never miss another call.",
    card2Value: "$800/mo value",
    card2Features: [
      "Answers customer questions instantly",
      "Captures leads even when you're on a job",
      "Works day and night, no missed opportunities",
      "Sends you a notification for every new lead",
    ],
    mathEyebrow: "The Math",
    mathHeading: "Here's Everything You're Getting",
    tableColItem: "Item", tableColValue: "Value",
    valueRows: [
      { item: "Website (Conversion Machine)", value: "$1,500" },
      { item: "AI Chatbot 24/7",              value: "$800/mo" },
      { item: "Hosting + Support",            value: "$150/mo" },
      { item: "Monthly Updates & Changes",    value: "$150/mo" },
    ],
    totalLabel: "Total Value",
    totalStrike: "$2,600+/mo",
    allOfThis: "All of this, for just:",
    cancelNote: "6-month minimum, then cancel anytime with 30 days notice.",
    pricingEyebrow: "Get Started",
    pricingHeading: "One step away from launching your system",
    stepsLabel: "What Happens Next",
    steps: [
      { label: "Today",       desc: "Submit payment, we start building" },
      { label: "48–72 hours", desc: "Your site and chatbot go live" },
      { label: "Ongoing",     desc: "We handle every update, you handle the calls coming in" },
    ],
    monthly: "Monthly", perMonth: "/month",
    cancelNote2: "6-month minimum, then cancel anytime with 30 days notice.",
    includedItems: [
      "Website (Conversion Machine)",
      "AI Chatbot 24/7",
      "Hosting + Support",
      "Monthly Updates & Changes",
    ],
    getStartedBtn: "Get Started — $697/mo →",
    trust: ["🔒 Secure Checkout", "Cancel Anytime", "No Setup Fee"],
    faqHeading: "Common Questions",
    faqItems: [
      {
        q: "Do I need to talk to someone first?",
        a: "No, you can start right here. Everything is handled online — no sales calls, no demos required.",
      },
      {
        q: "How fast will my site be ready?",
        a: "48–72 hours after payment. We move fast because we know you need leads now, not next month.",
      },
      {
        q: "What if I want changes later?",
        a: "Included in your monthly plan. Just message us and we'll handle it — no extra charge, ever.",
      },
      {
        q: "Can I cancel?",
        a: "Yes — after your initial 6-month term, you can cancel anytime with 30 days notice.",
      },
    ],
    footer:    `© ${new Date().getFullYear()} NJ Business Web · All rights reserved.`,
    mobileNo:  "6-month min · 30-day cancel notice",
    mobileGet: "Get Started",
  },

  es: {
    badge: "Disponibilidad Limitada",
    headlineWords: [
      { word: "EL",        color: C.phosphorWhite },
      { word: "SISTEMA",   color: C.phosphorWhite },
      { word: "DE",        color: C.limePulse },
      { word: "LEADS",     color: C.limePulse },
      { word: "PARA",      color: C.phosphorWhite },
      { word: "TRADES",    color: C.phosphorWhite },
      { word: "LOCALES",   color: C.phosphorWhite },
    ],
    subhead: "Un sitio web profesional + chatbot con IA que captura clientes 24/7 — todo por $697/mes. Mínimo 6 meses, luego cancela cuando quieras con 30 días de aviso.",
    ctaPrimary:   "Comenzar — $697/mes",
    ctaSecondary: "Ver Qué Incluye ↓",
    pillWebsite: "Sitio Web",  pillWebsiteSub: "Convierte visitas en clientes",
    pillChatbot: "Chatbot IA", pillChatbotSub: "Responde clientes 24/7",
    systemEyebrow: "El Sistema",
    systemHeading: "Un Sistema Completo de Crecimiento",
    systemSub:     "Dos partes. Un sistema. Todos tus clientes.",
    tab1Label: "Sitio Web",   tab1Sub: "Convierte visitas en clientes",
    tab2Label: "Chatbot IA",  tab2Sub: "Responde clientes 24/7",
    card1H3:    "Sitio Web — La Máquina de Conversión",
    card1Sub:   "No es un folleto. Es una máquina que genera llamadas mientras duermes.",
    card1Value: "Valor $1,500",
    card1Features: [
      "Diseño personalizado para tu oficio",
      "Botones de llamada directa y WhatsApp",
      "Galería de fotos de tu trabajo",
      "Optimizado para celular — la mayoría busca desde el teléfono",
      "Disponible en inglés y español",
    ],
    card2H3:    "Chatbot IA — Responde Clientes 24/7",
    card2Sub:   "Captura clientes incluso cuando estás trabajando. Nunca pierdas otra llamada.",
    card2Value: "Valor $800/mes",
    card2Features: [
      "Responde preguntas de clientes al instante",
      "Captura leads mientras estás en un trabajo",
      "Trabaja de día y de noche, sin oportunidades perdidas",
      "Te notifica cada nuevo cliente potencial",
    ],
    mathEyebrow: "Los Números",
    mathHeading: "Esto Es Todo Lo Que Recibes",
    tableColItem: "Qué Incluye", tableColValue: "Valor",
    valueRows: [
      { item: "Sitio Web (Máquina de Conversión)", value: "$1,500" },
      { item: "Chatbot IA 24/7",                   value: "$800/mes" },
      { item: "Hosting + Soporte",                 value: "$150/mes" },
      { item: "Actualizaciones Mensuales",          value: "$150/mes" },
    ],
    totalLabel: "Valor Total",
    totalStrike: "$2,600+/mes",
    allOfThis: "Todo esto, por solo:",
    cancelNote: "Mínimo 6 meses, luego cancela con 30 días de aviso.",
    pricingEyebrow: "Comenzar",
    pricingHeading: "A Un Paso De Lanzar Tu Sistema",
    stepsLabel: "Qué Pasa Después",
    steps: [
      { label: "Hoy",          desc: "Envías el pago, empezamos a construir" },
      { label: "48–72 horas",  desc: "Tu sitio y chatbot quedan activos" },
      { label: "Continuamente", desc: "Nosotros manejamos cada actualización, tú atiendes las llamadas" },
    ],
    monthly: "Mensual", perMonth: "/mes",
    cancelNote2: "Mínimo 6 meses, luego cancela con 30 días de aviso.",
    includedItems: [
      "Sitio Web (Máquina de Conversión)",
      "Chatbot IA 24/7",
      "Hosting + Soporte",
      "Actualizaciones Mensuales",
    ],
    getStartedBtn: "Comenzar — $697/mes →",
    trust: ["🔒 Pago Seguro", "Cancela Cuando Quieras", "Sin Costo Inicial"],
    faqHeading: "Preguntas Frecuentes",
    faqItems: [
      {
        q: "¿Necesito hablar con alguien primero?",
        a: "No, puedes empezar aquí mismo. Todo se maneja en línea — sin llamadas de ventas ni demos.",
      },
      {
        q: "¿Cuánto tarda en estar listo mi sitio?",
        a: "48–72 horas después del pago. Nos movemos rápido porque sabemos que necesitas clientes ahora, no el próximo mes.",
      },
      {
        q: "¿Qué pasa si quiero cambios después?",
        a: "Incluido en tu plan mensual. Solo escríbenos y lo resolvemos — sin costo extra.",
      },
      {
        q: "¿Puedo cancelar?",
        a: "Sí — después de tu período inicial de 6 meses, puedes cancelar en cualquier momento con 30 días de aviso.",
      },
    ],
    footer:    `© ${new Date().getFullYear()} NJ Business Web · Todos los derechos reservados.`,
    mobileNo:  "Mín. 6 meses · Aviso 30 días",
    mobileGet: "Comenzar",
  },
};

// ── Shared styles ─────────────────────────────────────────────
const eyebrow: React.CSSProperties = {
  fontFamily: bodyFont,
  fontSize: "12px",
  fontWeight: 500,
  letterSpacing: "0.6px",
  textTransform: "uppercase" as const,
  color: C.moss70,
  marginBottom: "10px",
};

// ── Animation variants ────────────────────────────────────────
const revealVariant = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};
const cardContainerVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
const cardChildVariant = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

// ── SVG Icons ─────────────────────────────────────────────────
function IconGlobe({ color = C.limePulse, size = 22 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function IconChatbot({ color = C.limePulse, size = 22 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <circle cx="9" cy="10" r="1" fill={color} stroke="none" />
      <circle cx="12" cy="10" r="1" fill={color} stroke="none" />
      <circle cx="15" cy="10" r="1" fill={color} stroke="none" />
    </svg>
  );
}

// ── Floating dots background ──────────────────────────────────
function FloatingDots() {
  const dots = useMemo(() =>
    Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: (i * 37.3 + 13) % 100,
      y: (i * 61.7 + 7)  % 100,
      size: (i % 3) + 1,
      delay: (i * 0.4) % 9,
      duration: 14 + (i % 10),
      opacity: 0.1 + (i % 4) * 0.05,
    })), []
  );
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {dots.map((d) => (
        <motion.div key={d.id}
          style={{ position: "absolute", left: `${d.x}%`, top: `${d.y}%`, width: `${d.size}px`, height: `${d.size}px`, borderRadius: "50%", background: C.moss70, opacity: d.opacity }}
          animate={{ y: [-12, 12, -12] }}
          transition={{ duration: d.duration, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ── Glow orb ─────────────────────────────────────────────────
function GlowOrb() {
  return (
    <motion.div aria-hidden="true"
      style={{
        position: "absolute", left: "50%", top: "60%", transform: "translateX(-50%)",
        width: "700px", height: "280px", borderRadius: "50%",
        background: "radial-gradient(ellipse 55% 70% at 50% 50%, rgba(127,238,100,0.16) 0%, rgba(127,238,100,0.06) 40%, rgba(35,67,30,0.03) 65%, transparent 100%)",
        filter: "blur(56px)", pointerEvents: "none", zIndex: 0,
      }}
      animate={{ opacity: [0.65, 1, 0.65], scale: [0.97, 1.03, 0.97] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// ── Main component ────────────────────────────────────────────
export default function TradesSystem() {
  const [lang, setLang]       = useState<Lang>("en");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const t = COPY[lang];

  useEffect(() => {
    const fontId = "modal-fonts";
    if (!document.getElementById(fontId)) {
      const link = document.createElement("link");
      link.id = fontId; link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  // Reset open FAQ when language changes
  useEffect(() => { setOpenFaq(null); }, [lang]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ backgroundColor: C.voidBlack, color: C.sage60, fontFamily: bodyFont, minHeight: "100vh", overflowX: "hidden" }}
      className="pb-20 md:pb-0"
    >
      {/* Page-level navy gradient */}
      <div aria-hidden="true" style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(15,20,45,0.9) 0%, transparent 70%)",
      }} />

      {/* ── EN/ES Language Toggle ── fixed top-right corner */}
      <div style={{
        position: "fixed", top: "16px", right: "16px", zIndex: 200,
        display: "flex", alignItems: "center", gap: "0",
        background: C.carbonVeil, border: `1px solid ${C.circuitBorder}`,
        borderRadius: "9999px", overflow: "hidden",
        fontFamily: bodyFont, fontSize: "12px", fontWeight: 600,
      }}>
        {(["en", "es"] as Lang[]).map((l, i) => (
          <button key={l}
            onClick={() => setLang(l)}
            style={{
              padding: "6px 14px",
              background: lang === l ? C.limePulse : "transparent",
              color: lang === l ? C.groundIron : C.sage60,
              border: "none", cursor: "pointer",
              fontFamily: bodyFont, fontSize: "12px", fontWeight: 700,
              letterSpacing: "0.5px",
              borderRight: i === 0 ? `1px solid ${C.circuitBorder}` : "none",
              transition: "background 0.2s, color 0.2s",
            }}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════
          §1  HERO
      ═══════════════════════════════════════════════════════ */}
      <section style={{
        position: "relative", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", textAlign: "center",
        padding: "96px 24px 72px", maxWidth: "1280px", margin: "0 auto",
        overflow: "hidden", zIndex: 1,
      }}>
        <FloatingDots />
        <GlowOrb />

        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>

          {/* ⑤ Badge pulse */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "28px" }}>
            <motion.div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: C.limePulse, borderRadius: "9999px",
              padding: "6px 18px", fontSize: "11px", fontWeight: 600,
              letterSpacing: "0.7px", color: C.groundIron,
              textTransform: "uppercase", fontFamily: bodyFont,
            }}
              animate={{ scale: [1, 1.055, 1], opacity: [1, 0.82, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: C.groundIron, flexShrink: 0 }}
                animate={{ opacity: [1, 0.25, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              />
              {t.badge}
            </motion.div>
          </div>

          {/* ① BlurText headline */}
          <h1 style={{
            fontFamily: headingFont, fontWeight: 700,
            fontSize: "clamp(44px, 8vw, 96px)",
            lineHeight: 1.0, letterSpacing: "-1px",
            maxWidth: "900px", margin: "0 auto 28px",
            color: C.phosphorWhite, textTransform: "uppercase",
          }}>
            {t.headlineWords.map((w, i) => (
              <motion.span key={`${lang}-${i}`}
                style={{ display: "inline-block", color: w.color, marginRight: "0.22em" }}
                initial={{ opacity: 0, filter: "blur(10px)", y: 6 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {w.word}
              </motion.span>
            ))}
          </h1>

          {/* Component pills */}
          <motion.div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", flexWrap: "wrap", marginBottom: "28px" }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: t.headlineWords.length * 0.1 + 0.1, duration: 0.5 }}
          >
            {[
              { icon: <IconGlobe color={C.limePulse} size={16} />, label: t.pillWebsite },
              { icon: <IconChatbot color={C.limePulse} size={16} />, label: t.pillChatbot },
            ].map((p, i) => (
              <>
                {i > 0 && <span key="plus" style={{ color: C.circuitBorder, fontSize: "16px" }}>+</span>}
                <div key={p.label} style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  border: `1px solid ${C.circuitBorder}`, borderRadius: "9999px",
                  padding: "8px 18px", fontSize: "13px", fontWeight: 500,
                  color: C.moss80, fontFamily: bodyFont,
                }}>
                  {p.icon}{p.label}
                </div>
              </>
            ))}
          </motion.div>

          {/* Subhead */}
          <motion.p style={{
            fontFamily: bodyFont, fontSize: "clamp(15px, 2vw, 18px)",
            fontWeight: 400, letterSpacing: "-0.25px",
            color: C.moss80, maxWidth: "620px", lineHeight: 1.72,
            margin: "0 auto 40px",
          }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: t.headlineWords.length * 0.1 + 0.25, duration: 0.6 }}
          >
            {t.subhead}
          </motion.p>

          {/* CTA row */}
          <motion.div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: t.headlineWords.length * 0.1 + 0.4, duration: 0.5 }}
          >
            <motion.a
              href="https://buy.stripe.com/eVq9AT8zDfwV8Sn1EI8og0a"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: C.limePulse, color: C.groundIron, border: "none",
                borderRadius: "9999px", padding: "15px 32px",
                fontSize: "15px", fontWeight: 700, letterSpacing: "0.2px",
                cursor: "pointer", fontFamily: bodyFont, textTransform: "uppercase",
                textDecoration: "none",
              }}
              whileHover={{ scale: 1.05, boxShadow: `0 0 28px rgba(127,238,100,0.45)` }}
              whileTap={{ scale: 0.97 }} transition={{ duration: 0.2 }}
            >
              {t.ctaPrimary}
            </motion.a>

            <motion.button onClick={() => scrollTo("system")}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "transparent", color: C.moss80,
                border: `1px solid ${C.circuitBorder}`, borderRadius: "9999px",
                padding: "15px 32px", fontSize: "15px", fontWeight: 500,
                cursor: "pointer", fontFamily: bodyFont,
              }}
              whileHover={{ borderColor: C.moss70, color: C.phosphorWhite }}
              whileTap={{ scale: 0.97 }} transition={{ duration: 0.2 }}
            >
              {t.ctaSecondary}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          §2  THE SYSTEM
      ═══════════════════════════════════════════════════════ */}
      <motion.section id="system"
        style={{ padding: "0 24px 80px", maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 1 }}
        variants={revealVariant} initial="hidden" whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div style={{ borderTop: `1px solid ${C.circuitBorder}`, marginBottom: "56px" }} />

        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={eyebrow}>{t.systemEyebrow}</p>
          <h2 style={{ fontFamily: headingFont, fontWeight: 700, fontSize: "clamp(28px, 4.5vw, 48px)", letterSpacing: "-0.5px", lineHeight: 1.05, color: C.phosphorWhite, textTransform: "uppercase", margin: 0 }}>
            {t.systemHeading}
          </h2>
          <p style={{ fontFamily: bodyFont, fontSize: "15px", color: C.sage60, marginTop: "12px" }}>
            {t.systemSub}
          </p>
        </div>

        {/* Step tabs row */}
        <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "40px", flexWrap: "wrap" }}>
          {[
            { n: 1, label: t.tab1Label, sub: t.tab1Sub, icon: <IconGlobe size={20} /> },
            { n: 2, label: t.tab2Label, sub: t.tab2Sub, icon: <IconChatbot size={20} /> },
          ].map((tab) => (
            <div key={tab.n} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
              background: C.carbonVeil, border: `1px solid ${C.circuitBorder}`,
              borderRadius: "8px", padding: "16px 24px", minWidth: "160px",
            }}>
              <span style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: "22px", height: "22px", borderRadius: "9999px",
                background: C.limePulse, color: C.groundIron,
                fontSize: "11px", fontWeight: 700, fontFamily: bodyFont,
              }}>{tab.n}</span>
              {tab.icon}
              <span style={{ fontFamily: headingFont, fontSize: "13px", fontWeight: 700, color: C.phosphorWhite, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {tab.label}
              </span>
              <span style={{ fontFamily: bodyFont, fontSize: "11px", color: C.sage60, textAlign: "center" }}>
                {tab.sub}
              </span>
            </div>
          ))}
        </div>

        {/* Stacked horizontal cards */}
        <motion.div style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          variants={cardContainerVariant} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {/* Website card */}
          <motion.div variants={cardChildVariant}
            whileHover={{ scale: 1.01, filter: "brightness(1.07)" }} transition={{ duration: 0.25 }}
            style={{
              background: C.carbonVeil, border: `1px solid ${C.circuitBorder}`,
              borderRadius: "8px", padding: "32px",
              display: "grid", gridTemplateColumns: "auto 1fr",
              gap: "28px", alignItems: "flex-start",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", minWidth: "80px" }}>
              <span style={{ display: "inline-block", width: "28px", height: "28px", borderRadius: "9999px", background: C.limePulse, color: C.groundIron, fontFamily: bodyFont, fontWeight: 700, fontSize: "13px", lineHeight: "28px", textAlign: "center" }}>1</span>
              <div style={{ width: "56px", height: "56px", borderRadius: "8px", background: "rgba(127,238,100,0.1)", border: "1px solid rgba(127,238,100,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconGlobe size={26} />
              </div>
              <div style={{ background: "rgba(127,238,100,0.12)", border: "1px solid rgba(127,238,100,0.2)", borderRadius: "6px", padding: "3px 8px", fontSize: "11px", fontWeight: 700, color: C.limePulse, fontFamily: bodyFont, whiteSpace: "nowrap" }}>
                {t.card1Value}
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily: headingFont, fontWeight: 700, fontSize: "22px", letterSpacing: "-0.3px", color: C.phosphorWhite, marginBottom: "4px" }}>
                {t.card1H3}
              </h3>
              <p style={{ fontFamily: bodyFont, fontSize: "14px", color: C.moss70, marginBottom: "20px" }}>
                {t.card1Sub}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px 24px" }}>
                {t.card1Features.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <span style={{ color: C.limePulse, fontWeight: 700, fontSize: "13px", flexShrink: 0, marginTop: "1px" }}>✓</span>
                    <span style={{ fontSize: "14px", color: C.sage60, lineHeight: 1.5, letterSpacing: "-0.15px" }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* AI Chatbot card */}
          <motion.div variants={cardChildVariant}
            whileHover={{ scale: 1.01, filter: "brightness(1.07)" }} transition={{ duration: 0.25 }}
            style={{
              background: C.carbonVeil, border: `1px solid ${C.circuitBorder}`,
              borderRadius: "8px", padding: "32px",
              display: "grid", gridTemplateColumns: "auto 1fr",
              gap: "28px", alignItems: "flex-start",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", minWidth: "80px" }}>
              <span style={{ display: "inline-block", width: "28px", height: "28px", borderRadius: "9999px", background: C.limePulse, color: C.groundIron, fontFamily: bodyFont, fontWeight: 700, fontSize: "13px", lineHeight: "28px", textAlign: "center" }}>2</span>
              <div style={{ width: "56px", height: "56px", borderRadius: "8px", background: "rgba(127,238,100,0.1)", border: "1px solid rgba(127,238,100,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconChatbot size={26} />
              </div>
              <div style={{ background: "rgba(127,238,100,0.12)", border: "1px solid rgba(127,238,100,0.2)", borderRadius: "6px", padding: "3px 8px", fontSize: "11px", fontWeight: 700, color: C.limePulse, fontFamily: bodyFont, whiteSpace: "nowrap" }}>
                {t.card2Value}
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily: headingFont, fontWeight: 700, fontSize: "22px", letterSpacing: "-0.3px", color: C.phosphorWhite, marginBottom: "4px" }}>
                {t.card2H3}
              </h3>
              <p style={{ fontFamily: bodyFont, fontSize: "14px", color: C.moss70, marginBottom: "20px" }}>
                {t.card2Sub}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px 24px" }}>
                {t.card2Features.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <span style={{ color: C.limePulse, fontWeight: 700, fontSize: "13px", flexShrink: 0, marginTop: "1px" }}>✓</span>
                    <span style={{ fontSize: "14px", color: C.sage60, lineHeight: 1.5, letterSpacing: "-0.15px" }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════
          §3  THE MATH / WHAT'S INCLUDED
      ═══════════════════════════════════════════════════════ */}
      <motion.section id="included"
        style={{ padding: "80px 24px", maxWidth: "760px", margin: "0 auto", position: "relative", zIndex: 1 }}
        variants={revealVariant} initial="hidden" whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={eyebrow}>{t.mathEyebrow}</p>
          <h2 style={{ fontFamily: headingFont, fontWeight: 700, fontSize: "clamp(26px, 4vw, 44px)", letterSpacing: "-0.5px", lineHeight: 1.05, color: C.phosphorWhite, textTransform: "uppercase", margin: 0 }}>
            {t.mathHeading}
          </h2>
        </div>

        <div style={{ border: `1px solid ${C.circuitBorder}`, borderRadius: "8px", overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 28px", borderBottom: `1px solid ${C.circuitBorder}`, background: C.carbonVeil }}>
            <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.6px", textTransform: "uppercase", color: C.moss70, fontFamily: bodyFont }}>{t.tableColItem}</span>
            <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.6px", textTransform: "uppercase", color: C.moss70, fontFamily: bodyFont }}>{t.tableColValue}</span>
          </div>
          {t.valueRows.map((row, i) => (
            <div key={row.item} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "18px 28px",
              borderBottom: i < t.valueRows.length - 1 ? `1px solid ${C.circuitBorder}` : "none",
              background: i % 2 === 0 ? "transparent" : "rgba(33,37,37,0.4)",
              gap: "16px",
            }}>
              <span style={{ fontSize: "15px", letterSpacing: "-0.2px", color: C.sage60 }}>{row.item}</span>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "rgba(140,171,135,0.45)", textDecoration: "line-through", flexShrink: 0, fontFamily: bodyFont }}>{row.value}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 28px", background: C.groundIron, borderTop: `1px solid ${C.circuitBorder}` }}>
            <span style={{ fontFamily: headingFont, fontSize: "14px", fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase", color: C.phosphorWhite }}>
              {t.totalLabel}
            </span>
            <span style={{ fontFamily: headingFont, fontSize: "22px", fontWeight: 700, color: C.limePulse, letterSpacing: "-0.3px", textDecoration: "line-through" }}>
              {t.totalStrike}
            </span>
          </div>
          <div style={{ padding: "28px", textAlign: "center", background: "rgba(127,238,100,0.04)", borderTop: "1px solid rgba(127,238,100,0.15)" }}>
            <div style={{ fontSize: "13px", color: C.moss70, marginBottom: "8px" }}>{t.allOfThis}</div>
            <div style={{ fontFamily: headingFont, fontWeight: 700, fontSize: "clamp(44px, 8vw, 64px)", letterSpacing: "-0.5px", color: C.limePulse, lineHeight: 1, marginBottom: "10px" }}>
              $697/month
            </div>
            {/* ← Updated cancel note location 1 */}
            <div style={{ fontSize: "13px", color: C.moss70 }}>{t.cancelNote}</div>
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════
          §4  HOW IT WORKS + PRICING (2-column)
      ═══════════════════════════════════════════════════════ */}
      <motion.section id="pricing"
        style={{ padding: "80px 24px 100px", maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 1 }}
        variants={revealVariant} initial="hidden" whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={eyebrow}>{t.pricingEyebrow}</p>
          <h2 style={{ fontFamily: headingFont, fontWeight: 700, fontSize: "clamp(26px, 4vw, 44px)", letterSpacing: "-0.5px", lineHeight: 1.05, color: C.phosphorWhite, textTransform: "uppercase", margin: 0 }}>
            {t.pricingHeading}
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px", alignItems: "start" }}>

          {/* LEFT — What Happens Next */}
          <div style={{ background: C.carbonVeil, border: `1px solid ${C.circuitBorder}`, borderRadius: "8px", padding: "32px" }}>
            <p style={{ ...eyebrow, marginBottom: "20px" }}>{t.stepsLabel}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {t.steps.map((step, i) => (
                <div key={step.label} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "28px", height: "28px", borderRadius: "9999px", background: C.limePulse, color: C.groundIron, fontFamily: bodyFont, fontWeight: 700, fontSize: "13px", flexShrink: 0, marginTop: "2px" }}>
                    {i + 1}
                  </span>
                  <div>
                    <div style={{ fontFamily: headingFont, fontWeight: 600, fontSize: "15px", color: C.phosphorWhite, marginBottom: "3px" }}>
                      {step.label}:
                    </div>
                    <div style={{ fontFamily: bodyFont, fontSize: "14px", color: C.sage60, lineHeight: 1.55 }}>
                      {step.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Pricing card */}
          <div style={{ background: C.groundIron, border: `1px solid ${C.circuitBorder}`, borderRadius: "8px", padding: "32px" }}>
            <p style={{ ...eyebrow, marginBottom: "8px" }}>{t.monthly}</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "4px" }}>
              <span style={{ fontFamily: headingFont, fontWeight: 700, fontSize: "56px", letterSpacing: "-1px", color: C.limePulse, lineHeight: 1 }}>$697</span>
              <span style={{ fontFamily: bodyFont, fontSize: "15px", color: C.moss70 }}>{t.perMonth}</span>
            </div>
            {/* ← Updated cancel note location 2 */}
            <p style={{ fontFamily: bodyFont, fontSize: "13px", color: C.sage60, marginBottom: "24px" }}>
              {t.cancelNote2}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
              {t.includedItems.map((item) => (
                <div key={item} style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "10px 14px", background: C.carbonVeil,
                  borderRadius: "6px", border: `1px solid ${C.circuitBorder}`,
                }}>
                  <span style={{ color: C.limePulse, fontWeight: 700, fontSize: "13px", flexShrink: 0 }}>✓</span>
                  <span style={{ fontFamily: bodyFont, fontSize: "14px", color: C.moss80 }}>{item}</span>
                </div>
              ))}
            </div>

            <motion.a
              href="https://buy.stripe.com/eVq9AT8zDfwV8Sn1EI8og0a"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "block", background: C.limePulse, color: C.groundIron,
                borderRadius: "12px", padding: "16px 32px",
                fontSize: "15px", fontWeight: 700, letterSpacing: "0.2px",
                cursor: "pointer", fontFamily: bodyFont, textDecoration: "none",
                boxSizing: "border-box", marginBottom: "12px",
                textAlign: "center", textTransform: "uppercase",
              }}
              whileHover={{ scale: 1.03, boxShadow: `0 0 32px rgba(127,238,100,0.5)` }}
              whileTap={{ scale: 0.97 }} transition={{ duration: 0.2 }}
            >
              {t.getStartedBtn}
            </motion.a>

            <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
              {t.trust.map((tx) => (
                <span key={tx} style={{ fontFamily: bodyFont, fontSize: "11px", color: C.sage60 }}>{tx}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════
          §5  FAQ
      ═══════════════════════════════════════════════════════ */}
      <motion.section id="faq"
        style={{ padding: "80px 24px 100px", maxWidth: "680px", margin: "0 auto", position: "relative", zIndex: 1 }}
        variants={revealVariant} initial="hidden" whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontFamily: headingFont, fontWeight: 700, fontSize: "clamp(26px, 4vw, 40px)", letterSpacing: "-0.5px", textTransform: "uppercase", color: C.phosphorWhite, margin: 0 }}>
            {t.faqHeading}
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {t.faqItems.map((item, i) => (
            <motion.div key={`${lang}-faq-${i}`}
              style={{ border: `1px solid ${C.circuitBorder}`, borderRadius: "8px", overflow: "hidden", cursor: "pointer" }}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              whileHover={{ borderColor: C.moss70 }} transition={{ duration: 0.2 }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", gap: "16px" }}>
                <span style={{ fontSize: "15px", fontWeight: 500, letterSpacing: "-0.2px", color: C.phosphorWhite, lineHeight: 1.4 }}>
                  {item.q}
                </span>
                <motion.span
                  style={{ color: openFaq === i ? C.limePulse : C.moss70, fontSize: "18px", flexShrink: 0, display: "inline-block", lineHeight: 1 }}
                  animate={{ rotate: openFaq === i ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >+</motion.span>
              </div>
              <AnimatePresence initial={false}>
                {openFaq === i && (
                  <motion.div key="answer"
                    initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div style={{ padding: "16px 22px 20px", fontSize: "15px", letterSpacing: "-0.2px", color: C.sage60, lineHeight: 1.72, borderTop: `1px solid ${C.circuitBorder}` }}>
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${C.circuitBorder}`, padding: "28px 24px", textAlign: "center", fontSize: "13px", color: C.fernLink, position: "relative", zIndex: 1 }}>
        {t.footer}
      </footer>

      {/* Mobile sticky pricing bar */}
      <div className="md:hidden" style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
        background: C.groundIron, borderTop: `1px solid ${C.circuitBorder}`,
        padding: "10px 16px", display: "flex", alignItems: "center", gap: "14px",
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: headingFont, fontSize: "20px", fontWeight: 700, letterSpacing: "-0.3px", color: C.limePulse, lineHeight: 1.1 }}>
            $697
            <span style={{ fontSize: "13px", fontWeight: 400, color: C.moss70, marginLeft: "3px", fontFamily: bodyFont }}>
              {t.perMonth}
            </span>
          </div>
          {/* ← Updated cancel note location 3 (mobile sticky) */}
          <div style={{ fontSize: "11px", color: C.sage60, marginTop: "2px" }}>
            {t.mobileNo}
          </div>
        </div>
        <motion.a
          href="https://buy.stripe.com/eVq9AT8zDfwV8Sn1EI8og0a"
          target="_blank" rel="noopener noreferrer"
          style={{
            background: C.limePulse, color: C.groundIron, border: "none",
            borderRadius: "9999px", padding: "11px 20px",
            fontSize: "14px", fontWeight: 700, cursor: "pointer",
            fontFamily: bodyFont, whiteSpace: "nowrap", textDecoration: "none", flexShrink: 0,
          }}
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
        >
          {t.mobileGet}
        </motion.a>
      </div>
    </div>
  );
}
