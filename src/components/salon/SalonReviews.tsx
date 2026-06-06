"use client"

import { useRef, useEffect } from "react"
import type { Salon } from "@/data/salons"

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

export default function SalonReviews({ salon }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".review-card").forEach((el, i) => {
              setTimeout(() => {
                ;(el as HTMLElement).style.opacity = "1"
                ;(el as HTMLElement).style.transform = "translateX(0)"
              }, i * 120)
            })
          }
        })
      },
      { threshold: 0.15 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="reviews" className="py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto" ref={containerRef}>
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-xs font-medium tracking-widest uppercase mb-4"
          style={{ fontFamily: "var(--font-dm-sans)", color: salon.accentColor }}>
          Reviews / Reseñas
        </p>
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="font-playfair text-5xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: salon.accentColor }}>
            {salon.rating}
          </span>
          <div>
            <Stars rating={Math.round(salon.rating)} color={salon.accentColor} />
            <p className="text-sm font-light text-[#6B6560] mt-1" style={{ fontFamily: "var(--font-dm-sans)" }}>
              {salon.reviewCount} verified reviews
            </p>
          </div>
        </div>
        <h2 className="headline-md text-[#1A1612]" style={{ fontFamily: "var(--font-playfair)" }}>
          What our clients say.
        </h2>
      </div>

      {/* Review cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {salon.reviews.map((review, i) => (
          <div
            key={i}
            className="review-card p-8 bg-[#F0ECE8]"
            style={{
              opacity: 0,
              transform: "translateX(-20px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
              borderRadius: "2px",
            }}
          >
            <Stars rating={review.rating} color={salon.accentColor} />
            <blockquote className="mt-5 quote-text text-[#1A1612]">
              "{review.text}"
            </blockquote>
            <p className="mt-5 text-xs font-medium text-[#6B6560] tracking-widest uppercase"
              style={{ fontFamily: "var(--font-dm-sans)" }}>
              — {review.author}
            </p>
          </div>
        ))}
      </div>

      {/* Google review CTA */}
      <div className="mt-12 text-center">
        <p className="text-sm font-light text-[#6B6560]" style={{ fontFamily: "var(--font-dm-sans)" }}>
          Based on Google Reviews · {salon.reviewCount} total reviews
        </p>
      </div>
    </section>
  )
}
