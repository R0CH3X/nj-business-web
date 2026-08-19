// Per-salon hero background video mapping.
// Each salon has a local MP4 in /public/videos/[slug].mp4
// downloaded from Mixkit free stock (720p preview quality).

const SALON_VIDEOS: Record<string, string> = {
  "juliette-beauty-salon":            "/videos/juliette-beauty-salon.mp4",
  "nikki-maar-salon":                 "/videos/nikki-maar-salon.mp4",
  "brigith-nails-spa":                "/videos/brigith-nails-spa.mp4",
  "fina-salon":                       "/videos/fina-salon.mp4",
  "divino-nino-beauty-nail-salon":    "/videos/divino-nino-beauty-nail-salon.mp4",
  "vip-beauty-salon":                 "/videos/vip-beauty-salon.mp4",
  "henry-castel-vip-beauty-salon":    "/videos/henry-castel-vip-beauty-salon.mp4",
  "estilos-beauty-salon":             "/videos/estilos-beauty-salon.mp4",
  "salon-salvys":                     "/videos/salon-salvys.mp4",
  // "glamour-by-latin" removed: 16:9 footage cropped badly in the narrow
  // bold-editorial frame — page falls back to its curated hero photo.
  "glamour-by-marisol-salon":         "/videos/glamour-by-marisol-salon.mp4",
  "amarilys-beauty-studio":           "/videos/amarilys-beauty-studio.mp4",
  "pinnacle-plumbing-demo":           "/videos/pinnacle-plumbing-demo.mp4",
}

/** Returns the local video path for a salon's hero, or null if not available. */
export function getSalonVideo(slug: string): string | null {
  return SALON_VIDEOS[slug] ?? null
}

/**
 * Poster frame grabbed from the video itself (ffmpeg, t=0.5s), so the still
 * and the moving footage share one framing. Using the salon's portrait photo
 * here instead made the hero visibly jump when the video took over: the photos
 * are ~0.8 aspect, the footage is 1.78.
 */
export function getSalonVideoPoster(slug: string): string | null {
  return SALON_VIDEOS[slug] ? `/videos/posters/${slug}.jpg` : null
}
