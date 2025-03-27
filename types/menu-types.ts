export interface MenuItem {
  id: string;
  label: string;
  href: string;
  children?: MenuItem[];
}

export interface CtaButton {
  label: string;
  href: string;
}
