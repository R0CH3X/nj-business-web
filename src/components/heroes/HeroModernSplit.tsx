"use client"
// Template: MODERN SPLIT — Fina Salon, Divino Niño
// Feeling: arquitectónico, geométrico, 50/50 perfecto, panel de color sólido izquierda, foto derecha

import { motion } from "framer-motion"
import Image from "next/image"
import type { Salon } from "@/data/salons"
import { getSalonImages } from "@/data/salonImages"
import { getSalonVideo, getSalonVideoPoster } from "@/data/salonVideos"
import { useLanguage, pick } from "@/contexts/LanguageContext"

export default function HeroModernSplit({ salon }: { salon: Salon }) {
  const { t, lang } = useLanguage()
  const { hero: imgSrc } = getSalonImages(salon.slug)
  const videoSrc = getSalonVideo(salon.slug)
  const videoPoster = getSalonVideoPoster(salon.slug)

  return (
    <section className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* LEFT panel: accent-light bg or white with strong accent typography */}
      <motion.div
        className="relative flex flex-col justify-between px-10 md:px-14 pt-24 md:pt-0 pb-12 md:py-0 md:justify-center md:w-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ backgroundColor: salon.accentLight }}
      >
        {/* Top nav placeholder area */}
        <div className="md:absolute md:top-10 md:left-14 mb-8 md:mb-0">
          <span className="text-xs font-medium tracking-[0.25em] uppercase"
            style={{ color: salon.accentColor, fontFamily: "var(--font-dm-sans)" }}>
            {salon.city}, NJ
          </span>
        </div>

        <div>
          {/* Name stacked vertically */}
          <div className="mb-8">
            {salon.name.split(" ").map((word, i) => (
              <p key={i}
                className="leading-none"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                  fontWeight: i % 2 === 0 ? 700 : 400,
                  fontStyle: i % 2 !== 0 ? "italic" : "normal",
                  color: "#1A1612",
                  letterSpacing: "-0.03em",
                }}>
                {word}
              </p>
            ))}
          </div>

          {/* Tagline */}
          <p key={lang} className="lang-fade-in text-lg font-light text-[#6B6560] mb-10 leading-snug max-w-xs"
            style={{ fontFamily: "var(--font-dm-sans)" }}>
            {pick(lang, salon.tagline, salon.taglineEs)}
          </p>

          {/* Stats row */}
          <div className="flex gap-8 mb-10">
            <div>
              <p className="text-3xl font-bold" style={{ color: salon.accentColor, fontFamily: "var(--font-playfair)" }}>
                {salon.rating}
              </p>
              <p className="text-xs text-[#6B6560] mt-1" style={{ fontFamily: "var(--font-dm-sans)" }}>
                {t.statRating}
              </p>
            </div>
            <div className="w-px bg-[#E2DDD9]" />
            <div>
              <p className="text-3xl font-bold text-[#1A1612]" style={{ fontFamily: "var(--font-playfair)" }}>
                {salon.reviewCount}
              </p>
              <p className="text-xs text-[#6B6560] mt-1" style={{ fontFamily: "var(--font-dm-sans)" }}>
                {t.statReviews}
              </p>
            </div>
            <div className="w-px bg-[#E2DDD9]" />
            <div>
              <p className="text-3xl font-bold text-[#1A1612]" style={{ fontFamily: "var(--font-playfair)" }}>
                {salon.services.length}
              </p>
              <p className="text-xs text-[#6B6560] mt-1" style={{ fontFamily: "var(--font-dm-sans)" }}>
                {t.statServices}
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a href={`tel:+1${salon.phone}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: salon.accentColor, borderRadius: "3px", fontFamily: "var(--font-dm-sans)" }}>
              {salon.phoneFormatted}
            </a>
            <a href="#services"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-[#1A1612] border border-[#1A1612]/20 hover:border-[#1A1612] transition-colors"
              style={{ borderRadius: "3px", fontFamily: "var(--font-dm-sans)" }}>
              {t.explore} ↓
            </a>
          </div>
        </div>

        {/* Address at bottom */}
        <p className="text-xs text-[#6B6560] mt-10 md:absolute md:bottom-10 md:left-14"
          style={{ fontFamily: "var(--font-dm-sans)" }}>
          {salon.address} · {salon.hours}
        </p>
      </motion.div>

      {/* RIGHT: Full-bleed video/photo, zero padding */}
      <motion.div
        className="relative min-h-[50vh] md:min-h-0 md:flex-1 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {videoSrc ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={videoPoster ?? undefined}
            className="hero-video absolute inset-0 w-full h-full object-cover object-center"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={imgSrc}
            alt={salon.name}
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
        {/* Dark overlay for readability */}
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.4)" }} />
        {/* Rating badge on video */}
        <div className="absolute top-8 right-8 flex items-center gap-2 px-4 py-2 backdrop-blur-md z-10"
          style={{ backgroundColor: "rgba(10,9,7,0.55)", borderRadius: "3px" }}>
          <span className="text-white text-sm font-medium" style={{ fontFamily: "var(--font-dm-sans)" }}>
            ★ {salon.rating}
          </span>
          <span className="text-white/60 text-xs" style={{ fontFamily: "var(--font-dm-sans)" }}>
            Google
          </span>
        </div>
      </motion.div>
    </section>
  )
}
