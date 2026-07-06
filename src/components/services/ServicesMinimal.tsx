"use client"
// Style: MINIMAL TYPOGRAPHIC — soft-boutique & modern-split templates
// Lista tipográfica limpia, elegante, sin tarjetas pesadas

import { motion } from "framer-motion"
import type { Salon } from "@/data/salons"
import { useLanguage, pick } from "@/contexts/LanguageContext"

interface Props { salon: Salon }

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

const rowVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function ServicesMinimal({ salon }: Props) {
  const { t, lang } = useLanguage()
  const mid = Math.ceil(salon.services.length / 2)
  const left = salon.services.slice(0, mid)
  const right = salon.services.slice(mid)

  return (
    <section id="services" className="py-24 md:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-8 md:px-14">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="w-10 h-0.5" style={{ backgroundColor: salon.accentColor }} />
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-[#6B6560]"
              style={{ fontFamily: "var(--font-dm-sans)" }}>
              {t.servicesEyebrow}
            </p>
          </div>
          <h2
            key={lang}
            className="lang-fade-in"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "#1A1612",
              lineHeight: 1.1,
            }}
          >
            {pick(lang, "Everything you need,", "Todo lo que necesitas,")}
            <br />
            <span style={{ fontWeight: 600, fontStyle: "normal" }}>
              {pick(lang, "beautifully done.", "hecho con arte.")}
            </span>
          </h2>
          <p key={`${lang}-sub`} className="lang-fade-in mt-3 text-sm text-[#6B6560]" style={{ fontFamily: "var(--font-dm-sans)" }}>
            {pick(lang, "Todo lo que necesitas, hecho con arte.", "Everything you need, beautifully done.")}
          </p>
        </motion.div>

        {/* Two-column service list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0 mb-16">
          {/* Left column */}
          <div className="divide-y divide-[#F0ECE8]">
            {left.map((service, i) => (
              <motion.div
                key={service.name}
                className="py-5 flex items-center justify-between group"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={rowVariants}
              >
                <div>
                  <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.05rem", fontWeight: 400, color: "#1A1612" }}>
                    {service.name}
                  </p>
                  <p className="text-xs italic text-[#6B6560] mt-0.5"
                    style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.9rem" }}>
                    {service.nameEs}
                  </p>
                </div>
                <span
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-sm"
                  style={{ color: salon.accentColor }}>
                  ✦
                </span>
              </motion.div>
            ))}
          </div>

          {/* Right column */}
          <div className="divide-y divide-[#F0ECE8]">
            {right.map((service, i) => (
              <motion.div
                key={service.name}
                className="py-5 flex items-center justify-between group"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={rowVariants}
              >
                <div>
                  <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.05rem", fontWeight: 400, color: "#1A1612" }}>
                    {service.name}
                  </p>
                  <p className="text-xs italic text-[#6B6560] mt-0.5"
                    style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.9rem" }}>
                    {service.nameEs}
                  </p>
                </div>
                <span
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-sm"
                  style={{ color: salon.accentColor }}>
                  ✦
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Booking pill CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-5 pt-8 border-t border-[#F0ECE8]">
          <p key={lang} className="lang-fade-in text-sm text-center sm:text-left text-[#6B6560]"
            style={{ fontFamily: "var(--font-dm-sans)" }}>
            {pick(lang, "Questions about pricing? We're happy to help.", "¿Preguntas sobre precios? Con gusto te ayudamos.")}
          </p>
          <div className="flex flex-wrap justify-center gap-3 ml-auto">
            <a href={`tel:+1${salon.phone}`}
              className="inline-flex items-center gap-2 px-7 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: salon.accentColor, borderRadius: "30px", fontFamily: "var(--font-dm-sans)" }}>
              {t.call} · {salon.phoneFormatted}
            </a>
            <a href={`https://wa.me/1${salon.phone}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 text-sm font-medium border text-[#1A1612] hover:border-[#1A1612] transition-colors"
              style={{ borderColor: "#D4CFC9", borderRadius: "30px", fontFamily: "var(--font-dm-sans)" }}>
              {t.whatsapp}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
