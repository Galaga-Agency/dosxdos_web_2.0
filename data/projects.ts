import { Project, ProjectCategory } from "@/types/project-types";

// Featured projects for the homepage
export const featuredProjects: Project[] = [
  {
    id: "01",
    title: "Escaparate innovador para tienda de moda",
    slug: "escaparate-tienda-moda",
    category: "escaparatismo",
    client: "Marca Fashion",
    date: "2024-02-15",
    location: "Gran Canaria",
    image: "/assets/img/blog/color-psychology.jpg",
    images: [
      "/assets/img/blog/color-psychology.jpg",
      "/assets/img/blog/minimalist-spaces.jpg",
      "/assets/img/blog/typography-design.jpg",
    ],
    description:
      "Diseño e implementación de un escaparate vanguardista para tienda de moda, que aumentó el tráfico peatonal en un 35% en el primer mes.",
    longDescription:
      "Para este prestigioso cliente del sector de la moda, creamos un concepto de escaparate que combina elementos tradicionales con tecnología interactiva. El diseño incluye paneles modulares que permiten actualizar fácilmente la presentación, iluminación LED programable que cambia según la hora del día, y elementos decorativos hechos con materiales sostenibles. El proyecto abarcó desde la conceptualización inicial hasta la instalación final, incluyendo la producción de todos los elementos visuales y estructurales.",
    services: [
      "Diseño conceptual",
      "Fabricación de elementos",
      "Instalación",
      "Iluminación especializada",
    ],
    featured: true,
    tags: ["Moda", "Innovación", "Sostenibilidad"],
  },
  {
    id: "02",
    title: "Stand promocional para feria internacional",
    slug: "stand-feria-internacional",
    category: "espacios-promocionales",
    client: "Tech Solutions",
    date: "2023-11-10",
    location: "Madrid",
    image: "/assets/img/blog/commercial-photography.jpg",
    images: [
      "/assets/img/blog/commercial-photography.jpg",
      "/assets/img/blog/corporate-branding.jpg",
      "/assets/img/blog/visual-marketing.jpg",
    ],
    description:
      "Creación de un stand modular de 50m² para presentación de productos tecnológicos en una feria internacional.",
    longDescription:
      "Diseñamos y construimos un stand completamente personalizado que destacó entre la competencia. El espacio incluía zonas de demostración interactiva, área de reuniones privada, y un escenario central para presentaciones. Utilizamos una combinación de materiales de alta gama y tecnología audiovisual avanzada para crear una experiencia inmersiva que atrajo a más de 1,500 visitantes durante los tres días de la feria. El diseño modular permite su reutilización en futuros eventos con diferentes configuraciones.",
    services: [
      "Diseño 3D",
      "Producción",
      "Montaje y desmontaje",
      "Gráfica corporativa",
      "Mobiliario personalizado",
    ],
    featured: true,
    tags: ["Tecnología", "Ferias", "Experiencia interactiva"],
  },
  {
    id: "03",
    title: "Reforma integral tienda cosméticos",
    slug: "reforma-tienda-cosmeticos",
    category: "interiorismo-comercial",
    client: "Beauty World",
    date: "2023-09-22",
    location: "Barcelona",
    image: "/assets/img/blog/neurodesign.jpg",
    images: [
      "/assets/img/blog/neurodesign.jpg",
      "/assets/img/blog/packaging-trends.jpg",
      "/assets/img/blog/sustainable-design.jpg",
      "/assets/img/blog/mobile-ux.jpg",
    ],
    description:
      "Renovación completa del interior de una tienda de cosméticos de 120m², incluyendo mobiliario a medida y nueva iluminación.",
    longDescription:
      "Este proyecto de interiorismo comercial transformó por completo una tienda de cosméticos tradicional en un espacio contemporáneo y experiencial. Desarrollamos un concepto basado en la naturaleza y la pureza, utilizando materiales ecológicos y sistemas de iluminación que realzan los productos. Diseñamos y fabricamos mobiliario a medida que maximiza el espacio de exhibición mientras crea un flujo intuitivo para los clientes. El resultado fue un aumento del 45% en ventas y un incremento significativo en el tiempo medio que los clientes pasan en la tienda.",
    services: [
      "Proyecto arquitectónico",
      "Diseño de interiores",
      "Mobiliario a medida",
      "Iluminación",
      "Dirección de obra",
    ],
    featured: true,
    tags: ["Retail", "Diseño sostenible", "Experiencia de compra"],
  },
  {
    id: "04",
    title: "Campaña visual para lanzamiento de producto",
    slug: "campana-lanzamiento-producto",
    category: "produccion-digital",
    client: "NutriLife",
    date: "2024-01-05",
    location: "Gran Canaria",
    image: "/assets/img/blog/responsive-design.jpg",
    images: [
      "/assets/img/blog/responsive-design.jpg",
      "/assets/img/blog/procesos-oficina.jpg",
      "/assets/img/blog/default-blog-image.jpg",
    ],
    description:
      "Desarrollo de elementos visuales para campaña de lanzamiento de nueva línea de productos alimenticios saludables.",
    longDescription:
      "Para el lanzamiento de esta nueva línea de productos, creamos una identidad visual completa que incluía fotografía de producto, materiales impresos y digitales para punto de venta, y elementos para redes sociales. El concepto visual se centró en la frescura y naturalidad de los ingredientes, utilizando una paleta de colores vivos y fotografía de alta calidad. La campaña incluyó desde grandes formatos para exterior hasta pequeños elementos para PDV y packaging especial para la promoción de lanzamiento.",
    services: [
      "Dirección creativa",
      "Fotografía de producto",
      "Diseño gráfico",
      "Producción de materiales",
      "Marketing visual",
    ],
    featured: true,
    tags: ["Alimentación", "Lanzamiento", "Branding"],
  },
];

// All projects for the projects page
export const allProjects: Project[] = [
  ...featuredProjects,
  {
    id: "05",
    title: "Diseño interior boutique de lujo",
    slug: "diseno-boutique-lujo",
    category: "interiorismo-comercial",
    client: "Elegance",
    date: "2023-06-14",
    location: "Madrid",
    image: "/assets/img/blog/minimalist-spaces.jpg",
    images: [
      "/assets/img/blog/minimalist-spaces.jpg",
      "/assets/img/blog/somos-e1637149862418.png",
    ],
    description:
      "Diseño de interiores para boutique de moda de lujo de 80m² en zona premium comercial.",
    services: [
      "Diseño de interiores",
      "Mobiliario a medida",
      "Iluminación",
      "Materiales exclusivos",
    ],
    featured: false,
    tags: ["Lujo", "Moda", "Experiencia premium"],
  },
  {
    id: "06",
    title: "Expositor para centro comercial",
    slug: "expositor-centro-comercial",
    category: "espacios-promocionales",
    client: "Sportify",
    date: "2023-04-20",
    location: "Sevilla",
    image: "/assets/img/blog/we-are-storytelling.jpg",
    images: ["/assets/img/blog/we-are-storytelling.jpg"],
    description:
      "Diseño y producción de expositor central para promoción de productos deportivos en centro comercial.",
    services: [
      "Diseño 3D",
      "Fabricación",
      "Instalación",
      "Gráfica promocional",
    ],
    featured: false,
    tags: ["Deportes", "Promoción", "Interactivo"],
  },
  {
    id: "07",
    title: "Escaparate navideño para joyería",
    slug: "escaparate-navidad-joyeria",
    category: "escaparatismo",
    client: "Diamond Dreams",
    date: "2023-12-01",
    location: "Valencia",
    image: "/assets/img/blog/visual-marketing.jpg",
    images: [
      "/assets/img/blog/visual-marketing.jpg",
      "/assets/img/blog/corporate-branding.jpg",
    ],
    description:
      "Creación de un espectacular escaparate temático navideño para tienda de joyería de alto nivel.",
    services: [
      "Diseño conceptual",
      "Elementos decorativos",
      "Iluminación especializada",
      "Instalación",
    ],
    featured: false,
    tags: ["Navidad", "Lujo", "Joyería"],
  },
  {
    id: "08",
    title: "Señalética integral para cadena de restaurantes",
    slug: "senaletica-restaurantes",
    category: "otros-servicios",
    client: "Sabor Gourmet",
    date: "2023-08-15",
    location: "Nacional",
    image: "/assets/img/blog/typography-design.jpg",
    images: [
      "/assets/img/blog/typography-design.jpg",
      "/assets/img/blog/packaging-trends.jpg",
    ],
    description:
      "Desarrollo e implementación de sistema de señalética para cadena de restaurantes con 12 locales.",
    services: [
      "Diseño gráfico",
      "Producción",
      "Instalación",
      "Señalética digital",
    ],
    featured: false,
    tags: ["Restauración", "Identidad corporativa", "Señalética"],
  },
];

// Categories for filtering
export const projectCategories: ProjectCategory[] = [
  { id: "all", name: "Todos" },
  { id: "escaparatismo", name: "Escaparatismo" },
  { id: "espacios-promocionales", name: "Espacios promocionales" },
  { id: "interiorismo-comercial", name: "Interiorismo comercial" },
  { id: "otros-servicios", name: "Otros servicios" },
  { id: "perfumeria", name: "Perfumería" },
  { id: "produccion-digital", name: "Producción digital" },
];
