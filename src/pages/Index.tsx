import { Link } from "react-router-dom";

const businesses = [
  // Hair Salons — West New York
  {
    slug: "juliette-beauty-salon",
    name: "Juliette Beauty Salon",
    category: "Hair Salon",
    address: "5904 Park Ave, West New York, NJ",
    rating: 4.8,
    reviews: 157,
    color: "#e11d48",
    emoji: "💇‍♀️",
  },
  {
    slug: "nikki-maar-salon",
    name: "NIKKI MAAR SALON",
    category: "Full-Service Hair Salon",
    address: "6011 Park Ave, West New York, NJ",
    rating: 4.7,
    reviews: 68,
    color: "#7c3aed",
    emoji: "✂️",
  },
  {
    slug: "henry-castel-vip-beauty-salon",
    name: "Henry Castel VIP Beauty Salon",
    category: "Color & Treatments",
    address: "126 61st St, West New York, NJ",
    rating: 4.8,
    reviews: 21,
    color: "#b45309",
    emoji: "⚡",
  },
  {
    slug: "estilos-beauty-salon",
    name: "Estilo's Beauty Salon",
    category: "Hair & Nails",
    address: "6014 Bergenline Ave, West New York, NJ",
    rating: 4.2,
    reviews: 39,
    color: "#ea580c",
    emoji: "🌟",
  },
  // Nail Salons — West New York
  {
    slug: "brigith-nails-spa",
    name: "Brigith Nails & Spa",
    category: "Nail Salon & Spa",
    address: "5408 Park Ave, West New York, NJ",
    rating: 4.8,
    reviews: 12,
    color: "#db2777",
    emoji: "💅",
  },
  // Guttenberg
  {
    slug: "fina-salon",
    name: "Fina Salon",
    category: "Hair Salon",
    address: "201 71st St, Guttenberg, NJ",
    rating: 5.0,
    reviews: 11,
    color: "#334155",
    emoji: "🎨",
  },
  {
    slug: "vip-beauty-salon",
    name: "VIP Beauty Salon",
    category: "Unisex Hair Salon",
    address: "7100 Park Ave, Guttenberg, NJ",
    rating: 4.3,
    reviews: 112,
    color: "#7e22ce",
    emoji: "👑",
  },
  // North Bergen
  {
    slug: "divino-nino-beauty-nail-salon",
    name: "Divino Niño Beauty & Nail Salon",
    category: "Beauty & Nails",
    address: "7209 Broadway, North Bergen, NJ",
    rating: 4.8,
    reviews: 22,
    color: "#0f766e",
    emoji: "💆",
  },
  {
    slug: "glamour-by-latin",
    name: "Glamour By Latin",
    category: "Keratin & Color",
    address: "8614 JFK Blvd, North Bergen, NJ",
    rating: 4.6,
    reviews: 49,
    color: "#be123c",
    emoji: "✨",
  },
  {
    slug: "glamour-by-marisol-salon",
    name: "Glamour By Marisol Salon",
    category: "Color Correction Specialist",
    address: "7711 Broadway, North Bergen, NJ",
    rating: 5.0,
    reviews: 13,
    color: "#a21caf",
    emoji: "💫",
  },
  // Union City
  {
    slug: "salon-salvys",
    name: "Salon Salvys",
    category: "Full-Service Salon",
    address: "4807 Broadway, Union City, NJ",
    rating: 4.7,
    reviews: 31,
    color: "#1d4ed8",
    emoji: "🏠",
  },
  {
    slug: "amarilys-beauty-studio",
    name: "Amarilys Beauty Studio",
    category: "Nail Specialist",
    address: "407 45th St, Union City, NJ",
    rating: 4.7,
    reviews: 14,
    color: "#e11d48",
    emoji: "🌸",
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-bold text-gray-900">NJ Business Web</span>
          <a
            href="https://njbusinessweb.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-gray-900 transition"
          >
            njbusinessweb.com ↗
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gray-900 text-white py-16 text-center px-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
          NJ Business Web · Professional Websites
        </p>
        <h1 className="text-3xl md:text-5xl font-bold mb-3">
          Hudson County Beauty Directory
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          {businesses.length} professional bilingual websites for local salons and beauty studios in NJ.
        </p>
      </section>

      {/* Business Grid */}
      <main className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {businesses.map((biz) => (
            <Link
              key={biz.slug}
              to={`/${biz.slug}`}
              className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all"
            >
              <div className="h-1.5" style={{ backgroundColor: biz.color }} />
              <div className="p-5">
                <div className="text-3xl mb-2">{biz.emoji}</div>
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: biz.color }}
                >
                  {biz.category}
                </span>
                <h2 className="text-sm font-bold text-gray-900 mt-1 mb-1 group-hover:underline leading-tight">
                  {biz.name}
                </h2>
                <p className="text-xs text-gray-500 mb-2">{biz.address}</p>
                <div className="flex items-center gap-1 text-xs">
                  <span className="text-yellow-400">★</span>
                  <span className="font-semibold text-gray-800">{biz.rating}</span>
                  <span className="text-gray-400">({biz.reviews})</span>
                </div>
                <div
                  className="mt-3 text-xs font-semibold text-white text-center py-1.5 rounded-full"
                  style={{ backgroundColor: biz.color }}
                >
                  View Site →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="text-center text-sm text-gray-400 py-8 border-t">
        © {new Date().getFullYear()} NJ Business Web · North Bergen / Jersey City, NJ
      </footer>
    </div>
  );
}
