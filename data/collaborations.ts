export interface Collaboration {
  id: number;
  title: string;
  description: string;
  image: string;
  illustration: string;
  link: string;
}

export const collaborationData: Collaboration[] = [
  {
    id: 1,
    title: "Fundación Vicente Ferrer",
    description:
      "Cada año colaboramos con la Fundación Vicente Ferrer, comprometidos con el desarrollo y mejora de las condiciones de vida de las comunidades más desfavorecidas de Andhra Pradesh",
    image: "/assets/img/about-us-page/vicente-ferrer-logo.jpg",
    illustration: "/assets/img/about-us-page/vicente-ferrer-illustration.jpg",
    link: "https://www.fundacionvicenteferrer.org/",
  },
  {
    id: 2,
    title: "Fundación Canaria Yrichen",
    description:
      "Colaboramos con la Fundación Canaria YRICHEN, que tiene como finalidad la atención e inserción a personas en exclusión social especialmente derivadas de drogodependencias.",
    image: "/assets/img/about-us-page/yrichen-logo.webp",
    illustration: "/assets/img/about-us-page/yrichen-illustration.webp",
    link: "https://yrichen.org/",
  },
  {
    id: 3,
    title: "Mil Caminos",
    description:
      "Colaboramos anualmente con Mil Caminos. Asociación que trabaja para mejorar las condiciones de vida y promover oportunidades para comunidades vulnerables a través de proyectos educativos y sociales.",
    image: "/assets/img/about-us-page/mil-caminos-logo.webp",
    illustration: "/assets/img/about-us-page/mil-caminos-illustration.jpg",
    link: "https://milcaminos.org/",
  },
];
