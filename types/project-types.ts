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
  images: string[];
  date: string;
  featured: boolean;
}

export interface ProjectCategory {
  id: string;
  name: string;
  slug: string;
}