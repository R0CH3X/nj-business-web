"use client"
// Template: BOLD EDITORIAL — Juliette, Glamour By Latin
// Inspired by: LAMARA — texto enorme como elemento gráfico, fondo casi negro, foto cruda sangrada al borde
// Feeling: revista de moda underground, sin miedo al blanco

import { motion } from "framer-motion"
import Image from "next/image"
import type { Salon } from "@/data/salons"
import { getSalonImages } from "@/data/salonImages"
import { getSalonVideo, getSalonVideoPoster } from "@/data/salonVideos"
import { useLanguage, pick } from "@/contexts/LanguageContext"

const lineVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function HeroBoldEditorial({ salon }: { salon: Salon }) {
  const { t, lang } = useLanguage()
  const { hero: imgSrc } = getSalonImages(salon.slug)
  const videoSrc = getSalonVideo(salon.slug)
  const videoPoster = getSalonVideoPoster(salon.slug)

  return (
    <section className="relative min-h-screen bg-[#0A0907] overflow-hidden flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-8 md:px-14 pt-24 pb-4 z-20 relative">
        <span className="text-[#FAF7F4] text-sm font-light tracking-widest uppercase"
          style={{ fontFamily: "var(--font-dm-sans)" }}>
          {salon.city}, NJ
        </span>
        <span className="text-sm font-light tracking-widest"
          style={{ color: `color-mix(in srgb, ${salon.accentColor} 55%, white)`, fontFamily: "var(--font-dm-sans)" }}>
          ★ {salon.rating} · {salon.reviewCount} {t.reviewsLabel}
        </span>
      </div>

      {/* MASSIVE headline — text is the design */}
      <div className="relative z-10 px-8 md:px-14 mt-4 md:mt-8 flex-1 flex flex-col justify-center">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={lineVariants}
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(4rem, 13vw, 11rem)",
            fontWeight: 700,
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            color: "#FAF7F4",
          }}
        >
          {salon.name.split(" ").slice(0, 1).join(" ")}
        </motion.div>
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={lineVariants}
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(4rem, 13vw, 11rem)",
            fontWeight: 700,
            fontStyle: "italic",
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            color: salon.accentColor,
          }}
        >
          {salon.name.split(" ").slice(1).join(" ")}
        </motion.div>

        {/* Tagline under the monster headline */}
        <div className="mt-10 flex flex-col md:flex-row md:items-end gap-8">
          <div className="max-w-sm">
            <div className="w-12 h-px mb-5" style={{ backgroundColor: salon.accentColor }} />
            <p key={lang} className="lang-fade-in text-[#A09A95] text-base font-light leading-relaxed"
              style={{ fontFamily: "var(--font-dm-sans)" }}>
              {pick(lang, salon.tagline, salon.taglineEs)}
            </p>
          </div>
          <div className="flex gap-3 md:ml-auto">
            <a href={`tel:+1${salon.phone}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: salon.accentColor, borderRadius: "2px", fontFamily: "var(--font-dm-sans)" }}>
              {t.call}
            </a>
            <a href="#services"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-[#FAF7F4] border border-[#2A2520] hover:border-[#6B6560] transition-colors"
              style={{ borderRadius: "2px", fontFamily: "var(--font-dm-sans)" }}>
              {t.navServices} ↓
            </a>
          </div>
        </div>
      </div>

      {/* Video/photo bleeds to bottom-right — cropped, raw, editorial */}
      <div className="absolute bottom-0 right-0 w-[45%] md:w-[38%] h-[55%] md:h-[70%] z-0 overflow-hidden">
        {videoSrc ? (
          <>
            {/* This frame is only ~169px wide on a phone, which crops 16:9 footage
                down to a ~21% vertical sliver. The portrait photo fills it properly,
                so the video is desktop-only here. */}
            <Image
              src={imgSrc}
              alt={salon.name}
              fill
              priority
              className="md:hidden object-cover object-top"
              style={{ filter: "grayscale(20%) contrast(1.1)" }}
              sizes="45vw"
            />
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={videoPoster ?? undefined}
              className="hero-video hidden md:block absolute inset-0 w-full h-full object-cover object-center"
              style={{ filter: "grayscale(20%) contrast(1.1)" }}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          </>
        ) : (
          <Image
            src={imgSrc}
            alt={salon.name}
            fill
            priority
            className="object-cover object-top"
            style={{ filter: "grayscale(20%) contrast(1.1)" }}
            sizes="40vw"
          />
        )}
        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.4)" }} />
        {/* Gradient blend into dark background */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to right, #0A0907 0%, transparent 30%)" }} />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to top, #0A0907 0%, transparent 20%)" }} />
      </div>

      {/* Address strip at bottom */}
      <div className="relative z-20 px-8 md:px-14 pb-8 mt-8">
        <div className="h-px bg-[#1F1C18] w-full mb-5" />
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          <span className="text-xs text-[#A09A95] tracking-widest uppercase"
            style={{ fontFamily: "var(--font-dm-sans)" }}>
            {salon.address}, {salon.city} · {salon.hours}
          </span>
          {salon.instagram && (
            <span className="text-xs text-[#A09A95] tracking-widest uppercase"
              style={{ fontFamily: "var(--font-dm-sans)" }}>
              IG: @{salon.instagram}
            </span>
          )}
        </div>
      </div>
    </section>
  )
}
