import type { MetadataRoute } from "next"
import { salons } from "@/data/salons"

export const dynamic = "force-static"

const BASE_URL = "https://nj-salones.netlify.app"

export default function sitemap(): MetadataRoute.Sitemap {
  const salonEntries: MetadataRoute.Sitemap = salons.map((salon) => ({
    url: `${BASE_URL}/${salon.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...salonEntries,
  ]
}
