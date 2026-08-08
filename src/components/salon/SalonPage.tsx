import { useState } from "react";
import { SalonData, Lang } from "@/types/salon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SalonPageProps {
  data: SalonData;
}

function Stars({ count }: { count: number }) {
  return (
    <span className="text-yellow-400 text-lg">
      {"★".repeat(Math.floor(count))}
      {count % 1 >= 0.5 ? "½" : ""}
    </span>
  );
}

export default function SalonPage({ data }: SalonPageProps) {
  const [lang, setLang] = useState<Lang>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const t = (text: { en: string; es: string }) => text[lang];

  const nav = [
    { href: "#services", en: "Services", es: "Servicios" },
    { href: "#gallery", en: "Gallery", es: "Galería" },
    { href: "#reviews", en: "Reviews", es: "Reseñas" },
    { href: "#about", en: "About", es: "Nosotros" },
    { href: "#contact", en: "Contact", es: "Contacto" },
    { href: "#faq", en: "FAQ", es: "FAQ" },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <>
      {/* SEO Meta */}
      <title>{data.seo.title}</title>

      {/* ─── NAVBAR ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href={`/${data.slug}`} className="font-bold text-xl tracking-tight text-gray-900">
            {data.name}
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                {lang === "en" ? item.en : item.es}
              </a>
            ))}
            <button
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              className="text-sm border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-50 transition"
            >
              {lang === "en" ? "🇪🇸 ES" : "🇺🇸 EN"}
            </button>
            <a
              href={`tel:${data.phone}`}
              className="text-sm font-semibold text-white px-4 py-2 rounded-full transition"
              style={{ backgroundColor: data.theme.accent }}
            >
              📞 {lang === "en" ? "Call Now" : "Llamar"}
            </a>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              className="text-xs border border-gray-300 rounded-full px-2 py-1"
            >
              {lang === "en" ? "ES" : "EN"}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-gray-700">
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-3">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-base text-gray-700 hover:text-gray-900 py-1 border-b border-gray-100"
              >
                {lang === "en" ? item.en : item.es}
              </a>
            ))}
            <a
              href={`tel:${data.phone}`}
              className="text-base font-semibold text-white text-center py-2 rounded-full mt-2"
              style={{ backgroundColor: data.theme.accent }}
            >
              📞 {lang === "en" ? "Call Now" : "Llamar Ahora"}
            </a>
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center bg-gray-900 pt-16"
        style={{
          backgroundImage: `url(${data.gallery[0]?.url || "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${data.theme.heroGradient}`} />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {data.badges.map((badge) => (
              <span
                key={badge}
                className="text-xs font-medium px-3 py-1 rounded-full bg-white/20 text-white border border-white/30"
              >
                {badge}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            {data.name}
          </h1>
          <p className="text-xl md:text-3xl text-white/90 font-light italic mb-4">
            {t(data.tagline)}
          </p>
          <p className="text-base md:text-lg text-white/75 mb-3 max-w-2xl mx-auto">
            {t(data.heroSubtitle)}
          </p>

          {/* Rating */}
          <div className="flex justify-center items-center gap-2 mb-8">
            <Stars count={data.rating} />
            <span className="text-white/90 font-semibold">{data.rating}</span>
            <span className="text-white/70">({data.reviewCount} {lang === "en" ? "reviews" : "reseñas"})</span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={`tel:${data.phone}`}
              className="text-lg font-bold text-white px-8 py-4 rounded-full shadow-lg hover:opacity-90 transition"
              style={{ backgroundColor: data.theme.accent }}
            >
              📞 {lang === "en" ? "Call to Book" : "Llamar para Reservar"}
            </a>
            {data.bookingUrl ? (
              <a
                href={data.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-bold bg-white px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition"
                style={{ color: data.theme.accent }}
              >
                📅 {lang === "en" ? "Book Online" : "Reservar en Línea"}
              </a>
            ) : (
              <a
                href="#contact"
                className="text-lg font-bold bg-white px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition"
                style={{ color: data.theme.accent }}
              >
                📅 {lang === "en" ? "Book Appointment" : "Reservar Cita"}
              </a>
            )}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/60 text-2xl">
          ↓
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: data.theme.accent }}>
              {lang === "en" ? "What We Offer" : "Lo Que Ofrecemos"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              {lang === "en" ? "Our Services" : "Nuestros Servicios"}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.services.map((svc, i) => (
              <div
                key={i}
                className="group border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow hover:border-gray-200"
              >
                <div className="text-4xl mb-4">{svc.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{t(svc.name)}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{t(svc.description)}</p>
              </div>
            ))}
          </div>

          {/* Book CTA */}
          <div className="text-center mt-12">
            <a
              href={data.bookingUrl ?? `tel:${data.phone}`}
              target={data.bookingUrl ? "_blank" : undefined}
              rel={data.bookingUrl ? "noopener noreferrer" : undefined}
              className="inline-block text-white font-bold px-8 py-4 rounded-full text-lg hover:opacity-90 transition"
              style={{ backgroundColor: data.theme.accent }}
            >
              {lang === "en" ? "Book Your Appointment" : "Reservar Tu Cita"}
            </a>
          </div>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section id="gallery" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: data.theme.accent }}>
              {lang === "en" ? "Our Work" : "Nuestro Trabajo"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              {lang === "en" ? "Gallery" : "Galería"}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {data.gallery.map((img, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 md:col-span-1 md:row-span-2" : ""}`}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover aspect-square hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          {data.instagram && (
            <div className="text-center mt-8">
              <a
                href={`https://instagram.com/${data.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition font-medium"
              >
                📸 @{data.instagram} — {lang === "en" ? "Follow us on Instagram" : "Síguenos en Instagram"}
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: data.theme.accent }}>
              {lang === "en" ? "What Clients Say" : "Lo Que Dicen Nuestros Clientes"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              {lang === "en" ? "Reviews" : "Reseñas"}
            </h2>
            <div className="flex justify-center items-center gap-2 mt-4">
              <Stars count={data.rating} />
              <span className="font-bold text-xl text-gray-900">{data.rating}</span>
              <span className="text-gray-500">/ 5 · {data.reviewCount} {lang === "en" ? "reviews on Google" : "reseñas en Google"}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.reviews.map((review, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <Stars count={review.stars} />
                <p className="mt-3 text-gray-700 leading-relaxed italic">"{review.text}"</p>
                <div className="mt-4 flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: data.theme.accent }}
                  >
                    {review.author[0]}
                  </div>
                  <span className="text-gray-900 font-semibold text-sm">{review.author}</span>
                  {review.date && (
                    <span className="text-gray-400 text-xs ml-auto">{review.date}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section
        id="about"
        className="py-20"
        style={{ background: `linear-gradient(135deg, ${data.theme.accent}10 0%, ${data.theme.accent}05 100%)` }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: data.theme.accent }}>
            {lang === "en" ? "Our Story" : "Nuestra Historia"}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-8">
            {lang === "en" ? "About Us" : "Sobre Nosotros"}
          </h2>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {data.badges.map((badge) => (
              <span key={badge} className={`text-sm font-medium px-3 py-1 rounded-full ${data.theme.badge}`}>
                ✓ {badge}
              </span>
            ))}
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">{t(data.about)}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-3xl font-bold mb-1" style={{ color: data.theme.accent }}>{data.rating}★</div>
              <div className="text-gray-600 text-sm">{lang === "en" ? "Average Rating" : "Calificación Promedio"}</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-3xl font-bold mb-1" style={{ color: data.theme.accent }}>{data.reviewCount}+</div>
              <div className="text-gray-600 text-sm">{lang === "en" ? "Happy Clients" : "Clientes Felices"}</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-3xl font-bold mb-1" style={{ color: data.theme.accent }}>{data.services.length}</div>
              <div className="text-gray-600 text-sm">{lang === "en" ? "Services Offered" : "Servicios Ofrecidos"}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: data.theme.accent }}>
              {lang === "en" ? "Get In Touch" : "Contáctanos"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              {lang === "en" ? "Contact Us" : "Contacto"}
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Info + Map */}
            <div>
              <div className="space-y-5 mb-8">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="font-semibold text-gray-900">{lang === "en" ? "Address" : "Dirección"}</p>
                    <p className="text-gray-600">{data.addressDisplay}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="font-semibold text-gray-900">{lang === "en" ? "Phone" : "Teléfono"}</p>
                    <a href={`tel:${data.phone}`} className="text-gray-600 hover:underline">
                      {data.phone.replace("+1", "(").replace(/(\d{3})(\d{3})(\d{4})/, "$1) $2-$3").slice(0, 14)}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">🕐</span>
                  <div>
                    <p className="font-semibold text-gray-900">{lang === "en" ? "Hours" : "Horario"}</p>
                    <p className="text-gray-600">{t(data.hours)}</p>
                  </div>
                </div>
                {data.instagram && (
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">📸</span>
                    <div>
                      <p className="font-semibold text-gray-900">Instagram</p>
                      <a
                        href={`https://instagram.com/${data.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:underline"
                      >
                        @{data.instagram}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Google Map */}
              <div className="rounded-2xl overflow-hidden border border-gray-200 h-56">
                <iframe
                  title={`Map to ${data.name}`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://maps.google.com/maps?q=${data.mapQuery}&output=embed`}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 rounded-2xl p-8">
              {formSent ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {lang === "en" ? "Message Sent!" : "¡Mensaje Enviado!"}
                  </h3>
                  <p className="text-gray-600">
                    {lang === "en"
                      ? "We'll be in touch shortly."
                      : "Nos comunicaremos contigo en breve."}
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    {lang === "en" ? "Send Us a Message" : "Envíanos un Mensaje"}
                  </h3>
                  <form
                    name={`contact-${data.slug}`}
                    method="POST"
                    data-netlify="true"
                    onSubmit={handleFormSubmit}
                    className="space-y-4"
                  >
                    <input type="hidden" name="form-name" value={`contact-${data.slug}`} />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {lang === "en" ? "Name" : "Nombre"} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:border-transparent bg-white"
                        style={{ "--tw-ring-color": data.theme.accent } as React.CSSProperties}
                        placeholder={lang === "en" ? "Your full name" : "Tu nombre completo"}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {lang === "en" ? "Phone" : "Teléfono"}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 bg-white"
                        placeholder="(201) 000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 bg-white"
                        placeholder={lang === "en" ? "your@email.com" : "tu@email.com"}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {lang === "en" ? "Service Interested In" : "Servicio de Interés"}
                      </label>
                      <select
                        name="service"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 bg-white"
                      >
                        <option value="">{lang === "en" ? "Select a service" : "Seleccionar servicio"}</option>
                        {data.services.map((svc, i) => (
                          <option key={i} value={t(svc.name)}>{t(svc.name)}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {lang === "en" ? "Message" : "Mensaje"}
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 bg-white resize-none"
                        placeholder={lang === "en" ? "Tell us what you need..." : "Cuéntanos qué necesitas..."}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white font-bold py-4 rounded-xl hover:opacity-90 transition text-base"
                      style={{ backgroundColor: data.theme.accent }}
                    >
                      {lang === "en" ? "Send Message" : "Enviar Mensaje"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: data.theme.accent }}>
              {lang === "en" ? "Common Questions" : "Preguntas Frecuentes"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">FAQ</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {data.faq.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-white rounded-xl border border-gray-200 px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-5">
                  {t(item.question)}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed pb-5">
                  {t(item.answer)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ─── BOOK APPOINTMENT ─── */}
      <section
        id="book"
        className="py-24 text-white text-center"
        style={{ backgroundColor: data.theme.accent }}
      >
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {lang === "en" ? "Ready to Look Amazing?" : "¿Lista para Lucir Increíble?"}
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
            {lang === "en"
              ? `Book your appointment at ${data.name} today. Walk-ins welcome.`
              : `Reserva tu cita en ${data.name} hoy. Walk-ins bienvenidos.`}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={`tel:${data.phone}`}
              className="text-lg font-bold bg-white px-10 py-4 rounded-full hover:bg-gray-100 transition"
              style={{ color: data.theme.accent }}
            >
              📞 {lang === "en" ? "Call to Book" : "Llamar para Reservar"}
            </a>
            {data.bookingUrl && (
              <a
                href={data.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-bold border-2 border-white text-white px-10 py-4 rounded-full hover:bg-white/10 transition"
              >
                📅 {lang === "en" ? "Book Online" : "Reservar en Línea"}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div>
              <h3 className="text-white font-bold text-lg mb-3">{data.name}</h3>
              <p className="text-sm leading-relaxed text-gray-400">{t(data.tagline)}</p>
              <div className="flex gap-2 mt-4 flex-wrap">
                {data.badges.map((badge) => (
                  <span key={badge} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-3">
                {lang === "en" ? "Contact" : "Contacto"}
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>📍 {data.addressDisplay}</li>
                <li>
                  📞{" "}
                  <a href={`tel:${data.phone}`} className="hover:text-white transition">
                    {data.phone.replace("+1", "").replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}
                  </a>
                </li>
                <li>🕐 {t(data.hours)}</li>
                {data.instagram && (
                  <li>
                    📸{" "}
                    <a
                      href={`https://instagram.com/${data.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition"
                    >
                      @{data.instagram}
                    </a>
                  </li>
                )}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-3">
                {lang === "en" ? "Quick Links" : "Links Rápidos"}
              </h3>
              <ul className="space-y-2 text-sm">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="text-gray-400 hover:text-white transition">
                      {lang === "en" ? item.en : item.es}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500">
            <p>© {new Date().getFullYear()} {data.name} · {data.addressDisplay}</p>
            <p>
              {lang === "en" ? "Built by " : "Desarrollado por "}
              <a href="https://njbusinessweb.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition">
                NJ Business Web
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* ─── FLOATING CALL BUTTON (mobile) ─── */}
      <a
        href={`tel:${data.phone}`}
        className="fixed bottom-6 right-6 z-50 md:hidden text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-2xl hover:opacity-90 transition"
        style={{ backgroundColor: data.theme.accent }}
        aria-label="Call Now"
      >
        📞
      </a>
    </>
  );
}
