"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { categoriesList } from "@/data/categories";
import "./CategoriesSection.scss";

interface CategoriesSectionProps {
  isActive: boolean;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ isActive }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && sectionRef.current) {
      // Animate sidebar appearance
      if (sidebarRef.current) {
        gsap.fromTo(
          sidebarRef.current,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
        );
      }

      // Animate category items appearance
      if (categoriesRef.current) {
        const categoryItems =
          categoriesRef.current.querySelectorAll(".category-item");

        gsap.fromTo(
          categoryItems,
          { opacity: 0, x: 20 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out",
          }
        );
      }
    }
  }, [isActive]);

  return (
    <section className="categories-section" ref={sectionRef}>
      {/* Asterisk - Using CSS-only animation now */}
      <div className="sidebar-asterisk">
        <span>✱</span>
      </div>

      {/* Sidebar */}
      <div className="categories-sidebar" ref={sidebarRef}>
        <div className="sidebar-content">
          <h3 className="sidebar-title">Categorías</h3>
          <p className="sidebar-description">
            Explora los diferentes tipos de proyectos que realizamos en Dos por
            Dos. Desde escaparatismo hasta producción digital, cada categoría
            representa una parte clave de nuestro trabajo en el punto de venta.
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="categories-grid" ref={categoriesRef}>
        {categoriesList.map((category) => (
          <Link
            href={`/services/${category.id}`}
            key={category.id}
            className="category-item"
          >
            <div className="category-blob">
              <Image
                src={category.imageUrl || "/api/placeholder/300/300"}
                alt={category.name}
                width={300}
                height={300}
                priority
              />
            </div>
            <h3 className="category-name" data-text={category.name}>
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
