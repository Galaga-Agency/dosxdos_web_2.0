```
DOSXDOS_WEB_2.0
├── .next/                  # Next.js build output (ignore)
│
├── app/                    # All pages and layouts (using App Router)
│   ├── admin/               # Admin dashboard page
│   ├── api/                 # API routes for server-side functions
│   ├── blog/                # Blog public pages, dynamic article pages
│   ├── contacto/            # Contact page
│   ├── portfolio/           # Portfolio pages and project detail pages
│   ├── servicios/           # Services page
│   ├── sobre-nosotros/      # About us page
│   └── layout.tsx           # Global app layout
│
├── components/              # Reusable React components
│   ├── Homepage/            # Sections used on the homepage
│   ├── layout/              # Site layout components (Menu, Footer)
│   ├── PortfolioPage/       # Sections for the portfolio overview page
│   ├── ProjectDetailsPage/  # Sections for individual project detail pages
│   ├── ui/                  # Generic UI elements (Button, Modal, Input, etc.)
│   ├── Loading/             # Loading animations
│   ├── RichTextEditor/      # Rich text editor for blog/admin
│   ├── PageTransition/      # Page transition animations
│   └── others...            # Smaller functional components (BackToTop, SocialIcons, etc.)
│
├── data/                    # Static data (blog articles, projects, team, etc.)
│
├── hooks/                   # Custom React hooks (scroll, form animations, media queries, etc.)
│
├── lib/                     # Backend-like utilities (auth, blog service, cookie actions)
│
├── plugins/                 # Custom Lexical editor plugins and GSAP/ScrollMagic scripts
│
├── public/                  # Public assets (images, fonts, uploads, CSS)
│
├── styles/                  # SCSS styling system
│   ├── abstracts/           # SCSS variables, mixins, functions
│   ├── base/                # Base styles (reset, typography, animations)
│   └── main.scss            # Main SCSS entry file
│
├── types/                   # TypeScript type definitions (projects, blog posts, auth, etc.)
│
├── utils/                   # Utility functions and animation configs
│
├── .env                     # Environment variables
├── next.config.js           # Next.js config
├── package.json             # Project dependencies
└── README.md                # Project documentation
```

sitemap

```
.
└── app/
    ├── admin/
    │   ├── blog/
    │   │   ├── editar/
    │   │   │   └── [id]/
    │   │   │       └── page.tsx
    │   │   └── nuevo/
    │   │       └── page.tsx
    │   ├── login/
    │   └── layout.tsx
    ├── api/
    │   ├── auth/
    │   │   └── [...nextauth]/
    │   │       └── route.ts
    │   ├── blog/
    │   │   ├── [id]/
    │   │   │   └── route.ts
    │   │   └── route.ts
    │   └── upload/
    │       └── route.ts
    ├── aviso-legal/
    │   └── page.tsx
    ├── blog/
    │   ├── [blogArticleSlug]/
    │   │   └── page.tsx
    │   ├── layout.tsx
    │   └── page.tsx
    ├── contacto/
    │   ├── layout.tsx
    │   └── page.tsx
    ├── politica-de-cookies/
    │   └── page.tsx
    ├── politica-de-privacidad/
    │   └── page.tsx
    ├── portfolio/
    │   ├── [projectSlug]/
    │   │   └── page.tsx
    │   ├── mas-proyectos/
    │   │   └── page.tsx
    │   ├── layout.tsx
    │   └── page.tsx
    ├── servicios/
    │   ├── diseno-de-interiores/
    │   │   └── page.tsx
    │   ├── ... more services
    │   ├── layout.tsx
    │   └── page.tsx
    ├── sobre-nosotros/
    │   ├── accion-social/
    │   │   └── page.tsx
    │   ├── equipo/
    │   │   └── page.tsx
    │   ├── layout.tsx
    │   └── page.tsx
    ├── transparencia/
    │   └── page.tsx
    ├── layout.tsx
    ├── page.tsx
    ├── robots.ts
    └── sitemap.ts
```