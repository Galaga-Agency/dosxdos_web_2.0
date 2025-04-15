import { Category } from "@/types/category-types";

export const categoriesList: Category[] = [
  {
    id: "interiorismo-comercial",
    name: "Interiorismo comercial",
    imageUrl:
      "/assets/img/portfolio/interiorismo-comercial/interiorismo-comercial-1.jpg",
    description:
      "Diseño de espacios comerciales para maximizar la experiencia del cliente.",
  },
  {
    id: "produccion-digital",
    name: "Producción digital",
    imageUrl:
      "/assets/img/portfolio/produccion-digital/produccion-digital-2.jpg",
    description: "Creación de contenido digital y producción multimedia.",
  },
  {
    id: "perfumeria",
    name: "Perfumería",
    imageUrl: "/assets/img/portfolio/perfumeria/perfumeria-3.jpg",
    description: "Diseño y presentación para productos de perfumería.",
  },
  {
    id: "shop-in-shop",
    name: "Shop in shop",
    imageUrl: "/assets/img/portfolio/shop-in-shop/shop-in-shop-3.jpg",
    description:
      "Concepto de tienda dentro de otra tienda para aumentar visibilidad.",
  },
  {
    id: "escaparatismo",
    name: "Escaparatismo",
    imageUrl: "/assets/img/portfolio/escaparatismo/escapartismo-3.jpg",
    description: "Diseño de escaparates que capturen la atención del público.",
  },
  {
    id: "espacios-promocionales",
    name: "Espacios promocionales",
    imageUrl:
      "/assets/img/portfolio/espacios-promocionales/espacios-promocionales-3.jpg",
    description: "Creación de espacios temporales para promociones especiales.",
  },
  // {
  //   id: "pergolas",
  //   name: "Pérgolas",
  //   imageUrl: "/assets/img/portfolio/escaparatismo/escapartismo-3.jpg",
  //   description: "Diseño e instalación de pérgolas para espacios exteriores.",
  // },
];

// Helper function to get a category by ID
export const getCategoryById = (id: string): Category | undefined => {
  return categoriesList.find((category) => category.id === id);
};
