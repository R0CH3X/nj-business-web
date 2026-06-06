"use client"
// Style: NUMBERED — bold-editorial & dark-luxury templates
// 01, 02, 03... números grandes en acento, lista expandida tipográfica

import { useRef, useEffect } from "react"
import type { Salon } from "@/data/salons"

interface Props { salon: Salon; dark?: boolean }

export default function ServicesNumbered({ salon, dark = false }: Props) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.querySelectorAll(".svc-row").forEach((el, i) => {
            setTimeout(() => {
              (el as HTMLElement).style.opacity = "1"
              ;(el as HTMLElement).style.transform = "translateY(0)"
            }, i * 70)
          })
        }
      })
    }, { threshold: 0.1 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const bg = dark ? "#0C0A12" : "#0A0907"
  const border = dark ? "#1A1625" : "#1A1714"
  const numColor = salon.accentColor
  const textColor = dark ? "#E8E3F0" : "#F5F0EB"
  const subColor = dark ? "#5A5568" : "#5A5550"

  return (
    <section id="services" ref={sectionRef} style={{ backgroundColor: bg }} className="py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-8 md:px-14">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <p className="text-xs font-medium tracking-[0.3em] uppercase"
            style={{ color: numColor, fontFamily: "var(--font-dm-sans)" }}>
            Services / Servicios
          </p>
          <div className="h-px flex-1" style={{ backgroundColor: border }} />
        </div>

        {/* Numbered list */}
        <div className="divide-y" style={{ borderColor: border }}>
          {salon.services.map((service, i) => (
            <div key={service.name}
              className="svc-row flex items-center gap-8 py-6 group cursor-default"
              style={{
                opacity: 0,
                transform: "translateY(12px)",
                transition: "opacity 0.4s ease, transform 0.4s ease",
              }}>
              {/* Number */}
              <span
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 400,
                  color: numColor,
                  opacity: 0.5,
                  width: "80px",
                  flexShrink: 0,
                  lineHeight: 1,
                  transition: "opacity 0.2s ease",
                }}
                className="group-hover:opacity-100"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Service name */}
              <div className="flex-1">
                <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.35rem", fontWeight: 400, color: textColor }}>
                  {service.name}
                </p>
                <p className="mt-0.5 text-sm italic"
                  style={{ color: subColor, fontFamily: "var(--font-cormorant)", fontSize: "0.95rem" }}>
                  {service.nameEs}
                </p>
              </div>

              {/* Arrow on hover */}
              <span className="text-xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: numColor }}>→</span>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8"
          style={{ borderTop: `1px solid ${border}` }}>
          <p className="text-sm font-light" style={{ color: subColor, fontFamily: "var(--font-dm-sans)" }}>
            Questions? Give us a call. · ¿Preguntas? Llámanos.
          </p>
          <a href={`tel:${salon.phone}`}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[#0A0907] transition-opacity hover:opacity-90"
            style={{ backgroundColor: numColor, borderRadius: "2px", fontFamily: "var(--font-dm-sans)" }}>
            {salon.phoneFormatted}
          </a>
        </div>
      </div>
    </section>
  )
}
