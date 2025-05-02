import { MenuItem, CtaButton } from "@/types/menu-types";

export const menuItems: MenuItem[] = [
  {
    id: "sobre-nosotros",
    label: "Sobre Nosotros",
    href: "/sobre-nosotros/equipo",
    children: [
      {
        id: "equipo",
        label: "Equipo",
        href: "/sobre-nosotros/equipo",
      },
      {
        id: "accion-social",
        label: "Acción social",
        href: "/sobre-nosotros/accion-social",
      },
      {
        id: "nuestro-espacio",
        label: "Nuestro espacio",
        href: "/sobre-nosotros/nuestro-espacio",
      },
    ],
  },
  {
    id: "servicios",
    label: "Servicios",
    href: "/servicios",
    children: [
      {
        id: "interiorismo-comercial",
        label: "Interiorismo comercial",
        href: "/portfolio/interiorismo-comercial",
      },
      {
        id: "produccion-digital",
        label: "Producción digital",
        href: "/portfolio/produccion-digital",
      },
      {
        id: "perfumeria",
        label: "Perfumería",
        href: "/portfolio/perfumeria",
      },
      {
        id: "shop-in-shop",
        label: "Shop in shop",
        href: "/portfolio/shop-in-shop",
      },
      {
        id: "escaparatismo",
        label: "Escaparatismo",
        href: "/portfolio/escaparatismo",
      },
      {
        id: "espacios-promocionales",
        label: "Espacios promocionales",
        href: "/portfolio/espacios-promocionales",
      },
      // {
      //   id: "pergolas",
      //   label: "Pérgolas",
      //   href: "/portfolio/pergolas",
      // },
    ],
  },
  {
    id: "portfolio",
    label: "Portfolio",
    href: "/portfolio-2",
  },
  {
    id: "blog",
    label: "Blog",
    href: "/blog",
  },
  {
    id: "contacto",
    label: "Contacto",
    href: "/contacto",
  },
];

export const ctaButton: CtaButton = {
  label: "Solicite Presupuesto",
  href: "/contacto",
};
