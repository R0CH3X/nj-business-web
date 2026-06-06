"use client"
// Template: MAGAZINE — Glamour By Marisol
// Feeling: portada de revista de belleza independiente — collage, texto cruzado sobre foto, fuchsia bold

import { useEffect, useRef } from "react"
import Image from "next/image"
import type { Salon } from "@/data/salons"

export default function HeroMagazine({ salon }: { salon: Salon }) {
  const coverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(() => {
      if (coverRef.current) {
        coverRef.current.style.opacity = "1"
      }
    }, 150)
  }, [])

  return (
    <section className="relative min-h-screen bg-[#FAF7F4] overflow-hidden">
      {/* Magazine masthead — top full width bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 md:px-12 py-5 border-b border-[#E2DDD9]">
        <div>
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-[#6B6560]"
            style={{ fontFamily: "var(--font-dm-sans)" }}>
            West New York · NJ
          </p>
        </div>
        <div className="text-center">
          <p className="font-bold text-lg tracking-widest uppercase" style={{ fontFamily: "var(--font-playfair)" }}>
            {salon.name}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-light text-[#6B6560]" style={{ fontFamily: "var(--font-dm-sans)" }}>
            ★ {salon.rating} Perfect
          </p>
        </div>
      </div>

      {/* Magazine layout grid */}
      <div
        ref={coverRef}
        className="min-h-screen pt-16 grid md:grid-cols-12 md:grid-rows-1"
        style={{ opacity: 0, transition: "opacity 0.8s ease" }}
      >
        {/* Main photo — takes columns 1-7 */}
        <div className="relative md:col-span-7 min-h-[50vh] md:min-h-screen">
          <Image
            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&q=85&auto=format&fit=crop"
            alt={salon.name}
            fill
            priority
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 58vw"
          />
          {/* Accent stripe on the left edge of photo */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: salon.accentColor }} />

          {/* BIG overlapping headline — magazine cover style */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <p
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(4rem, 10vw, 9rem)",
                fontWeight: 700,
                fontStyle: "italic",
                lineHeight: 0.85,
                color: "#FFFFFF",
                letterSpacing: "-0.04em",
                textShadow: "0 4px 40px rgba(0,0,0,0.4)",
              }}
            >
              Glamour
            </p>
          </div>
        </div>

        {/* Right editorial column — columns 8-12 */}
        <div className="md:col-span-5 flex flex-col justify-between px-8 md:px-10 py-24 md:py-20 bg-[#FAF7F4]">
          {/* Issue-style label */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 flex items-center justify-center"
                style={{ backgroundColor: salon.accentColor, borderRadius: "2px" }}>
                <span className="text-white text-xs font-bold">✦</span>
              </div>
              <p className="text-xs font-medium tracking-widest uppercase text-[#6B6560]"
                style={{ fontFamily: "var(--font-dm-sans)" }}>
                Color Correction Specialist
              </p>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                fontWeight: 700,
                lineHeight: 1.05,
                color: "#1A1612",
                letterSpacing: "-0.02em",
              }}
            >
              {salon.tagline}
            </h1>
            <p className="mt-4 italic text-[#6B6560]"
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.2rem" }}>
              {salon.taglineEs}
            </p>

            {/* Editorial pull quote */}
            <div className="my-10 pl-5 border-l-2" style={{ borderColor: salon.accentColor }}>
              <p className="italic text-[#1A1612]"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem", lineHeight: 1.5 }}>
                "{salon.reviews[1]?.text}"
              </p>
            </div>

            {/* Team */}
            {salon.team && (
              <div className="mb-10">
                {salon.team.map((m) => (
                  <div key={m.name} className="flex items-center justify-between py-3 border-b border-[#E2DDD9]">
                    <span className="font-medium text-[#1A1612]" style={{ fontFamily: "var(--font-dm-sans)" }}>
                      {m.name}
                    </span>
                    <span className="text-sm italic text-[#6B6560]"
                      style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem" }}>
                      {m.role}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex flex-col gap-3 mb-8">
              <a href={`tel:${salon.phone}`}
                className="inline-flex items-center justify-center gap-2 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: salon.accentColor, borderRadius: "2px", fontFamily: "var(--font-dm-sans)" }}>
                Book · {salon.phoneFormatted}
              </a>
              {salon.instagram && (
                <a href={`https://instagram.com/${salon.instagram}`} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-3.5 text-sm font-light border border-[#E2DDD9] text-[#6B6560] hover:border-[#1A1612] transition-colors"
                  style={{ borderRadius: "2px", fontFamily: "var(--font-dm-sans)" }}>
                  @{salon.instagram}
                </a>
              )}
            </div>
            <p className="text-xs text-[#9A9490]" style={{ fontFamily: "var(--font-dm-sans)" }}>
              {salon.address}, {salon.city}, NJ · {salon.hours}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
