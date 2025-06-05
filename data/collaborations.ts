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
    title: "Fundación Mil Caminos Santiago Uno",
    description:
      "Nos unimos recientemente a esta fundación que apuesta por la inclusión real de jóvenes en riesgo. Un espacio de acogida, diversidad y crecimiento personal que forma personas comprometidas, libres y con vocación de cambio.",
    image: "/assets/img/about-us-page/mil-caminos-logo.png",
    illustration: "/assets/img/about-us-page/mil-caminos.avif",
    link: "https://milcaminos.es/",
  },
  {
    id: 2,
    title: "Vicente Ferrer",
    description:
      "Colaboramos desde hace más de 22 años con una organización que transforma comunidades vulnerables desde la acción, el compromiso y la dignidad. Su labor impulsa la igualdad y la justicia social, sin distinción de origen, creencias o ideologías.",
    image: "/assets/img/about-us-page/vicente-ferrer-logo.svg",
    illustration: "/assets/img/about-us-page/vicente-ferrer-illustration.avif",
    link: "https://www.fundacionvicenteferrer.org/",
  },
  {
    id: 3,
    title: "Fundación Canaria Yrichen",
    description:
      "Desde hace más de 15 años apoyamos a Yrichen, referente en Canarias en la prevención y tratamiento de adicciones. Su trabajo incansable combate la exclusión social, ofreciendo acompañamiento gratuito, cercano y transformador.",
    image: "/assets/img/about-us-page/yrichen-logo.webp",
    illustration: "/assets/img/about-us-page/yrichen-illustration.avif",
    link: "https://yrichen.org/",
  },
];
