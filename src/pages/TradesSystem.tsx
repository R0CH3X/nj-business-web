import { useState, useEffect, useMemo } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   NJ Business Web — Trades System Landing Page
   Design System: Modal
   Animations: Framer Motion (all 5 confirmed below)
   ① BlurText headline  ② Scroll-reveal sections  ③ Card stagger
   ④ Hover states  ⑤ Badge pulse  + Glow orb  + Floating dots
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
  { word: "The",     color: C.limePulse },
  { word: "Complete",color: C.limePulse },
  { word: "Lead",    color: C.phosphorWhite },
  { word: "System",  color: C.phosphorWhite },
  { word: "for",     color: C.phosphorWhite },
  { word: "Local",   color: C.phosphorWhite },
  { word: "Trades",  color: C.phosphorWhite },
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
  { item: "Website (Conversion Machine)", value: "$1,500 value" },
  { item: "AI Chatbot 24/7",              value: "$800/mo value" },
  { item: "Hosting + Support",            value: "$150/mo value" },
  { item: "Monthly Updates & Changes",    value: "$150/mo value" },
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

// ── Shared style helpers ──────────────────────────────────────
const eyebrow: React.CSSProperties = {
  fontFamily: bodyFont,
  fontSize: "12px",
  fontWeight: 500,
  letterSpacing: "0.6px",
  textTransform: "uppercase" as const,
  color: C.moss70,
  marginBottom: "14px",
};

const card: React.CSSProperties = {
  background: C.carbonVeil,
  border: `1px solid ${C.circuitBorder}`,
  borderRadius: "8px",
  padding: "32px",
  cursor: "default",
};

const h2Style: React.CSSProperties = {
  fontFamily: headingFont,
  fontWeight: 700,
  fontSize: "clamp(28px, 4vw, 42px)",
  letterSpacing: "-0.336px",
  lineHeight: 1.1,
  color: C.phosphorWhite,
  margin: 0,
};

const stepPill: React.CSSProperties = {
  display: "inline-block",
  background: C.limePulse,
  color: C.groundIron,
  borderRadius: "9999px",
  padding: "2px 12px",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.3px",
  marginBottom: "14px",
  fontFamily: bodyFont,
};

// ── Animation variants ────────────────────────────────────────

/** ② Scroll-reveal: fade-in + slide-up 20px, fires once per element */
const revealVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  },
};

/** ③ Card stagger container */
const cardContainerVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

/** ③ Individual card child */
const cardChildVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  },
};

// ── SVG icons ─────────────────────────────────────────────────
function IconGlobe() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
      stroke={C.limePulse} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function IconChatbot() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
      stroke={C.limePulse} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <circle cx="9" cy="10" r="1" fill={C.limePulse} stroke="none" />
      <circle cx="12" cy="10" r="1" fill={C.limePulse} stroke="none" />
      <circle cx="15" cy="10" r="1" fill={C.limePulse} stroke="none" />
    </svg>
  );
}

// ── Floating dots background ──────────────────────────────────
/**
 * 35 particles anchored to stable random positions.
 * Each floats ±12px vertically at its own speed.
 * Opacity max 0.35 — purely atmospheric, never distracting.
 */
function FloatingDots() {
  const dots = useMemo(
    () =>
      Array.from({ length: 35 }, (_, i) => ({
        id: i,
        x: (i * 37.3 + 13) % 100,           // deterministic spread, no hydration mismatch
        y: (i * 61.7 + 7)  % 100,
        size: (i % 3) + 1,                   // 1px, 2px, or 3px
        delay: (i * 0.4) % 9,
        duration: 14 + (i % 10),
        opacity: 0.12 + (i % 4) * 0.06,
      })),
    []
  );

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {dots.map((d) => (
        <motion.div
          key={d.id}
          style={{
            position: "absolute",
            left: `${d.x}%`,
            top:  `${d.y}%`,
            width:  `${d.size}px`,
            height: `${d.size}px`,
            borderRadius: "50%",
            background: C.moss70,
            opacity: d.opacity,
          }}
          animate={{ y: [-12, 12, -12] }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ── Glow orb ─────────────────────────────────────────────────
/**
 * CSS-only 3D glow simulation:
 * A layered radial-gradient ellipse with heavy blur.
 * The outer animate gives it a slow breathing pulse.
 */
function GlowOrb() {
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "50%",
        top: "56%",
        transform: "translateX(-50%)",
        width: "680px",
        height: "260px",
        borderRadius: "50%",
        background: [
          "radial-gradient(ellipse 55% 70% at 50% 50%, rgba(127,238,100,0.18) 0%,",
          "rgba(127,238,100,0.07) 40%,",
          "rgba(35,67,30,0.04) 65%,",
          "transparent 100%)",
        ].join(" "),
        filter: "blur(52px)",
        pointerEvents: "none",
        zIndex: 0,
      }}
      animate={{ opacity: [0.7, 1, 0.7], scale: [0.97, 1.03, 0.97] }}
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
      link.id = fontId;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div
      style={{
        backgroundColor: C.voidBlack,
        color: C.sage60,
        fontFamily: bodyFont,
        minHeight: "100vh",
        overflowX: "hidden",
      }}
      className="pb-20 md:pb-0"
    >
      {/* ═══════════════════════════════════════════════════════
          §1  HERO
          Contains: floating dots, glow orb, badge pulse,
          blur-text headline, CTA row.
      ═══════════════════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "96px 24px 80px",
          maxWidth: "1280px",
          margin: "0 auto",
          overflow: "hidden",
        }}
      >
        {/* Floating dots background */}
        <FloatingDots />

        {/* Glow orb — positioned to sit behind/below headline */}
        <GlowOrb />

        {/* Everything below is z-index 1 so it sits above dots+orb */}
        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>

          {/* ⑤ Badge pulse — Framer Motion animate on the whole pill */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "32px" }}>
            <motion.div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: C.limePulse,
                borderRadius: "9999px",
                padding: "6px 18px",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.7px",
                color: C.groundIron,
                textTransform: "uppercase",
                fontFamily: bodyFont,
              }}
              /* Continuous scale + opacity pulse on the entire badge */
              animate={{
                scale:   [1, 1.055, 1],
                opacity: [1, 0.82,  1],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* LED dot — its own faster blink layered on top */}
              <motion.span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: C.groundIron,
                  flexShrink: 0,
                }}
                animate={{ opacity: [1, 0.25, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              />
              Limited Availability
            </motion.div>
          </div>

          {/* ① BlurText headline — word by word, blur 10px→0, stagger 0.1s */}
          <h1
            style={{
              fontFamily: headingFont,
              fontWeight: 700,
              fontSize: "clamp(38px, 6vw, 72px)",
              lineHeight: 1.06,
              letterSpacing: "-0.448px",
              maxWidth: "860px",
              margin: "0 auto 24px",
              color: C.phosphorWhite,
            }}
          >
            {HEADLINE_WORDS.map((w, i) => (
              <motion.span
                key={i}
                style={{
                  display: "inline-block",
                  color: w.color,
                  marginRight: "0.28em",
                }}
                initial={{ opacity: 0, filter: "blur(10px)", y: 6 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {w.word}
              </motion.span>
            ))}
          </h1>

          {/* Subhead */}
          <motion.p
            style={{
              fontFamily: bodyFont,
              fontSize: "clamp(15px, 2vw, 18px)",
              fontWeight: 400,
              letterSpacing: "-0.25px",
              color: C.moss80,
              maxWidth: "620px",
              lineHeight: 1.72,
              marginBottom: "40px",
              margin: "0 auto 40px",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: HEADLINE_WORDS.length * 0.1 + 0.15, duration: 0.6 }}
          >
            A professional website + AI chatbot that captures leads 24/7 —
            all for $697/month. No setup fee. No contracts.
          </motion.p>

          {/* CTA row */}
          <motion.div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: HEADLINE_WORDS.length * 0.1 + 0.35, duration: 0.5 }}
          >
            {/* ④ Primary CTA hover: scale + glow */}
            <motion.button
              onClick={() => scrollTo("pricing")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: C.limePulse,
                color: C.groundIron,
                border: "none",
                borderRadius: "9999px",
                padding: "14px 28px",
                fontSize: "15px",
                fontWeight: 600,
                letterSpacing: "-0.2px",
                cursor: "pointer",
                fontFamily: bodyFont,
                boxShadow: "none",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: `0 0 28px rgba(127,238,100,0.45)`,
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              Get Started — $697/mo
            </motion.button>

            <motion.button
              onClick={() => scrollTo("system")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "transparent",
                color: C.moss80,
                border: `1px solid ${C.circuitBorder}`,
                borderRadius: "9999px",
                padding: "14px 28px",
                fontSize: "15px",
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: bodyFont,
              }}
              whileHover={{
                borderColor: C.moss70,
                color: C.phosphorWhite,
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              See What's Included ↓
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          §2  THE SYSTEM
          ② Scroll-reveal on section header
          ③ Card stagger: second card 0.15s after first
          ④ Hover: scale(1.02) + brightness on each card
      ═══════════════════════════════════════════════════════ */}
      <motion.section
        id="system"
        style={{ padding: "0 24px 80px", maxWidth: "1280px", margin: "0 auto" }}
        variants={revealVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div style={{ borderTop: `1px solid ${C.circuitBorder}`, marginBottom: "56px" }} />

        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <p style={eyebrow}>The System</p>
          <h2 style={h2Style}>Two parts. One system. All your leads.</h2>
        </div>

        {/* ③ Stagger container */}
        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "16px",
          }}
          variants={cardContainerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {/* Website card */}
          <motion.div
            variants={cardChildVariant}
            whileHover={{ scale: 1.02, filter: "brightness(1.09)" }}
            transition={{ duration: 0.25 }}
            style={card}
          >
            <div style={{ marginBottom: "20px" }}><IconGlobe /></div>
            <span style={stepPill}>Step 1</span>
            <h3 style={{ fontFamily: headingFont, fontWeight: 600, fontSize: "24px", letterSpacing: "-0.312px", color: C.phosphorWhite, marginBottom: "4px" }}>
              Website
            </h3>
            <p style={{ ...eyebrow, marginBottom: "28px", letterSpacing: "0.5px" }}>
              The Conversion Machine
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {FEATURES_WEBSITE.map((f) => (
                <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "15px", letterSpacing: "-0.2px", color: C.sage60, lineHeight: 1.55 }}>
                  <span style={{ color: C.limePulse, flexShrink: 0, fontWeight: 700, marginTop: "1px", fontSize: "14px" }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* AI Chatbot card — appears 0.15s after first */}
          <motion.div
            variants={cardChildVariant}
            whileHover={{ scale: 1.02, filter: "brightness(1.09)" }}
            transition={{ duration: 0.25 }}
            style={card}
          >
            <div style={{ marginBottom: "20px" }}><IconChatbot /></div>
            <span style={stepPill}>Step 2</span>
            <h3 style={{ fontFamily: headingFont, fontWeight: 600, fontSize: "24px", letterSpacing: "-0.312px", color: C.phosphorWhite, marginBottom: "4px" }}>
              AI Chatbot
            </h3>
            <p style={{ ...eyebrow, marginBottom: "28px", letterSpacing: "0.5px" }}>
              Answers Customers 24/7
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {FEATURES_CHATBOT.map((f) => (
                <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "15px", letterSpacing: "-0.2px", color: C.sage60, lineHeight: 1.55 }}>
                  <span style={{ color: C.limePulse, flexShrink: 0, fontWeight: 700, marginTop: "1px", fontSize: "14px" }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════
          §3  WHAT'S INCLUDED   ② scroll-reveal
      ═══════════════════════════════════════════════════════ */}
      <motion.section
        id="included"
        style={{ padding: "80px 24px", maxWidth: "720px", margin: "0 auto" }}
        variants={revealVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <p style={eyebrow}>Value</p>
          <h2 style={h2Style}>What's included</h2>
        </div>

        <div style={{ background: C.groundIron, border: `1px solid ${C.circuitBorder}`, borderRadius: "8px", overflow: "hidden" }}>
          {VALUE_ROWS.map((row, i) => (
            <div
              key={row.item}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px 28px",
                borderBottom: i < VALUE_ROWS.length - 1 ? `1px solid ${C.circuitBorder}` : "none",
                gap: "16px",
              }}
            >
              <span style={{ fontSize: "15px", letterSpacing: "-0.2px", color: C.sage60 }}>{row.item}</span>
              <span style={{ fontSize: "14px", fontWeight: 500, color: "rgba(140,171,135,0.4)", textDecoration: "line-through", flexShrink: 0, fontFamily: bodyFont }}>
                {row.value}
              </span>
            </div>
          ))}

          <div style={{ borderTop: `1px solid ${C.circuitBorder}`, padding: "32px 28px", textAlign: "center" }}>
            <div style={{ fontSize: "13px", color: C.moss70, marginBottom: "12px", letterSpacing: "0.1px" }}>
              Total value:{" "}
              <span style={{ textDecoration: "line-through", color: "rgba(140,171,135,0.4)" }}>$2,600+/mo</span>
            </div>
            <div style={{ fontFamily: headingFont, fontWeight: 700, fontSize: "clamp(44px, 8vw, 64px)", letterSpacing: "-0.448px", color: C.limePulse, lineHeight: 1, marginBottom: "12px" }}>
              $697/month
            </div>
            <div style={{ fontSize: "13px", color: C.moss70 }}>
              No setup fee. Cancel anytime. No contracts.
            </div>
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════
          §4  HOW IT WORKS   ② scroll-reveal + ③ step stagger
      ═══════════════════════════════════════════════════════ */}
      <motion.section
        id="how-it-works"
        style={{ padding: "80px 24px", maxWidth: "1280px", margin: "0 auto" }}
        variants={revealVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <p style={eyebrow}>Process</p>
          <h2 style={h2Style}>Up and running in 72 hours</h2>
        </div>

        <motion.div
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}
          variants={cardContainerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={step.label}
              variants={cardChildVariant}
              whileHover={{ scale: 1.02, filter: "brightness(1.07)" }}
              transition={{ duration: 0.25 }}
              style={card}
            >
              <span style={{ display: "inline-block", background: C.limePulse, color: C.groundIron, borderRadius: "9999px", padding: "3px 14px", fontSize: "13px", fontWeight: 700, marginBottom: "20px", fontFamily: bodyFont }}>
                {i + 1}
              </span>
              <div style={{ fontSize: "12px", fontWeight: 600, color: C.moss70, letterSpacing: "0.6px", textTransform: "uppercase", marginBottom: "8px", fontFamily: bodyFont }}>
                {step.label}
              </div>
              <p style={{ fontSize: "15px", letterSpacing: "-0.2px", color: C.sage60, lineHeight: 1.65 }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════
          §5  PRICING CTA   ② scroll-reveal
      ═══════════════════════════════════════════════════════ */}
      <motion.section
        id="pricing"
        style={{ padding: "80px 24px 100px", maxWidth: "540px", margin: "0 auto", textAlign: "center" }}
        variants={revealVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div style={{ background: C.groundIron, border: `1px solid ${C.circuitBorder}`, borderRadius: "8px", padding: "48px 40px" }}>
          <p style={{ ...eyebrow, textAlign: "center" }}>Get Started Today</p>

          <div style={{ fontFamily: headingFont, fontWeight: 700, fontSize: "clamp(56px, 10vw, 80px)", letterSpacing: "-0.448px", color: C.limePulse, lineHeight: 1, marginBottom: "8px" }}>
            $697
          </div>
          <div style={{ fontSize: "15px", color: C.moss70, letterSpacing: "-0.2px", marginBottom: "12px" }}>
            per month
          </div>
          <div style={{ fontSize: "13px", color: C.sage60, marginBottom: "32px", letterSpacing: "0.1px" }}>
            No setup fee. Cancel anytime. No contracts.
          </div>

          {/* ④ Primary CTA hover with glow */}
          <motion.a
            href="#"
            style={{
              display: "block",
              background: C.limePulse,
              color: C.groundIron,
              border: "none",
              borderRadius: "12px",
              padding: "16px 32px",
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "-0.2px",
              cursor: "pointer",
              fontFamily: bodyFont,
              textDecoration: "none",
              boxSizing: "border-box",
              marginBottom: "14px",
              boxShadow: "none",
            }}
            whileHover={{
              scale: 1.04,
              boxShadow: `0 0 32px rgba(127,238,100,0.5)`,
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            Get Started — $697/mo
          </motion.a>

          <p style={{ fontSize: "12px", color: C.moss70, letterSpacing: "0.1px" }}>
            🔒 Secure checkout. Cancel anytime.
          </p>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════
          §6  FAQ   ② scroll-reveal
      ═══════════════════════════════════════════════════════ */}
      <motion.section
        id="faq"
        style={{ padding: "80px 24px 100px", maxWidth: "680px", margin: "0 auto" }}
        variants={revealVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={h2Style}>Common questions</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              style={{
                border: `1px solid ${C.circuitBorder}`,
                borderRadius: "8px",
                overflow: "hidden",
                cursor: "pointer",
              }}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              whileHover={{ borderColor: C.moss70 }}
              transition={{ duration: 0.2 }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", gap: "16px" }}>
                <span style={{ fontSize: "15px", fontWeight: 500, letterSpacing: "-0.2px", color: C.phosphorWhite, lineHeight: 1.4 }}>
                  {item.q}
                </span>
                <motion.span
                  style={{
                    color: openFaq === i ? C.limePulse : C.moss70,
                    fontSize: "18px",
                    flexShrink: 0,
                    display: "inline-block",
                    lineHeight: 1,
                  }}
                  animate={{ rotate: openFaq === i ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  +
                </motion.span>
              </div>

              <AnimatePresence initial={false}>
                {openFaq === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
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
      <footer style={{ borderTop: `1px solid ${C.circuitBorder}`, padding: "28px 24px", textAlign: "center", fontSize: "13px", color: C.fernLink, letterSpacing: "0.1px" }}>
        © {new Date().getFullYear()} NJ Business Web · All rights reserved.
      </footer>

      {/* Mobile sticky pricing bar */}
      <div
        className="md:hidden"
        style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100, background: C.groundIron, borderTop: `1px solid ${C.circuitBorder}`, padding: "10px 16px", display: "flex", alignItems: "center", gap: "14px" }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: headingFont, fontSize: "20px", fontWeight: 700, letterSpacing: "-0.3px", color: C.limePulse, lineHeight: 1.1 }}>
            $697
            <span style={{ fontSize: "13px", fontWeight: 400, color: C.moss70, marginLeft: "3px", fontFamily: bodyFont }}>/mo</span>
          </div>
          <div style={{ fontSize: "11px", color: C.sage60, marginTop: "2px", letterSpacing: "0.1px" }}>
            No setup fee · Cancel anytime
          </div>
        </div>
        <motion.a
          href="#"
          style={{ background: C.limePulse, color: C.groundIron, border: "none", borderRadius: "9999px", padding: "11px 20px", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: bodyFont, whiteSpace: "nowrap", textDecoration: "none", flexShrink: 0 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          Get Started
        </motion.a>
      </div>
    </div>
  );
}
