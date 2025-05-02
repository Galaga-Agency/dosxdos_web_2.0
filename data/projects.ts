import { Project, ProjectCategory } from "@/types/project-types";

// All projects in one single array
export const projects: Project[] = [
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
      "/assets/img/blog/responsive-design.jpg",
    ],
    description:
      "Diseño y creación de escaparate conceptual con materiales sostenibles para tienda de moda urbana.",
    longDescription:
      "Creamos un escaparate innovador que combina materiales reciclados con tecnología interactiva. El diseño incluye elementos móviles que responden a la presencia de los transeúntes, cambiando la iluminación y la disposición de las prendas destacadas. Integramos materiales sostenibles como madera reciclada y tejidos orgánicos que refuerzan el compromiso de la marca con la sostenibilidad.",
    process:
      "El proceso comenzó con una fase de análisis estratégico, en la que evaluamos las necesidades del cliente y el contexto del espacio. A partir de ahí, desarrollamos un concepto creativo alineado con la identidad visual de la marca.",
    services: [
      "Diseño conceptual",
      "Fabricación de elementos",
      "Instalación",
      "Iluminación especializada",
    ],
    display: {
      homepage: true,
      portfolioPage: true
    },
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
      "/assets/img/blog/visual-marketing.jpg",
      "/assets/img/blog/responsive-design.jpg",
      "/assets/img/blog/color-psychology.jpg",
    ],
    description:
      "Creación de un stand modular de 50m² para presentación de productos tecnológicos en una feria internacional.",
    longDescription:
      "Diseñamos y construimos un stand completamente personalizado que destacó entre la competencia. El espacio incluía zonas de demostración interactiva, área de reuniones privada, y un escenario central para presentaciones. Utilizamos una combinación de materiales de alta gama y tecnología audiovisual avanzada para crear una experiencia inmersiva que atrajo a más de 1,500 visitantes durante los tres días de la feria.",
    process:
      "El proceso comenzó con una fase de análisis estratégico, en la que evaluamos las necesidades del cliente y el contexto del espacio. A partir de ahí, desarrollamos un concepto creativo alineado con la identidad visual de la marca.",
    services: [
      "Diseño 3D",
      "Producción",
      "Montaje y desmontaje",
      "Gráfica corporativa",
      "Mobiliario personalizado",
    ],
    display: {
      homepage: true,
      portfolioPage: true
    },
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
      "/assets/img/blog/minimalist-spaces.jpg",
      "/assets/img/blog/responsive-design.jpg",
      "/assets/img/blog/color-psychology.jpg",
    ],
    description:
      "Renovación completa del interior de una tienda de cosméticos de 120m², incluyendo mobiliario a medida y nueva iluminación.",
    longDescription:
      "Este proyecto de interiorismo comercial transformó por completo una tienda de cosméticos tradicional en un espacio contemporáneo y experiencial. Desarrollamos un concepto basado en la naturaleza y la pureza, utilizando materiales ecológicos y sistemas de iluminación que realzan los productos. Diseñamos y fabricamos mobiliario a medida que maximiza el espacio de exhibición mientras crea un flujo intuitivo para los clientes.",
    process:
      "El proceso comenzó con una fase de análisis estratégico, en la que evaluamos las necesidades del cliente y el contexto del espacio. A partir de ahí, desarrollamos un concepto creativo alineado con la identidad visual de la marca.",
    services: [
      "Proyecto arquitectónico",
      "Diseño de interiores",
      "Mobiliario a medida",
      "Iluminación",
      "Dirección de obra",
    ],
    display: {
      homepage: true,
      portfolioPage: true
    },
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
      "/assets/img/blog/color-psychology.jpg",
      "/assets/img/blog/minimalist-spaces.jpg",
      "/assets/img/blog/typography-design.jpg",
    ],
    description:
      "Desarrollo de elementos visuales para campaña de lanzamiento de nueva línea de productos alimenticios saludables.",
    longDescription:
      "Para el lanzamiento de esta nueva línea de productos, creamos una identidad visual completa que incluía fotografía de producto, materiales impresos y digitales para punto de venta, y elementos para redes sociales. El concepto visual se centró en la frescura y naturalidad de los ingredientes, utilizando una paleta de colores vivos y fotografía de alta calidad.",
    process:
      "El proceso comenzó con una fase de análisis estratégico, en la que evaluamos las necesidades del cliente y el contexto del espacio. A partir de ahí, desarrollamos un concepto creativo alineado con la identidad visual de la marca.",
    services: [
      "Dirección creativa",
      "Fotografía de producto",
      "Diseño gráfico",
      "Producción de materiales",
      "Marketing visual",
    ],
    display: {
      homepage: false,
      portfolioPage: true
    },
    tags: ["Alimentación", "Lanzamiento", "Branding"],
  },
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
      "/assets/img/blog/color-psychology.jpg",
      "/assets/img/blog/typography-design.jpg",
      "/assets/img/blog/neurodesign.jpg",
    ],
    description:
      "Renovación integral de boutique de lujo de 200m² en zona premium comercial, incluyendo mobiliario exclusivo e iluminación personalizada.",
    longDescription:
      "Este proyecto de interiorismo comercial elevó la experiencia de compra de una boutique de lujo mediante un diseño sofisticado y contemporáneo. Utilizamos materiales exclusivos como mármol, latón cepillado y maderas nobles para crear un ambiente de elegancia atemporal. La iluminación fue cuidadosamente diseñada para realzar las prendas y accesorios, creando diferentes ambientes según las colecciones.",
    process:
      "El proceso comenzó con una fase de análisis estratégico, en la que evaluamos las necesidades del cliente y el contexto del espacio. A partir de ahí, desarrollamos un concepto creativo alineado con la identidad visual de la marca.",
    services: [
      "Diseño de interiores",
      "Mobiliario a medida",
      "Iluminación",
      "Materiales exclusivos",
    ],
    display: {
      homepage: false,
      portfolioPage: true
    },
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
    image: "/assets/img/blog/typography-design.jpg",
    images: [
      "/assets/img/blog/typography-design.jpg",
      "/assets/img/blog/color-psychology.jpg",
      "/assets/img/blog/minimalist-spaces.jpg",
      "/assets/img/blog/responsive-design.jpg",
    ],
    description:
      "Diseño y producción de expositor interactivo para nueva línea de zapatillas deportivas en centro comercial.",
    longDescription:
      "Creamos un expositor interactivo que permitía a los visitantes experimentar con las características de las nuevas zapatillas a través de una pantalla táctil y elementos físicos. El diseño incluía un sistema de iluminación específico que destacaba las tecnologías de los productos y un área de prueba donde los clientes podían experimentar la sensación de los diferentes modelos.",
    process:
      "El proceso comenzó con una fase de análisis estratégico, en la que evaluamos las necesidades del cliente y el contexto del espacio. A partir de ahí, desarrollamos un concepto creativo alineado con la identidad visual de la marca.",
    services: [
      "Diseño 3D",
      "Fabricación",
      "Instalación",
      "Gráfica promocional",
    ],
    display: {
      homepage: false,
      portfolioPage: true
    },
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
      "/assets/img/blog/typography-design.jpg",
      "/assets/img/blog/color-psychology.jpg",
      "/assets/img/blog/commercial-photography.jpg",
    ],
    description:
      "Creación de escaparate temático navideño para joyería de lujo, combinando elementos tradicionales con innovación tecnológica.",
    longDescription:
      "Diseñamos un concepto de escaparate navideño único que transformó la fachada de esta prestigiosa joyería en una experiencia visual memorable. Combinamos elementos tradicionales navideños reinterpretados con materiales de lujo como cristal, terciopelo y oro, con tecnología LED programable que creaba diferentes escenas a lo largo del día. El diseño incluía pedestales flotantes y vitrinas giratorias que destacaban las piezas más exclusivas de la colección.",
    process:
      "El proceso comenzó con una fase de análisis estratégico, en la que evaluamos las necesidades del cliente y el contexto del espacio. A partir de ahí, desarrollamos un concepto creativo alineado con la identidad visual de la marca.",
    services: [
      "Diseño conceptual",
      "Elementos decorativos",
      "Iluminación especializada",
      "Instalación",
    ],
    display: {
      homepage: false,
      portfolioPage: false
    },
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
      "/assets/img/blog/responsive-design.jpg",
      "/assets/img/blog/color-psychology.jpg",
      "/assets/img/blog/minimalist-spaces.jpg",
    ],
    description:
      "Desarrollo de sistema de señalética para cadena de restaurantes, incluyendo exteriores, interiores y elementos digitales.",
    longDescription:
      "Creamos un sistema completo de señalética para esta cadena nacional de restaurantes, abarcando desde la rotulación exterior hasta la señalización de espacios interiores y menús digitales. El proyecto incluyó el diseño de una familia tipográfica exclusiva y un sistema coherente de pictogramas que reforzaban la identidad de marca. La implementación se realizó en 12 establecimientos distribuidos por toda España.",
    process:
      "El proceso comenzó con una fase de análisis estratégico, en la que evaluamos las necesidades del cliente y el contexto del espacio. A partir de ahí, desarrollamos un concepto creativo alineado con la identidad visual de la marca.",
    services: [
      "Diseño gráfico",
      "Producción",
      "Instalación",
      "Señalética digital",
    ],
    display: {
      homepage: false,
      portfolioPage: false
    },
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