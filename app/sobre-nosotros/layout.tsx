import React from "react";
import { Metadata } from "next";
import Script from "next/script";
import { generatePageMetadata } from "@/utils/seo-utils";
import JsonLd from "@/components/SEO/JsonLd";

export const metadata: Metadata = generatePageMetadata({
  title: "Sobre Nosotros - 35+ Años Diseñando Espacios Comerciales de Lujo",
  description:
    "Conoce al equipo de Dos x Dos Grupo Imagen. Más de 35 años creando espacios únicos para marcas de cosmética y perfumería en Madrid y Canarias. Descubre nuestra historia, valores y compromiso social.",
  keywords: [
    "equipo diseño interiores madrid",
    "interioristas canarias experiencia",
    "diseño espacios comerciales lujo",
    "historia dos por dos",
    "equipo interiorismo profesional",
    "acción social sostenibilidad",
    "valores empresa diseño",
    "compromiso social interiorismo",
  ],
  canonical: "https://dospordosgrupoimagen.com/sobre-nosotros",
  images: ["/assets/img/team/dospodos_personal_oficina-3.webp"],
  type: "website",
});

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Clean structured data objects
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Sobre Nosotros - Dos x Dos Grupo Imagen",
    description:
      "Conoce la historia, valores y equipo de Dos x Dos Grupo Imagen. Más de 35 años diseñando espacios comerciales únicos.",
    url: "https://dospordosgrupoimagen.com/sobre-nosotros",
    mainEntity: {
      "@type": "Organization",
      name: "Dos x Dos Grupo Imagen",
      foundingDate: "1989",
      numberOfEmployees: {
        "@type": "QuantitativeValue",
        value: "45+",
      },
      description:
        "Equipo multidisciplinar de arquitectos, interioristas, diseñadores y técnicos especializados en espacios comerciales de lujo.",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios de Diseño de Interiores",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Diseño de Interiores Comerciales",
              description:
                "Servicios integrales de diseño para espacios comerciales de lujo",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Interiorismo",
              description: "Diseño y decoración de interiores profesional",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Shop in Shop",
              description:
                "Diseño especializado de espacios dentro de grandes superficies",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Escaparatismo",
              description: "Diseño y montaje de escaparates profesionales",
            },
          },
        ],
      },
      workLocation: [
        {
          "@type": "Place",
          name: "Madrid",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Madrid",
            addressRegion: "Madrid",
            addressCountry: "ES",
          },
        },
        {
          "@type": "Place",
          name: "Las Palmas de Gran Canaria",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Las Palmas de Gran Canaria",
            addressRegion: "Canarias",
            addressCountry: "ES",
          },
        },
      ],
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: "https://dospordosgrupoimagen.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Sobre Nosotros",
          item: "https://dospordosgrupoimagen.com/sobre-nosotros",
        },
      ],
    },
  };

  const teamSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Equipo Dos x Dos Grupo Imagen",
    description:
      "Equipo profesional de más de 45 especialistas en diseño de interiores comerciales",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: "45+",
      unitText: "profesionales",
    },
    employee: [
      {
        "@type": "OrganizationRole",
        roleName: "Arquitectos",
        description:
          "Especialistas en arquitectura comercial y espacios de lujo",
      },
      {
        "@type": "OrganizationRole",
        roleName: "Interioristas",
        description: "Expertos en diseño de interiores y ambientación",
      },
      {
        "@type": "OrganizationRole",
        roleName: "Diseñadores",
        description:
          "Creativos especializados en conceptualización de espacios",
      },
      {
        "@type": "OrganizationRole",
        roleName: "Técnicos de Producción",
        description: "Especialistas en producción y montaje de proyectos",
      },
      {
        "@type": "OrganizationRole",
        roleName: "Instaladores",
        description: "Expertos en instalación y acabados de proyectos",
      },
    ],
    department: [
      {
        "@type": "Organization",
        name: "Departamento de Diseño",
        description: "Conceptualización y desarrollo creativo de proyectos",
      },
      {
        "@type": "Organization",
        name: "Departamento de Producción",
        description: "Gestión y ejecución técnica de proyectos",
      },
      {
        "@type": "Organization",
        name: "Departamento de Instalación",
        description: "Montaje y acabados finales de espacios",
      },
    ],
    knowsAbout: [
      "Diseño de Interiores Comerciales",
      "Espacios de Lujo",
      "Perfumería y Cosmética",
      "Shop in Shop",
      "Escaparatismo",
      "Retail Design",
      "Arquitectura Comercial",
      "Sostenibilidad en Diseño",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Cuántos años de experiencia tiene Dos x Dos Grupo Imagen?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dos x Dos Grupo Imagen cuenta con más de 35 años de experiencia en el diseño de interiores comerciales, especializándose en espacios de lujo para marcas de cosmética y perfumería.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuántos profesionales forman el equipo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nuestro equipo está formado por más de 45 profesionales, incluyendo arquitectos, interioristas, diseñadores, técnicos de producción e instaladores especializados en espacios comerciales.",
        },
      },
      {
        "@type": "Question",
        name: "¿En qué ciudades tienen oficinas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tenemos oficinas en Madrid y Las Palmas de Gran Canaria, lo que nos permite atender proyectos en toda España con especial enfoque en estas dos ubicaciones estratégicas.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué tipo de proyectos realizan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nos especializamos en diseño de interiores comerciales para marcas de lujo, incluyendo tiendas de cosmética y perfumería, espacios shop in shop, escaparatismo y arquitectura comercial integral.",
        },
      },
    ],
  };

  return (
    <>
      {/* Structured Data using reusable JsonLd component */}
      <JsonLd data={aboutPageSchema} />
      <JsonLd data={teamSchema} />
      <JsonLd data={faqSchema} />

      {/* Optimized image preloading script */}
      <Script id="preload-about-images" strategy="afterInteractive">
        {`
          (function preloadAboutImages() {
            // Prevent multiple executions
            if (sessionStorage.getItem('aboutUsImagesPreloaded')) return;
            
            // Optimized preload function
            const preloadImage = (url, priority = 'low') => {
              const link = document.createElement('link');
              link.rel = 'preload';
              link.as = 'image';
              link.href = url;
              link.fetchPriority = priority;
              document.head.appendChild(link);
            };
            
            // High priority images (above the fold)
            preloadImage('/assets/img/team/dospodos_personal_oficina-3.webp', 'high');
            preloadImage('/assets/img/about-us-page/equipo-1.avif', 'high');
            preloadImage('/assets/img/about-us-page/equipo-2.avif', 'high');
            
            // Medium priority images (likely to be seen)
            preloadImage('/assets/img/about-us-page/equipo-3.avif');
            preloadImage('/assets/img/about-us-page/accion-social-cta.webp');
            
            // Low priority team gallery images
            const teamImages = [
              'team-1-1', 'team-1-2', 'team-1-3', 'team-1-4', 'team-1-5',
              'team-1-6', 'team-1-7', 'team-1-8', 'team-1-9'
            ];
            
            teamImages.forEach(img => {
              preloadImage(\`/assets/img/team/\${img}.jpg\`);
            });
            
            // Foundation/social action images
            const socialImages = [
              'mil-caminos-illustration.jpg',
              'yrichen-illustration.webp', 
              'vicente-ferrer-illustration.avif'
            ];
            
            socialImages.forEach(img => {
              preloadImage(\`/assets/img/about-us-page/\${img}\`);
            });
            
            // Foundation logos
            const logos = [
              'vicente-ferrer-logo.svg',
              'yrichen-logo.webp',
              'mil-caminos-logo.png'
            ];
            
            logos.forEach(logo => {
              preloadImage(\`/assets/img/about-us-page/\${logo}\`);
            });
            
            // Mark as completed
            sessionStorage.setItem('aboutUsImagesPreloaded', 'true');
            
            // Optional: Log for debugging (remove in production)
            console.log('About Us images preloaded successfully');
          })();
        `}
      </Script>

      {children}
    </>
  );
}
