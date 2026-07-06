"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import type { Salon } from "@/data/salons"
import { getSalonImages } from "@/data/salonImages"
import { useLanguage, pick } from "@/contexts/LanguageContext"

interface Props { salon: Salon }

const headerVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
}

const tileVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function SalonGallery({ salon }: Props) {
  const { t, lang } = useLanguage()
  const [active, setActive] = useState<number | null>(null)
  const { gallery: images } = getSalonImages(salon.slug)

  // Asymmetric heights for editorial feel — spans must sum to exactly 9 (3 cols × 3 rows)
  // or CSS Grid's sparse auto-placement leaves an empty cell. [2,2,1,2,1,1] sums to 9 and
  // tiles the 3×3 grid with zero gaps (verified against the auto-placement algorithm).
  const heights = ["row-span-2", "row-span-2", "row-span-1", "row-span-2", "row-span-1", "row-span-1"]

  return (
    <section id="gallery" className="py-24 md:py-32 bg-[#F0ECE8]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          className="flex items-end justify-between mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={headerVariants}
        >
          <div>
            <p className="text-xs font-medium tracking-widest uppercase mb-3"
              style={{ fontFamily: "var(--font-dm-sans)", color: salon.accentColor }}>
              {t.galleryEyebrow}
            </p>
            <h2 className="headline-lg text-[#1A1612]" style={{ fontFamily: "var(--font-playfair)" }}>
              {t.galleryHeadline}
            </h2>
          </div>
          <p className="hidden md:block text-sm font-light text-[#6B6560] max-w-xs text-right"
            style={{ fontFamily: "var(--font-dm-sans)" }}>
            {t.galleryCaption(salon.city)}
          </p>
        </motion.div>

        {/* Grid — desktop asymmetric, mobile scroll */}
        <div className="hidden md:grid grid-cols-3 grid-rows-3 gap-3 h-[600px]">
          {images.map((img, i) => {
            const label = pick(lang, img.label, img.labelEs)
            return (
              <motion.div
                key={i}
                className={`relative overflow-hidden cursor-pointer ${heights[i]}`}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={tileVariants}
              >
                <Image
                  src={img.src}
                  alt={`${salon.name} — ${label}`}
                  fill
                  className="object-cover transition-transform duration-500"
                  style={{ transform: active === i ? "scale(1.05)" : "scale(1)" }}
                  sizes="(max-width: 1280px) 33vw, 400px"
                />
                <div
                  className="absolute inset-0 flex items-end p-4 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(to top, ${salon.accentColor}CC, transparent)`,
                    opacity: active === i ? 1 : 0,
                  }}
                >
                  <span className="text-white text-sm font-light" style={{ fontFamily: "var(--font-dm-sans)" }}>
                    {label}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Mobile — horizontal scroll */}
        <div className="md:hidden flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory -mx-6 px-6">
          {images.map((img, i) => {
            const label = pick(lang, img.label, img.labelEs)
            return (
              <div key={i} className="flex-none w-72 h-80 relative overflow-hidden snap-start">
                <Image
                  src={img.src}
                  alt={`${salon.name} — ${label}`}
                  fill
                  className="object-cover"
                  sizes="288px"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3"
                  style={{ background: `linear-gradient(to top, ${salon.accentColor}BB, transparent)` }}>
                  <span className="text-white text-sm" style={{ fontFamily: "var(--font-dm-sans)" }}>{label}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
