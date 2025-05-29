export interface Project {
  id: string;
  name: string;
  slug: string;
  client: string;
  tags: string[];
  location?: string;
  duration?: string; // e.g., "3 meses", "6 semanas"
  year: number;
  services: string[];
  description: string; // Short summary/description
  challenge: string;
  solution: string;
  coverImage: string;
  images: string[];
  date: string; // Keep for sorting purposes
  featured: boolean;
}

export interface ProjectCategory {
  id: string;
  name: string;
}
