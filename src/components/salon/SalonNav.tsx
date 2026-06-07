"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import type { Salon } from "@/data/salons"
import { useLanguage } from "@/contexts/LanguageContext"
import LanguageToggle from "./LanguageToggle"

interface Props { salon: Salon }

export default function SalonNav({ salon }: Props) {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  const navLinks = [
    { label: t.navServices, href: "#services" },
    { label: t.navGallery, href: "#gallery" },
    { label: t.navReviews, href: "#reviews" },
    { label: t.navAbout, href: "#about" },
    { label: t.navContact, href: "#contact" },
  ]

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 40)
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    handler()
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-[#FAF7F4]/95 backdrop-blur-md border-b border-[#E2DDD9]" : "bg-transparent"
      }`}
    >
      {/* Scroll progress bar */}
      <div
        className="scroll-progress"
        style={{ width: "100%", backgroundColor: salon.accentColor, transform: `scaleX(${progress})` }}
        aria-hidden
      />

      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${salon.slug}`} className="font-playfair text-lg font-bold tracking-tight" style={{ fontFamily: "var(--font-playfair)" }}>
          {salon.name}
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href} className="relative group">
              <a
                href={link.href}
                className="text-sm font-light text-[#6B6560] hover:text-[#1A1612] transition-colors duration-200 tracking-wide"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {link.label}
              </a>
              {/* Hand-drawn underline that grows from center on hover */}
              <span
                className="absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-full"
                style={{ backgroundColor: salon.accentColor }}
                aria-hidden
              />
            </li>
          ))}
        </ul>

        {/* Desktop CTA + language toggle */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageToggle accentColor={salon.accentColor} variant="nav" />
          <a
            href={`tel:${salon.phone}`}
            className="nav-call-pulse inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: salon.accentColor, fontFamily: "var(--font-dm-sans)", borderRadius: "3px" }}
          >
            {t.callNow}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-[#1A1612] transition-all duration-200 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-px bg-[#1A1612] transition-all duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-[#1A1612] transition-all duration-200 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile slide-in drawer */}
      <div
        className={`md:hidden fixed inset-0 z-30 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "rgba(26,22,18,0.4)" }}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      >
        <div
          className={`absolute top-0 right-0 bottom-0 w-[78%] max-w-sm bg-[#FAF7F4] shadow-2xl px-6 pt-24 pb-8 flex flex-col gap-6 transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-lg font-light text-[#1A1612] tracking-wide"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {link.label}
            </a>
          ))}

          <div className="mt-2">
            <LanguageToggle accentColor={salon.accentColor} variant="drawer" />
          </div>

          <a
            href={`tel:${salon.phone}`}
            className="mt-auto inline-flex items-center justify-center py-3.5 text-sm font-medium text-white"
            style={{ backgroundColor: salon.accentColor, borderRadius: "3px" }}
          >
            {t.callNow} · {salon.phoneFormatted}
          </a>
        </div>
      </div>
    </header>
  )
}
