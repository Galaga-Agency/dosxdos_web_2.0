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
  challenge: string;
  solution: string;
  coverImage: string;
  images: string[];
  date: string; 
  featured: boolean;
}

export interface ProjectCategory {
  id: string;
  name: string;
}
