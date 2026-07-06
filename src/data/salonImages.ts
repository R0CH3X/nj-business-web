// Per-salon image assignment.
//
// 11 of 12 salons use real local photos in public/images/[slug]/.
// Each salon has img-01 through img-08:
//   img-01 → hero
//   img-02 → about
//   img-03 to img-08 → gallery (6 images)
//
// Glamour By Latin falls back to the Unsplash rotation pool (no real photos provided).

const GALLERY_LABELS_EN = ["The Space", "Featured Work", "Detail Shot", "Behind the Chair", "Finished Look", "In Progress"]
const GALLERY_LABELS_ES = ["El Espacio", "Trabajo Destacado", "Detalle", "Tras Bambalinas", "Look Terminado", "En Proceso"]

// Salons with real local photos (min quality threshold ~30KB per image).
// fina-salon and amarilys-beauty-studio are excluded — their only source
// photos are 8-16KB Instagram thumbnails that would appear blurry at gallery
// size. They fall through to the Unsplash rotation pool below.
const LOCAL_IMAGE_SALONS = new Set([
  "juliette-beauty-salon",
  "nikki-maar-salon",
  "brigith-nails-spa",
  "divino-nino-beauty-nail-salon",
  "vip-beauty-salon",
  "henry-castel-vip-beauty-salon",
  "estilos-beauty-salon",
  "salon-salvys",
  "glamour-by-marisol-salon",
])

// ─── Unsplash fallback (glamour-by-latin only) ────────────────────────────────

// Plumbing / home-services images for Pinnacle Plumbing demo
const PLUMBING_POOL = [
  "1558618666-fcd25c85cd64", // plumber at work
  "1504307651254-35680f356dfd", // copper pipes close-up
  "1581578731548-c64695cc6952", // hands on pipes/tools
  "1600585154340-be6161a56a0c", // modern bathroom / clean plumbing
  "1516939804562-eb1eb7efd3c2", // running faucet / water
  "1534353473418-4cfa0a56a923", // toolbox / professional tools
  "1564540574859-0dfb63985953", // construction worker focus
  "1609743522653-52354461eb27", // drain / sewer work
] as const

const POOL = [
  "1487412947147-5cebf100ffc2",
  "1522337360788-8b13dee7a37e",
  "1562322140-8baeececf3df",
  "1595476108010-b4d1f102b1b1",
  "1519345182560-3f2917c472ef",
  "1492106087820-71f1a00d2b11",
  "1604654894610-df63bc536371",
  "1560066984-138dadb4c035",
  "1521590832167-7bcbfaa6381f",
  "1599351431202-1e0f0137899a",
  "1633681926022-84c23e8cb2d6",
  "1605497788044-5a32c7078486",
  "1560869713-7d0a29430803",
  "1522335789203-aabd1fc54bc9",
  "1487412912498-0447578fcca8",
  "1519699047748-de8e457a634e",
  "1571875257727-256c39da42af",
  "1580618672591-eb180b1a973f",
] as const

const SLUG_ORDER = [
  "juliette-beauty-salon",
  "nikki-maar-salon",
  "brigith-nails-spa",
  "fina-salon",
  "divino-nino-beauty-nail-salon",
  "vip-beauty-salon",
  "henry-castel-vip-beauty-salon",
  "estilos-beauty-salon",
  "salon-salvys",
  "glamour-by-latin",
  "glamour-by-marisol-salon",
  "amarilys-beauty-studio",
  "pinnacle-plumbing-demo",
] as const

const unsplashUrl = (id: string, w: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`

// ─── Public interface ─────────────────────────────────────────────────────────

export interface SalonImageSet {
  hero: string
  about: string
  gallery: { src: string; label: string; labelEs: string }[]
}

export function getSalonImages(slug: string): SalonImageSet {
  // Plumbing demo — use dedicated plumbing Unsplash pool
  if (slug === "pinnacle-plumbing-demo") {
    return {
      hero:  unsplashUrl(PLUMBING_POOL[0], 1400),
      about: unsplashUrl(PLUMBING_POOL[1], 700),
      gallery: Array.from({ length: 6 }, (_, i) => ({
        src: unsplashUrl(PLUMBING_POOL[(i + 2) % PLUMBING_POOL.length], 600),
        label: GALLERY_LABELS_EN[i],
        labelEs: GALLERY_LABELS_ES[i],
      })),
    }
  }

  // Use real local photos when available
  if (LOCAL_IMAGE_SALONS.has(slug)) {
    const base = `/images/${slug}`
    return {
      hero: `${base}/img-01.jpg`,
      about: `${base}/img-02.jpg`,
      gallery: Array.from({ length: 6 }, (_, i) => ({
        src: `${base}/img-${String(i + 3).padStart(2, "0")}.jpg`,
        label: GALLERY_LABELS_EN[i],
        labelEs: GALLERY_LABELS_ES[i],
      })),
    }
  }

  // Unsplash rotation fallback for salons without local photos
  const index = Math.max(0, SLUG_ORDER.indexOf(slug as (typeof SLUG_ORDER)[number]))
  const STEP = 7
  const offset = (index * STEP) % POOL.length
  const slice = Array.from({ length: 8 }, (_, k) => POOL[(offset + k) % POOL.length])

  return {
    hero: unsplashUrl(slice[0], 1400),
    about: unsplashUrl(slice[1], 700),
    gallery: slice.slice(2, 8).map((id, i) => ({
      src: unsplashUrl(id, 600),
      label: GALLERY_LABELS_EN[i],
      labelEs: GALLERY_LABELS_ES[i],
    })),
  }
}
