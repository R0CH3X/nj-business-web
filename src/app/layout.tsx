import type { Metadata } from "next"
import { Playfair_Display, DM_Sans, Cormorant_Garamond } from "next/font/google"
import { LanguageProvider } from "@/contexts/LanguageContext"
import "./globals.css"

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
})

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
})

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "NJ Business Web",
  description: "Beauty salons in West New York, Guttenberg, North Bergen & Union City, NJ",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${cormorant.variable} antialiased`}>
      <body className="min-h-full bg-[#FAF7F4] text-[#1A1612] font-dm-sans">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
