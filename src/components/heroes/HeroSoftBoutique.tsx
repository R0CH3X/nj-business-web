"use client"
// Template: SOFT BOUTIQUE — Brigith Nails, Amarilys, Salon Salvys
// Feeling: boutique local con corazón — arco editorial, Cormorant italic grande, cream cálido, íntimo

import { motion } from "framer-motion"
import Image from "next/image"
import type { Salon } from "@/data/salons"
import { getSalonImages } from "@/data/salonImages"
import { getSalonVideo } from "@/data/salonVideos"
import { useLanguage, pick } from "@/contexts/LanguageContext"

export default function HeroSoftBoutique({ salon }: { salon: Salon }) {
  const { t, lang } = useLanguage()
  const { hero: imgSrc } = getSalonImages(salon.slug)
  const videoSrc = getSalonVideo(salon.slug)

  return (
    <section className="min-h-screen bg-[#FDFAF7] flex flex-col md:flex-row overflow-hidden">
      {/* LEFT: Centered vertical text + branding */}
      <motion.div
        className="relative z-10 flex flex-col justify-between px-10 md:px-16 pt-28 pb-14 md:w-[48%] flex-shrink-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Top: Salon name small */}
        <div>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: salon.accentColor, opacity: 0.3 }} />
            <span className="text-xs font-medium tracking-[0.25em] uppercase text-[#6B6560]"
              style={{ fontFamily: "var(--font-dm-sans)" }}>
              {salon.name}
            </span>
          </div>

          {/* Giant italic Cormorant headline — the centerpiece */}
          <h1
            key={lang}
            className="lang-fade-in"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(3.5rem, 8vw, 6.5rem)",
              fontWeight: 400,
              fontStyle: "italic",
              lineHeight: 1.0,
              color: "#1A1612",
              letterSpacing: "-0.02em",
            }}
          >
            {pick(lang, salon.tagline, salon.taglineEs)}
          </h1>

          {/* Accent underline decoration */}
          <div className="flex items-center gap-3 mt-6">
            <div className="h-0.5 w-16" style={{ backgroundColor: salon.accentColor }} />
          </div>
        </div>

        {/* Middle: rating + badges */}
        <div className="my-10">
          <div className="inline-flex items-center gap-2 px-4 py-2.5 mb-6"
            style={{ backgroundColor: salon.accentLight, borderRadius: "40px" }}>
            <svg width="13" height="13" viewBox="0 0 12 12" fill={salon.accentColor}>
              <path d="M6 0l1.5 4.5H12l-3.75 2.7L9.75 12 6 9.3 2.25 12l1.5-4.8L0 4.5h4.5z" />
            </svg>
            <span className="text-sm font-medium" style={{ color: salon.accentColor, fontFamily: "var(--font-dm-sans)" }}>
              {salon.rating} — {salon.reviewCount} {t.reviewsLabel}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {salon.badges.map((b) => (
              <span key={b} className="text-xs px-3 py-1 font-light border border-[#E8E3DE] text-[#6B6560]"
                style={{ fontFamily: "var(--font-dm-sans)", borderRadius: "20px" }}>
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom: CTAs + address */}
        <div>
          <div className="flex flex-wrap gap-3 mb-8">
            <a href={`tel:+1${salon.phone}`}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: salon.accentColor, borderRadius: "30px", fontFamily: "var(--font-dm-sans)" }}>
              {t.callUs} · {salon.phoneFormatted}
            </a>
            <a href="#services"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-light border border-[#E2DDD9] text-[#6B6560] hover:border-[#1A1612] transition-colors"
              style={{ borderRadius: "30px", fontFamily: "var(--font-dm-sans)" }}>
              {t.viewServices}
            </a>
          </div>
          <p className="text-xs text-[#6B6560] font-light"
            style={{ fontFamily: "var(--font-dm-sans)" }}>
            {salon.address}, {salon.city}, NJ · {salon.hours}
          </p>
        </div>
      </motion.div>

      {/* RIGHT: Arched editorial photo */}
      <div className="relative flex-1 min-h-[50vh] md:min-h-0">
        <motion.div
          className="absolute inset-4 md:inset-8"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          style={{
            borderRadius: "200px 200px 16px 16px", // Arch top
            overflow: "hidden",
          }}
        >
          {videoSrc ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="hero-video absolute inset-0 w-full h-full object-cover object-top"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={imgSrc}
              alt={salon.name}
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 52vw"
            />
          )}
          {/* Dark overlay for readability */}
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.4)" }} />
          {/* Subtle accent tint at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32"
            style={{ background: `linear-gradient(to top, ${salon.accentColor}30, transparent)` }} />
        </motion.div>
      </div>
    </section>
  )
}
