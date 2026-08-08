import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   NJ Business Web — Trades System Landing Page
   Design System: Modal · Layout: adapted from reference (A-List style)
   Tokens + animations unchanged — structure adapted to match reference
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

// ── Content ───────────────────────────────────────────────────
const HEADLINE_WORDS: { word: string; color: string }[] = [
  { word: "THE",      color: C.phosphorWhite },
  { word: "COMPLETE", color: C.phosphorWhite },
  { word: "LEAD",     color: C.limePulse },
  { word: "SYSTEM",   color: C.limePulse },
  { word: "FOR",      color: C.phosphorWhite },
  { word: "LOCAL",    color: C.phosphorWhite },
  { word: "TRADES",   color: C.phosphorWhite },
];

const FEATURES_WEBSITE = [
  "Custom design built for your trade",
  "Click-to-call and WhatsApp buttons",
  "Photo gallery of your work",
  "Mobile-optimized — most searches happen on phone",
  "Bilingual EN/ES available",
];

const FEATURES_CHATBOT = [
  "Answers customer questions instantly",
  "Captures leads even when you're on a job",
  "Works day and night, no missed opportunities",
  "Sends you a notification for every new lead",
];

const VALUE_ROWS = [
  { item: "Website (Conversion Machine)", value: "$1,500" },
  { item: "AI Chatbot 24/7",              value: "$800/mo" },
  { item: "Hosting + Support",            value: "$150/mo" },
  { item: "Monthly Updates & Changes",    value: "$150/mo" },
];

const STEPS = [
  { label: "Today",       desc: "Submit payment, we start building" },
  { label: "48–72 hours", desc: "Your site and chatbot go live" },
  { label: "Ongoing",     desc: "We handle every update, you handle the calls coming in" },
];

const FAQ_ITEMS = [
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
    a: "Yes, anytime. No contracts, no cancellation fees. We earn your business every single month.",
  },
];

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  },
};

const cardContainerVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardChildVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  },
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

// ── Floating dots ─────────────────────────────────────────────
function FloatingDots() {
  const dots = useMemo(() =>
    Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: (i * 37.3 + 13) % 100,
      y: (i * 61.7 + 7) % 100,
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
        position: "absolute", left: "50%", top: "60%",
        transform: "translateX(-50%)",
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
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const fontId = "modal-fonts";
    if (!document.getElementById(fontId)) {
      const link = document.createElement("link");
      link.id = fontId; link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ backgroundColor: C.voidBlack, color: C.sage60, fontFamily: bodyFont, minHeight: "100vh", overflowX: "hidden" }}
      className="pb-20 md:pb-0"
    >
      {/* Page-level subtle navy gradient (matches reference's deep space bg) */}
      <div aria-hidden="true" style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(15,20,45,0.9) 0%, transparent 70%)",
      }} />

      {/* ═══════════════════════════════════════════════════════
          §1  HERO
          Layout: badge → huge UPPERCASE headline → component pills
          → subhead → dual CTA
      ═══════════════════════════════════════════════════════ */}
      <section style={{
        position: "relative", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", textAlign: "center",
        padding: "96px 24px 72px", maxWidth: "1280px", margin: "0 auto", overflow: "hidden",
        zIndex: 1,
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
              Limited Availability
            </motion.div>
          </div>

          {/* ① BlurText — large UPPERCASE headline matching reference style */}
          <h1 style={{
            fontFamily: headingFont, fontWeight: 700,
            fontSize: "clamp(44px, 8vw, 96px)",
            lineHeight: 1.0, letterSpacing: "-1px",
            maxWidth: "900px", margin: "0 auto 28px",
            color: C.phosphorWhite, textTransform: "uppercase",
          }}>
            {HEADLINE_WORDS.map((w, i) => (
              <motion.span key={i}
                style={{ display: "inline-block", color: w.color, marginRight: "0.22em" }}
                initial={{ opacity: 0, filter: "blur(10px)", y: 6 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {w.word}
              </motion.span>
            ))}
          </h1>

          {/* Component pills row — reference pattern: shows what's included visually */}
          <motion.div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", flexWrap: "wrap", marginBottom: "28px" }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: HEADLINE_WORDS.length * 0.1 + 0.1, duration: 0.5 }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              border: `1px solid ${C.circuitBorder}`, borderRadius: "9999px",
              padding: "8px 18px", fontSize: "13px", fontWeight: 500,
              color: C.moss80, fontFamily: bodyFont,
            }}>
              <IconGlobe color={C.limePulse} size={16} />
              Website
            </div>
            <span style={{ color: C.circuitBorder, fontSize: "16px" }}>+</span>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              border: `1px solid ${C.circuitBorder}`, borderRadius: "9999px",
              padding: "8px 18px", fontSize: "13px", fontWeight: 500,
              color: C.moss80, fontFamily: bodyFont,
            }}>
              <IconChatbot color={C.limePulse} size={16} />
              AI Chatbot
            </div>
          </motion.div>

          {/* Subhead */}
          <motion.p style={{
            fontFamily: bodyFont, fontSize: "clamp(15px, 2vw, 18px)",
            fontWeight: 400, letterSpacing: "-0.25px",
            color: C.moss80, maxWidth: "580px", lineHeight: 1.72,
            margin: "0 auto 40px",
          }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: HEADLINE_WORDS.length * 0.1 + 0.25, duration: 0.6 }}
          >
            A professional website + AI chatbot that captures leads 24/7 —
            all for $697/month. No setup fee. No contracts.
          </motion.p>

          {/* CTA row */}
          <motion.div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: HEADLINE_WORDS.length * 0.1 + 0.4, duration: 0.5 }}
          >
            <motion.button onClick={() => scrollTo("pricing")}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: C.limePulse, color: C.groundIron, border: "none",
                borderRadius: "9999px", padding: "15px 32px",
                fontSize: "15px", fontWeight: 700, letterSpacing: "0.2px",
                cursor: "pointer", fontFamily: bodyFont, textTransform: "uppercase",
              }}
              whileHover={{ scale: 1.05, boxShadow: `0 0 28px rgba(127,238,100,0.45)` }}
              whileTap={{ scale: 0.97 }} transition={{ duration: 0.2 }}
            >
              Get Started — $697/mo
            </motion.button>

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
              See What's Included ↓
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          §2  THE SYSTEM
          Layout: stacked full-width horizontal cards (reference style)
          Each card: icon+number+title LEFT, 2-col features RIGHT
      ═══════════════════════════════════════════════════════ */}
      <motion.section id="system"
        style={{ padding: "0 24px 80px", maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 1 }}
        variants={revealVariant} initial="hidden" whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div style={{ borderTop: `1px solid ${C.circuitBorder}`, marginBottom: "56px" }} />

        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={eyebrow}>The System</p>
          <h2 style={{
            fontFamily: headingFont, fontWeight: 700,
            fontSize: "clamp(28px, 4.5vw, 48px)",
            letterSpacing: "-0.5px", lineHeight: 1.05,
            color: C.phosphorWhite, textTransform: "uppercase", margin: 0,
          }}>
            A Complete Growth Stack
          </h2>
          <p style={{ fontFamily: bodyFont, fontSize: "15px", color: C.sage60, marginTop: "12px" }}>
            Two parts. One system. All your leads.
          </p>
        </div>

        {/* Step tabs row — reference pattern */}
        <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "40px", flexWrap: "wrap" }}>
          {[
            { n: 1, label: "Website", sub: "Turn leads into customers", icon: <IconGlobe size={20} /> },
            { n: 2, label: "AI Chatbot", sub: "Answer customers 24/7", icon: <IconChatbot size={20} /> },
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

        {/* Stacked horizontal cards — reference style */}
        <motion.div style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          variants={cardContainerVariant} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {/* Website card */}
          <motion.div variants={cardChildVariant}
            whileHover={{ scale: 1.01, filter: "brightness(1.07)" }}
            transition={{ duration: 0.25 }}
            style={{
              background: C.carbonVeil, border: `1px solid ${C.circuitBorder}`,
              borderRadius: "8px", padding: "32px",
              display: "grid", gridTemplateColumns: "auto 1fr",
              gap: "28px", alignItems: "flex-start",
            }}
          >
            {/* Left col: number + icon + value badge */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", minWidth: "80px" }}>
              <span style={{
                display: "inline-block", width: "28px", height: "28px",
                borderRadius: "9999px", background: C.limePulse,
                color: C.groundIron, fontFamily: bodyFont, fontWeight: 700,
                fontSize: "13px", lineHeight: "28px", textAlign: "center",
              }}>1</span>
              <div style={{
                width: "56px", height: "56px", borderRadius: "8px",
                background: "rgba(127,238,100,0.1)", border: `1px solid rgba(127,238,100,0.2)`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <IconGlobe size={26} />
              </div>
              <div style={{
                background: "rgba(127,238,100,0.12)", border: `1px solid rgba(127,238,100,0.2)`,
                borderRadius: "6px", padding: "3px 8px",
                fontSize: "11px", fontWeight: 700, color: C.limePulse,
                fontFamily: bodyFont, whiteSpace: "nowrap",
              }}>
                $1,500 value
              </div>
            </div>

            {/* Right col: title + 2-col features */}
            <div>
              <h3 style={{
                fontFamily: headingFont, fontWeight: 700, fontSize: "22px",
                letterSpacing: "-0.3px", color: C.phosphorWhite, marginBottom: "4px",
              }}>
                Website — The Conversion Machine
              </h3>
              <p style={{ fontFamily: bodyFont, fontSize: "14px", color: C.moss70, marginBottom: "20px" }}>
                Not a brochure. A machine that books calls while you sleep.
              </p>

              {/* 2-column features — reference pattern */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "10px 24px",
              }}>
                {FEATURES_WEBSITE.map((f) => (
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
            whileHover={{ scale: 1.01, filter: "brightness(1.07)" }}
            transition={{ duration: 0.25 }}
            style={{
              background: C.carbonVeil, border: `1px solid ${C.circuitBorder}`,
              borderRadius: "8px", padding: "32px",
              display: "grid", gridTemplateColumns: "auto 1fr",
              gap: "28px", alignItems: "flex-start",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", minWidth: "80px" }}>
              <span style={{
                display: "inline-block", width: "28px", height: "28px",
                borderRadius: "9999px", background: C.limePulse,
                color: C.groundIron, fontFamily: bodyFont, fontWeight: 700,
                fontSize: "13px", lineHeight: "28px", textAlign: "center",
              }}>2</span>
              <div style={{
                width: "56px", height: "56px", borderRadius: "8px",
                background: "rgba(127,238,100,0.1)", border: `1px solid rgba(127,238,100,0.2)`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <IconChatbot size={26} />
              </div>
              <div style={{
                background: "rgba(127,238,100,0.12)", border: `1px solid rgba(127,238,100,0.2)`,
                borderRadius: "6px", padding: "3px 8px",
                fontSize: "11px", fontWeight: 700, color: C.limePulse,
                fontFamily: bodyFont, whiteSpace: "nowrap",
              }}>
                $800/mo value
              </div>
            </div>

            <div>
              <h3 style={{
                fontFamily: headingFont, fontWeight: 700, fontSize: "22px",
                letterSpacing: "-0.3px", color: C.phosphorWhite, marginBottom: "4px",
              }}>
                AI Chatbot — Answers Customers 24/7
              </h3>
              <p style={{ fontFamily: bodyFont, fontSize: "14px", color: C.moss70, marginBottom: "20px" }}>
                Captures leads even when you're on a job. Never miss another call.
              </p>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "10px 24px",
              }}>
                {FEATURES_CHATBOT.map((f) => (
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
          Layout: ledger table with highlighted total row (reference §5 style)
      ═══════════════════════════════════════════════════════ */}
      <motion.section id="included"
        style={{ padding: "80px 24px", maxWidth: "760px", margin: "0 auto", position: "relative", zIndex: 1 }}
        variants={revealVariant} initial="hidden" whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={eyebrow}>The Math</p>
          <h2 style={{
            fontFamily: headingFont, fontWeight: 700,
            fontSize: "clamp(26px, 4vw, 44px)",
            letterSpacing: "-0.5px", lineHeight: 1.05,
            color: C.phosphorWhite, textTransform: "uppercase", margin: 0,
          }}>
            Here's Everything You're Getting
          </h2>
        </div>

        <div style={{ border: `1px solid ${C.circuitBorder}`, borderRadius: "8px", overflow: "hidden" }}>
          {/* Header row */}
          <div style={{
            display: "flex", justifyContent: "space-between",
            padding: "12px 28px", borderBottom: `1px solid ${C.circuitBorder}`,
            background: C.carbonVeil,
          }}>
            <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.6px", textTransform: "uppercase", color: C.moss70, fontFamily: bodyFont }}>Item</span>
            <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.6px", textTransform: "uppercase", color: C.moss70, fontFamily: bodyFont }}>Value</span>
          </div>

          {VALUE_ROWS.map((row, i) => (
            <div key={row.item} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "18px 28px",
              borderBottom: i < VALUE_ROWS.length - 1 ? `1px solid ${C.circuitBorder}` : "none",
              background: i % 2 === 0 ? "transparent" : "rgba(33,37,37,0.4)",
              gap: "16px",
            }}>
              <span style={{ fontSize: "15px", letterSpacing: "-0.2px", color: C.sage60 }}>{row.item}</span>
              <span style={{
                fontSize: "14px", fontWeight: 600,
                color: "rgba(140,171,135,0.45)", textDecoration: "line-through",
                flexShrink: 0, fontFamily: bodyFont,
              }}>{row.value}</span>
            </div>
          ))}

          {/* TOTAL VALUE row — reference style highlighted */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "20px 28px",
            background: C.groundIron, borderTop: `1px solid ${C.circuitBorder}`,
          }}>
            <span style={{
              fontFamily: headingFont, fontSize: "14px", fontWeight: 700,
              letterSpacing: "0.5px", textTransform: "uppercase", color: C.phosphorWhite,
            }}>
              Total Value
            </span>
            <span style={{
              fontFamily: headingFont, fontSize: "22px", fontWeight: 700,
              color: C.limePulse, letterSpacing: "-0.3px", textDecoration: "line-through",
            }}>
              $2,600+/mo
            </span>
          </div>

          {/* Price reveal */}
          <div style={{
            padding: "28px", textAlign: "center",
            background: "rgba(127,238,100,0.04)",
            borderTop: `1px solid rgba(127,238,100,0.15)`,
          }}>
            <div style={{ fontSize: "13px", color: C.moss70, marginBottom: "8px" }}>
              All of this, for just:
            </div>
            <div style={{
              fontFamily: headingFont, fontWeight: 700,
              fontSize: "clamp(44px, 8vw, 64px)", letterSpacing: "-0.5px",
              color: C.limePulse, lineHeight: 1, marginBottom: "10px",
            }}>
              $697/month
            </div>
            <div style={{ fontSize: "13px", color: C.moss70 }}>
              No setup fee. Cancel anytime. No contracts.
            </div>
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════
          §4  HOW IT WORKS + PRICING
          Layout: 2-column (reference §7) — steps LEFT, pricing card RIGHT
      ═══════════════════════════════════════════════════════ */}
      <motion.section id="pricing"
        style={{ padding: "80px 24px 100px", maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 1 }}
        variants={revealVariant} initial="hidden" whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={eyebrow}>Get Started</p>
          <h2 style={{
            fontFamily: headingFont, fontWeight: 700,
            fontSize: "clamp(26px, 4vw, 44px)",
            letterSpacing: "-0.5px", lineHeight: 1.05,
            color: C.phosphorWhite, textTransform: "uppercase", margin: 0,
          }}>
            One step away from launching your system
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px", alignItems: "start",
        }}>

          {/* LEFT — What Happens Next (steps) */}
          <div style={{
            background: C.carbonVeil, border: `1px solid ${C.circuitBorder}`,
            borderRadius: "8px", padding: "32px",
          }}>
            <p style={{ ...eyebrow, marginBottom: "20px" }}>What Happens Next</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {STEPS.map((step, i) => (
                <div key={step.label} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <span style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    width: "28px", height: "28px", borderRadius: "9999px",
                    background: C.limePulse, color: C.groundIron,
                    fontFamily: bodyFont, fontWeight: 700, fontSize: "13px",
                    flexShrink: 0, marginTop: "2px",
                  }}>{i + 1}</span>
                  <div>
                    <div style={{
                      fontFamily: headingFont, fontWeight: 600, fontSize: "15px",
                      color: C.phosphorWhite, marginBottom: "3px",
                    }}>
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

          {/* RIGHT — Pricing card (reference style: price + list + CTA) */}
          <div style={{
            background: C.groundIron, border: `1px solid ${C.circuitBorder}`,
            borderRadius: "8px", padding: "32px",
          }}>
            <p style={{ ...eyebrow, marginBottom: "8px" }}>Monthly</p>

            <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "4px" }}>
              <span style={{
                fontFamily: headingFont, fontWeight: 700, fontSize: "56px",
                letterSpacing: "-1px", color: C.limePulse, lineHeight: 1,
              }}>$697</span>
              <span style={{ fontFamily: bodyFont, fontSize: "15px", color: C.moss70 }}>/month</span>
            </div>
            <p style={{ fontFamily: bodyFont, fontSize: "13px", color: C.sage60, marginBottom: "24px" }}>
              Cancel anytime. No contracts.
            </p>

            {/* Included list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
              {[
                "Website (Conversion Machine)",
                "AI Chatbot 24/7",
                "Hosting + Support",
                "Monthly Updates & Changes",
              ].map((item) => (
                <div key={item} style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "10px 14px",
                  background: C.carbonVeil, borderRadius: "6px",
                  border: `1px solid ${C.circuitBorder}`,
                }}>
                  <span style={{ color: C.limePulse, fontWeight: 700, fontSize: "13px", flexShrink: 0 }}>✓</span>
                  <span style={{ fontFamily: bodyFont, fontSize: "14px", color: C.moss80 }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Primary CTA */}
            <motion.a href="#"
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
              Get Started — $697/mo →
            </motion.a>

            {/* Trust row */}
            <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
              {["🔒 Secure Checkout", "Cancel Anytime", "No Setup Fee"].map((t) => (
                <span key={t} style={{ fontFamily: bodyFont, fontSize: "11px", color: C.sage60 }}>{t}</span>
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
          <h2 style={{
            fontFamily: headingFont, fontWeight: 700,
            fontSize: "clamp(26px, 4vw, 40px)",
            letterSpacing: "-0.5px", textTransform: "uppercase",
            color: C.phosphorWhite, margin: 0,
          }}>
            Common Questions
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {FAQ_ITEMS.map((item, i) => (
            <motion.div key={i}
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
        © {new Date().getFullYear()} NJ Business Web · All rights reserved.
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
            <span style={{ fontSize: "13px", fontWeight: 400, color: C.moss70, marginLeft: "3px", fontFamily: bodyFont }}>/mo</span>
          </div>
          <div style={{ fontSize: "11px", color: C.sage60, marginTop: "2px" }}>
            No setup fee · Cancel anytime
          </div>
        </div>
        <motion.a href="#"
          style={{
            background: C.limePulse, color: C.groundIron, border: "none",
            borderRadius: "9999px", padding: "11px 20px",
            fontSize: "14px", fontWeight: 700, cursor: "pointer",
            fontFamily: bodyFont, whiteSpace: "nowrap", textDecoration: "none", flexShrink: 0,
          }}
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
        >
          Get Started
        </motion.a>
      </div>
    </div>
  );
}
