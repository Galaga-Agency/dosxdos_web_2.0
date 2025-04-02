import { BlogPost } from "@/types/blog-post-types";

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Diseño Moderno: Tendencias 2024",
    content: "Descripción detallada del artículo sobre diseño moderno...",
    date: "15.04.2024",
    category: "Diseño",
    author: "María Rodríguez",
    img: "/assets/img/blog/procesos-oficina.jpg",
    excerpt:
      "Descubre las últimas tendencias en diseño que están transformando el mundo visual este año.",
  },
  {
    id: "2",
    title: "Innovación en Imagen Corporativa",
    content: "Análisis profundo de estrategias de branding...",
    date: "22.03.2024",
    category: "Branding",
    author: "Carlos Martínez",
    img: "/assets/img/blog/corporate-branding.jpg",
    excerpt:
      "Cómo las empresas están reinventando su identidad visual en la era digital.",
  },
  {
    id: "3",
    title: "El Poder del Diseño Web Responsivo",
    content: "Exploración de técnicas avanzadas para diseño web adaptable...",
    date: "05.03.2024",
    category: "Web",
    author: "Ana López",
    img: "/assets/img/blog/responsive-design.jpg",
    excerpt:
      "Por qué el diseño adaptable es más importante que nunca para la experiencia del usuario.",
  },
  {
    id: "4",
    title: "Fotografía Comercial: Capturando la Esencia de tu Marca",
    content: "Guía completa sobre fotografía para empresas y productos...",
    date: "18.02.2024",
    category: "Fotografía",
    author: "Roberto Sánchez",
    img: "/assets/img/blog/commercial-photography.jpg",
    excerpt:
      "Técnicas profesionales para destacar tus productos y servicios a través de imágenes impactantes.",
  },
  {
    id: "5",
    title: "El Minimalismo en el Diseño de Espacios Comerciales",
    content: "Análisis de tendencias minimalistas en espacios de retail...",
    date: "29.01.2024",
    category: "Espacios",
    author: "Laura Gómez",
    img: "/assets/img/blog/minimalist-spaces.jpg",
    excerpt:
      "Cómo el minimalismo está transformando la experiencia del cliente en tiendas físicas.",
  },
  {
    id: "6",
    title: "Storytelling Visual: Conectando con tu Audiencia",
    content:
      "Estrategias narrativas para crear conexiones emocionales a través del diseño...",
    date: "12.01.2024",
    category: "Marketing",
    author: "Diego Fernández",
    img: "/assets/img/blog/visual-storytelling.jpg",
    excerpt:
      "El arte de contar historias visuales que resuenan con tu público objetivo.",
  },
  {
    id: "7",
    title: "Tipografía en el Diseño: Más Allá de las Letras",
    content:
      "Exploración del impacto de la tipografía en la comunicación visual...",
    date: "28.12.2023",
    category: "Diseño",
    author: "Sofía Torres",
    img: "/assets/img/blog/typography-design.jpg",
    excerpt:
      "La importancia de elegir las fuentes adecuadas y cómo pueden transformar tu mensaje.",
  },
  {
    id: "8",
    title: "Neurodiseño: La Ciencia Detrás de la Estética",
    content:
      "Investigación sobre cómo el cerebro procesa elementos visuales...",
    date: "15.12.2023",
    category: "Innovación",
    author: "Javier Ruiz",
    img: "/assets/img/blog/neurodesign.jpg",
    excerpt:
      "Aplicando principios de neurociencia para crear diseños más efectivos y memorables.",
  },
  {
    id: "9",
    title: "Sostenibilidad en el Diseño Gráfico",
    content: "Prácticas eco-friendly para diseñadores y agencias...",
    date: "02.12.2023",
    category: "Sostenibilidad",
    author: "Carmen Vega",
    img: "/assets/img/blog/sustainable-design.jpg",
    excerpt:
      "Cómo reducir el impacto ambiental sin comprometer la calidad de tus diseños.",
  },
  {
    id: "10",
    title: "Tendencias en Diseño de Packaging 2024",
    content: "Análisis de las innovaciones en diseño de embalajes...",
    date: "20.11.2023",
    category: "Packaging",
    author: "Miguel Ángel Castro",
    img: "/assets/img/blog/packaging-trends.jpg",
    excerpt:
      "Las nuevas direcciones del packaging que están revolucionando la experiencia del consumidor.",
  },
  {
    id: "11",
    title: "El Impacto del Color en la Toma de Decisiones",
    content: "Estudio sobre psicología del color aplicada al marketing...",
    date: "07.11.2023",
    category: "Psicología",
    author: "Elena Martín",
    img: "/assets/img/blog/color-psychology.jpg",
    excerpt:
      "Cómo los colores influyen en las percepciones y comportamientos de los consumidores.",
  },
  {
    id: "12",
    title: "Diseño UX para Aplicaciones Móviles",
    content:
      "Mejores prácticas para interfaces de usuario en dispositivos móviles...",
    date: "25.10.2023",
    category: "UX/UI",
    author: "Pablo Hernández",
    img: "/assets/img/blog/mobile-ux.jpg",
    excerpt:
      "Principios de diseño centrado en el usuario para crear experiencias móviles excepcionales.",
  },
].map((post) => ({
  ...post,
  date: post.date.split(".").reverse().join("."),
}));
