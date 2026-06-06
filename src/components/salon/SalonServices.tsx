"use client"

import { useRef, useEffect } from "react"
import type { Salon } from "@/data/salons"

interface Props { salon: Salon }

export default function SalonServices({ salon }: Props) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".service-item").forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = "1"
                ;(el as HTMLElement).style.transform = "translateY(0)"
              }, i * 60)
            })
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
        {/* Left — heading */}
        <div className="md:sticky md:top-28">
          <p className="text-xs font-medium tracking-widest uppercase text-[#6B6560] mb-4"
            style={{ fontFamily: "var(--font-dm-sans)", color: salon.accentColor }}>
            Services / Servicios
          </p>
          <h2 className="headline-lg text-[#1A1612] mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
            What we do best.
          </h2>
          <p className="text-base font-light text-[#6B6560] leading-relaxed max-w-xs"
            style={{ fontFamily: "var(--font-dm-sans)" }}>
            Every service is performed with care and precision. Lo que hacemos, lo hacemos bien.
          </p>
          <div className="mt-10 w-12 h-px" style={{ backgroundColor: salon.accentColor }} />
        </div>

        {/* Right — service list */}
        <div className="divide-y divide-[#E2DDD9]">
          {salon.services.map((service) => (
            <div
              key={service.name}
              className="service-item py-5 flex items-center justify-between group"
              style={{
                opacity: 0,
                transform: "translateY(12px)",
                transition: "opacity 0.4s ease, transform 0.4s ease",
              }}
            >
              <div>
                <p className="text-base font-light text-[#1A1612] group-hover:text-current transition-colors"
                  style={{ fontFamily: "var(--font-dm-sans)" }}>
                  {service.name}
                </p>
                <p className="text-sm font-light text-[#6B6560] mt-0.5 italic"
                  style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.95rem" }}>
                  {service.nameEs}
                </p>
              </div>
              {service.price && (
                <span className="text-sm font-light text-[#6B6560]" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  {service.price}
                </span>
              )}
              <div className="w-4 h-px ml-6 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: salon.accentColor }} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 pt-10 border-t border-[#E2DDD9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <p className="text-sm font-light text-[#6B6560]" style={{ fontFamily: "var(--font-dm-sans)" }}>
          Questions about pricing? Give us a call.
          <span className="block text-xs mt-0.5 italic" style={{ fontFamily: "var(--font-cormorant)" }}>
            ¿Preguntas sobre precios? Llámanos.
          </span>
        </p>
        <a
          href={`tel:${salon.phone}`}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: salon.accentColor, borderRadius: "3px", fontFamily: "var(--font-dm-sans)" }}
        >
          {salon.phoneFormatted}
        </a>
      </div>
    </section>
  )
}
