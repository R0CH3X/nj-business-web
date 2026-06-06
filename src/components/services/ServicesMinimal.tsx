"use client"
// Style: MINIMAL TYPOGRAPHIC — soft-boutique & modern-split templates
// Lista tipográfica limpia, elegante, sin tarjetas pesadas

import type { Salon } from "@/data/salons"

interface Props { salon: Salon }

export default function ServicesMinimal({ salon }: Props) {
  const mid = Math.ceil(salon.services.length / 2)
  const left = salon.services.slice(0, mid)
  const right = salon.services.slice(mid)

  return (
    <section id="services" className="py-24 md:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-8 md:px-14">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-10 h-0.5" style={{ backgroundColor: salon.accentColor }} />
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-[#9A9490]"
              style={{ fontFamily: "var(--font-dm-sans)" }}>
              Services
            </p>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "#1A1612",
              lineHeight: 1.1,
            }}
          >
            Everything you need,
            <br />
            <span style={{ fontWeight: 600, fontStyle: "normal" }}>beautifully done.</span>
          </h2>
          <p className="mt-3 text-sm text-[#9A9490]" style={{ fontFamily: "var(--font-dm-sans)" }}>
            Todo lo que necesitas, hecho con arte.
          </p>
        </div>

        {/* Two-column service list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0 mb-16">
          {/* Left column */}
          <div className="divide-y divide-[#F0ECE8]">
            {left.map((service) => (
              <div key={service.name} className="py-5 flex items-center justify-between group">
                <div>
                  <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.05rem", fontWeight: 400, color: "#1A1612" }}>
                    {service.name}
                  </p>
                  <p className="text-xs italic text-[#ABA6A1] mt-0.5"
                    style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.9rem" }}>
                    {service.nameEs}
                  </p>
                </div>
                <span
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-sm"
                  style={{ color: salon.accentColor }}>
                  ✦
                </span>
              </div>
            ))}
          </div>

          {/* Right column */}
          <div className="divide-y divide-[#F0ECE8]">
            {right.map((service) => (
              <div key={service.name} className="py-5 flex items-center justify-between group">
                <div>
                  <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.05rem", fontWeight: 400, color: "#1A1612" }}>
                    {service.name}
                  </p>
                  <p className="text-xs italic text-[#ABA6A1] mt-0.5"
                    style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.9rem" }}>
                    {service.nameEs}
                  </p>
                </div>
                <span
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-sm"
                  style={{ color: salon.accentColor }}>
                  ✦
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Booking pill CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-5 pt-8 border-t border-[#F0ECE8]">
          <p className="text-sm text-center sm:text-left text-[#6B6560]"
            style={{ fontFamily: "var(--font-dm-sans)" }}>
            Questions about pricing? We're happy to help.
          </p>
          <div className="flex flex-wrap justify-center gap-3 ml-auto">
            <a href={`tel:${salon.phone}`}
              className="inline-flex items-center gap-2 px-7 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: salon.accentColor, borderRadius: "30px", fontFamily: "var(--font-dm-sans)" }}>
              Call · {salon.phoneFormatted}
            </a>
            <a href={`https://wa.me/${salon.phone}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 text-sm font-medium border text-[#1A1612] hover:border-[#1A1612] transition-colors"
              style={{ borderColor: "#D4CFC9", borderRadius: "30px", fontFamily: "var(--font-dm-sans)" }}>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
