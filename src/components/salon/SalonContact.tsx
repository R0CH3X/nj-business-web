"use client"

import { motion } from "framer-motion"
import type { Salon } from "@/data/salons"
import ContactForm from "./ContactForm"
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
              <a href={`tel:${salon.phone}`}
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
          <div className="flex flex-col sm:flex-row gap-3 mb-12">
            <a href={`tel:${salon.phone}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: salon.accentColor, borderRadius: "3px", fontFamily: "var(--font-dm-sans)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5 19.79 19.79 0 01-.07 2.87a2 2 0 011.99-2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7a2 2 0 011.72 2.03z" />
              </svg>
              {t.call}
            </a>
            <a href={`https://wa.me/${salon.phone}`}
              target="_blank" rel="noopener noreferrer"
              className="whatsapp-glow inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-white"
              style={{ backgroundColor: "#25D366", borderRadius: "3px", fontFamily: "var(--font-dm-sans)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.057 22l4.968-1.35A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
              </svg>
              {t.whatsapp}
            </a>
          </div>

          {/* Contact form */}
          <ContactForm accentColor={salon.accentColor} />
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
