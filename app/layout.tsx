import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/main.scss";
import Menu from "@/components/layout/Menu/Menu";
import BackToTop from "@/components/BackToTop/BackToTop";
import AuthProvider from "@/components/AuthProvider";
import CookieConsentBanner from "@/components/CookieConsentBanner/CookieConsentBanner";
import JsonLd from "@/components/SEO/JsonLd";
import DataPreloader from "@/components/DataPreloader/DataPreloader";
import InstantLoadingOverlay from "@/components/InstantLoadingOverlay";

const bigShoulders = localFont({
  variable: "--font-big-shoulders",
  display: "swap",
  preload: true,
  fallback: ["Impact", "Arial Black", "sans-serif"],
  src: [
    {
      path: "../public/assets/fonts/BigShouldersDisplay-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/BigShouldersDisplay-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/BigShouldersDisplay-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/BigShouldersDisplay-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
});

const sarabun = localFont({
  variable: "--font-sarabun",
  display: "swap",
  preload: true,
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ],
  src: [
    {
      path: "../public/assets/fonts/Sarabun-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/Sarabun-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/Sarabun-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/Sarabun-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dospordosgrupoimagen.com/"),
  title: {
    default:
      "Dos x Dos Grupo Imagen - Diseño, fabricación y montaje de espacios comerciales",
    template: "%s | Dos x Dos Grupo Imagen",
  },
  description:
    "Más de 38 años creando soluciones integrales en diseño, fabricación y montaje de espacios para retail, ferias y promociones. Especialistas en espacios comerciales de lujo en Madrid y Canarias.",
  keywords: [
    "diseño fabricación montaje espacios comerciales",
    "espacios retail madrid",
    "espacios retail canarias",
    "diseño ferias promociones",
    "fabricación espacios comerciales",
    "montaje espacios comerciales",
    "soluciones integrales retail",
    "espacios comerciales lujo",
    "interiorismo comercial madrid",
    "interiorismo canarias",
    "shop in shop madrid",
    "escaparatismo profesional",
    "diseño perfumería",
    "diseño cosmética",
    "arquitectura comercial",
    "espacios comerciales premium",
    "interiorismo tiendas",
    "renovar imagen tienda",
  ],
  authors: [{ name: "Dos x Dos Grupo Imagen" }],
  creator: "Dos x Dos Grupo Imagen",
  publisher: "Dos x Dos Grupo Imagen",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://dospordosgrupoimagen.com",
    title:
      "Dos x Dos Grupo Imagen - Diseño, fabricación y montaje de espacios comerciales",
    description:
      "Más de 38 años creando soluciones integrales en diseño, fabricación y montaje de espacios para retail, ferias y promociones. Especialistas en Madrid y Canarias.",
    images: [
      {
        url: "/assets/img/homepage/slider-3.avif",
        width: 1200,
        height: 630,
        alt: "Diseño, fabricación y montaje de espacios comerciales - Dos x Dos Grupo Imagen",
      },
      {
        url: "/assets/img/logo_full_rojo.png",
        width: 800,
        height: 600,
        alt: "Logo Dos x Dos Grupo Imagen",
      },
    ],
    siteName: "Dos x Dos Grupo Imagen",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Dos x Dos Grupo Imagen - Diseño, fabricación y montaje de espacios comerciales",
    description:
      "Más de 38 años creando soluciones integrales en diseño, fabricación y montaje de espacios para retail, ferias y promociones.",
    images: ["/assets/img/homepage/slider-3.avif"],
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico?v=1",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        url: "/assets/img/logo/logo_fondo_rojo.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [{ url: "/assets/img/logo/logo_fondo_rojo.png" }],
  },
  // verification: {
  //   google: "your-google-site-verification-code", // Uncomment and add your verification code
  //   other: {
  //     'msvalidate.01': 'your-bing-verification-code', // Bing verification
  //   },
  // },
  alternates: {
    canonical: "https://dospordosgrupoimagen.com",
    languages: {
      "es-ES": "https://dospordosgrupoimagen.com",
      // "en-US": "https://dospordosgrupoimagen.com/en", // Future English version
    },
  },
  category: "Design, Manufacturing & Installation Services",
  other: {
    "theme-color": "#e63322",
    "msapplication-TileColor": "#e63322",
    "application-name": "Dos x Dos Grupo Imagen",
    "apple-mobile-web-app-title": "Dos x Dos",
    "geo.region": "ES-MD;ES-CN",
    "geo.placename": "Madrid, Spain;Las Palmas de Gran Canaria, Spain",
    ICBM: "40.4168,-3.7038;28.1248,-15.4300",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Define structured data schemas as clean objects
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://dospordosgrupoimagen.com/#organization",
    name: "Dos x Dos Grupo Imagen",
    alternateName: "Dos por Dos Grupo Imagen",
    url: "https://dospordosgrupoimagen.com",
    logo: {
      "@type": "ImageObject",
      url: "https://dospordosgrupoimagen.com/assets/img/logo_full_rojo.png",
      width: 800,
      height: 600,
    },
    description:
      "Más de 38 años creando soluciones integrales en diseño, fabricación y montaje de espacios para retail, ferias y promociones. Especialistas en espacios comerciales de lujo en Madrid y Canarias.",
    foundingDate: "1986",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: "45+",
    },
    address: [
      {
        "@type": "PostalAddress",
        addressLocality: "Madrid",
        addressRegion: "Madrid",
        addressCountry: "ES",
        name: "Oficina Madrid",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Las Palmas de Gran Canaria",
        addressRegion: "Canarias",
        addressCountry: "ES",
        name: "Oficina Las Palmas",
      },
    ],
    areaServed: [
      {
        "@type": "Place",
        name: "Madrid",
      },
      {
        "@type": "Place",
        name: "Canarias",
      },
      {
        "@type": "Country",
        name: "España",
      },
    ],
    serviceType: [
      "Diseño de Espacios Comerciales",
      "Fabricación de Espacios Comerciales",
      "Montaje de Espacios Comerciales",
      "Espacios para Retail",
      "Diseño de Ferias",
      "Espacios para Promociones",
      "Shop in Shop",
      "Escaparatismo",
      "Diseño de Espacios de Perfumería",
      "Diseño de Espacios de Cosmética",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      ratingCount: "94",
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [
      "https://www.linkedin.com/company/dos-por-dos-grupo-imagen/",
      "https://www.instagram.com/dosxdos.grupoimagen/",
      "https://www.facebook.com/dosxdos.grupoimagen/",
      "https://www.youtube.com/channel/UCqZDFnB0lrlDv6pNnfx2GKQ",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://dospordosgrupoimagen.com/#website",
    url: "https://dospordosgrupoimagen.com",
    name: "Dos x Dos Grupo Imagen",
    description:
      "Más de 38 años creando soluciones integrales en diseño, fabricación y montaje de espacios para retail, ferias y promociones",
    publisher: {
      "@id": "https://dospordosgrupoimagen.com/#organization",
    },
    inLanguage: "es-ES",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://dospordosgrupoimagen.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://dospordosgrupoimagen.com/#localbusiness",
    name: "Dos x Dos Grupo Imagen",
    image: "https://dospordosgrupoimagen.com/assets/img/homepage/slider-3.avif",
    address: [
      {
        "@type": "PostalAddress",
        addressLocality: "Madrid",
        addressRegion: "Madrid",
        addressCountry: "ES",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Las Palmas de Gran Canaria",
        addressRegion: "Canarias",
        addressCountry: "ES",
      },
    ],
    geo: [
      {
        "@type": "GeoCoordinates",
        latitude: 40.4168,
        longitude: -3.7038, // Madrid coordinates
      },
      {
        "@type": "GeoCoordinates",
        latitude: 28.1248,
        longitude: -15.43, // Las Palmas coordinates
      },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      reviewCount: "94",
    },
    priceRange: "€€",
  };

  return (
    <html lang="es">
      <head>
        {/* Structured Data using reusable JsonLd component */}
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <JsonLd data={localBusinessSchema} />

        {/* Font preloads for critical fonts only */}
        <link
          rel="preload"
          href="/assets/fonts/BigShouldersDisplay-SemiBold.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/assets/fonts/BigShouldersDisplay-Bold.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/assets/fonts/Sarabun-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />

        {/* Critical resource preloading for performance */}
        <link
          rel="preload"
          href="/assets/img/homepage/slider-3.avif"
          as="image"
          type="image/avif"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/assets/img/homepage/slider-1.avif"
          as="image"
          type="image/avif"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/assets/img/homepage/slider-2.avif"
          as="image"
          type="image/avif"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/assets/img/team/dospodos_personal_oficina-3.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/assets/img/about-us-page/equipo-1.avif"
          as="image"
          type="image/avif"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/assets/img/about-us-page/equipo-2.avif"
          as="image"
          type="image/avif"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/assets/img/about-us-page/equipo-3.avif"
          as="image"
          type="image/avif"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/assets/img/about-us-page/vicente-ferrer-illustration.avif"
          as="image"
          type="image/avif"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/assets/img/servicios/hero-servicios.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/assets/img/portfolio/hero-portfolio.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />

        {/* Resource hints for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>

      <AuthProvider>
        <DataPreloader>
          <body
            className={`${bigShoulders.variable} ${sarabun.variable}`}
            suppressHydrationWarning
          >
            <Menu />
            <InstantLoadingOverlay />
            {children}
            <BackToTop />
            <CookieConsentBanner />
          </body>
        </DataPreloader>
      </AuthProvider>
    </html>
  );
}
