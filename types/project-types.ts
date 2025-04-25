export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  client: string;
  date: string;
  location?: string;
  image: string;
  images: string[];
  description: string;
  longDescription?: string;
  services: string[];
  featured: boolean;
  tags?: string[];
  process?: string;
}

export interface ProjectCategory {
  id: string;
  name: string;
}
