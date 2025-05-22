import { Category } from "@/types/category-types";

export const categoriesList: Category[] = [
  {
    id: "diseno-de-interiores",
    name: "Diseño de Interiores",
    imageUrl:
      "/assets/img/portfolio/interiorismo-comercial/interiorismo-comercial-1.jpg",
    description:
      "Diseño de espacios comerciales para maximizar la experiencia del cliente.",
  },
  {
    id: "eventos",
    name: "Eventos",
    imageUrl:
      "/assets/img/portfolio/produccion-digital/produccion-digital-2.jpg",
    description: "Organización y diseño de eventos corporativos y comerciales.",
  },
  {
    id: "produccion",
    name: "Producción",
    imageUrl: "/assets/img/portfolio/perfumeria/perfumeria-3.jpg",
    description:
      "Producción y fabricación de elementos para espacios comerciales.",
  },
  {
    id: "logistica",
    name: "Logística",
    imageUrl: "/assets/img/portfolio/shop-in-shop/shop-in-shop-3.jpg",
    description: "Gestión logística integral para proyectos comerciales.",
  },
  {
    id: "comunicacion",
    name: "Comunicación",
    imageUrl: "/assets/img/portfolio/escaparatismo/escapartismo-3.jpg",
    description: "Estrategias de comunicación visual y corporativa.",
  },
  {
    id: "consultoria",
    name: "Consultoría",
    imageUrl:
      "/assets/img/portfolio/espacios-promocionales/espacios-promocionales-3.jpg",
    description:
      "Asesoramiento especializado en espacios comerciales y retail.",
  },
];

// Helper function to get a category by ID
export const getCategoryById = (id: string): Category | undefined => {
  return categoriesList.find((category) => category.id === id);
};
