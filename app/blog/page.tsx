"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { charAnimation } from "@/utils/animations/title-anim";
import { useParallax } from "@/utils/animations/parallax-image";
import "./blog.scss";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import SocialIcons from "@/components/SocialIcons/SocialIcons";
import BlogItem from "@/components/BlogItem/BlogItem";
import Pagination from "@/components/ui/Pagination/Pagination";
import { blogPosts } from "@/data/blog-posts";
import usePagination from "@/hooks/usePagination";
import { formatDate } from "@/utils/formatting/dateFormatting";
import gsap from "gsap";

const BlogPage: React.FC = () => {
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  // Pagination logic
  const blog_items = [...blogPosts];
  const first_blog = blog_items[0];
  const other_blogs = blog_items.filter((b) => b !== first_blog);
  const { currentItems, handlePageClick, pageCount, currentPage } =
    usePagination({
      items: other_blogs,
      itemsPerPage: 6,
      scrollTargetId: "pagination-section",
    });

  useParallax(
    imageContainerRef as React.RefObject<HTMLElement>,
    imageRef as React.RefObject<HTMLElement>,
    {
      intensity: 0.25, // More subtle movement (25% of container height)
      scrubAmount: 1.2, // Smoother scrubbing (higher value = smoother)
      delay: 200, // Slightly longer delay to ensure everything is properly mounted
    }
  );

  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Ensure the title is initially hidden
    if (titleRef.current) {
      gsap.set(titleRef.current, {
        visibility: "hidden",
      });

      // Ensure the animation runs after component mount
      const timer = setTimeout(() => {
        // If charAnimation is a function that takes a ref or selector
        charAnimation(titleRef.current);
      }, 200);

      // Cleanup function
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <SmoothScrollWrapper>
      <div className="blog-page">
        <div className="blog-page__container">
          <div className="blog-page__social-sidebar">
            <div className="blog-page__social-wrapper">
              <span className="blog-page__social-label">Síguenos</span>
              <SocialIcons orientation="vertical" color="primary" />
            </div>
          </div>

          <div className="blog-page__featured-section">
            <div
              ref={imageContainerRef}
              className="blog-page__featured-image-container"
            >
              <div ref={imageRef} className="blog-page__featured-image-wrapper">
                <Image
                  src={first_blog.img}
                  alt={first_blog.title}
                  fill
                  priority
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    willChange: "transform", // Optimizes animation performance
                  }}
                />
              </div>

              <Link
                href={`/blog/${first_blog.id}`}
                className="blog-page__featured-content-link"
              >
                <div className="blog-page__featured-overlay"></div>
                <div className="blog-page__featured-image-date">
                  {formatDate(first_blog.date)}
                </div>
                <div className="blog-page__featured-category">
                  <span>{first_blog.category}</span>
                </div>
                <h1
                  ref={titleRef}
                  className="blog-page__featured-image-title char-animation"
                >
                  {first_blog.title}
                </h1>
                <div className="blog-page__featured-excerpt">
                  <p>{first_blog.excerpt}</p>
                  <span className="blog-page__featured-read-more">
                    Leer más <span className="arrow">→</span>
                  </span>
                </div>
              </Link>
            </div>
          </div>

          <div className="blog-page__posts-section" id="pagination-section">
            <h2 className="posts-title">Artículos Recientes</h2>

            <div className="posts-grid">
              {currentItems.map((item, index) => (
                <div key={item.id} className="blog-page__post-item">
                  <BlogItem item={item} index={index} />
                </div>
              ))}
            </div>

            <div className="blog-page__pagination">
              <Pagination
                handlePageClick={handlePageClick}
                pageCount={pageCount}
                currentPage={currentPage}
              />
            </div>
          </div>

          <div className="blog-page__mobile-social-section">
            <div className="blog-page__mobile-social-header">
              <h3 className="blog-page__mobile-social-title">Síguenos</h3>
              <div className="blog-page__mobile-social-divider"></div>
            </div>
            <SocialIcons orientation="horizontal" color="primary" />
          </div>

          <div className="blog-page__desktop-social-cta">
            <div className="blog-page__desktop-social-cta-content">
              <h3>
                Mantente actualizado con nuestros últimos contenidos y proyectos
              </h3>
              <div className="blog-page__desktop-social-icons">
                <SocialIcons orientation="horizontal" color="primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SmoothScrollWrapper>
  );
};

export default BlogPage;
