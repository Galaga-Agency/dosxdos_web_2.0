export interface Project {
  id: string;
  name: string;
  slug: string;
  client: string;
  categories: string[];
  location?: string;
  year: number;
  description: string;
  challenge: string;
  solution: string;
  coverImage: string;
  portfolioThumbnail?: string;
  images: string[];
  galleryImages?: string[];
  floatingImages?: string[];
  date: string;
  featured: boolean;
  order?: number; 
}

export interface ProjectCategory {
  id: string;
  name: string;
  slug: string;
}