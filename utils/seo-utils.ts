export function generatePageMetadata({
  title,
  description,
  keywords = [],
  canonical,
  images = ["/assets/img/logo_full_rojo.png"],
  type = "website" as const,
}: {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  images?: string[];
  type?: "website" | "article";
}) {
  const baseKeywords = [
    "diseño de interiores madrid",
    "diseño de interiores canarias",
    "interiorismo comercial",
    "espacios comerciales lujo",
    "dos x dos grupo imagen",
  ];

  return {
    title,
    description,
    keywords: [...baseKeywords, ...keywords],
    openGraph: {
      title,
      description,
      type,
      images: images.map((img) => ({
        url: img,
        width: 1200,
        height: 630,
        alt: title,
      })),
      locale: "es_ES",
      siteName: "Dos x Dos Grupo Imagen",
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: images[0],
    },
    alternates: canonical ? { canonical } : undefined,
  };
}
