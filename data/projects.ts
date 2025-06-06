import { Project, ProjectCategory } from "@/types/project-types";

export const projects: Project[] = [
  {
    id: "01",
    title: "Sabina Siam",
    slug: "sabina-siam-costa-adeje",
    category: "escaparatismo",
    client: "Marca Fashion",
    date: "2024-02-15",
    location: "Costa Adeje",
    image: "/assets/img/homepage/Sabina Siam .webp",
    images: [
      "/assets/img/blog/color-psychology.jpg",
      "/assets/img/blog/minimalist-spaces.jpg",
      "/assets/img/blog/typography-design.jpg",
      "/assets/img/blog/responsive-design.jpg",
      "/assets/img/blog/commercial-photography.jpg",
      "/assets/img/blog/visual-marketing.jpg",
      "/assets/img/blog/responsive-design.jpg",
      "/assets/img/blog/color-psychology.jpg",
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
      portfolioPage: true,
      masProyectosPage: false,
    },
    tags: ["Moda", "Innovación", "Sostenibilidad"],
  },
  {
    id: "02",
    title: "Despacho Domingo Alonso",
    slug: "despacho-domingo-alonso-las-palmas",
    category: "espacios-promocionales",
    client: "Tech Solutions",
    date: "2023-11-10",
    location: "Las Palmas",
    image: "/assets/img/homepage/Despacho Domingo Alonso.webp",
    images: [
      "/assets/img/blog/commercial-photography.jpg",
      "/assets/img/blog/visual-marketing.jpg",
      "/assets/img/blog/responsive-design.jpg",
      "/assets/img/blog/color-psychology.jpg",
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
      portfolioPage: true,
      masProyectosPage: false,
    },
    tags: ["Tecnología", "Ferias", "Experiencia interactiva"],
  },
  {
    id: "03",
    title: "Urban Lifestyle sport",
    slug: "urban-lifestyle-sport-maspalomas",
    category: "interiorismo-comercial",
    client: "Beauty World",
    date: "2023-09-22",
    location: "Maspalomas",
    image: "/assets/img/homepage/Urban lifestyle.webp",
    images: [
      "/assets/img/blog/neurodesign.jpg",
      "/assets/img/blog/minimalist-spaces.jpg",
      "/assets/img/blog/responsive-design.jpg",
      "/assets/img/blog/color-psychology.jpg",
      "/assets/img/blog/commercial-photography.jpg",
      "/assets/img/blog/visual-marketing.jpg",
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
      portfolioPage: true,
      masProyectosPage: false,
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
      "/assets/img/blog/commercial-photography.jpg",
      "/assets/img/blog/visual-marketing.jpg",
      "/assets/img/blog/responsive-design.jpg",
      "/assets/img/blog/color-psychology.jpg",
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
      portfolioPage: true,
      masProyectosPage: false,
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
      "/assets/img/blog/commercial-photography.jpg",
      "/assets/img/blog/visual-marketing.jpg",
      "/assets/img/blog/responsive-design.jpg",
      "/assets/img/blog/color-psychology.jpg",
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
      portfolioPage: true,
      masProyectosPage: false,
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
      "/assets/img/blog/commercial-photography.jpg",
      "/assets/img/blog/visual-marketing.jpg",
      "/assets/img/blog/responsive-design.jpg",
      "/assets/img/blog/color-psychology.jpg",
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
      portfolioPage: true,
      masProyectosPage: false,
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
      "/assets/img/blog/commercial-photography.jpg",
      "/assets/img/blog/visual-marketing.jpg",
      "/assets/img/blog/responsive-design.jpg",
      "/assets/img/blog/color-psychology.jpg",
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
      portfolioPage: false,
      masProyectosPage: true,
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
      "/assets/img/blog/commercial-photography.jpg",
      "/assets/img/blog/visual-marketing.jpg",
      "/assets/img/blog/responsive-design.jpg",
      "/assets/img/blog/color-psychology.jpg",
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
      portfolioPage: false,
      masProyectosPage: true,
    },
    tags: ["Restauración", "Identidad corporativa", "Señalética"],
  },
  {
    id: "09",
    title: "Pop-up store para marca de perfumes",
    slug: "pop-up-perfumes",
    category: "perfumeria",
    client: "Esencia Natural",
    date: "2024-03-18",
    location: "Gran Canaria",
    image: "/assets/img/blog/neurodesign.jpg",
    images: [
      "/assets/img/blog/neurodesign.jpg",
      "/assets/img/blog/minimalist-spaces.jpg",
      "/assets/img/blog/responsive-design.jpg",
      "/assets/img/blog/color-psychology.jpg",
      "/assets/img/blog/commercial-photography.jpg",
      "/assets/img/blog/visual-marketing.jpg",
      "/assets/img/blog/responsive-design.jpg",
      "/assets/img/blog/color-psychology.jpg",
    ],
    description:
      "Diseño y construcción de pop-up store inmersiva para lanzamiento de nueva colección de fragancias.",
    longDescription:
      "Creamos un espacio efímero que transportaba a los visitantes a un jardín sensorial donde podían experimentar las fragancias en un entorno único. El diseño incorporaba elementos naturales como plantas vivas y agua, combinados con tecnología que liberaba aromas sutiles según la zona donde se encontraba el visitante. La instalación incluyó un sistema de proyección interactivo que reaccionaba al movimiento de las personas.",
    process:
      "El proceso comenzó con una fase de análisis estratégico, en la que evaluamos las necesidades del cliente y el contexto del espacio. A partir de ahí, desarrollamos un concepto creativo alineado con la identidad visual de la marca.",
    services: [
      "Diseño conceptual",
      "Producción e instalación",
      "Experiencia sensorial",
      "Tecnología interactiva",
    ],
    display: {
      homepage: false,
      portfolioPage: false,
      masProyectosPage: true,
    },
    tags: ["Perfumería", "Experiencia inmersiva", "Pop-up"],
  },
  {
    id: "10",
    title: "Showroom virtual para fabricante de muebles",
    slug: "showroom-virtual-muebles",
    category: "produccion-digital",
    client: "Hogar Design",
    date: "2024-01-28",
    location: "Madrid",
    image: "/assets/img/blog/visual-marketing.jpg",
    images: [
      "/assets/img/blog/visual-marketing.jpg",
      "/assets/img/blog/typography-design.jpg",
      "/assets/img/blog/color-psychology.jpg",
      "/assets/img/blog/commercial-photography.jpg",
      "/assets/img/blog/commercial-photography.jpg",
      "/assets/img/blog/visual-marketing.jpg",
      "/assets/img/blog/responsive-design.jpg",
      "/assets/img/blog/color-psychology.jpg",
    ],
    description:
      "Desarrollo de showroom virtual interactivo para presentación de nueva colección de mobiliario de diseño.",
    longDescription:
      "Creamos una experiencia digital inmersiva que permitía a los clientes explorar las nuevas colecciones de mobiliario en entornos virtuales realistas. El sistema incluía la posibilidad de configurar acabados y materiales en tiempo real, visualizar los muebles en diferentes ambientes y solicitar presupuestos personalizados. La plataforma se complementaba con realidad aumentada que permitía a los usuarios ver los productos en sus propios espacios a través de sus dispositivos móviles.",
    process:
      "El proceso comenzó con una fase de análisis estratégico, en la que evaluamos las necesidades del cliente y el contexto del espacio. A partir de ahí, desarrollamos un concepto creativo alineado con la identidad visual de la marca.",
    services: [
      "Modelado 3D",
      "Diseño UX/UI",
      "Desarrollo interactivo",
      "Integración AR",
    ],
    display: {
      homepage: false,
      portfolioPage: false,
      masProyectosPage: true,
    },
    tags: ["Mobiliario", "Realidad virtual", "Experiencia digital"],
  },
  {
    id: "11",
    title: "Rediseño flagship store electrónica",
    slug: "rediseno-flagship-electronica",
    category: "interiorismo-comercial",
    client: "TechWorld",
    date: "2023-10-05",
    location: "Barcelona",
    image: "/assets/img/blog/color-psychology.jpg",
    images: [
      "/assets/img/blog/color-psychology.jpg",
      "/assets/img/blog/minimalist-spaces.jpg",
      "/assets/img/blog/typography-design.jpg",
      "/assets/img/blog/responsive-design.jpg",
      "/assets/img/blog/commercial-photography.jpg",
      "/assets/img/blog/visual-marketing.jpg",
      "/assets/img/blog/responsive-design.jpg",
      "/assets/img/blog/color-psychology.jpg",
    ],
    description:
      "Renovación integral de tienda insignia de 350m² para marca líder en productos electrónicos.",
    longDescription:
      "Transformamos completamente la flagship store de esta marca de electrónica, creando un espacio que combina áreas de exposición de productos con zonas experienciales donde los clientes pueden probar los dispositivos en situaciones reales. El diseño incluye un sistema modular de mobiliario que permite reconfigurar el espacio según las necesidades de cada temporada, pantallas interactivas integradas en las paredes y un sistema de iluminación programable que crea diferentes ambientes a lo largo del día.",
    process:
      "El proceso comenzó con una fase de análisis estratégico, en la que evaluamos las necesidades del cliente y el contexto del espacio. A partir de ahí, desarrollamos un concepto creativo alineado con la identidad visual de la marca.",
    services: [
      "Arquitectura comercial",
      "Diseño de experiencia",
      "Mobiliario técnico",
      "Sistemas audiovisuales",
      "Dirección de obra",
    ],
    display: {
      homepage: false,
      portfolioPage: false,
      masProyectosPage: true,
    },
    tags: ["Tecnología", "Flagship", "Experiencia de marca"],
  },
  {
    id: "12",
    title: "Activación de marca en festival de música",
    slug: "activacion-festival-musica",
    category: "espacios-promocionales",
    client: "Bebida Energética XForce",
    date: "2023-07-22",
    location: "Valencia",
    image: "/assets/img/blog/responsive-design.jpg",
    images: [
      "/assets/img/blog/responsive-design.jpg",
      "/assets/img/blog/color-psychology.jpg",
      "/assets/img/blog/minimalist-spaces.jpg",
      "/assets/img/blog/typography-design.jpg",
      "/assets/img/blog/commercial-photography.jpg",
      "/assets/img/blog/visual-marketing.jpg",
      "/assets/img/blog/responsive-design.jpg",
      "/assets/img/blog/color-psychology.jpg",
    ],
    description:
      "Diseño y producción de espacio experiencial de 80m² para activación de marca en festival de música electrónica.",
    longDescription:
      "Creamos un espacio inmersivo que se convirtió en uno de los puntos más fotografiados del festival. La instalación incluía una zona de chill-out con iluminación reactiva al sonido, un área de experiencias donde los asistentes podían crear contenido para redes sociales, y una barra de degustación con efectos visuales especiales. El diseño incorporaba materiales reflectantes y elementos cinéticos que creaban un ambiente dinámico en sintonía con la música electrónica del festival.",
    process:
      "El proceso comenzó con una fase de análisis estratégico, en la que evaluamos las necesidades del cliente y el contexto del espacio. A partir de ahí, desarrollamos un concepto creativo alineado con la identidad visual de la marca.",
    services: [
      "Diseño experiencial",
      "Producción efímera",
      "Tecnología interactiva",
      "Activación de marca",
    ],
    display: {
      homepage: false,
      portfolioPage: false,
      masProyectosPage: true,
    },
    tags: ["Música", "Evento", "Experiencia de marca"],
  },
  {
    id: "13",
    title: "Campaña visual para hotel boutique",
    slug: "campana-hotel-boutique",
    category: "otros-servicios",
    client: "Oasis Urban",
    date: "2024-04-10",
    location: "Gran Canaria",
    image: "/assets/img/blog/minimalist-spaces.jpg",
    images: [
      "/assets/img/blog/minimalist-spaces.jpg",
      "/assets/img/blog/color-psychology.jpg",
      "/assets/img/blog/typography-design.jpg",
      "/assets/img/blog/neurodesign.jpg",
      "/assets/img/blog/commercial-photography.jpg",
      "/assets/img/blog/visual-marketing.jpg",
      "/assets/img/blog/responsive-design.jpg",
      "/assets/img/blog/color-psychology.jpg",
    ],
    description:
      "Desarrollo de identidad visual y materiales promocionales para nuevo hotel boutique en zona histórica.",
    longDescription:
      "Creamos una identidad visual completa para este hotel boutique que refleja su combinación única de historia y diseño contemporáneo. El proyecto incluyó sesiones fotográficas especializadas de interiores y experiencias, desarrollo de material gráfico impreso y digital, y elementos visuales para sus canales de comunicación. El concepto creativo se basó en la idea de 'oasis urbano', contrastando elementos de naturaleza con el entorno histórico del edificio.",
    process:
      "El proceso comenzó con una fase de análisis estratégico, en la que evaluamos las necesidades del cliente y el contexto del espacio. A partir de ahí, desarrollamos un concepto creativo alineado con la identidad visual de la marca.",
    services: [
      "Dirección de arte",
      "Fotografía arquitectónica",
      "Diseño editorial",
      "Contenido digital",
    ],
    display: {
      homepage: false,
      portfolioPage: false,
      masProyectosPage: true,
    },
    tags: ["Hostelería", "Branding", "Fotografía"],
  },
  // Add these 2 projects to your existing array:

  {
    id: "14",
    title: "Corner farmacia Armas",
    slug: "corner-farmacia-armas",
    category: "perfumeria",
    client: "Farmacia Armas",
    date: "2024-05-15",
    location: "Las Palmas",
    image: "/assets/img/blog/commercial-photography.jpg",
    images: [
      "/assets/img/blog/commercial-photography.jpg",
      "/assets/img/blog/color-psychology.jpg",
      "/assets/img/blog/minimalist-spaces.jpg",
      "/assets/img/blog/typography-design.jpg",
    ],
    description:
      "Diseño de corner especializado en cosmética y perfumería para farmacia moderna.",
    longDescription:
      "Creamos un espacio dedicado dentro de la farmacia que eleva la experiencia de compra de productos de belleza y cuidado personal.",
    process:
      "El proceso comenzó con una fase de análisis estratégico, en la que evaluamos las necesidades del cliente y el contexto del espacio.",
    services: [
      "Diseño de interiores",
      "Mobiliario especializado",
      "Iluminación",
      "Visual merchandising",
    ],
    display: {
      homepage: false,
      portfolioPage: true,
      masProyectosPage: false,
    },
    tags: ["Farmacia", "Cosmética", "Retail"],
  },

  {
    id: "15",
    title: "Espacio promocional Centro Atlántico",
    slug: "espacio-promocional-centro-atlantico",
    category: "espacios-promocionales",
    client: "Centro Atlántico",
    date: "2024-04-22",
    location: "Vecindario",
    image: "/assets/img/blog/visual-marketing.jpg",
    images: [
      "/assets/img/blog/visual-marketing.jpg",
      "/assets/img/blog/typography-design.jpg",
      "/assets/img/blog/responsive-design.jpg",
      "/assets/img/blog/color-psychology.jpg",
    ],
    description:
      "Diseño de stand temporal para promoción de nueva marca de lifestyle en centro comercial.",
    longDescription:
      "Creamos un espacio atractivo y funcional que maximiza la visibilidad de la marca y facilita la interacción con los clientes potenciales.",
    process:
      "El proceso comenzó con una fase de análisis estratégico, en la que evaluamos las necesidades del cliente y el contexto del espacio.",
    services: [
      "Diseño conceptual",
      "Producción",
      "Montaje",
      "Gráfica promocional",
    ],
    display: {
      homepage: false,
      portfolioPage: true,
      masProyectosPage: false,
    },
    tags: ["Promoción", "Centro comercial", "Lifestyle"],
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
