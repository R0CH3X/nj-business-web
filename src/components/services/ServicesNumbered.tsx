"use client"
// Style: NUMBERED — bold-editorial & dark-luxury templates
// 01, 02, 03... números grandes en acento, lista expandida tipográfica

import { motion } from "framer-motion"
import type { Salon } from "@/data/salons"
import { useLanguage, pick } from "@/contexts/LanguageContext"

interface Props { salon: Salon; dark?: boolean }

const labelVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
}

const rowVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function ServicesNumbered({ salon, dark = false }: Props) {
  const { t, lang } = useLanguage()

  const bg = dark ? "#0C0A12" : "#0A0907"
  const border = dark ? "#1A1625" : "#1A1714"
  const numColor = salon.accentColor
  const textColor = dark ? "#E8E3F0" : "#F5F0EB"
  const subColor = dark ? "#5A5568" : "#5A5550"

  return (
    <section id="services" style={{ backgroundColor: bg }} className="py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-8 md:px-14">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={labelVariants}
        >
          <p className="text-xs font-medium tracking-[0.3em] uppercase"
            style={{ color: numColor, fontFamily: "var(--font-dm-sans)" }}>
            {t.servicesEyebrow} / {pick(lang, "Servicios", "Services")}
          </p>
          <div className="h-px flex-1" style={{ backgroundColor: border }} />
        </motion.div>

        {/* Numbered list */}
        <div className="divide-y" style={{ borderColor: border }}>
          {salon.services.map((service, i) => (
            <motion.div key={service.name}
              className="flex items-center gap-8 py-6 group cursor-default"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={rowVariants}
            >
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
            </motion.div>
          ))}
        </div>

        {/* CTA row */}
        <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8"
          style={{ borderTop: `1px solid ${border}` }}>
          <p key={lang} className="lang-fade-in text-sm font-light" style={{ color: subColor, fontFamily: "var(--font-dm-sans)" }}>
            {t.servicesQuestion}
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
