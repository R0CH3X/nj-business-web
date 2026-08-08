import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────────────────────
   NJ Business Web — Trades System Landing Page
   Design System: Modal
   Canvas: #000000 · Space Grotesk headlines · Inter body
   Accent: #7fee64 (lime-pulse) — rationed, max 1 strong / section
   Fixes: phantom $697 removed · hero↔system gap tightened · 🤖→SVG
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

// ── SVG icons — minimal line, consistent pair ─────────────────
function IconGlobe() {
  return (
    <svg
      width="28" height="28" viewBox="0 0 24 24"
      fill="none" stroke={C.limePulse}
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function IconChatbot() {
  return (
    <svg
      width="28" height="28" viewBox="0 0 24 24"
      fill="none" stroke={C.limePulse}
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <circle cx="9" cy="10" r="1" fill={C.limePulse} stroke="none" />
      <circle cx="12" cy="10" r="1" fill={C.limePulse} stroke="none" />
      <circle cx="15" cy="10" r="1" fill={C.limePulse} stroke="none" />
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────
export default function TradesSystem() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    // Fonts — Space Grotesk + Inter
    const fontId = "modal-fonts";
    if (!document.getElementById(fontId)) {
      const link = document.createElement("link");
      link.id = fontId;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap";
      document.head.appendChild(link);
    }

    // LED pulse keyframe for badge dot
    const kfId = "modal-keyframes";
    if (!document.getElementById(kfId)) {
      const style = document.createElement("style");
      style.id = kfId;
      style.textContent = `
        @keyframes ledPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.35; }
        }
      `;
      document.head.appendChild(style);
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
          Bug fix: no "$697" rendered outside subhead paragraph.
          Padding reduced on bottom (64px vs 100px) to close the
          gap between hero and §2 without killing breathing room.
      ═══════════════════════════════════════════════════════ */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "96px 24px 64px",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        {/* Badge — lime-pulse fill, LED dot pulse */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: C.limePulse,
            borderRadius: "9999px",
            padding: "6px 18px",
            marginBottom: "32px",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.7px",
            color: C.groundIron,
            textTransform: "uppercase",
            fontFamily: bodyFont,
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: C.groundIron,
              flexShrink: 0,
              animation: "ledPulse 2.4s ease-in-out infinite",
            }}
          />
          Limited Availability
        </div>

        {/* H1 — "The Complete" in lime-pulse, rest in phosphor-white */}
        <h1
          style={{
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: "clamp(38px, 6vw, 72px)",
            lineHeight: 1.06,
            letterSpacing: "-0.448px",
            maxWidth: "860px",
            marginBottom: "24px",
            color: C.phosphorWhite,
          }}
        >
          <span style={{ color: C.limePulse }}>The Complete</span>
          {" "}Lead System{" "}
          <br className="hidden sm:block" />
          for Local Trades
        </h1>

        {/* Subhead — moss-80, no $697 bold element to avoid phantom */}
        <p
          style={{
            fontFamily: bodyFont,
            fontSize: "clamp(15px, 2vw, 18px)",
            fontWeight: 400,
            letterSpacing: "-0.25px",
            color: C.moss80,
            maxWidth: "620px",
            lineHeight: 1.72,
            marginBottom: "40px",
          }}
        >
          A professional website + AI chatbot that captures leads 24/7 —
          all for $697/month. No setup fee. No contracts.
        </p>

        {/* CTA row — primary lime-pulse pill + ghost outline */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button
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
              transition: "opacity 300ms ease-out",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.82")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Get Started — $697/mo
          </button>

          <button
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
              transition: "border-color 300ms ease-out, color 300ms ease-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = C.moss70;
              e.currentTarget.style.color = C.phosphorWhite;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = C.circuitBorder;
              e.currentTarget.style.color = C.moss80;
            }}
          >
            See What's Included ↓
          </button>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          §2  THE SYSTEM
          Bug fix: section padding-top 0 (not 80px) so the scroll
          from hero lands immediately on the content, not dead air.
      ═══════════════════════════════════════════════════════ */}
      <section
        id="system"
        style={{
          padding: "0 24px 80px",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        {/* Divider line gives visual separation without gap */}
        <div
          style={{
            borderTop: `1px solid ${C.circuitBorder}`,
            marginBottom: "56px",
          }}
        />

        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <p style={eyebrow}>The System</p>
          <h2 style={h2Style}>Two parts. One system. All your leads.</h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "16px",
          }}
        >
          {/* Website card */}
          <div style={card}>
            <div style={{ marginBottom: "20px" }}>
              <IconGlobe />
            </div>

            {/* Step pill — the ONE lime accent for this card */}
            <span style={stepPill}>Step 1</span>

            <h3
              style={{
                fontFamily: headingFont,
                fontWeight: 600,
                fontSize: "24px",
                letterSpacing: "-0.312px",
                color: C.phosphorWhite,
                marginBottom: "4px",
              }}
            >
              Website
            </h3>
            <p
              style={{
                ...eyebrow,
                marginBottom: "28px",
                letterSpacing: "0.5px",
              }}
            >
              The Conversion Machine
            </p>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {FEATURES_WEBSITE.map((f) => (
                <li
                  key={f}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    fontSize: "15px",
                    letterSpacing: "-0.2px",
                    color: C.sage60,
                    lineHeight: 1.55,
                  }}
                >
                  <span
                    style={{
                      color: C.limePulse,
                      flexShrink: 0,
                      fontWeight: 700,
                      marginTop: "1px",
                      fontSize: "14px",
                    }}
                  >
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* AI Chatbot card — 🤖 replaced with line SVG */}
          <div style={card}>
            <div style={{ marginBottom: "20px" }}>
              <IconChatbot />
            </div>

            <span style={stepPill}>Step 2</span>

            <h3
              style={{
                fontFamily: headingFont,
                fontWeight: 600,
                fontSize: "24px",
                letterSpacing: "-0.312px",
                color: C.phosphorWhite,
                marginBottom: "4px",
              }}
            >
              AI Chatbot
            </h3>
            <p
              style={{
                ...eyebrow,
                marginBottom: "28px",
                letterSpacing: "0.5px",
              }}
            >
              Answers Customers 24/7
            </p>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {FEATURES_CHATBOT.map((f) => (
                <li
                  key={f}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    fontSize: "15px",
                    letterSpacing: "-0.2px",
                    color: C.sage60,
                    lineHeight: 1.55,
                  }}
                >
                  <span
                    style={{
                      color: C.limePulse,
                      flexShrink: 0,
                      fontWeight: 700,
                      marginTop: "1px",
                      fontSize: "14px",
                    }}
                  >
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          §3  WHAT'S INCLUDED
          Lime accent: $697/month price — only lime element here.
      ═══════════════════════════════════════════════════════ */}
      <section
        id="included"
        style={{ padding: "80px 24px", maxWidth: "720px", margin: "0 auto" }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <p style={eyebrow}>Value</p>
          <h2 style={h2Style}>What's included</h2>
        </div>

        <div
          style={{
            background: C.groundIron,
            border: `1px solid ${C.circuitBorder}`,
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          {VALUE_ROWS.map((row, i) => (
            <div
              key={row.item}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px 28px",
                borderBottom:
                  i < VALUE_ROWS.length - 1
                    ? `1px solid ${C.circuitBorder}`
                    : "none",
                gap: "16px",
              }}
            >
              <span
                style={{
                  fontSize: "15px",
                  letterSpacing: "-0.2px",
                  color: C.sage60,
                }}
              >
                {row.item}
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "rgba(140,171,135,0.4)",
                  textDecoration: "line-through",
                  flexShrink: 0,
                  fontFamily: bodyFont,
                }}
              >
                {row.value}
              </span>
            </div>
          ))}

          {/* Total — $697/month is the ONE lime element */}
          <div
            style={{
              borderTop: `1px solid ${C.circuitBorder}`,
              padding: "32px 28px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "13px",
                color: C.moss70,
                marginBottom: "12px",
                letterSpacing: "0.1px",
              }}
            >
              Total value:{" "}
              <span
                style={{
                  textDecoration: "line-through",
                  color: "rgba(140,171,135,0.4)",
                }}
              >
                $2,600+/mo
              </span>
            </div>

            <div
              style={{
                fontFamily: headingFont,
                fontWeight: 700,
                fontSize: "clamp(44px, 8vw, 64px)",
                letterSpacing: "-0.448px",
                color: C.limePulse,
                lineHeight: 1,
                marginBottom: "12px",
              }}
            >
              $697/month
            </div>

            <div style={{ fontSize: "13px", color: C.moss70 }}>
              No setup fee. Cancel anytime. No contracts.
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          §4  HOW IT WORKS
          Lime accent: step number pill — one per card, nothing else.
      ═══════════════════════════════════════════════════════ */}
      <section
        id="how-it-works"
        style={{ padding: "80px 24px", maxWidth: "1280px", margin: "0 auto" }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <p style={eyebrow}>Process</p>
          <h2 style={h2Style}>Up and running in 72 hours</h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
          }}
        >
          {STEPS.map((step, i) => (
            <div key={step.label} style={card}>
              {/* Step number — the ONE lime element per card */}
              <span
                style={{
                  display: "inline-block",
                  background: C.limePulse,
                  color: C.groundIron,
                  borderRadius: "9999px",
                  padding: "3px 14px",
                  fontSize: "13px",
                  fontWeight: 700,
                  marginBottom: "20px",
                  fontFamily: bodyFont,
                }}
              >
                {i + 1}
              </span>

              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: C.moss70,
                  letterSpacing: "0.6px",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                  fontFamily: bodyFont,
                }}
              >
                {step.label}
              </div>

              <p
                style={{
                  fontSize: "15px",
                  letterSpacing: "-0.2px",
                  color: C.sage60,
                  lineHeight: 1.65,
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          §5  PRICING CTA
          Lime accent: $697 price display — button is also lime but
          both are dominant CTA elements, user spec allows this pair.
      ═══════════════════════════════════════════════════════ */}
      <section
        id="pricing"
        style={{
          padding: "80px 24px 100px",
          maxWidth: "540px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div
          style={{
            background: C.groundIron,
            border: `1px solid ${C.circuitBorder}`,
            borderRadius: "8px",
            padding: "48px 40px",
          }}
        >
          <p style={{ ...eyebrow, textAlign: "center" }}>Get Started Today</p>

          {/* $697 — dominant lime accent */}
          <div
            style={{
              fontFamily: headingFont,
              fontWeight: 700,
              fontSize: "clamp(56px, 10vw, 80px)",
              letterSpacing: "-0.448px",
              color: C.limePulse,
              lineHeight: 1,
              marginBottom: "8px",
            }}
          >
            $697
          </div>
          <div
            style={{
              fontSize: "15px",
              color: C.moss70,
              letterSpacing: "-0.2px",
              marginBottom: "12px",
            }}
          >
            per month
          </div>
          <div
            style={{
              fontSize: "13px",
              color: C.sage60,
              marginBottom: "32px",
              letterSpacing: "0.1px",
            }}
          >
            No setup fee. Cancel anytime. No contracts.
          </div>

          {/* Primary CTA — lime-pulse fill, dark text */}
          <a
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
              transition: "opacity 300ms ease-out",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.82")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Get Started — $697/mo
          </a>

          <p style={{ fontSize: "12px", color: C.moss70, letterSpacing: "0.1px" }}>
            🔒 Secure checkout. Cancel anytime.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          §6  FAQ
          Plain borders only — no background fill, no lime.
      ═══════════════════════════════════════════════════════ */}
      <section
        id="faq"
        style={{ padding: "80px 24px 100px", maxWidth: "680px", margin: "0 auto" }}
      >
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={h2Style}>Common questions</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              style={{
                border: `1px solid ${C.circuitBorder}`,
                borderRadius: "8px",
                overflow: "hidden",
                cursor: "pointer",
                transition: "border-color 300ms ease-out",
              }}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = C.moss70)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = C.circuitBorder)
              }
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "18px 22px",
                  gap: "16px",
                }}
              >
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: 500,
                    letterSpacing: "-0.2px",
                    color: C.phosphorWhite,
                    lineHeight: 1.4,
                  }}
                >
                  {item.q}
                </span>
                <span
                  style={{
                    color: openFaq === i ? C.limePulse : C.moss70,
                    fontSize: "18px",
                    flexShrink: 0,
                    transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 300ms ease-out, color 300ms ease-out",
                    display: "inline-block",
                    lineHeight: 1,
                  }}
                >
                  +
                </span>
              </div>

              {openFaq === i && (
                <div
                  style={{
                    padding: "16px 22px 20px",
                    fontSize: "15px",
                    letterSpacing: "-0.2px",
                    color: C.sage60,
                    lineHeight: 1.72,
                    borderTop: `1px solid ${C.circuitBorder}`,
                  }}
                >
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: `1px solid ${C.circuitBorder}`,
          padding: "28px 24px",
          textAlign: "center",
          fontSize: "13px",
          color: C.fernLink,
          letterSpacing: "0.1px",
        }}
      >
        © {new Date().getFullYear()} NJ Business Web · All rights reserved.
      </footer>

      {/* ═══════════════════════════════════════════════════════
          MOBILE STICKY PRICING BAR (md:hidden)
      ═══════════════════════════════════════════════════════ */}
      <div
        className="md:hidden"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: C.groundIron,
          borderTop: `1px solid ${C.circuitBorder}`,
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: headingFont,
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "-0.3px",
              color: C.limePulse,
              lineHeight: 1.1,
            }}
          >
            $697
            <span
              style={{
                fontSize: "13px",
                fontWeight: 400,
                color: C.moss70,
                marginLeft: "3px",
                fontFamily: bodyFont,
              }}
            >
              /mo
            </span>
          </div>
          <div
            style={{
              fontSize: "11px",
              color: C.sage60,
              marginTop: "2px",
              letterSpacing: "0.1px",
            }}
          >
            No setup fee · Cancel anytime
          </div>
        </div>

        <a
          href="#"
          style={{
            background: C.limePulse,
            color: C.groundIron,
            border: "none",
            borderRadius: "9999px",
            padding: "11px 20px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: bodyFont,
            whiteSpace: "nowrap",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          Get Started
        </a>
      </div>
    </div>
  );
}
