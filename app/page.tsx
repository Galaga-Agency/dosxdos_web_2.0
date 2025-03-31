"use client";

import React from "react";
import "./page.scss";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import SmoothScrollWrapper from "@/components/SmoothScroll";
import SmoothScroll from "@/components/SmoothScroll";

// Register only useGSAP initially - we'll register other plugins on demand
gsap.registerPlugin(useGSAP);

const Home: React.FC = () => {
  // Setup animations in useGSAP hook
  useGSAP(() => {
    // Import ScrollTrigger dynamically in the useGSAP hook
    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);

      // Now setup your animations
      gsap.from(".homepage__hero-content h1", {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: ".homepage__hero",
          start: "top center",
          toggleActions: "play none none reverse",
        },
      });

      // More animations as needed
    });
  }, []);

  return (
    <SmoothScroll>
      <div className="homepage">
        {/* Hero Section */}
        <section className="homepage__hero">
          <div className="homepage__hero-content">
            <h1>Creamos espacios que conectan, emocionan y venden</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
              dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.
            </p>
            <div className="homepage__hero-cta">
              <Link href="/contacto" className="btn btn--primary">
                <span>Solicita presupuesto</span>
                <ArrowRight size={16} />
              </Link>
              <Link href="/portfolio" className="btn btn--secondary">
                Ver proyectos
              </Link>
            </div>
          </div>
          <div className="homepage__hero-image">
            <div className="placeholder-image"></div>
          </div>
        </section>

        {/* Services Section */}
        <section className="homepage__services">
          <div className="homepage__section-header">
            <h2>Nuestros Servicios</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="homepage__services-grid">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div className="homepage__service-card" key={item}>
                <div className="homepage__service-icon"></div>
                <h3>Servicio Lorem Ipsum {item}</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  ac metus at lorem euismod bibendum vel in diam.
                </p>
                <Link href={`/servicios/servicio-${item}`}>
                  Ver más <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="homepage__about">
          <div className="homepage__about-image">
            <div className="placeholder-image"></div>
          </div>
          <div className="homepage__about-content">
            <h2>Sobre Nosotros</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit.
            </p>
            <Link href="/sobre-nosotros" className="btn btn--secondary">
              Conoce más sobre nosotros
            </Link>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="homepage__projects">
          <div className="homepage__section-header">
            <h2>Proyectos Destacados</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="homepage__projects-grid">
            {[1, 2, 3].map((item) => (
              <div className="homepage__project-card" key={item}>
                <div className="homepage__project-image">
                  <div className="placeholder-image"></div>
                </div>
                <div className="homepage__project-content">
                  <span className="homepage__project-category">
                    Categoría {item}
                  </span>
                  <h3>Proyecto Lorem Ipsum {item}</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla ac metus at lorem euismod bibendum vel in diam.
                  </p>
                  <Link href={`/portfolio/proyecto-${item}`}>
                    Ver proyecto <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="homepage__projects-cta">
            <Link href="/portfolio" className="btn btn--primary">
              Ver todos los proyectos
            </Link>
          </div>
        </section>

        {/* Testimonials */}
        <section className="homepage__testimonials">
          <div className="homepage__section-header">
            <h2>Lo Que Dicen Nuestros Clientes</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="homepage__testimonials-grid">
            {[1, 2, 3].map((item) => (
              <div className="homepage__testimonial-card" key={item}>
                <div className="homepage__testimonial-content">
                  <p>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                    elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
                    leo. Sed non mauris vitae erat consequat auctor eu in elit."
                  </p>
                </div>
                <div className="homepage__testimonial-author">
                  <div className="homepage__testimonial-avatar"></div>
                  <div>
                    <h4>Cliente {item}</h4>
                    <p>Empresa {item}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="homepage__cta">
          <div className="homepage__cta-content">
            <h2>¿Tienes un proyecto en mente?</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Link href="/contacto" className="btn btn--primary">
              <span>Solicita presupuesto</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </SmoothScroll>
  );
};

export default Home;
