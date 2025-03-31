import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/main.scss";
import Menu from "@/components/layout/Menu/Menu";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";
import Footer from "@/components/layout/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dospordosgrupoimagen.com/"),
  title: {
    default: "Dos x Dos Grupo Imagen | Diseño de Interiores Comerciales",
    template: "%s | Dos x Dos Grupo Imagen", // so for example we see "Sobre Nosotros | Dos x Dos Grupo Imagen" in About us page
  },
  description:
    "Especialistas en diseño de interiores para espacios comerciales de lujo en Madrid y Canarias. Más de 35 años de experiencia creando experiencias únicas para marcas de cosmética y perfumería.",
  keywords: [
    "diseño de interiores",
    "espacios comerciales",
    "interiorismo",
    "shop in shop",
    "escaparatismo",
    "perfumería",
    "diseño de marca",
    "madrid",
    "canarias",
  ],
  authors: [{ name: "Dos x Dos Grupo Imagen" }],
  creator: "Dos x Dos Grupo Imagen",
  publisher: "Dos x Dos Grupo Imagen",
  robots: "index, follow", //standard setting for a business website that wants to be found in search results and have its link structure crawled by search engines.
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://dospordosgrupoimagen.com",
    title: "Dos x Dos Grupo Imagen - Diseño de Interiores Comerciales",
    description:
      "Especialistas en diseño de interiores para espacios comerciales de lujo en Madrid y Canarias. Más de 35 años de experiencia creando experiencias únicas para marcas de cosmética y perfumería.",
    images: [
      {
        url: "/assets/img/logo_full_rojo.png", // Image that show when website is shared ass link in social media
        width: 1200,
        height: 630,
        alt: "Dos x Dos Grupo Imagen - Diseño de Interiores Comerciales",
      },
    ],
    siteName: "Dos x Dos Grupo Imagen",
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico", // Added favicon explicitly
        sizes: "any",
        type: "image/x-icon",
      },
      {
        url: "/assets/img/icons/icon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        url: "/assets/img/icons/icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        url: "/assets/img/icons/icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        url: "/assets/img/icons/icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        url: "/assets/img/icons/icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        url: "/assets/img/icons/icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        url: "/assets/img/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/assets/img/icons/icon-256x256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        url: "/assets/img/icons/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        url: "/assets/img/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [{ url: "/assets/img/logo/logo_fondo_rojo.png" }], //Special icon used when someone adds website to their iOS home screen
  },
  // verification: {
  //   google: "your-google-site-verification-code", // Replace with actual verification code
  //   // other search console verifications if needed
  // },
  alternates: {
    canonical: "https://dospordosgrupoimagen.com", // tells search engines the "preferred" version of a page
    languages: {
      "es-ES": "https://dospordosgrupoimagen.com/es",
      // "en-US": "https://dospordosgrupoimagen.com/en",
    },
  },
  category: "Interior Design Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Menu />
        {children}
      </body>
    </html>
  );
}
