"use client"

import { motion } from "framer-motion"
import type { Salon } from "@/data/salons"
import { useLanguage } from "@/contexts/LanguageContext"

interface Props { salon: Salon }

function Stars({ rating, color }: { rating: number; color: string }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 12 12" fill={i < rating ? color : "#E2DDD9"}>
          <path d="M6 0l1.5 4.5H12l-3.75 2.7L9.75 12 6 9.3 2.25 12l1.5-4.8L0 4.5h4.5z" />
        </svg>
      ))}
    </div>
  )
}

const headerVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function SalonReviews({ salon }: Props) {
  const { t } = useLanguage()

  return (
    <section id="reviews" className="py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={headerVariants}
      >
        <p className="text-xs font-medium tracking-widest uppercase mb-4"
          style={{ fontFamily: "var(--font-dm-sans)", color: salon.accentColor }}>
          {t.reviewsEyebrow}
        </p>
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="font-playfair text-5xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: salon.accentColor }}>
            {salon.rating}
          </span>
          <div>
            <Stars rating={Math.round(salon.rating)} color={salon.accentColor} />
            <p className="text-sm font-light text-[#6B6560] mt-1" style={{ fontFamily: "var(--font-dm-sans)" }}>
              {salon.reviewCount} {t.verifiedReviews}
            </p>
          </div>
        </div>
        <h2 className="headline-md text-[#1A1612]" style={{ fontFamily: "var(--font-playfair)" }}>
          {t.reviewsHeadline}
        </h2>
      </motion.div>

      {/* Review cards — horizontal snap-scroll carousel on mobile, grid on desktop */}
      <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 pb-2 md:pb-0 scrollbar-hide">
        {salon.reviews.map((review, i) => (
          <motion.div
            key={i}
            className="review-card p-8 bg-[#F0ECE8] flex-none w-[82vw] sm:w-[60vw] md:w-auto snap-start"
            style={{ borderRadius: "2px" }}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            whileHover={{ y: -4, boxShadow: "0 18px 40px -16px rgba(26,22,18,0.18)" }}
            transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
          >
            <Stars rating={review.rating} color={salon.accentColor} />
            <blockquote className="mt-5 quote-text text-[#1A1612]">
              &ldquo;{review.text}&rdquo;
            </blockquote>
            <p className="mt-5 text-xs font-medium text-[#6B6560] tracking-widest uppercase"
              style={{ fontFamily: "var(--font-dm-sans)" }}>
              — {review.author}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Google review CTA */}
      <div className="mt-12 text-center">
        <p className="text-sm font-light text-[#6B6560]" style={{ fontFamily: "var(--font-dm-sans)" }}>
          {t.basedOnGoogle} · {salon.reviewCount} {t.reviewsLabel}
        </p>
      </div>
    </section>
  )
}
