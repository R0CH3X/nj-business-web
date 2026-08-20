"use client"

import { motion } from "framer-motion"
import type { Salon } from "@/data/salons"
import { useLanguage } from "@/contexts/LanguageContext"

interface Props { salon: Salon }

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function SalonContact({ salon }: Props) {
  const { t } = useLanguage()
  const mapsQuery = encodeURIComponent(`${salon.address}, ${salon.city}, ${salon.state} ${salon.zip}`)
  const mapsEmbed = `https://maps.google.com/maps?q=${mapsQuery}&output=embed`

  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 md:gap-24">
        {/* Left — info + form */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <p className="text-xs font-medium tracking-widest uppercase mb-4"
            style={{ fontFamily: "var(--font-dm-sans)", color: salon.accentColor }}>
            {t.contactEyebrow}
          </p>
          <h2 className="headline-lg text-[#1A1612] mb-10" style={{ fontFamily: "var(--font-playfair)" }}>
            {t.contactHeadline}
          </h2>

          {/* Info blocks */}
          <div className="space-y-6 mb-12">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-[#6B6560] mb-1"
                style={{ fontFamily: "var(--font-dm-sans)" }}>{t.addressLabel}</p>
              <p className="text-base font-light text-[#1A1612]" style={{ fontFamily: "var(--font-dm-sans)" }}>
                {salon.address}<br />{salon.city}, {salon.state} {salon.zip}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-[#6B6560] mb-1"
                style={{ fontFamily: "var(--font-dm-sans)" }}>{t.phoneLabel}</p>
              <a href={`tel:+1${salon.phone}`}
                className="text-base font-light text-[#1A1612] hover:underline"
                style={{ fontFamily: "var(--font-dm-sans)", textDecorationColor: salon.accentColor }}>
                {salon.phoneFormatted}
              </a>
            </div>
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-[#6B6560] mb-1"
                style={{ fontFamily: "var(--font-dm-sans)" }}>{t.hoursLabel}</p>
              <p className="text-base font-light text-[#1A1612]" style={{ fontFamily: "var(--font-dm-sans)" }}>
                {salon.hours}
              </p>
            </div>
          </div>

          {/* Contact buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={`tel:+1${salon.phone}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: salon.accentColor, borderRadius: "3px", fontFamily: "var(--font-dm-sans)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5 19.79 19.79 0 01-.07 2.87a2 2 0 011.99-2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7a2 2 0 011.72 2.03z" />
              </svg>
              {t.call}
            </a>
          </div>
        </motion.div>

        {/* Right — map */}
        <motion.div
          className="flex flex-col"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ delay: 0.1 }}
        >
          <div className="relative flex-1 min-h-64 md:min-h-0 overflow-hidden" style={{ borderRadius: "2px" }}>
            <iframe
              src={mapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map to ${salon.name}`}
            />
          </div>
          <a
            href={`https://maps.google.com/?q=${mapsQuery}`}
            target="_blank" rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-light text-[#6B6560] hover:text-[#1A1612] transition-colors"
            style={{ fontFamily: "var(--font-dm-sans)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {t.getDirections}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
