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
        id: "consultoria",
        label: "Consultoría",
        href: "/servicios/consultoria",
      },
      {
        id: "diseno-de-interiores",
        label: "Diseño de Interiores",
        href: "/servicios/diseno-de-interiores",
      },
      {
        id: "fabricacion-impresion",
        label: "Fabricación e Impresión",
        href: "/servicios/fabricacion-impresion",
      },
      {
        id: "montaje-mantenimiento",
        label: "Montaje y Mantenimiento",
        href: "/servicios/montaje-mantenimiento",
      },
      {
        id: "comunicacion",
        label: "Comunicación",
        href: "/servicios/comunicacion",
      },
      {
        id: "eventos",
        label: "Eventos",
        href: "/servicios/eventos",
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
