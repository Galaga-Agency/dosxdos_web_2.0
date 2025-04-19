"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { charAnimation } from "@/utils/animations/title-anim";
import { useParallax } from "@/utils/animations/parallax-image";
import "./blog.scss";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import SocialIcons from "@/components/SocialIcons/SocialIcons";
import BlogItem from "@/components/BlogItem/BlogItem";
import Pagination from "@/components/ui/Pagination/Pagination";
import usePagination from "@/hooks/usePagination";
import { formatDate } from "@/utils/formatting/dateFormatting";
import gsap from "gsap";
import { BlogPost } from "@/types/blog-post-types";
import Loading from "@/components/ui/Loading/Loading";

const BlogPage: React.FC = () => {
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const featuredDateRef = useRef<HTMLDivElement>(null);
  const featuredCategoryRef = useRef<HTMLDivElement>(null);
  const postsSectionRef = useRef<HTMLDivElement>(null);
  const postsGridRef = useRef<HTMLDivElement>(null);

  const [blogItems, setBlogItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Get only published blog posts
  const publishedBlogItems = blogItems.filter(
    (post) => post.published === true
  );

  const first_blog = publishedBlogItems[0];
  const other_blogs = publishedBlogItems.slice(1);
  const { currentItems, handlePageClick, pageCount, currentPage } =
    usePagination({
      items: other_blogs,
      itemsPerPage: 3,
    });

  useParallax(
    imageContainerRef as React.RefObject<HTMLElement>,
    imageRef as React.RefObject<HTMLElement>,
    {
      intensity: 0.25,
      scrubAmount: 1.2,
      delay: 500,
    }
  );

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        setBlogItems(data);
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Enhanced animations
  useEffect(() => {
    if (!loading) {
      // Title animation
      if (titleRef.current) {
        gsap.set(titleRef.current, { visibility: "hidden" });
        setTimeout(() => {
          charAnimation(titleRef.current!);
        }, 1500);
      }

      // Animate featured date badge
      if (featuredDateRef.current) {
        gsap.fromTo(
          featuredDateRef.current,
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.9 }
        );
      }

      // Animate featured category
      if (featuredCategoryRef.current) {
        gsap.fromTo(
          featuredCategoryRef.current,
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 1 }
        );
      }

      // Animate posts section
      if (postsSectionRef.current) {
        gsap.fromTo(
          postsSectionRef.current.querySelector('.posts-title'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );
      }
    }
  }, [loading]);

  if (loading) {
    return <Loading />;
  }

  if (!first_blog) {
    return (
      <div className="blog-page__empty-state">
        <h2>No hay entradas de blog disponibles.</h2>
      </div>
    );
  }

  return (
    <SmoothScrollWrapper>
      <div className="blog-page">
        <div className="blog-page__container">
          <div className="blog-page__social-sidebar">
            <div className="blog-page__social-wrapper">
              <span className="blog-page__social-label">Síguenos</span>
              <SocialIcons orientation="vertical" />
            </div>
          </div>

          <div className="blog-page__featured-section">
            <div
              ref={imageContainerRef}
              className="blog-page__featured-image-container"
            >
              <div ref={imageRef} className="blog-page__featured-image-wrapper">
                <Image
                  src={
                    first_blog.coverImage ||
                    "/assets/img/default-blog-image.jpg"
                  }
                  alt={first_blog.title}
                  fill
                  priority
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    willChange: "transform",
                  }}
                />
              </div>

              <Link
                href={`/blog/${first_blog.id}`}
                className="blog-page__featured-content-link"
              >
                <div className="blog-page__featured-overlay"></div>
                <div ref={featuredDateRef} className="blog-page__featured-image-date">
                  {formatDate(first_blog.date)}
                </div>
                <div ref={featuredCategoryRef} className="blog-page__featured-category">
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

          <div ref={postsSectionRef} className="blog-page__posts-section" id="pagination-section">
            <h2 className="posts-title">Artículos Recientes</h2>

            <div ref={postsGridRef} className="posts-grid">
              {currentItems.map((item, index) => (
                <div key={item.id} className="blog-page__post-item">
                  <BlogItem item={item} index={index} />
                </div>
              ))}
            </div>

            <div className="blog-page__pagination">
              <Pagination
                handlePageClick={(page) => handlePageClick({ selected: page })}
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
            <SocialIcons orientation="horizontal" />
          </div>

          <div className="blog-page__desktop-social-cta">
            <div className="blog-page__desktop-social-cta-content">
              <h3>
                Mantente actualizado con nuestros últimos contenidos y proyectos
              </h3>
              <div className="blog-page__desktop-social-icons">
                <SocialIcons orientation="horizontal" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SmoothScrollWrapper>
  );
};

export default BlogPage;