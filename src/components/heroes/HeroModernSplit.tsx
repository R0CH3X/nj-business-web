"use client"
// Template: MODERN SPLIT — Fina Salon, Divino Niño
// Feeling: arquitectónico, geométrico, 50/50 perfecto, panel de color sólido izquierda, foto derecha

import { useEffect, useRef } from "react"
import Image from "next/image"
import type { Salon } from "@/data/salons"

const images: Record<string, string> = {
  hair: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=900&q=85&auto=format&fit=crop",
  nails: "https://images.unsplash.com/photo-1632345031435-8727f592d8f9?w=900&q=85&auto=format&fit=crop",
  full: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=900&q=85&auto=format&fit=crop",
}

export default function HeroModernSplit({ salon }: { salon: Salon }) {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(() => {
      if (leftRef.current) leftRef.current.style.opacity = "1"
    }, 100)
    setTimeout(() => {
      if (rightRef.current) rightRef.current.style.opacity = "1"
    }, 350)
  }, [])

  return (
    <section className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* LEFT panel: accent-light bg or white with strong accent typography */}
      <div
        ref={leftRef}
        className="relative flex flex-col justify-between px-10 md:px-14 pt-24 md:pt-0 pb-12 md:py-0 md:justify-center md:w-1/2"
        style={{
          backgroundColor: salon.accentLight,
          opacity: 0,
          transition: "opacity 0.7s ease",
        }}
      >
        {/* Top nav placeholder area */}
        <div className="md:absolute md:top-10 md:left-14 mb-8 md:mb-0">
          <span className="text-xs font-medium tracking-[0.25em] uppercase"
            style={{ color: salon.accentColor, fontFamily: "var(--font-dm-sans)" }}>
            {salon.city}, NJ
          </span>
        </div>

        <div>
          {/* Name stacked vertically */}
          <div className="mb-8">
            {salon.name.split(" ").map((word, i) => (
              <p key={i}
                className="leading-none"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                  fontWeight: i % 2 === 0 ? 700 : 400,
                  fontStyle: i % 2 !== 0 ? "italic" : "normal",
                  color: "#1A1612",
                  letterSpacing: "-0.03em",
                }}>
                {word}
              </p>
            ))}
          </div>

          {/* Tagline */}
          <p className="text-lg font-light text-[#6B6560] mb-2 leading-snug max-w-xs"
            style={{ fontFamily: "var(--font-dm-sans)" }}>
            {salon.tagline}
          </p>
          <p className="text-sm italic text-[#8A8480] mb-10"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem" }}>
            {salon.taglineEs}
          </p>

          {/* Stats row */}
          <div className="flex gap-8 mb-10">
            <div>
              <p className="text-3xl font-bold" style={{ color: salon.accentColor, fontFamily: "var(--font-playfair)" }}>
                {salon.rating}
              </p>
              <p className="text-xs text-[#6B6560] mt-1" style={{ fontFamily: "var(--font-dm-sans)" }}>
                Rating
              </p>
            </div>
            <div className="w-px bg-[#E2DDD9]" />
            <div>
              <p className="text-3xl font-bold text-[#1A1612]" style={{ fontFamily: "var(--font-playfair)" }}>
                {salon.reviewCount}
              </p>
              <p className="text-xs text-[#6B6560] mt-1" style={{ fontFamily: "var(--font-dm-sans)" }}>
                Reviews
              </p>
            </div>
            <div className="w-px bg-[#E2DDD9]" />
            <div>
              <p className="text-3xl font-bold text-[#1A1612]" style={{ fontFamily: "var(--font-playfair)" }}>
                {salon.services.length}
              </p>
              <p className="text-xs text-[#6B6560] mt-1" style={{ fontFamily: "var(--font-dm-sans)" }}>
                Services
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${salon.phone}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: salon.accentColor, borderRadius: "3px", fontFamily: "var(--font-dm-sans)" }}>
              {salon.phoneFormatted}
            </a>
            <a href="#services"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-[#1A1612] border border-[#1A1612]/20 hover:border-[#1A1612] transition-colors"
              style={{ borderRadius: "3px", fontFamily: "var(--font-dm-sans)" }}>
              Explore ↓
            </a>
          </div>
        </div>

        {/* Address at bottom */}
        <p className="text-xs text-[#9A9490] mt-10 md:absolute md:bottom-10 md:left-14"
          style={{ fontFamily: "var(--font-dm-sans)" }}>
          {salon.address} · {salon.hours}
        </p>
      </div>

      {/* RIGHT: Full-bleed photo, zero padding */}
      <div
        ref={rightRef}
        className="relative min-h-[50vh] md:min-h-0 md:flex-1"
        style={{ opacity: 0, transition: "opacity 0.9s ease" }}
      >
        <Image
          src={images[salon.type] ?? images.hair}
          alt={salon.name}
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Rating badge on photo */}
        <div className="absolute top-8 right-8 flex items-center gap-2 px-4 py-2 backdrop-blur-md"
          style={{ backgroundColor: "rgba(10,9,7,0.55)", borderRadius: "3px" }}>
          <span className="text-white text-sm font-medium" style={{ fontFamily: "var(--font-dm-sans)" }}>
            ★ {salon.rating}
          </span>
          <span className="text-white/60 text-xs" style={{ fontFamily: "var(--font-dm-sans)" }}>
            Google
          </span>
        </div>
      </div>
    </section>
  )
}
