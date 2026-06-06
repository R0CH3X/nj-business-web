"use client"
// Template: DARK LUXURY — NIKKI MAAR, VIP Beauty, Henry Castel
// Feeling: salón de lujo en NYC, portrait dramático, texto a la derecha, oscuro toda la página

import { useEffect, useRef } from "react"
import Image from "next/image"
import type { Salon } from "@/data/salons"

const portraits: Record<string, string> = {
  hair: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=700&q=85&auto=format&fit=crop&crop=top",
  nails: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=700&q=85&auto=format&fit=crop",
  full: "https://images.unsplash.com/photo-1580618864194-0cfe9b5e7d4f?w=700&q=85&auto=format&fit=crop&crop=top",
}

export default function HeroDarkLuxury({ salon }: { salon: Salon }) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = textRef.current
    if (!el) return
    setTimeout(() => {
      el.style.opacity = "1"
      el.style.transform = "translateX(0)"
    }, 300)
  }, [])

  // Accent-tinted dark: eg violet → very dark purple bg
  const darkBg = "#0C0A12"

  return (
    <section
      className="relative min-h-screen flex overflow-hidden"
      style={{ backgroundColor: darkBg }}
    >
      {/* LEFT: Portrait photo — takes 42% of screen, no gap, no border-radius */}
      <div className="hidden md:block relative w-[42%] h-screen flex-shrink-0">
        <Image
          src={portraits[salon.type] ?? portraits.hair}
          alt={salon.name}
          fill
          priority
          className="object-cover object-center"
          sizes="42vw"
        />
        {/* Gradient merging into dark right side */}
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(to right, transparent 60%, ${darkBg} 100%)` }} />
        {/* Subtle accent color duotone overlay */}
        <div className="absolute inset-0 mix-blend-multiply opacity-20"
          style={{ backgroundColor: salon.accentColor }} />
      </div>

      {/* Mobile photo — full bleed top, text below */}
      <div className="md:hidden absolute inset-0">
        <Image
          src={portraits[salon.type] ?? portraits.hair}
          alt={salon.name}
          fill
          priority
          className="object-cover object-top"
          sizes="100vw"
        />
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(to top, ${darkBg} 45%, transparent 80%)` }} />
      </div>

      {/* RIGHT: Text content */}
      <div
        ref={textRef}
        className="relative z-10 flex-1 flex flex-col justify-center px-10 md:px-14 pt-24 md:pt-0 pb-12 mt-auto md:mt-0"
        style={{
          opacity: 0,
          transform: "translateX(24px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        {/* Salon name — small caps, spaced */}
        <p className="text-xs font-medium tracking-[0.3em] uppercase mb-8"
          style={{ color: salon.accentColor, fontFamily: "var(--font-dm-sans)" }}>
          {salon.city}, New Jersey
        </p>

        {/* Main headline in Cormorant at large size */}
        <h1
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(3rem, 6vw, 5.5rem)",
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: 1.05,
            color: "#F5F0EB",
            letterSpacing: "-0.02em",
          }}
        >
          {salon.tagline}
        </h1>

        {/* Spanish */}
        <p className="mt-4 text-base font-light"
          style={{ color: "#6B6560", fontFamily: "var(--font-dm-sans)" }}>
          {salon.taglineEs}
        </p>

        {/* Divider line + rating */}
        <div className="flex items-center gap-4 mt-10 mb-10">
          <div className="h-px flex-1 max-w-[60px]" style={{ backgroundColor: salon.accentColor }} />
          <span className="text-sm font-light" style={{ color: "#6B6560", fontFamily: "var(--font-dm-sans)" }}>
            ★ {salon.rating} · {salon.reviewCount} reviews
          </span>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-10">
          {salon.badges.slice(0, 3).map((b) => (
            <span key={b}
              className="text-xs px-3 py-1.5 font-light border"
              style={{
                borderColor: "#1F1B2A",
                color: "#6B6560",
                fontFamily: "var(--font-dm-sans)",
                borderRadius: "2px",
              }}>
              {b}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3">
          <a href={`tel:${salon.phone}`}
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-85"
            style={{ backgroundColor: salon.accentColor, borderRadius: "2px", fontFamily: "var(--font-dm-sans)" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            {salon.phoneFormatted}
          </a>
          {salon.booking && salon.booking !== "available" && (
            <a href={salon.booking} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium border transition-colors hover:border-[#6B6560]"
              style={{ borderColor: "#2A2333", color: "#A09A95", borderRadius: "2px", fontFamily: "var(--font-dm-sans)" }}>
              Book Online
            </a>
          )}
          <a href="#services"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium border transition-colors hover:border-[#6B6560]"
            style={{ borderColor: "#2A2333", color: "#A09A95", borderRadius: "2px", fontFamily: "var(--font-dm-sans)" }}>
            Services ↓
          </a>
        </div>

        {/* Bottom address */}
        <p className="mt-14 text-xs font-light tracking-wider text-[#3A3540]"
          style={{ fontFamily: "var(--font-dm-sans)" }}>
          {salon.address} · {salon.city}, NJ · {salon.hours}
        </p>
      </div>
    </section>
  )
}
