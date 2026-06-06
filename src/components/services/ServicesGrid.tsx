"use client"
// Style: GRID CARDS — magazine & vibrant-energy templates
// Cards con precio, ícono decorativo, hover lift effect

import type { Salon } from "@/data/salons"

interface Props { salon: Salon }

export default function ServicesGrid({ salon }: Props) {
  return (
    <section id="services" className="py-24 md:py-32 bg-[#FAF7F4]">
      <div className="max-w-6xl mx-auto px-8 md:px-14">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-medium tracking-[0.3em] uppercase mb-4"
            style={{ color: salon.accentColor, fontFamily: "var(--font-dm-sans)" }}>
            Our Services · Nuestros Servicios
          </p>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              color: "#1A1612",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            What We Offer
          </h2>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {salon.services.map((service, i) => (
            <div
              key={service.name}
              className="group relative overflow-hidden bg-white border border-[#EDEBE8] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{ borderRadius: "8px" }}
            >
              {/* Accent bar top */}
              <div className="h-1 w-full" style={{ backgroundColor: salon.accentColor, opacity: i % 3 === 0 ? 1 : 0.4 }} />

              <div className="p-7">
                {/* Service number as decoration */}
                <p
                  className="text-right mb-4"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "3.5rem",
                    fontWeight: 300,
                    lineHeight: 1,
                    color: salon.accentColor,
                    opacity: 0.15,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </p>

                <h3
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    color: "#1A1612",
                    lineHeight: 1.2,
                  }}
                >
                  {service.name}
                </h3>
                <p className="mt-1 italic text-[#8A8480]"
                  style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.05rem" }}>
                  {service.nameEs}
                </p>

                {/* Divider */}
                <div className="my-5 h-px bg-[#EDEBE8]" />

                <div className="flex items-center justify-between">
                  <a
                    href={`tel:${salon.phone}`}
                    className="text-xs font-medium tracking-widest uppercase transition-colors"
                    style={{ color: salon.accentColor, fontFamily: "var(--font-dm-sans)" }}
                  >
                    Book Now →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA banner */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-lg"
          style={{ backgroundColor: salon.accentColor + "12", border: `1px solid ${salon.accentColor}30` }}>
          <div>
            <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.5rem", fontWeight: 600, color: "#1A1612" }}>
              Ready to book your appointment?
            </p>
            <p className="text-sm text-[#6B6560] mt-1" style={{ fontFamily: "var(--font-dm-sans)" }}>
              ¿Lista para tu cita? Call or WhatsApp us.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${salon.phone}`}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: salon.accentColor, borderRadius: "4px", fontFamily: "var(--font-dm-sans)" }}>
              {salon.phoneFormatted}
            </a>
            <a href={`https://wa.me/${salon.phone}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium border text-[#1A1612] hover:bg-white transition-colors"
              style={{ borderColor: salon.accentColor, borderRadius: "4px", fontFamily: "var(--font-dm-sans)" }}>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
