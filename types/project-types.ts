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
  display: {
    homepage: boolean;
    portfolioPage: boolean;
    [key: string]: boolean; // For future display options
  };
  tags?: string[];
  process?: string;
}

export interface ProjectCategory {
  id: string;
  name: string;
}