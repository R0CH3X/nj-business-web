"use client"
// Template: VIBRANT ENERGY — Estilo's Beauty Salon
// Feeling: energético, cálido, accesible — fondo en acento claro, foto a todo, texto superpuesto con carácter

import { motion } from "framer-motion"
import Image from "next/image"
import type { Salon } from "@/data/salons"
import { getSalonImages } from "@/data/salonImages"
import { getSalonVideo, getSalonVideoPoster } from "@/data/salonVideos"
import { useLanguage, pick } from "@/contexts/LanguageContext"

export default function HeroVibrantEnergy({ salon }: { salon: Salon }) {
  const { t, lang } = useLanguage()
  const { hero: imgSrc } = getSalonImages(salon.slug)
  const videoSrc = getSalonVideo(salon.slug)
  const videoPoster = getSalonVideoPoster(salon.slug)

  return (
    <section className="relative min-h-screen overflow-hidden" style={{ backgroundColor: salon.accentLight }}>
      {/* Full-bleed background video/photo with strong overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
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
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0" style={{
          background: `linear-gradient(135deg, ${salon.accentColor}E5 0%, ${salon.accentColor}99 40%, transparent 75%)`
        }} />
        <div className="absolute inset-0 bg-[#1A1612]/30" />
      </div>

      {/* Content over photo */}
      <motion.div
        className="relative z-10 flex flex-col justify-end min-h-screen px-8 md:px-16 pb-16 pt-28"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-white/60" />
            <span key={lang} className="lang-fade-in text-sm font-light text-white/70 tracking-widest uppercase"
              style={{ fontFamily: "var(--font-dm-sans)" }}>
              {pick(lang, "Full Service Salon", "Salón de Servicio Completo")} · {salon.city}, NJ
            </span>
          </div>

          {/* Giant display headline — Playfair white */}
          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(3.5rem, 9vw, 7rem)",
              fontWeight: 700,
              lineHeight: 0.95,
              color: "#FFFFFF",
              letterSpacing: "-0.03em",
            }}
          >
            {salon.name}
          </h1>

          {/* Tagline */}
          <p key={lang} className="lang-fade-in mt-5 text-xl font-light text-white/80"
            style={{ fontFamily: "var(--font-dm-sans)" }}>
            {pick(lang, salon.tagline, salon.taglineEs)}
          </p>

          {/* Rating pill */}
          <div className="flex items-center gap-4 mt-8 mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm text-white text-sm font-medium"
              style={{ borderRadius: "30px", fontFamily: "var(--font-dm-sans)" }}>
              ★ {salon.rating} · {salon.reviewCount} {t.reviewsLabel}
            </span>
            <span className="text-white/50 text-xs" style={{ fontFamily: "var(--font-dm-sans)" }}>
              {salon.hours}
            </span>
          </div>

          {/* CTAs — white + transparent */}
          <div className="flex flex-wrap gap-3">
            <a href={`tel:+1${salon.phone}`}
              className="inline-flex items-center gap-2 px-7 py-4 text-sm font-semibold text-[#1A1612] transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#FFFFFF", borderRadius: "3px", fontFamily: "var(--font-dm-sans)" }}>
              {t.callNow} · {salon.phoneFormatted}
            </a>
          </div>

          {/* Address */}
          <p className="mt-10 text-xs text-white/40 tracking-widest"
            style={{ fontFamily: "var(--font-dm-sans)" }}>
            {salon.address}, {salon.city}, NJ {salon.zip}
          </p>
        </div>
      </motion.div>

      {/* Decorative vertical text on right */}
      <div className="hidden lg:flex absolute right-10 top-1/2 -translate-y-1/2 z-10 items-center gap-3"
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>
        <span className="text-xs text-white/30 tracking-widest uppercase"
          style={{ fontFamily: "var(--font-dm-sans)" }}>
          {salon.name} · Bergenline Ave
        </span>
      </div>
    </section>
  )
}
