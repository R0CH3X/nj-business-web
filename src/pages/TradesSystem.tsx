import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────
   NJ Business Web — Trades System Landing Page
   Design: MotionSites liquid-glass
   Canvas: #080808 · Instrument Serif italic · Barlow
   CRO: Single CTA, value anchoring, no form friction
───────────────────────────────────────────────── */

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
  { item: "AI Chatbot 24/7", value: "$800/mo value" },
  { item: "Hosting + Support", value: "$150/mo value" },
  { item: "Monthly Updates & Changes", value: "$150/mo value" },
];

const STEPS = [
  {
    label: "Today",
    desc: "Submit payment, we start building",
  },
  {
    label: "48–72 hours",
    desc: "Your site and chatbot go live",
  },
  {
    label: "Ongoing",
    desc: "We handle every update, you handle the calls coming in",
  },
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

const glassCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.09)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  borderRadius: "24px",
};

const sectionLabel: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.12em",
  color: "rgba(255,255,255,0.35)",
  textTransform: "uppercase" as const,
  marginBottom: "14px",
};

const serifHeading = (size: string): React.CSSProperties => ({
  fontFamily: "'Instrument Serif', Georgia, serif",
  fontStyle: "italic",
  fontWeight: 400,
  fontSize: size,
  lineHeight: 1.08,
  letterSpacing: "-0.01em",
  color: "#ffffff",
});

const green = "#4ade80";

// ── Component ─────────────────────────────────────────────────

export default function TradesSystem() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Inject Google Fonts for this page only
  useEffect(() => {
    const id = "trades-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Barlow:wght@300;400;500;600;700&display=swap";
    document.head.appendChild(link);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      style={{
        backgroundColor: "#080808",
        color: "#f0f0f0",
        fontFamily: "'Barlow', system-ui, sans-serif",
        minHeight: "100vh",
        overflowX: "hidden",
        // extra bottom padding on mobile for sticky bar
        paddingBottom: "80px",
      }}
      className="md:pb-0"
    >
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background: [
            "radial-gradient(ellipse 70% 45% at 15% 15%, rgba(74,222,128,0.07) 0%, transparent 60%)",
            "radial-gradient(ellipse 55% 40% at 85% 85%, rgba(255,255,255,0.025) 0%, transparent 55%)",
          ].join(", "),
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* ═══════════════════════════════════════
            SECTION 1 — HERO
        ════════════════════════════════════════ */}
        <section
          style={{
            minHeight: "100svh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "100px 24px 100px",
          }}
        >
          {/* LIMITED AVAILABILITY badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(74,222,128,0.1)",
              border: "1px solid rgba(74,222,128,0.28)",
              borderRadius: "100px",
              padding: "7px 18px",
              marginBottom: "36px",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: green,
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: green,
                boxShadow: `0 0 8px ${green}`,
                flexShrink: 0,
              }}
            />
            Limited Availability
          </div>

          {/* Main headline */}
          <h1
            style={{
              ...serifHeading("clamp(44px, 8.5vw, 92px)"),
              maxWidth: "860px",
              marginBottom: "28px",
            }}
          >
            The Complete Lead System for Local Trades
          </h1>

          {/* Subheadline */}
          <p
            style={{
              fontSize: "clamp(16px, 2.5vw, 19px)",
              fontWeight: 300,
              color: "rgba(255,255,255,0.55)",
              maxWidth: "560px",
              lineHeight: 1.65,
              marginBottom: "44px",
            }}
          >
            A professional website + AI chatbot that captures leads 24/7 — all for{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>$697/month</strong>.{" "}
            No setup fee. No contracts.
          </p>

          {/* Scroll CTA */}
          <button
            onClick={() => scrollToSection("system")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.16)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderRadius: "100px",
              padding: "16px 36px",
              fontSize: "15px",
              fontWeight: 600,
              color: "#fff",
              cursor: "pointer",
              fontFamily: "'Barlow', sans-serif",
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.13)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.07)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)";
            }}
          >
            See Exactly What You Get
            <span style={{ fontSize: "16px", opacity: 0.7 }}>↓</span>
          </button>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 2 — THE SYSTEM
        ════════════════════════════════════════ */}
        <section
          id="system"
          style={{ padding: "80px 24px", maxWidth: "1080px", margin: "0 auto" }}
        >
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <p style={sectionLabel}>The System</p>
            <h2 style={serifHeading("clamp(32px, 5vw, 54px)")}>
              Two parts. One system. All your leads.
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {/* ── Website Card ── */}
            <div style={{ ...glassCard, padding: "44px 36px" }}>
              <div style={{ fontSize: "36px", marginBottom: "20px" }}>🌐</div>

              <div
                style={{
                  display: "inline-block",
                  background: "rgba(74,222,128,0.1)",
                  border: "1px solid rgba(74,222,128,0.22)",
                  borderRadius: "6px",
                  padding: "3px 10px",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: green,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "14px",
                }}
              >
                Step 1
              </div>

              <h3
                style={{
                  ...serifHeading("28px"),
                  marginBottom: "4px",
                }}
              >
                Website
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: "32px",
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
                  gap: "15px",
                }}
              >
                {FEATURES_WEBSITE.map((f) => (
                  <li
                    key={f}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      fontSize: "15px",
                      color: "rgba(255,255,255,0.72)",
                      lineHeight: 1.5,
                    }}
                  >
                    <span
                      style={{
                        color: green,
                        flexShrink: 0,
                        fontWeight: 700,
                        marginTop: "1px",
                      }}
                    >
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* ── AI Chatbot Card ── */}
            <div
              style={{
                ...glassCard,
                padding: "44px 36px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Subtle top-right glow */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "-80px",
                  right: "-80px",
                  width: "240px",
                  height: "240px",
                  borderRadius: "50%",
                  background: `radial-gradient(circle, rgba(74,222,128,0.1) 0%, transparent 70%)`,
                  pointerEvents: "none",
                }}
              />

              <div style={{ fontSize: "36px", marginBottom: "20px", position: "relative" }}>
                🤖
              </div>

              <div
                style={{
                  display: "inline-block",
                  background: "rgba(74,222,128,0.1)",
                  border: "1px solid rgba(74,222,128,0.22)",
                  borderRadius: "6px",
                  padding: "3px 10px",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: green,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "14px",
                  position: "relative",
                }}
              >
                Step 2
              </div>

              <h3
                style={{
                  ...serifHeading("28px"),
                  marginBottom: "4px",
                  position: "relative",
                }}
              >
                AI Chatbot
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: "32px",
                  position: "relative",
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
                  gap: "15px",
                  position: "relative",
                }}
              >
                {FEATURES_CHATBOT.map((f) => (
                  <li
                    key={f}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      fontSize: "15px",
                      color: "rgba(255,255,255,0.72)",
                      lineHeight: 1.5,
                    }}
                  >
                    <span
                      style={{
                        color: green,
                        flexShrink: 0,
                        fontWeight: 700,
                        marginTop: "1px",
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

        {/* ═══════════════════════════════════════
            SECTION 3 — WHAT'S INCLUDED
        ════════════════════════════════════════ */}
        <section
          id="included"
          style={{ padding: "80px 24px", maxWidth: "720px", margin: "0 auto" }}
        >
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={sectionLabel}>Value</p>
            <h2 style={serifHeading("clamp(30px, 5vw, 50px)")}>What's included</h2>
          </div>

          <div
            style={{
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "24px",
              overflow: "hidden",
              background: "rgba(255,255,255,0.03)",
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
                      ? "1px solid rgba(255,255,255,0.06)"
                      : "none",
                  gap: "16px",
                }}
              >
                <span
                  style={{
                    fontSize: "15px",
                    color: "rgba(255,255,255,0.72)",
                  }}
                >
                  {row.item}
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.28)",
                    textDecoration: "line-through",
                    flexShrink: 0,
                  }}
                >
                  {row.value}
                </span>
              </div>
            ))}

            {/* Total / price reveal */}
            <div
              style={{
                background: "rgba(74,222,128,0.06)",
                borderTop: "1px solid rgba(74,222,128,0.18)",
                padding: "36px 28px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.35)",
                  marginBottom: "12px",
                }}
              >
                Total value:{" "}
                <span style={{ textDecoration: "line-through" }}>$2,600+/mo</span>
              </div>

              <div
                style={{
                  ...serifHeading("clamp(48px, 9vw, 72px)"),
                  color: green,
                  marginBottom: "10px",
                }}
              >
                $697/month
              </div>

              <div
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                No setup fee. Cancel anytime. No contracts.
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 4 — HOW IT WORKS
        ════════════════════════════════════════ */}
        <section
          id="how-it-works"
          style={{ padding: "80px 24px", maxWidth: "960px", margin: "0 auto" }}
        >
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <p style={sectionLabel}>Process</p>
            <h2 style={serifHeading("clamp(30px, 5vw, 50px)")}>
              Up and running in 72 hours
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
            }}
          >
            {STEPS.map((step, i) => (
              <div
                key={step.label}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "20px",
                  padding: "32px 28px",
                }}
              >
                {/* Step number */}
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    background: "rgba(74,222,128,0.1)",
                    border: `1px solid rgba(74,222,128,0.22)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: green,
                    marginBottom: "22px",
                  }}
                >
                  {i + 1}
                </div>

                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: green,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                  }}
                >
                  {step.label}
                </div>

                <p
                  style={{
                    fontSize: "15px",
                    color: "rgba(255,255,255,0.65)",
                    lineHeight: 1.6,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 5 — PRICING CTA
        ════════════════════════════════════════ */}
        <section
          id="pricing"
          style={{
            padding: "80px 24px 100px",
            maxWidth: "620px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <div
            style={{
              ...glassCard,
              padding: "clamp(40px, 6vw, 64px) clamp(28px, 5vw, 52px)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Center glow */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background: `radial-gradient(ellipse 80% 60% at 50% 100%, rgba(74,222,128,0.08) 0%, transparent 60%)`,
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative" }}>
              <p style={{ ...sectionLabel, textAlign: "center", marginBottom: "20px" }}>
                Get Started Today
              </p>

              {/* Price */}
              <div
                style={{
                  ...serifHeading("clamp(60px, 11vw, 88px)"),
                  color: green,
                  marginBottom: "6px",
                }}
              >
                $697
              </div>
              <div
                style={{
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: "36px",
                }}
              >
                per month
              </div>

              {/* Primary CTA */}
              <a
                href="#"
                style={{
                  display: "block",
                  width: "100%",
                  background: green,
                  color: "#080808",
                  border: "none",
                  borderRadius: "14px",
                  padding: "18px 32px",
                  fontSize: "16px",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'Barlow', sans-serif",
                  letterSpacing: "0.02em",
                  textDecoration: "none",
                  boxSizing: "border-box",
                  marginBottom: "14px",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Get Started — $697/mo
              </a>

              <p
                style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                🔒 Secure checkout. No setup fee. Cancel anytime.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 6 — FAQ
        ════════════════════════════════════════ */}
        <section
          id="faq"
          style={{
            padding: "80px 24px 100px",
            maxWidth: "680px",
            margin: "0 auto",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <h2 style={serifHeading("clamp(28px, 4.5vw, 46px)")}>
              Common questions
            </h2>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px 24px",
                    gap: "16px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.82)",
                      lineHeight: 1.4,
                    }}
                  >
                    {item.q}
                  </span>
                  <span
                    style={{
                      color: openFaq === i ? green : "rgba(255,255,255,0.4)",
                      fontSize: "20px",
                      flexShrink: 0,
                      transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.25s ease, color 0.2s",
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
                      padding: "0 24px 22px",
                      fontSize: "15px",
                      color: "rgba(255,255,255,0.5)",
                      lineHeight: 1.7,
                      borderTop: "1px solid rgba(255,255,255,0.06)",
                      paddingTop: "18px",
                    }}
                  >
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ─── Footer ─── */}
        <footer
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "28px 24px",
            textAlign: "center",
            fontSize: "13px",
            color: "rgba(255,255,255,0.2)",
          }}
        >
          © {new Date().getFullYear()} NJ Business Web · All rights reserved.
        </footer>
      </div>

      {/* ═══════════════════════════════════════
          MOBILE STICKY PRICING BAR
          (md:hidden via Tailwind — only on mobile)
      ════════════════════════════════════════ */}
      <div
        className="md:hidden"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(8,8,8,0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.09)",
          padding: "10px 16px 10px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: "19px",
              fontWeight: 700,
              color: green,
              fontFamily: "'Barlow', sans-serif",
              lineHeight: 1.1,
            }}
          >
            $697
            <span
              style={{
                fontSize: "13px",
                fontWeight: 400,
                color: "rgba(255,255,255,0.35)",
                marginLeft: "4px",
              }}
            >
              /mo
            </span>
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.3)",
              marginTop: "2px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            No setup fee · Cancel anytime
          </div>
        </div>

        <a
          href="#"
          style={{
            background: green,
            color: "#080808",
            border: "none",
            borderRadius: "12px",
            padding: "12px 22px",
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "'Barlow', sans-serif",
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
