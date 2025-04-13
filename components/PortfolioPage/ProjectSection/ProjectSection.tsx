import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from 'lucide-react';
import { projectCategories } from "@/data/projects";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ProjectSection.scss";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectSectionProps {
  project: {
    id: string;
    title: string;
    description: string;
    slug: string;
    category: string;
    image: string;
    additionalImages?: string[];
  };
  projectIndex: number;
  isActive?: boolean;
}

const BLOG_IMAGES = [
  '/assets/img/blog/color-psychology.jpg',
  '/assets/img/blog/commercial-photography.jpg',
  '/assets/img/blog/corporate-branding.jpg',
  '/assets/img/blog/minimalist-spaces.jpg',
  '/assets/img/blog/mobile-ux.jpg',
  '/assets/img/blog/neurodesign.jpg',
  '/assets/img/blog/packaging-trends.jpg',
  '/assets/img/blog/procesos-oficina.jpg',
  '/assets/img/blog/responsive-design.jpg',
  '/assets/img/blog/sustainable-design.jpg',
  '/assets/img/blog/typography-design.jpg',
  '/assets/img/blog/visual-marketing.jpg',
  '/assets/img/blog/visual-storytelling.jpg'
];

const LAYOUT_VARIANTS = [
  [
    { column: '1 / span 6', row: '1 / span 5', transform: 'none' },
    { column: '7 / span 5', row: '1 / span 3', transform: 'translateY(-5%)' },
    { column: '6 / span 4', row: '5 / span 3', transform: 'rotate(2deg)' }
  ],
  [
    { column: '3 / span 7', row: '2 / span 4', transform: 'rotate(-2deg)' },
    { column: '1 / span 3', row: '1 / span 3', transform: 'rotate(3deg)' },
    { column: '10 / span 3', row: '1 / span 3', transform: 'rotate(-3deg)' }
  ],
  [
    { column: '2 / span 5', row: '1 / span 5', transform: 'translateY(8%)' },
    { column: '7 / span 4', row: '1 / span 4', transform: 'translateX(-5%)' },
    { column: '5 / span 6', row: '5 / span 3', transform: 'rotate(4deg)' }
  ],
  [
    { column: '1 / span 5', row: '1 / span 4', transform: 'rotate(5deg)' },
    { column: '7 / span 6', row: '2 / span 5', transform: 'translateY(-10%)' },
    { column: '4 / span 5', row: '6 / span 2', transform: 'translateX(3%)' }
  ]
];


const getLayoutForProject = (slug: string) => {
  const sum = slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return LAYOUT_VARIANTS[sum % LAYOUT_VARIANTS.length];
};

const ProjectSection: React.FC<ProjectSectionProps> = ({ project, projectIndex, isActive = false }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isActive || (typeof window !== 'undefined' && window.innerWidth < 768)) {
      const details = sectionRef.current.querySelector('.project-details');
      const category = sectionRef.current.querySelector('.project-category');
      const title = sectionRef.current.querySelector('.section-title');
      const content = sectionRef.current.querySelector('.section-content p');
      const button = sectionRef.current.querySelector('.view-project-btn');
      const gallery = sectionRef.current.querySelector('.project-gallery');
      const images = sectionRef.current.querySelectorAll('.project-image');
      gsap.set([category, title, content, button], { opacity: 0, y: 30 });
      gsap.set(gallery, { opacity: 0, scale: 0.95 });
      gsap.set(images, { opacity: 0, y: 40, scale: 0.9 });
      const tl = gsap.timeline();
      tl.to(category, { opacity: 1, y: 0, duration: 0.4 })
        .to(title, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
        .to(content, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
        .to(button, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
        .to(gallery, { opacity: 1, scale: 1, duration: 0.5 }, '-=0.2');
      gsap.to(images, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.15,
        delay: 0.5
      });
    }
  }, [isActive]);

  const galleryImages = (() => {
    const baseImages = [
      project.image,
      ...(project.additionalImages || [])
    ];
    while (baseImages.length < 3) {
      const fallback = BLOG_IMAGES[(projectIndex * 3 + baseImages.length) % BLOG_IMAGES.length];
      baseImages.push(fallback);
    }
    return baseImages.slice(0, 3);
  })();

  const layout = getLayoutForProject(project.slug);

  return (
    <section 
      ref={sectionRef} 
      className={`project-section ${isActive ? 'is-active' : ''}`} 
      data-project-index={projectIndex}
    >
      <div className="section-container">
        <div className="project-content">
          <div className="project-details">
            <span className="project-category">
              {projectCategories.find((cat) => cat.id === project.category)?.name || project.category}
            </span>
            <h2 className="section-title">{project.title}</h2>
            <div className="section-content">
              <p>{project.description}</p>
              <Link href={`/proyectos/${project.slug}`} className="view-project-btn">
                Ver detalles
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
          <div className={`project-gallery project-${projectIndex}`}>
            {galleryImages.map((img, index) => (
              <div
                key={index}
                className={`project-image project-image-${index}`}
                style={{
                  gridColumn: layout[index].column,
                  gridRow: layout[index].row,
                  transform: layout[index].transform
                }}
              >
                <Image
                  src={img}
                  alt={`${project.title} - Image ${index + 1}`}
                  fill
                  className="project-img"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;