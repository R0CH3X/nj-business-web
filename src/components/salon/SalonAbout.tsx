"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import type { Salon } from "@/data/salons"
import { getSalonImages } from "@/data/salonImages"
import { useLanguage, pick } from "@/contexts/LanguageContext"

interface Props { salon: Salon }

export default function SalonAbout({ salon }: Props) {
  const { t, lang } = useLanguage()
  const { about: imgSrc } = getSalonImages(salon.slug)

  return (
    <section id="about" className="py-24 md:py-32 bg-[#1A1612]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Image */}
          <motion.div
            className="relative h-80 md:h-[520px] overflow-hidden"
            style={{ borderRadius: "2px" }}
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <Image
              src={imgSrc}
              alt={`About ${salon.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Accent color overlay strip */}
            <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: salon.accentColor }} />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 }}
          >
            <p className="text-xs font-medium tracking-widest uppercase mb-6"
              style={{ fontFamily: "var(--font-dm-sans)", color: salon.accentColor }}>
              {t.aboutEyebrow}
            </p>

            <h2 className="headline-lg text-[#FAF7F4] mb-8" style={{ fontFamily: "var(--font-playfair)" }}>
              {salon.name}
            </h2>

            <p key={lang} className="lang-fade-in text-base font-light text-[#A09A95] leading-relaxed mb-10"
              style={{ fontFamily: "var(--font-dm-sans)" }}>
              {t.aboutIntro(salon.city, salon.state)}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-10">
              {salon.badges.map((badge) => (
                <span key={badge}
                  className="text-xs font-medium px-3 py-1.5 border"
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    borderColor: "#2A2520",
                    color: "#A09A95",
                    borderRadius: "2px",
                  }}>
                  {badge}
                </span>
              ))}
            </div>

            {/* Team */}
            {salon.team && salon.team.length > 0 && (
              <div className="border-t border-[#2A2520] pt-8">
                <p className="text-xs font-medium tracking-widest uppercase text-[#6B6560] mb-4"
                  style={{ fontFamily: "var(--font-dm-sans)" }}>
                  {t.ourTeam}
                </p>
                <div className="flex flex-col gap-3">
                  {salon.team.map((member) => (
                    <div key={member.name} className="flex items-center justify-between">
                      <span className="text-[#FAF7F4] font-light" style={{ fontFamily: "var(--font-dm-sans)" }}>
                        {member.name}
                      </span>
                      <span className="text-sm font-light text-[#6B6560] italic"
                        style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem" }}>
                        {pick(lang, member.role, member.roleEs)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Instagram */}
            {salon.instagram && (
              <a
                href={`https://instagram.com/${salon.instagram}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 text-sm font-light text-[#A09A95] hover:text-[#FAF7F4] transition-colors"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                @{salon.instagram}
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
