# Design Brief — NJ Business Web · Salon Sites
*Análisis de 69 referencias visuales · Junio 2026*

---

## 1. LO QUE VI EN LAS REFERENCIAS

### Proyectos más fuertes (los que el usuario guardó más veces)
- **LAMARA / BEAXTY SALON** — editorial de moda: tipografía grotesca bold, B&W + acento, fotos crudas sin retocar, layout asimétrico. Frases como "REAL RESULTS. NO FILTERS. NO RETOUCHING. JUST REAL PEOPLE."
- **NÜmA Beauty** — soft luxury: crema/beige cálido, serif elegante, mucho aire, "Beauty, curated with intention"
- **SCULPT (Sophia)** — collage editorial: pasteles apagados (amarillo, rosa polvo, azul cielo), serif display, mosaico de fotos
- **Sophia Anderson** — personal brand premium: crema + dorado, script + serif, "Elevating Beauty, One Experience at a Time"
- **Spa & Beauty Treatments** — teal profundo + dorado cálido en fotografía, contraste fuerte
- **Salon ShanáLes** — terracota/blush, arcos, orgánico y boutique

### Lo que el usuario claramente NO quiere
- Plantillas con gradientes genéricos
- Fondo blanco puro + azul/morado corporativo
- Stock photos de manos con esmalte
- Cards con sombra flotante genérica
- Botones redondeados de Bootstrap
- Cualquier cosa que parezca generada por IA en 5 minutos

---

## 2. DIRECCIÓN DE DISEÑO ELEGIDA

### **"Warm Editorial" — Lujo accesible con punto de vista**

No es dark luxury (muy frío para NJ local).
No es pastel cute (muy genérico).
Es: **editorial de revista de belleza independiente** — tiene personalidad, temperatura, y se siente hecho por alguien que tiene gusto.

**Concepto:**
> Cada salón tiene su propia identidad visual, construida sobre una misma base sólida. La base es cálida, tipográfica, y editorial. El color de acento es lo que los diferencia.

---

## 3. PALETA BASE (compartida por los 12 sitios)

| Role | Nombre | Hex | Uso |
|------|--------|-----|-----|
| Background | Cream | `#FAF7F4` | Fondo principal (NO blanco puro) |
| Text Primary | Warm Black | `#1A1612` | Headlines, body (NO negro puro) |
| Text Secondary | Warm Gray | `#6B6560` | Subtítulos, metadata |
| Surface | Off-White | `#F0ECE8` | Cards, secciones alternas |
| **Accent** | **Per-Salon** | **Variable** | CTA, highlights, links |

**Acento por salón** (ya definidos en el brief):
1. Juliette → Rose `#e11d48`
2. Nikki Maar → Violet `#7c3aed`
3. Brigith Nails → Pink `#db2777`
4. Fina Salon → Slate `#334155`
5. Divino Niño → Teal `#0f766e`
6. VIP Beauty → Purple `#7e22ce`
7. Henry Castel → Amber `#b45309`
8. Estilo's → Orange `#ea580c`
9. Salon Salvys → Blue `#1d4ed8`
10. Glamour By Latin → Red `#be123c`
11. Glamour By Marisol → Fuchsia `#a21caf`
12. Amarilys → Rose `#e11d48`

---

## 4. SISTEMA TIPOGRÁFICO

### Display / Headlines
**Playfair Display** (Google Fonts, serif)
- Razón: Aparece en 4+ de las referencias más fuertes. Tiene carácter editorial sin ser frío. Funciona en sizes grandes con letras cruzadas elegantes.
- Uso: H1, H2, taglines grandes
- Peso: 700 italic para impacto, 400 para elegancia

### Body / UI
**DM Sans** (Google Fonts, sans-serif)
- Razón: Geométrica pero cálida. No es Inter (demasiado tech), no es Roboto (demasiado Google). Muy legible en móvil.
- Uso: Body, nav, botones, labels, precios
- Peso: 300, 400, 500

### Acento / Quotes
**Cormorant Garamond** (Google Fonts, serif display)
- Uso exclusivo: Pull quotes de clientes, números grandes (4.8★), frases destacadas
- Da ese "toque de revista" sin sobre-usarse

---

## 5. PATRONES VISUALES A USAR

### Layout
- **Asimetría controlada** — no centrado en todo. Texto alineado izquierda en hero, imagen desplazada a la derecha o bleeding al edge.
- **Tipografía como elemento gráfico** — headlines grandes que ocupan espacio, no solo etiquetan
- **Whitespace generoso** — padding vertical de 80-120px entre secciones. No llenar todo.
- **Fotos con recorte editorial** — aspect ratio 3:4 (portrait) para retratos, no cuadrado genérico

### Hero Section
- Texto en columna izquierda, foto a la derecha sangrando al borde
- Tagline en Playfair Display, 72-96px desktop
- Un accent color usado en UN elemento (no en todo)
- Badge o credencial social (⭐ 4.8 · 157 reviews) — da confianza local

### Services
- Lista tipográfica con hover underline — no cards con iconos
- Precio opcional en DM Sans 300
- Separadores finos `1px` en warm gray

### Gallery
- Masonry o grid asimétrico — fotos de diferente altura
- Hover: leve zoom + overlay con nombre del servicio

### Testimonials  
- Quote grande en Cormorant Garamond italic
- Nombre en DM Sans caps
- Estrellas en accent color

### CTA / Booking
- Botón principal: fondo en accent color, texto blanco, sin border-radius grande (máx 4px)
- Botón WhatsApp: verde `#25D366`, ícono + texto
- Botón llamar: outline en warm black

---

## 6. MOTION PLAN

**Principio: motion que informa, no que entretiene**

- **Hero headline**: palabra por palabra reveal con `opacity 0→1 + translateY 20px→0`, stagger 80ms, ease-out
- **Imágenes**: fade-in + ligero scale `1.03→1` al entrar al viewport
- **Nav sticky**: fondo cream con `backdrop-blur` al hacer scroll, sin salto brusco
- **Botones**: background color transition 200ms, no transform/scale
- **Gallery hover**: zoom `scale(1.05)` + overlay, 300ms ease
- **Testimonials**: scroll-driven fade lateral, no AOS genérico
- **NADA de**: parallax exagerado, partículas, gradient animado en hero, entrada de cards en cascada con bounce

---

## 7. MOBILE PHILOSOPHY

**"Mobile-designed, not desktop-shrunk"**

- Hero: foto arriba full-bleed, texto debajo. NO columnas lado a lado.
- Nav: hamburger minimal — solo icono X para cerrar, no drawer complicado
- Services: accordion colapsable, un servicio por row
- Gallery: scroll horizontal tipo carrusel, no grid 2x2 aplastado
- CTAs: siempre visible — "Llamar" y "WhatsApp" pegados al fondo (fixed bottom bar en mobile)
- Tipografía: H1 en 48px mobile (no 32px genérico), mantener el impacto visual

---

## 8. SEO / TÉCNICO

- Schema: `LocalBusiness` + `BeautySalon` por página
- Meta OG por salón (title, description, image)
- Alt text en todas las imágenes con nombre del salón + servicio
- H1 único por página con keyword local ("nail salon West New York NJ")
- Heading hierarchy estricta: un H1, H2s para secciones, H3s para items
- Core Web Vitals: imágenes en WebP/AVIF, fonts con `font-display: swap`, JS mínimo

---

## 9. STACK TÉCNICO

```
Next.js 14 (App Router)
Tailwind CSS 3.4
Framer Motion (animaciones)
shadcn/ui (componentes base)
next/font (Playfair Display + DM Sans + Cormorant)
next/image (optimización automática)
```

- Un template base compartido, 12 instancias con datos por salón
- Datos de salón en archivos `/data/salons/[slug].ts`
- Deploy: Netlify (como especifica el prompt)

---

## 10. LO QUE AÚN NECESITO CONFIRMAR

Ver sección de preguntas al final del análisis.
