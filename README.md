# DOSXDOS_WEB_2.0

Live wesbite: https://dosxdos.netlify.app/

## Table of Contents
1. [Project Overview](#project-overview)
2. [File Structure](#file-structure)
3. [Routing & Pages (Next.js 15 App Router)](#routing--pages-nextjs-15-app-router)
4. [Global State Management (Zustand)](#global-state-management-zustand)
5. [Data Preloading Strategy](#data-preloading-strategy)
6. [Authentication & Protected Routes](#authentication--protected-routes)
7. [Blog & Project Services (Filesystem-based)](#blog--project-services-filesystem-based)
8. [Rich Text Editing & Custom Lexical Nodes](#rich-text-editing--custom-lexical-nodes)
9. [Animations (GSAP + useGSAP)](#animations-gsap--usegsap)
10. [SCSS Architecture](#scss-architecture)
11. [SEO & Metadata](#seo--metadata)
12. [Utilities & Helpers](#utilities--helpers)

---

## Project Overview

**DOSXDOS_WEB_2.0** is a Next.js 15 application, featuring:
- A **public-facing** marketing website (homepage, services, portfolio, blog, contact, about us).
- An **authenticated admin panel** for creating, editing, and deleting blog posts and projects.
- A **rich‐text editor** (Lexical) for blog content, including custom image nodes.
- A **Zustand** store to cache data client‐side and minimize network calls.
- Complex **SCSS** architecture for responsive styling.
- **GSAP** animations with ScrollTrigger/ScrollSmoother utilities.
- **NextAuth** for authentication.
- Built‐in SEO with dynamic metadata and JSON‐LD structured data.

---


## File Structure

Below is a high‐level view of the main directories and their responsibilities:

```
DOSXDOS_WEB_2.0
├── .next/                  # Next.js build artifacts (ignore)
│
├── app/                    # App Router (Next 15) pages and layouts
│   ├── admin/              # Admin dashboard, sub‐routes for blog/project CRUD
│   ├── api/                # Server Actions and API routes (auth, blog, upload, projects)
│   ├── blog/               # Public blog listing & dynamic article pages
│   ├── contacto/           # Contact page
│   ├── portfolio/          # Portfolio list & dynamic project pages
│   ├── servicios/          # Services pages
│   ├── sobre-nosotros/     # About us sub‐pages
│   ├── aviso-legal/        # Legal notices
│   ├── layout.tsx          # Root layout with fonts, providers, global SEO
│   ├── robots.ts           # Robots directive
│   └── sitemap.ts          # Sitemap generation
│
├── components/             # Reusable React components
│   ├── Homepage/           # Sections for the homepage (HeroSlider, AboutUsSection, etc.)
│   ├── layout/             # Site layout: Menu, Footer, BackToTop, CookieBanner
│   ├── PortfolioPage/      # Sections used in the portfolio overview page
│   ├── ProjectDetailsPage/ # Sections for individual project pages
│   ├── ui/                 # Generic UI elements (Button, Modal, Input, Loading, etc.)
│   ├── RichTextEditor/     # Lexical Editor setup, custom nodes, plugins
│   ├── PageTransition/     # GSAP‐based page transition wrappers
│   ├── AdminBlogCard/      # UI for blog cards in Admin panel
│   ├── AdminProjectCard/   # UI for project cards in Admin panel
│   ├── ProtectedRoute/     # Client wrapper to guard authenticated pages
│   ├── AuthProvider/       # SessionProvider and Konami‐style admin redirect
│   ├── DataPreloader/      # Prefetch Zustand data at root
│   └── others…             # BackToTop, SocialIcons, CookieConsentBanner, etc.
│
├── data/                   # Markdown files for blog posts and projects
│   ├── blog-articles/      # `id`.md files for each blog entry
│   └── projects/           # `id`.md files for each project
│
├── hooks/                  # Custom React hooks (scroll smooth, device detect, hydration)
│   ├── useScrollSmooth.tsx
│   ├── useDeviceDetect.ts
│   ├── useHydration.tsx
│   └── others…
│
├── lib/                    # Server‐only utilities for reading/writing `data/`
│   ├── blog-service.ts     # CRUD functions using Node FS + gray-matter
│   ├── project-service.ts  # Similarly for projects
│   └── auth-options.ts     # NextAuth configuration
│
├── nodes/                  # custom nodes that enable storing rich data (e.g., image alignment, caption) in the editor state
│
├── plugins/                # Custom Lexical plugins and GSAP/ScrollMagic wrappers
│   ├── ScrollTrigger.ts
│   ├── ScrollSmoother.ts
│   ├── SplitText.ts
│   └── others…
│
├── public/                 # Static assets, images/fonts/CSS, and uploaded files
│   ├── assets/img/         # All design images used across the site
│   ├── fonts/              # Locally hosted fonts (BigShoulders, Sarabun)
│   └── uploads/            # Generated uploads (cover images, inline images)
│
├── store/                  # Zustand store to cache blog & project data client‐side
│   └── useDataStore.ts
│
├── styles/                 # SCSS architecture
│   ├── abstracts/          # Variables, mixins, functions
│   ├── base/               # Base/reset, typography, animations
│   └── main.scss           # Main SCSS import
│
├── types/                  # TypeScript types/interfaces (BlogPost, Project, Auth, etc.)
│
├── utils/                  # General helpers (slug generator, read time, animations, image preloader)
│   ├── slug-generator.ts
│   ├── read-time.ts
│   ├── editor.ts           # Parsing Lexical blocks → HTML & vice versa
│   ├── animations/         # GSAP animation definitions (text, panel, hover, parallax…)
│   └── imagePreloader.ts   # Preload next images in HeroSlider
│
├── .env                    # Environment variables (NEXTAUTH_SECRET, credentials, etc.)
├── next.config.js          # Next.js configuration (fonts, rewrites, experimental features)
├── package.json            # Dependencies & scripts
└── README.md               # ← You’re reading it!
```

---

## Routing & Pages (Next.js 15 App Router)

- **File‐based routing** lives under `app/`. Folder names and `page.tsx` files define URLs.
- **Layouts**: Each sub‐folder may have `layout.tsx` for nested layout composition. The root `app/layout.tsx` wraps the entire site.
- **Dynamic segments**: Use `[slug]` or `[id]` folders to render dynamic pages (e.g., `/blog/[blogArticleSlug]/page.tsx`).
- **Server Actions (Route handlers)**:
  - All server APIs under `app/api/*/route.ts`.
  - For example:
    - `app/api/blog/route.ts` handles `GET /api/blog` to list all posts.
    - `app/api/blog/[id]/route.ts` for `GET`, `PUT`, `DELETE` a single blog post.
    - `app/api/upload/route.ts` processes `POST` uploads and writes to `public/uploads/`.

---

## Global State Management (Zustand)

- **Location**: `store/useDataStore.ts`
- **Purpose**: Cache `projects[]` and `posts[]` in a client‐side store to avoid fetching repeatedly.
- **API**:
  ```ts
  interface DataState {
    projects: Project[];
    projectsLoaded: boolean;
    projectsError: string | null;
    posts: BlogPost[];
    postsLoaded: boolean;
    postsError: string | null;
    fetchProjects: () => Promise<void>;
    fetchPosts: () => Promise<void>;
    fetchAllData: () => Promise<void>;
    getProjectBySlug: (slug: string) => Project | undefined;
    getPostBySlug: (slug: string) => BlogPost | undefined;
    resetProjects: () => void;
    resetPosts: () => void;
  }
  ```
- **Usage**: In any client component (e.g. `HomePage`), call `useDataStore(state => state.projects)` or `fetchAllData()` to fill both lists.

---

## Data Preloading Strategy

- **Component**: `components/DataPreloader/DataPreloader.tsx`
- **How**: Wrapped around `<body>` in `app/layout.tsx`. On first load, it calls `fetchAllData()` if `projectsLoaded` or `postsLoaded` are false.
- **Benefit**: 
  - Fetches _both_ blog and project data immediately when the site loads
  - Caches results in Zustand store
  - Subsequent pages read from cache (no further API calls), yielding instant client transitions
- ```tsx
  // DataPreloader.tsx
  useEffect(() => {
    if (!projectsLoaded || !postsLoaded) {
      fetchAllData().catch(console.error);
    }
  }, [fetchAllData, projectsLoaded, postsLoaded]);
  ```

---

## Authentication & Protected Routes

- **NextAuth**:
  - Configured in `lib/auth-options.ts` and covered by `app/api/auth/[...nextauth]/route.ts`.
  - Uses environment variables: `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `NEXTAUTH_SECRET`.
- **AuthProvider** (`components/AuthProvider/AuthProvider.tsx`):
  - Wraps the entire app in `SessionProvider`.
  - Listens for a secret “admin” key sequence to redirect to `/admin`.
- **ProtectedRoute** (`components/ProtectedRoute/ProtectedRoute.tsx`):
  - A client component that checks `useSession()` status.
  - If `status === "unauthenticated"`, shows a `<Loading>` spinner and redirects to `/login`.
  - If authenticated, renders `children`.
- **Admin Login Flow**:
  1. User navigates to `/login` (generated by NextAuth).
  2. After successful sign‐in, NextAuth’s session is available.
  3. Visiting any `/admin/*` route is guarded by `<ProtectedRoute>`; unauthenticated users are bounced to `/login`.
  4. Logging out (`signOut()`) clears session and redirects back to `/login`.

---

## Blog & Project Services (Filesystem‐based)

- **Location**:
  - Blog: `lib/blog-service.ts` (server‐only).
  - Projects: `lib/project-service.ts`.
- **Data Folder**: Markdown files in `data/blog-articles` and `data/projects`.
- **Key Functions**:
  - `getAllPosts(): Promise<BlogPost[]>`
  - `getPostById(id: string): Promise<BlogPost | null>`
  - `getPostBySlug(slug: string): Promise<BlogPost | null>`
  - `createOrUpdatePost(post: BlogPost): Promise<BlogPost>`
  - `deletePost(id: string): Promise<boolean>`
- **Mechanics**:
  1. Each Markdown file: frontmatter (gray‐matter) → TypeScript model `BlogPost`.
  2. Server Actions in `app/api/blog/route.ts` call these functions.
  3. In production, **ensure the `data/` directory is write‐enabled** (e.g., on Vercel or a VPS).

---

## Rich Text Editing & Custom Lexical Nodes

- **Lexical Editor**:
  - A React wrapper (`components/RichTextEditor/RichTextEditorWrapper.tsx`) sets up a Lexical editor instance.
  - Custom nodes and plugins register inside `utils/editor.ts` or in `nodes/` and `plugins/`.
- **Custom Image Node** (`nodes/image-node.tsx`):
  - A subclass of `ElementNode` that stores:
    - `src`, `altText`, `width`, `height`, optional `caption`, `alignment`
  - Implements:
    - `createDOM()`: Builds a `<div>` container + `<img>` + optional `<figcaption>`.
    - `updateDOM()`: Updates attributes when node fields change.
    - `importJSON()`, `exportJSON()` for serializing/deserializing blocks.
    - A helper factory `$createImageNode()` and type guard `$isImageNode()`.
- **Why Custom Nodes?**:
  - Enables storing rich data (e.g., image alignment, caption) in the editor state.
  - When exporting to HTML, `processEditorContent()` (in `utils/editor.ts`) detects `ImageNode` blocks and transforms them into `<figure>`/`<img>` with correct attributes.
- **Basic Example**:
  ```ts
  import { $createImageNode, $isImageNode } from "@/nodes/image-node";

  // To insert an image in the editor:
  const imageNode = $createImageNode(
    "/uploads/12345/cover.jpg",
    "A nice caption",
    800,
    600,
    "My Caption",
    "center"
  );
  editor.update(() => {
    // Insert the image node at cursor:
    $insertNodes([imageNode]);
  });
  ```

---

## Animations (GSAP + useGSAP)

### Why call animations at the Page‐level?
- **Avoid ScrollTrigger conflicts**: When multiple nested components register triggers independently, you can accidentally double‐initialize ScrollTrigger or pin conflicting elements.
- **Centralized logic**: Using a single hook (`useGSAP`) per page ensures all scroll‐based timelines are created (and cleaned up) once per route.
- **Automatic cleanup**: `useGSAP` (from `@gsap/react`) will automatically kill all registered timelines/ScrollTriggers when the component unmounts or dependencies change.

### How it works
1. **Register plugins** in the top of your page:
   ```ts
   import { gsap } from "gsap";
   import { ScrollTrigger, ScrollSmoother, SplitText } from "@/plugins";
   import { useGSAP } from "@gsap/react";

   gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
   ```
2. **Define your animation utilities** in `utils/animations/*`:
   - `text-anim.ts`: `charAnimation()`, `highlightAnimation()`
   - `panel-animation.ts`: scroll‐based panel animations (`panelTwoAnimation()`, etc.)
   - `image-parallax.ts`: parallax logic for images
   - …and so on.
3. **Call inside `useGSAP`**:
   ```ts
   useGSAP(() => {
     // Run only when the page is hydrated and any prerequisites (images loaded, data loaded) are met
     charAnimation();
     panelTwoAnimation();
     imageParallax();
   }, [dependencies…]);
   ```
4. **Example (HomePage)**:
   ```tsx
   const isHydrated = useHydration();
   const featuredProjects = useDataStore(state => state.projects.filter(p => p.featured));
   const showFeatured = useDataStore(state => state.projectsLoaded) && featuredProjects.length > 0;

   useGSAP(() => {
     if (heroImagesLoaded && showFeatured && isHydrated) {
       charAnimation();
       initHeroSlider();
       imageParallax();
       initCardMouseParallax();
       hoverCircleButtonAnimation();
       featuredImageAnimation();
       highlightAnimation();
       panelTwoAnimation();
     }
   }, [heroImagesLoaded, showFeatured, isHydrated]);
   ```
5. **Result**:
   - Animations only initialize once all assets/data are ready.
   - When user navigates away, cleanup is automatic.
   - All ScrollTriggers live in a single scope.

---

## SCSS Architecture

We follow a **7‑1** inspired structure:

```
styles/
├── abstracts/       # _variables.scss, _mixins.scss, _functions.scss
├── base/            # _reset.scss, _typography.scss, _animations.scss
└── main.scss        # Imports abstracts, base, components, utilities
```

### abstracts/
- **_variables.scss**: 
  - Spacing scale (`$spacing`), breakpoints (`$breakpoints`), colors (`$primary-color`, `$black`, etc.), font sizes, z-index map.
- **_mixins.scss**:
  - Responsive grid (`@mixin grid(columns, gap)`), flex helper, media queries (`@mixin min-width(breakpoint)`), spacing, container widths, shadows, typographic utilities.
- **_functions.scss**: Any SCSS functions you need (if any).

### base/
- **_reset.scss**: CSS reset (normalize or custom).
- **_typography.scss**: Global font styles, headings, body, link, list styles.
- **_animations.scss**: Keyframe definitions used across site (fade‐in, slide‐in, etc.).
- **_colors.scss**: Semantic color definitions (e.g. `$success-color`, `$danger-color`).

### components/
- Each component has its own SCSS file (`components/AboutUsSection/AboutUsSection.scss`, `HeroSlider.scss`, etc.).
- They import:
  ```scss
  @use "@/styles/abstracts/variables" as *;
  @use "@/styles/abstracts/mixins" as *;
  @use "@/styles/base/colors" as *;
  @use "@/styles/base/animations" as *;
  ```
- Use BEM‐like naming to scope styles: e.g., `.aboutus-section { &__title {…} &__container {…} }`.

### main.scss
- Top‐level import order:
  ```scss
  @use "./abstracts/variables" as *;
  @use "./abstracts/mixins" as *;
  @use "./base/reset" as *;
  @use "./base/typography" as *;
  @use "./base/animations" as *;
  // Then individual component SCSS files via glob or manual imports
  @import "../components/Homepage/HeroSlider/HeroSlider.scss";
  @import "../components/Homepage/AboutUsSection/AboutUsSection.scss";
  // etc.
  ```
- This ensures:
  1. Variables and mixins are available to all component SCSS.
  2. Base resets and typography load first.
  3. Component‐level styles compile last.

---

## SEO & Metadata

We handle SEO at two levels:

### 1. Page‐level Metadata (`app/layout.tsx`)

```tsx
import type { Metadata } from "next";
import JsonLd from "@/components/SEO/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL("https://dospordosgrupoimagen.com/"),
  title: {
    default: "Dos x Dos Grupo Imagen | Diseño de Interiores Comerciales de Lujo",
    template: "%s | Dos x Dos Grupo Imagen",
  },
  description: "Especialistas en diseño de interiores para espacios comerciales de lujo en Madrid y Canarias. Más de 35 años de experiencia.",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://dospordosgrupoimagen.com",
    title: "Dos x Dos Grupo Imagen – Diseño de Interiores Comerciales de Lujo",
    description: "35+ años diseñando espacios comerciales únicos en Madrid y Canarias.",
    images: [
      { url: "/assets/img/homepage/slider-3.webp", width: 1200, height: 630, alt: "Interiorismo Comercial de Lujo" },
      { url: "/assets/img/logo_full_rojo.png", width: 800, height: 600, alt: "Logo Dos x Dos Grupo Imagen" }
    ],
    siteName: "Dos x Dos Grupo Imagen",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dos x Dos Grupo Imagen",
    description: "35+ años diseñando espacios comerciales de lujo en Madrid y Canarias.",
    images: ["/assets/img/homepage/slider-3.webp"],
  }
};
```

- The `metadata` export in `app/layout.tsx` (Next.js 15) automatically populates the `<head>` for every page.
- **Template**: Using `template: "%s | Dos x Dos Grupo Imagen"`, so page‐specific titles (e.g., “Blog – Dos x Dos Grupo Imagen”) get generated.

### 2. Structured Data (JSON‐LD)

- We include three JSON‐LD schemas in the `<head>` by using a `<JsonLd>` component:
  1. **Organization**: Basic info about the agency—name, URL, logo, foundingDate, address, employees, ratings, social URLs.
  2. **WebSite**: Allows Google to know how to search the site—`potentialAction: SearchAction`.
  3. **LocalBusiness**: Geo coordinates, hours of operation, rating, priceRange.
- Example:
  ```tsx
  <JsonLd data={{
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://dospordosgrupoimagen.com/#organization",
    name: "Dos x Dos Grupo Imagen",
    url: "https://dospordosgrupoimagen.com",
    logo: { "@type": "ImageObject", url: "https://dospordosgrupoimagen.com/assets/img/logo_full_rojo.png", width: 800, height: 600 },
    description: "Especialistas en diseño de interiores para espacios comerciales de lujo. Más de 35 años de experiencia en Madrid y Canarias.",
    foundingDate: "1989",
    numberOfEmployees: { "@type": "QuantitativeValue", value: "45+" },
    address: [
      { "@type": "PostalAddress", addressLocality: "Madrid", addressRegion: "Madrid", addressCountry: "ES" },
      { "@type": "PostalAddress", addressLocality: "Las Palmas de Gran Canaria", addressRegion: "Canarias", addressCountry: "ES" }
    ],
    sameAs: [
      "https://www.linkedin.com/company/dos-por-dos-grupo-imagen/",
      "https://www.instagram.com/dosxdos.grupoimagen/",
      "https://www.facebook.com/dosxdos.grupoimagen/",
      "https://www.youtube.com/channel/UCqZDFnB0lrlDv6pNnfx2GKQ"
    ]
  }} />
  ```
- **Benefit**: Search engines and rich results will correctly parse your business, website, and local info.

---

## Utilities & Helpers

### Slug Generator

- **Location**: `utils/slug-generator.ts`
- **Purpose**: Create URL‐friendly unique slugs from titles.
- **Example**:
  ```ts
  export function generateUniqueSlug(title: string, existingSlugs: string[]): string {
    let base = title.trim().toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    let slug = base;
    let counter = 1;
    while (existingSlugs.includes(slug)) {
      slug = `${base}-${counter++}`;
    }
    return slug;
  }
  ```

### Read Time Calculator

- **Location**: `utils/read-time.ts`
- **Usage**: Estimate reading time for a blog post by counting words in HTML content.
- **Example**:
  ```ts
  export function calculateReadTime(html: string): number {
    const words = html.replace(/<[^>]+>/g, "").split(/\s+/).length;
    const wpm = 200;
    return Math.ceil(words / wpm);
  }
  ```

### Image Preloader

- **Location**: `utils/imagePreloader.ts`
- **Use case**: In `HeroSlider`, preload next slide’s image so transitions are smooth.
- **Example**:
  ```ts
  export function extractImageUrls<T>(slides: T[], key: keyof T): string[] {
    return slides.map(s => (s[key] as unknown as string));
  }
  export function preloadNextImages(currentIndex: number, urls: string[], count: number) {
    for (let i = 1; i <= count; i++) {
      const idx = (currentIndex + i) % urls.length;
      const img = new Image();
      img.src = urls[idx];
    }
  }
  ```

---