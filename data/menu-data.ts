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
      // {
      //   id: "nuestro-espacio",
      //   label: "Nuestro espacio",
      //   href: "/sobre-nosotros/nuestro-espacio",
      // },
    ],
  },
  {
    id: "servicios",
    label: "Servicios",
    href: "/servicios",
    children: [
      {
        id: "diseno-de-interiores",
        label: "Diseño de Interiores",
        href: "/portfolio/diseno-de-interiores",
      },
      {
        id: "eventos",
        label: "Eventos",
        href: "/portfolio/eventos",
      },
      {
        id: "produccion",
        label: "Producción",
        href: "/portfolio/produccion",
      },
      {
        id: "logistica",
        label: "Logística",
        href: "/portfolio/logistica",
      },
      {
        id: "comunicacion",
        label: "Comunicación",
        href: "/portfolio/comunicacion",
      },
      {
        id: "consultoria",
        label: "Consultoría",
        href: "/portfolio/consultoria",
      },
    ],
  },
  {
    id: "portfolio",
    label: "Portfolio",
    href: "/portfolio",
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
