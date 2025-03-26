import { MenuItem } from '@/types/menu-types';

export const menuItems: MenuItem[] = [
  { 
    id: 'home', 
    label: 'Home', 
    href: '/' 
  },
  { 
    id: 'services', 
    label: 'Services', 
    href: '/services',
    children: [
      { 
        id: 'web-design', 
        label: 'Web Design', 
        href: '/services/web-design' 
      },
      { 
        id: 'development', 
        label: 'Development', 
        href: '/services/development' 
      },
      { 
        id: 'consulting', 
        label: 'Consulting', 
        href: '/services/consulting' 
      }
    ]
  },
  { 
    id: 'portfolio', 
    label: 'Portfolio', 
    href: '/portfolio' 
  },
  { 
    id: 'about', 
    label: 'About', 
    href: '/about' 
  },
  { 
    id: 'contact', 
    label: 'Contact', 
    href: '/contact' 
  }
];

export const ctaButton = {
  label: 'Get Started',
  href: '/contact'
};