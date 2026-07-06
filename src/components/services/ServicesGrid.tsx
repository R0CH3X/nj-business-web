"use client"
// Style: GRID CARDS — magazine & vibrant-energy templates
// Cards con precio, ícono decorativo, hover lift effect

import { motion } from "framer-motion"
import type { Salon } from "@/data/salons"
import { useLanguage, pick } from "@/contexts/LanguageContext"

interface Props { salon: Salon }

const headerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function ServicesGrid({ salon }: Props) {
  const { t, lang } = useLanguage()
  return (
    <section id="services" className="py-24 md:py-32 bg-[#FAF7F4]">
      <div className="max-w-6xl mx-auto px-8 md:px-14">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={headerVariants}
        >
          <p className="text-xs font-medium tracking-[0.3em] uppercase mb-4"
            style={{ color: salon.accentColor, fontFamily: "var(--font-dm-sans)" }}>
            {t.servicesEyebrow} · {pick(lang, "Nuestros Servicios", "Our Services")}
          </p>
          <h2
            key={lang}
            className="lang-fade-in"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              color: "#1A1612",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {t.servicesHeadline}
          </h2>
        </motion.div>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {salon.services.map((service, i) => (
            <motion.div
              key={service.name}
              className="group relative overflow-hidden bg-white border border-[#EDEBE8] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{ borderRadius: "8px" }}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
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
                <p className="mt-1 italic text-[#6B6560]"
                  style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.05rem" }}>
                  {service.nameEs}
                </p>

                {/* Divider */}
                <div className="my-5 h-px bg-[#EDEBE8]" />

                <div className="flex items-center justify-between">
                  <a
                    href={`tel:+1${salon.phone}`}
                    className="text-xs font-medium tracking-widest uppercase transition-colors"
                    style={{ color: salon.accentColor, fontFamily: "var(--font-dm-sans)" }}
                  >
                    {t.bookNow} →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA banner */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-lg"
          style={{ backgroundColor: salon.accentColor + "12", border: `1px solid ${salon.accentColor}30` }}>
          <div>
            <p key={lang} className="lang-fade-in" style={{ fontFamily: "var(--font-playfair)", fontSize: "1.5rem", fontWeight: 600, color: "#1A1612" }}>
              {t.bookingPrompt}
            </p>
            <p key={`${lang}-sub`} className="lang-fade-in text-sm text-[#6B6560] mt-1" style={{ fontFamily: "var(--font-dm-sans)" }}>
              {t.servicesQuestion}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:+1${salon.phone}`}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: salon.accentColor, borderRadius: "4px", fontFamily: "var(--font-dm-sans)" }}>
              {salon.phoneFormatted}
            </a>
            <a href={`https://wa.me/1${salon.phone}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium border text-[#1A1612] hover:bg-white transition-colors"
              style={{ borderColor: salon.accentColor, borderRadius: "4px", fontFamily: "var(--font-dm-sans)" }}>
              {t.whatsapp}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
