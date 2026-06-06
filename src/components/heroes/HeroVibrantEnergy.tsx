"use client"
// Template: VIBRANT ENERGY — Estilo's Beauty Salon
// Feeling: energético, cálido, accesible — fondo en acento claro, foto a todo, texto superpuesto con carácter

import { useEffect, useRef } from "react"
import Image from "next/image"
import type { Salon } from "@/data/salons"

export default function HeroVibrantEnergy({ salon }: { salon: Salon }) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.style.opacity = "1"
        contentRef.current.style.transform = "translateY(0)"
      }
    }, 200)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden" style={{ backgroundColor: salon.accentLight }}>
      {/* Full-bleed background photo with strong overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1400&q=80&auto=format&fit=crop"
          alt={salon.name}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{
          background: `linear-gradient(135deg, ${salon.accentColor}E5 0%, ${salon.accentColor}99 40%, transparent 75%)`
        }} />
        <div className="absolute inset-0 bg-[#1A1612]/30" />
      </div>

      {/* Content over photo */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col justify-end min-h-screen px-8 md:px-16 pb-16 pt-28"
        style={{
          opacity: 0,
          transform: "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-white/60" />
            <span className="text-sm font-light text-white/70 tracking-widest uppercase"
              style={{ fontFamily: "var(--font-dm-sans)" }}>
              Full Service Salon · {salon.city}, NJ
            </span>
          </div>

          {/* Giant display headline — Playfair white */}
          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(3.5rem, 9vw, 7rem)",
              fontWeight: 700,
              lineHeight: 0.95,
              color: "#FFFFFF",
              letterSpacing: "-0.03em",
            }}
          >
            {salon.name}
          </h1>

          {/* Tagline below in different weight */}
          <p className="mt-5 text-xl font-light text-white/80"
            style={{ fontFamily: "var(--font-dm-sans)" }}>
            {salon.tagline}
          </p>
          <p className="mt-2 text-base italic text-white/60"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem" }}>
            {salon.taglineEs}
          </p>

          {/* Rating pill */}
          <div className="flex items-center gap-4 mt-8 mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm text-white text-sm font-medium"
              style={{ borderRadius: "30px", fontFamily: "var(--font-dm-sans)" }}>
              ★ {salon.rating} · {salon.reviewCount} reviews
            </span>
            <span className="text-white/50 text-xs" style={{ fontFamily: "var(--font-dm-sans)" }}>
              {salon.hours}
            </span>
          </div>

          {/* CTAs — white + transparent */}
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${salon.phone}`}
              className="inline-flex items-center gap-2 px-7 py-4 text-sm font-semibold text-[#1A1612] transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#FFFFFF", borderRadius: "3px", fontFamily: "var(--font-dm-sans)" }}>
              Call Now · {salon.phoneFormatted}
            </a>
            <a href={`https://wa.me/${salon.phone}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-4 text-sm font-medium text-white border border-white/30 hover:bg-white/10 transition-colors"
              style={{ borderRadius: "3px", fontFamily: "var(--font-dm-sans)" }}>
              WhatsApp
            </a>
          </div>

          {/* Address */}
          <p className="mt-10 text-xs text-white/40 tracking-widest"
            style={{ fontFamily: "var(--font-dm-sans)" }}>
            {salon.address}, {salon.city}, NJ {salon.zip}
          </p>
        </div>
      </div>

      {/* Decorative vertical text on right */}
      <div className="hidden lg:flex absolute right-10 top-1/2 -translate-y-1/2 z-10 items-center gap-3"
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>
        <span className="text-xs text-white/30 tracking-widest uppercase"
          style={{ fontFamily: "var(--font-dm-sans)" }}>
          {salon.name} · Bergenline Ave
        </span>
      </div>
    </section>
  )
}
