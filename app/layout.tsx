import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/main.scss";
import Menu from "@/components/layout/Menu/Menu";
import BackToTop from "@/components/BackToTop/BackToTop";
import AuthProvider from "@/components/AuthProvider";
import PageTransition from "@/components/PageTransition/PageTransition";

const bigShoulders = localFont({
  variable: "--font-big-shoulders",
  display: "swap",
  src: [
    {
      path: "../public/assets/fonts/BigShouldersDisplay-Light.ttf",
      weight: "300",
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
      path: "../public/assets/fonts/BigShouldersDisplay-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/BigShouldersDisplay-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
});

const sarabun = localFont({
  variable: "--font-sarabun",
  display: "swap",
  src: [
    {
      path: "../public/assets/fonts/Sarabun-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/Sarabun-ThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../public/assets/fonts/Sarabun-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/Sarabun-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/assets/fonts/Sarabun-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/Sarabun-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/assets/fonts/Sarabun-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/Sarabun-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/assets/fonts/Sarabun-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/Sarabun-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/assets/fonts/Sarabun-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/Sarabun-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/assets/fonts/Sarabun-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/Sarabun-ExtraBoldItalic.ttf",
      weight: "800",
      style: "italic",
    },
  ],
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
        url: "/favicon.ico?v=1",
        sizes: "any",
        type: "image/x-icon",
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
      <AuthProvider>
        <body
          className={`${bigShoulders.variable} ${sarabun.variable}`}
          suppressHydrationWarning
        >
          <Menu />
          <PageTransition>{children}</PageTransition>
          <BackToTop />
        </body>
      </AuthProvider>
    </html>
  );
}
