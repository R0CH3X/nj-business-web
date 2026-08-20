"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import type { Salon } from "@/data/salons"

interface Props { salon: Salon }

const heroImages: Record<string, string> = {
  hair: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900&q=80&auto=format&fit=crop",
  nails: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=900&q=80&auto=format&fit=crop",
  full: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&q=80&auto=format&fit=crop",
}

export default function SalonHero({ salon }: Props) {
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = headlineRef.current
    if (!el) return
    const words = el.innerText.split(" ")
    el.innerHTML = words
      .map((w, i) => `<span style="opacity:0;transform:translateY(24px);display:inline-block;transition:opacity 0.5s ease ${i * 90}ms,transform 0.5s ease ${i * 90}ms">${w}</span>`)
      .join(" ")
    requestAnimationFrame(() => {
      el.querySelectorAll("span").forEach((s) => {
        ;(s as HTMLElement).style.opacity = "1"
        ;(s as HTMLElement).style.transform = "translateY(0)"
      })
    })
  }, [])

  const imgSrc = heroImages[salon.type] ?? heroImages.hair

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image — right side bleeds to edge */}
      <div className="absolute inset-0 md:left-[45%] z-0">
        <Image
          src={imgSrc}
          alt={`${salon.name} — ${salon.city}, NJ`}
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 55vw"
        />
        {/* Gradient overlay — heavier on mobile for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F4] via-[#FAF7F4]/80 to-transparent md:via-[#FAF7F4]/40" />
        <div className="absolute inset-0 md:hidden bg-[#FAF7F4]/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-20 md:pt-32 md:pb-24 w-full">
        <div className="max-w-xl">
          {/* Credential badge */}
          <div className="flex items-center gap-3 mb-8">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-sm"
              style={{ backgroundColor: salon.accentLight, color: salon.accentColor, fontFamily: "var(--font-dm-sans)" }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 0l1.5 4.5H12l-3.75 2.7L9.75 12 6 9.3 2.25 12l1.5-4.8L0 4.5h4.5z" />
              </svg>
              {salon.rating} · {salon.reviewCount} reviews
            </span>
            {salon.badges.slice(0, 1).map((b) => (
              <span key={b} className="text-xs font-light text-[#6B6560]" style={{ fontFamily: "var(--font-dm-sans)" }}>
                {b}
              </span>
            ))}
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="headline-xl text-[#1A1612] mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {salon.tagline}
          </h1>

          {/* Spanish tagline */}
          <p className="text-base md:text-lg font-light text-[#6B6560] mb-4 italic"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}>
            {salon.taglineEs}
          </p>

          {/* Address */}
          <p className="text-sm font-light text-[#6B6560] mb-10 tracking-wide"
            style={{ fontFamily: "var(--font-dm-sans)" }}>
            {salon.address}, {salon.city}, {salon.state} · {salon.hours}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:+1${salon.phone}`}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: salon.accentColor, borderRadius: "3px", fontFamily: "var(--font-dm-sans)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .82h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              Call Us / Llámanos
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-[#1A1612] border border-[#E2DDD9] hover:border-[#1A1612] transition-colors"
              style={{ borderRadius: "3px", fontFamily: "var(--font-dm-sans)" }}
            >
              Our Services
            </a>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2">
        <span className="text-xs font-light text-[#6B6560] tracking-widest uppercase" style={{ fontFamily: "var(--font-dm-sans)" }}>Scroll</span>
        <div className="w-px h-8 bg-[#E2DDD9]" />
      </div>
    </section>
  )
}
