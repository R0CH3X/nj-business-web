export type SalonTemplate =
  | "bold-editorial"   // Juliette, Glamour By Latin — texto enorme, fondo oscuro, foto cruda
  | "dark-luxury"      // NIKKI MAAR, VIP Beauty, Henry Castel — oscuro elegante, portrait
  | "soft-boutique"    // Brigith, Amarilys, Salon Salvys — cream editorial femenino
  | "modern-split"     // Fina, Divino Niño — arquitectónico 50/50
  | "vibrant-energy"   // Estilo's — naranja vivo, energético
  | "magazine"         // Glamour By Marisol — moda editorial, fuchsia

export interface Salon {
  slug: string
  name: string
  tagline: string
  taglineEs: string
  template: SalonTemplate
  address: string
  city: string
  state: string
  zip: string
  phone: string
  phoneFormatted: string
  whatsapp?: string
  instagram?: string
  facebook?: string
  booking?: string
  rating: number
  reviewCount: number
  badges: string[]
  hours: string
  services: Service[]
  team?: TeamMember[]
  reviews: Review[]
  accentColor: string
  accentLight: string
  seoDescription: string
  seoDescriptionEs: string
  keywords: string[]
  type: 'hair' | 'nails' | 'full'
  /** JSON-LD @type — defaults to "BeautySalon" if omitted */
  schemaType?: string
}

export interface Service {
  name: string
  nameEs: string
  description?: string
  price?: string
}

export interface TeamMember {
  name: string
  role: string
  roleEs: string
}

export interface Review {
  text: string
  author: string
  rating: number
}

export const salons: Salon[] = [
  {
    slug: "juliette-beauty-salon",
    name: "Juliette Beauty Salon",
    template: "bold-editorial" as SalonTemplate,
    tagline: "Real results. No filters.",
    taglineEs: "Resultados reales. Sin filtros.",
    address: "5904 Park Ave",
    city: "West New York",
    state: "NJ",
    zip: "07093",
    phone: "2018612161",
    phoneFormatted: "(201) 861-2161",
    instagram: "juliettesbeautysalon",
    rating: 4.8,
    reviewCount: 157,
    badges: ["Latino-Owned", "LGBTQ+ Friendly"],
    hours: "Mon–Fri 10am–7pm",
    accentColor: "#e11d48",
    accentLight: "#fce7f3",
    type: "hair",
    seoDescription: "Juliette Beauty Salon in West New York, NJ — expert hair color, balayage, keratin treatments & blowouts. 4.8★ rated, Latino-owned.",
    seoDescriptionEs: "Juliette Beauty Salon en West New York, NJ — color, balayage, keratina y blow dry. Calificación 4.8★.",
    keywords: ["hair salon west new york nj", "balayage west new york", "keratin treatment hudson county", "highlights west new york nj", "juliette beauty salon"],
    services: [
      { name: "Haircut", nameEs: "Corte de cabello" },
      { name: "Color & Highlights", nameEs: "Color y mechas" },
      { name: "Balayage", nameEs: "Balayage" },
      { name: "Keratin Treatment", nameEs: "Tratamiento de keratina" },
      { name: "Blow Dry", nameEs: "Blow dry / secado" },
      { name: "Hair Treatments", nameEs: "Tratamientos capilares" },
    ],
    reviews: [
      { text: "She fixed my damaged hair in one sitting — highlights, color treatment, blow dry, everything.", author: "Verified Client", rating: 5 },
      { text: "Excellent with hair loss. Great coloring and cutting. Very reasonable prices.", author: "Verified Client", rating: 5 },
      { text: "Every time I come I fall in love with my look. She is a perfectionist hairstylist.", author: "Verified Client", rating: 5 },
    ],
  },
  {
    slug: "nikki-maar-salon",
    name: "Nikki Maar Salon",
    template: "dark-luxury" as SalonTemplate,
    tagline: "Patient, kind, and talented.",
    taglineEs: "Paciencia, calidez y talento.",
    address: "6011 Park Ave",
    city: "West New York",
    state: "NJ",
    zip: "07093",
    phone: "2018694377",
    phoneFormatted: "(201) 869-4377",
    instagram: "nikkimaarsalon",
    booking: "https://www.fresha.com/a/nikki-maar-salon-west-new-york-6011-park-avenue-bpmu62eu/booking",
    rating: 4.7,
    reviewCount: 68,
    badges: ["Latino-Owned", "Black-Owned", "Women-Owned", "LGBTQ+ Friendly"],
    hours: "Opens 9am",
    accentColor: "#7c3aed",
    accentLight: "#ede9fe",
    type: "hair",
    seoDescription: "Nikki Maar Salon in West New York, NJ — balayage, color, blowouts, braids & waxing. Women-owned, 4.7★ rated.",
    seoDescriptionEs: "Nikki Maar Salon en West New York, NJ — balayage, color, blowout, trenzas y depilación. 4.7★.",
    keywords: ["nikki maar salon west new york", "balayage west new york nj", "braid bar hudson county", "hair salon park avenue west new york"],
    services: [
      { name: "Women's Haircut", nameEs: "Corte mujer" },
      { name: "Men's Haircut", nameEs: "Corte hombre" },
      { name: "Kids' Haircut", nameEs: "Corte niños" },
      { name: "Balayage & Color", nameEs: "Balayage y color" },
      { name: "Blowout / Flat Iron", nameEs: "Blow dry / plancha" },
      { name: "Waxing", nameEs: "Depilación con cera" },
      { name: "Updos & Braid Bar", nameEs: "Recogidos y trenzas" },
      { name: "Wand Curls", nameEs: "Rizos con varita" },
    ],
    reviews: [
      { text: "Paola did an amazing job — patient, attentive, made sure he looked great.", author: "Verified Client", rating: 5 },
      { text: "Always a pleasant experience. Patient, kind and talented.", author: "Verified Client", rating: 5 },
      { text: "The whole team knows how to take very good care of your hair. 100% recommend.", author: "Verified Client", rating: 5 },
    ],
  },
  {
    slug: "brigith-nails-spa",
    name: "Brigith Nails & Spa",
    template: "soft-boutique" as SalonTemplate,
    tagline: "Your style is our passion.",
    taglineEs: "Tu estilo es nuestra pasión.",
    address: "5408 Park Ave",
    city: "West New York",
    state: "NJ",
    zip: "07093",
    phone: "2016306003",
    phoneFormatted: "(201) 630-6003",
    rating: 4.8,
    reviewCount: 12,
    badges: ["Clean & Safe", "Gift Certificates Available"],
    hours: "Opens 10:30am",
    accentColor: "#db2777",
    accentLight: "#fce7f3",
    type: "nails",
    seoDescription: "Brigith Nails & Spa in West New York, NJ — spa pedicure, UV gel, dip powder, waxing & gift certificates. Clean & safe, 4.8★.",
    seoDescriptionEs: "Brigith Nails & Spa en West New York, NJ — pedicura spa, gel UV, dip powder y depilación. 4.8★.",
    keywords: ["nail salon west new york nj", "spa pedicure west new york", "gel nails hudson county", "brigith nails"],
    services: [
      { name: "Spa Pedicure", nameEs: "Pedicura spa" },
      { name: "UV Gel Set", nameEs: "Uñas en gel UV" },
      { name: "Tip Set / Poli Gel Manicure", nameEs: "Tips / manicura poli gel" },
      { name: "Dip Powder", nameEs: "Dip powder" },
      { name: "Classic Manicure", nameEs: "Manicura clásica" },
      { name: "Waxing", nameEs: "Depilación con cera" },
      { name: "Gift Certificates", nameEs: "Certificados de regalo" },
    ],
    reviews: [
      { text: "I have NEVER left unhappy. Great service and beautiful atmosphere.", author: "Verified Client", rating: 5 },
      { text: "The pedi was perfect. They treated me so nicely — this is now a favorite salon!", author: "Verified Client", rating: 5 },
      { text: "Clean atmosphere with a little coffee bar. The women were nice and welcoming.", author: "Verified Client", rating: 5 },
    ],
  },
  {
    slug: "fina-salon",
    name: "Fina Salon",
    template: "modern-split" as SalonTemplate,
    tagline: "Color that speaks for itself.",
    taglineEs: "Color que habla por sí solo.",
    address: "201 71st St",
    city: "Guttenberg",
    state: "NJ",
    zip: "07093",
    phone: "2016627191",
    phoneFormatted: "(201) 662-7191",
    facebook: "https://www.facebook.com/p/Fina-Hair-61553352755432",
    rating: 5.0,
    reviewCount: 11,
    badges: ["LGBTQ+ Friendly", "Color Specialist"],
    hours: "Opens 9:30am",
    accentColor: "#334155",
    accentLight: "#f1f5f9",
    type: "hair",
    seoDescription: "Fina Salon in Guttenberg, NJ — expert color, highlights, Magic Sleek & hair treatments. 5.0★ perfect rating.",
    seoDescriptionEs: "Fina Salon en Guttenberg, NJ — color, mechas, Magic Sleek y tratamientos capilares. Calificación perfecta 5.0★.",
    keywords: ["hair salon guttenberg nj", "color specialist guttenberg", "magic sleek hudson county", "fina salon"],
    team: [{ name: "José Manuel", role: "Lead Stylist & Color Specialist", roleEs: "Estilista principal y especialista en color" }],
    services: [
      { name: "Haircut", nameEs: "Corte" },
      { name: "Color & Highlights", nameEs: "Color y mechas" },
      { name: "Magic Sleek", nameEs: "Magic Sleek" },
      { name: "Hair Treatments", nameEs: "Tratamientos capilares" },
      { name: "Blow Dry", nameEs: "Secado" },
      { name: "Styles", nameEs: "Peinados" },
    ],
    reviews: [
      { text: "Jose is respectful, kind and does a fantastic job. He has such an eye for color.", author: "Verified Client", rating: 5 },
      { text: "The salon is clean and has a nice feel. Josi took his time with my hair treatment.", author: "Verified Client", rating: 5 },
      { text: "Jose is very knowledgeable in hair treatment. Did exactly what I wanted and even better.", author: "Verified Client", rating: 5 },
    ],
  },
  {
    slug: "divino-nino-beauty-nail-salon",
    name: "Divino Niño Beauty & Nail Salon",
    template: "modern-split" as SalonTemplate,
    tagline: "Hair and nails, beautifully done.",
    taglineEs: "Cabello y uñas, perfectamente cuidados.",
    address: "7209 Broadway",
    city: "North Bergen",
    state: "NJ",
    zip: "07047",
    phone: "2014309060",
    phoneFormatted: "(201) 430-9060",
    rating: 4.8,
    reviewCount: 22,
    badges: ["Full-Service Salon", "Hair & Nails"],
    hours: "Opens 9:30am",
    accentColor: "#0f766e",
    accentLight: "#ccfbf1",
    type: "full",
    seoDescription: "Divino Niño Beauty & Nail Salon in North Bergen, NJ — manicure, pedicure, hair color & cuts. Full-service, 4.8★.",
    seoDescriptionEs: "Divino Niño Beauty & Nail Salon en North Bergen, NJ — manicura, pedicura, color y cortes. Servicio completo, 4.8★.",
    keywords: ["nail salon north bergen nj", "hair and nail salon north bergen", "manicure pedicure north bergen", "divino nino salon"],
    team: [
      { name: "Angela", role: "Hair & Nail Specialist", roleEs: "Especialista en cabello y uñas" },
      { name: "Paola", role: "Hair & Nail Specialist", roleEs: "Especialista en cabello y uñas" },
    ],
    services: [
      { name: "Manicure", nameEs: "Manicura" },
      { name: "Pedicure", nameEs: "Pedicura" },
      { name: "Hair Color", nameEs: "Color de cabello" },
      { name: "Haircut", nameEs: "Corte" },
      { name: "Nail Art", nameEs: "Nail art" },
      { name: "Hair Treatments", nameEs: "Tratamientos capilares" },
    ],
    reviews: [
      { text: "Angela and Paola are truly wonderful ladies. Extremely professional. I loved my mani, pedi and hair!", author: "Verified Client", rating: 5 },
      { text: "The service here exceeded all my expectations. Absolutely love this place.", author: "Verified Client", rating: 5 },
      { text: "Angela es la mejor, super recomendado con muchos años de experiencia.", author: "Cliente verificada", rating: 5 },
    ],
  },
  {
    slug: "vip-beauty-salon",
    name: "VIP Beauty Salon",
    template: "dark-luxury" as SalonTemplate,
    tagline: "Your look, elevated.",
    taglineEs: "Tu imagen, elevada.",
    address: "7100 Park Ave",
    city: "Guttenberg",
    state: "NJ",
    zip: "07093",
    phone: "2012950890",
    phoneFormatted: "(201) 295-0890",
    rating: 4.3,
    reviewCount: 112,
    badges: ["Women-Owned", "Unisex Services"],
    hours: "Opens 9am",
    accentColor: "#7e22ce",
    accentLight: "#f3e8ff",
    type: "hair",
    seoDescription: "VIP Beauty Salon in Guttenberg, NJ — haircuts, blowouts, color & highlights for men and women. 4.3★, 112 reviews.",
    seoDescriptionEs: "VIP Beauty Salon en Guttenberg, NJ — cortes, blowouts, color y mechas para hombres y mujeres. 4.3★.",
    keywords: ["hair salon guttenberg nj", "unisex hair salon guttenberg", "blowout guttenberg nj", "vip beauty salon"],
    team: [
      { name: "Hector", role: "Stylist", roleEs: "Estilista" },
      { name: "Gladys", role: "Stylist", roleEs: "Estilista" },
    ],
    services: [
      { name: "Haircut", nameEs: "Corte" },
      { name: "Blow Dry", nameEs: "Blow dry" },
      { name: "Color", nameEs: "Color" },
      { name: "Highlights", nameEs: "Mechas" },
      { name: "Hair Treatments", nameEs: "Tratamientos" },
      { name: "Unisex Styles", nameEs: "Estilos unisex" },
    ],
    reviews: [
      { text: "Hector was so attentive and professional. The blowout came out flawless.", author: "Verified Client", rating: 5 },
      { text: "Excellent service. Héctor is very professional and detail-oriented.", author: "Verified Client", rating: 5 },
      { text: "Gladys changed my look and how I feel about myself. The price was amazing.", author: "Verified Client", rating: 5 },
    ],
  },
  {
    slug: "henry-castel-vip-beauty-salon",
    name: "Henry Castel VIP Beauty Salon",
    template: "dark-luxury" as SalonTemplate,
    tagline: "From black to blonde. No breakage.",
    taglineEs: "Del negro al rubio. Sin daño.",
    address: "126 61st St",
    city: "West New York",
    state: "NJ",
    zip: "07093",
    phone: "2013747476",
    phoneFormatted: "(201) 374-7476",
    instagram: "henrycastel",
    booking: "available",
    rating: 4.8,
    reviewCount: 21,
    badges: ["Color Expert", "Online Booking"],
    hours: "By appointment",
    accentColor: "#b45309",
    accentLight: "#fef3c7",
    type: "full",
    seoDescription: "Henry Castel VIP Beauty Salon in West New York, NJ — color lifting, highlights, keratin & nails. Expert colorist, 4.8★.",
    seoDescriptionEs: "Henry Castel VIP Beauty Salon en West New York, NJ — lifting de color, mechas, keratina y uñas. 4.8★.",
    keywords: ["color specialist west new york nj", "hair color lifting hudson county", "henry castel salon", "balayage west new york"],
    team: [{ name: "Henry", role: "Owner & Color Specialist", roleEs: "Dueño y especialista en color" }],
    services: [
      { name: "Color & Highlights", nameEs: "Color y mechas" },
      { name: "Color Lifting", nameEs: "Lifting de color" },
      { name: "Haircut", nameEs: "Corte" },
      { name: "Hair Treatments", nameEs: "Tratamientos capilares" },
      { name: "Blow Dry", nameEs: "Blow dry" },
      { name: "Manicure & Pedicure", nameEs: "Manicura y pedicura" },
      { name: "Makeup", nameEs: "Maquillaje" },
    ],
    reviews: [
      { text: "Nunca antes mis uñas habían durado tanto. Henry trabaja con productos de buena calidad.", author: "Cliente verificada", rating: 5 },
      { text: "Henry lifted my hair from black to blonde with the most gentle care — absolutely no breakage.", author: "Verified Client", rating: 5 },
      { text: "Henry really knows how to listen to my needs. My overall experience is always wonderful.", author: "Verified Client", rating: 5 },
    ],
  },
  {
    slug: "estilos-beauty-salon",
    name: "Estilo's Beauty Salon",
    template: "vibrant-energy" as SalonTemplate,
    tagline: "A new you, one visit at a time.",
    taglineEs: "Un nuevo tú, una visita a la vez.",
    address: "6014 Bergenline Ave #A",
    city: "West New York",
    state: "NJ",
    zip: "07093",
    phone: "2014533133",
    phoneFormatted: "(201) 453-3133",
    rating: 4.2,
    reviewCount: 39,
    badges: ["Full-Service", "Makeovers"],
    hours: "Opens 10am",
    accentColor: "#ea580c",
    accentLight: "#ffedd5",
    type: "full",
    seoDescription: "Estilo's Beauty Salon in West New York, NJ — haircuts, color, manicure, pedicure & makeovers. Full-service, 4.2★.",
    seoDescriptionEs: "Estilo's Beauty Salon en West New York, NJ — cortes, color, manicura, pedicura y cambios de look. 4.2★.",
    keywords: ["beauty salon west new york nj", "makeover west new york", "hair and nails bergenline", "estilos beauty salon"],
    services: [
      { name: "Haircut", nameEs: "Corte" },
      { name: "Color", nameEs: "Color" },
      { name: "Manicure", nameEs: "Manicura" },
      { name: "Pedicure", nameEs: "Pedicura" },
      { name: "Makeovers", nameEs: "Cambio de look" },
      { name: "Nail Art", nameEs: "Nail art" },
      { name: "Waxing", nameEs: "Depilación" },
    ],
    reviews: [
      { text: "Excelente servicio 5 Estrellas ⭐️⭐️⭐️⭐️⭐️", author: "Cliente verificada", rating: 5 },
      { text: "Lleve a mi hija a su primer cambio de look y nos encantó.", author: "Cliente verificada", rating: 5 },
      { text: "Tratando de sacar el rubio y quedar al natural — gracias!", author: "Cliente verificada", rating: 5 },
    ],
  },
  {
    slug: "salon-salvys",
    name: "Salon Salvys",
    template: "soft-boutique" as SalonTemplate,
    tagline: "The only salon that can touch my hair.",
    taglineEs: "El único salón que puede tocar mi cabello.",
    address: "4807 Broadway",
    city: "Union City",
    state: "NJ",
    zip: "07087",
    phone: "2018639252",
    phoneFormatted: "(201) 863-9252",
    rating: 4.7,
    reviewCount: 31,
    badges: ["Family Atmosphere", "Owner on Premises"],
    hours: "By appointment",
    accentColor: "#1d4ed8",
    accentLight: "#dbeafe",
    type: "hair",
    seoDescription: "Salon Salvys in Union City, NJ — expert haircuts, color, highlights & blowouts. Family atmosphere, 4.7★.",
    seoDescriptionEs: "Salon Salvys en Union City, NJ — cortes, color, mechas y blow dry. Ambiente familiar, 4.7★.",
    keywords: ["hair salon union city nj", "salon salvys union city", "haircut union city nj", "color highlights union city"],
    team: [{ name: "Salvy", role: "Owner & Stylist", roleEs: "Dueña y estilista" }],
    services: [
      { name: "Haircut", nameEs: "Corte" },
      { name: "Color", nameEs: "Color" },
      { name: "Highlights", nameEs: "Mechas" },
      { name: "Blow Dry", nameEs: "Blow dry" },
      { name: "Manicure", nameEs: "Manicura" },
      { name: "Pedicure", nameEs: "Pedicura" },
      { name: "Hair Treatments", nameEs: "Tratamientos" },
    ],
    reviews: [
      { text: "Al fin conseguí a una persona profesional que sí sabe cortar el cabello.", author: "Cliente verificada", rating: 5 },
      { text: "Salvy's is the only salon that can touch my hair! I was treated like family.", author: "Verified Client", rating: 5 },
      { text: "This is the best salon in town. Salvy the owner makes you feel welcome. Prices are great.", author: "Verified Client", rating: 5 },
    ],
  },
  {
    slug: "glamour-by-latin",
    name: "Glamour By Latin",
    template: "bold-editorial" as SalonTemplate,
    tagline: "Eight years. Still the best.",
    taglineEs: "Ocho años. Siempre la mejor.",
    address: "8614 John F. Kennedy Blvd",
    city: "North Bergen",
    state: "NJ",
    zip: "07047",
    phone: "2016241657",
    phoneFormatted: "(201) 624-1657",
    facebook: "https://www.facebook.com/terecitafrometa",
    rating: 4.6,
    reviewCount: 49,
    badges: ["8+ Years of Excellence", "Owner on Premises"],
    hours: "Opens 9am",
    accentColor: "#be123c",
    accentLight: "#ffe4e6",
    type: "hair",
    seoDescription: "Glamour By Latin in North Bergen, NJ — keratin, highlights, color & blowouts. 8+ years of excellence, 4.6★.",
    seoDescriptionEs: "Glamour By Latin en North Bergen, NJ — keratina, mechas, color y blow dry. Más de 8 años de excelencia, 4.6★.",
    keywords: ["hair salon north bergen nj", "keratin treatment north bergen", "glamour by latin", "teresa hairstylist north bergen"],
    team: [{ name: "Teresa", role: "Owner & Stylist", roleEs: "Dueña y estilista" }],
    services: [
      { name: "Keratin Treatment", nameEs: "Keratina" },
      { name: "Highlights", nameEs: "Mechas" },
      { name: "Haircut", nameEs: "Corte" },
      { name: "Color", nameEs: "Coloración" },
      { name: "Eyebrow Shaping", nameEs: "Cejas" },
      { name: "Blow Dry", nameEs: "Blow dry" },
      { name: "Hair Treatments", nameEs: "Tratamientos" },
    ],
    reviews: [
      { text: "They do a great job maintaining your hair very healthy. I've been a happy client for 8 years.", author: "Verified Client", rating: 5 },
      { text: "Desde que tengo 11 años Teresa ha sido mi mejor estilista — tengo 29 y no la cambio!", author: "Cliente verificada", rating: 5 },
      { text: "Teresa is the BEST. I don't mind the drive and the wait as long as my hair stays looking fabulous.", author: "Verified Client", rating: 5 },
    ],
  },
  {
    slug: "glamour-by-marisol-salon",
    name: "Glamour By Marisol Salon",
    template: "magazine" as SalonTemplate,
    tagline: "Walk out feeling beautiful.",
    taglineEs: "Sales sintiéndote hermosa.",
    address: "7711 Broadway",
    city: "North Bergen",
    state: "NJ",
    zip: "07047",
    phone: "2012670502",
    phoneFormatted: "(201) 267-0502",
    instagram: "glamourbymarisol",
    rating: 5.0,
    reviewCount: 13,
    badges: ["Color Correction Specialist", "5.0★ Perfect Rating"],
    hours: "Opens 9am",
    accentColor: "#a21caf",
    accentLight: "#fae8ff",
    type: "hair",
    seoDescription: "Glamour By Marisol Salon in North Bergen, NJ — color correction, highlights & cuts. Perfect 5.0★ rating.",
    seoDescriptionEs: "Glamour By Marisol Salon en North Bergen, NJ — corrección de color, mechas y cortes. Calificación perfecta 5.0★.",
    keywords: ["color correction north bergen nj", "glamour by marisol", "hair salon broadway north bergen", "highlights north bergen"],
    team: [
      { name: "Marisol", role: "Owner & Color Correction Specialist", roleEs: "Dueña y especialista en corrección de color" },
      { name: "Alex", role: "Barber", roleEs: "Barbero" },
      { name: "Madeline", role: "Stylist", roleEs: "Estilista" },
    ],
    services: [
      { name: "Color Correction", nameEs: "Corrección de color" },
      { name: "Highlights", nameEs: "Mechas" },
      { name: "Haircut", nameEs: "Corte" },
      { name: "Styles", nameEs: "Peinados" },
      { name: "Barbershop (Alex)", nameEs: "Barbería (Alex)" },
      { name: "Blow Dry", nameEs: "Blow dry" },
      { name: "Hair Treatments", nameEs: "Tratamientos" },
    ],
    reviews: [
      { text: "Marisol did a color correction and highlights — my hair turned out exactly what I wanted.", author: "Verified Client", rating: 5 },
      { text: "Marisol the owner is the BEST. You will walk out feeling beautiful. Alex and Madeline do a great job.", author: "Verified Client", rating: 5 },
      { text: "Todo maravilloso, hacen magia con sus manos. Productos de calidad y resultado final fabuloso.", author: "Cliente verificada", rating: 5 },
    ],
  },
  {
    slug: "amarilys-beauty-studio",
    name: "Amarilys Beauty Studio",
    template: "soft-boutique" as SalonTemplate,
    tagline: "When you love what you do, it shows.",
    taglineEs: "Cuando amas lo que haces, se nota.",
    address: "407 45th St",
    city: "Union City",
    state: "NJ",
    zip: "07087",
    phone: "5515874463",
    phoneFormatted: "(551) 587-4463",
    rating: 4.7,
    reviewCount: 14,
    badges: ["Nail Specialist", "Custom Designs"],
    hours: "Opens 9:30am",
    accentColor: "#e11d48",
    accentLight: "#fce7f3",
    type: "nails",
    seoDescription: "Amarilys Beauty Studio in Union City, NJ — manicure, pedicure, nail art, gel & custom nail designs. 4.7★.",
    seoDescriptionEs: "Amarilys Beauty Studio en Union City, NJ — manicura, pedicura, nail art, gel y diseños personalizados. 4.7★.",
    keywords: ["nail salon union city nj", "nail art union city", "gel nails union city nj", "amarilys beauty studio"],
    team: [{ name: "Amarilis", role: "Owner & Nail Specialist", roleEs: "Dueña y especialista en uñas" }],
    services: [
      { name: "Manicure", nameEs: "Manicura" },
      { name: "Pedicure", nameEs: "Pedicura" },
      { name: "Nail Art", nameEs: "Nail art" },
      { name: "Gel Nails", nameEs: "Uñas en gel" },
      { name: "Acrylic Nails", nameEs: "Uñas acrílicas" },
      { name: "Custom Designs", nameEs: "Diseños personalizados" },
      { name: "Nail Treatments", nameEs: "Tratamientos de uñas" },
    ],
    reviews: [
      { text: "I've been coming to Amarilis for over 3 years — she is very flexible and simply the best.", author: "Verified Client", rating: 5 },
      { text: "Amarilis is the best at doing nails. Friendly and awesome at her skills.", author: "Verified Client", rating: 5 },
      { text: "Un ambiente acogedor, el trabajo es impecable. Cuando uno ama lo que hace se nota.", author: "Cliente verificada", rating: 5 },
    ],
  },

]

export function getSalonBySlug(slug: string): Salon | undefined {
  return salons.find((s) => s.slug === slug)
}
