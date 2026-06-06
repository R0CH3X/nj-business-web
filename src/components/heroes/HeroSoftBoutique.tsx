"use client"
// Template: SOFT BOUTIQUE — Brigith Nails, Amarilys, Salon Salvys
// Feeling: boutique local con corazón — arco editorial, Cormorant italic grande, cream cálido, íntimo

import { useEffect, useRef } from "react"
import Image from "next/image"
import type { Salon } from "@/data/salons"

const images: Record<string, string> = {
  hair: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=800&q=85&auto=format&fit=crop",
  nails: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=85&auto=format&fit=crop",
  full: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=85&auto=format&fit=crop",
}

export default function HeroSoftBoutique({ salon }: { salon: Salon }) {
  const imgRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(() => {
      if (imgRef.current) {
        imgRef.current.style.opacity = "1"
        imgRef.current.style.transform = "scale(1)"
      }
    }, 100)
    setTimeout(() => {
      if (textRef.current) {
        textRef.current.style.opacity = "1"
        textRef.current.style.transform = "translateY(0)"
      }
    }, 300)
  }, [])

  return (
    <section className="min-h-screen bg-[#FDFAF7] flex flex-col md:flex-row overflow-hidden">
      {/* LEFT: Centered vertical text + branding */}
      <div
        ref={textRef}
        className="relative z-10 flex flex-col justify-between px-10 md:px-16 pt-28 pb-14 md:w-[48%] flex-shrink-0"
        style={{
          opacity: 0,
          transform: "translateY(20px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        {/* Top: Salon name small */}
        <div>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: salon.accentColor, opacity: 0.3 }} />
            <span className="text-xs font-medium tracking-[0.25em] uppercase text-[#6B6560]"
              style={{ fontFamily: "var(--font-dm-sans)" }}>
              {salon.name}
            </span>
          </div>

          {/* Giant italic Cormorant headline — the centerpiece */}
          <h1
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(3.5rem, 8vw, 6.5rem)",
              fontWeight: 400,
              fontStyle: "italic",
              lineHeight: 1.0,
              color: "#1A1612",
              letterSpacing: "-0.02em",
            }}
          >
            {salon.tagline}
          </h1>

          {/* Accent underline decoration */}
          <div className="flex items-center gap-3 mt-6">
            <div className="h-0.5 w-16" style={{ backgroundColor: salon.accentColor }} />
            <p className="text-sm italic font-light text-[#6B6560]"
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem" }}>
              {salon.taglineEs}
            </p>
          </div>
        </div>

        {/* Middle: rating + badges */}
        <div className="my-10">
          <div className="inline-flex items-center gap-2 px-4 py-2.5 mb-6"
            style={{ backgroundColor: salon.accentLight, borderRadius: "40px" }}>
            <svg width="13" height="13" viewBox="0 0 12 12" fill={salon.accentColor}>
              <path d="M6 0l1.5 4.5H12l-3.75 2.7L9.75 12 6 9.3 2.25 12l1.5-4.8L0 4.5h4.5z" />
            </svg>
            <span className="text-sm font-medium" style={{ color: salon.accentColor, fontFamily: "var(--font-dm-sans)" }}>
              {salon.rating} — {salon.reviewCount} reviews
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {salon.badges.map((b) => (
              <span key={b} className="text-xs px-3 py-1 font-light border border-[#E8E3DE] text-[#6B6560]"
                style={{ fontFamily: "var(--font-dm-sans)", borderRadius: "20px" }}>
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom: CTAs + address */}
        <div>
          <div className="flex flex-wrap gap-3 mb-8">
            <a href={`tel:${salon.phone}`}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: salon.accentColor, borderRadius: "30px", fontFamily: "var(--font-dm-sans)" }}>
              Call Us · {salon.phoneFormatted}
            </a>
            <a href="#services"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-light border border-[#E2DDD9] text-[#6B6560] hover:border-[#1A1612] transition-colors"
              style={{ borderRadius: "30px", fontFamily: "var(--font-dm-sans)" }}>
              See Services
            </a>
          </div>
          <p className="text-xs text-[#9A9490] font-light"
            style={{ fontFamily: "var(--font-dm-sans)" }}>
            {salon.address}, {salon.city}, NJ · {salon.hours}
          </p>
        </div>
      </div>

      {/* RIGHT: Arched editorial photo */}
      <div className="relative flex-1 min-h-[50vh] md:min-h-0">
        <div
          ref={imgRef}
          className="absolute inset-4 md:inset-8"
          style={{
            opacity: 0,
            transform: "scale(1.04)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
            borderRadius: "200px 200px 16px 16px", // Arch top
            overflow: "hidden",
          }}
        >
          <Image
            src={images[salon.type] ?? images.hair}
            alt={salon.name}
            fill
            priority
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 52vw"
          />
          {/* Subtle accent tint at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32"
            style={{ background: `linear-gradient(to top, ${salon.accentColor}30, transparent)` }} />
        </div>
      </div>
    </section>
  )
}
