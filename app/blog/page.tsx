"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParallax } from "@/utils/animations/parallax-image";
import {
  initBlogPageAnimations,
  cleanupBlogPageAnimations,
} from "@/utils/animations/pages/blog-page-anim";
import { initScrollTriggerConfig } from "@/utils/animations/scrolltrigger-config";
import "./blog.scss";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import SocialIcons from "@/components/SocialIcons/SocialIcons";
import BlogItem from "@/components/BlogItem/BlogItem";
import Pagination from "@/components/ui/Pagination/Pagination";
import usePagination from "@/hooks/usePagination";
import { formatDate } from "@/utils/formatting/dateFormatting";
import { BlogPost } from "@/types/blog-post-types";
import Loading from "@/components/ui/Loading/Loading";

const BlogPage: React.FC = () => {
  // Force component remount on each page visit
  const [key] = useState(() => Date.now());

  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const featuredDateRef = useRef<HTMLDivElement>(null);
  const featuredCategoryRef = useRef<HTMLDivElement>(null);
  const postsSectionRef = useRef<HTMLDivElement>(null);
  const postsGridRef = useRef<HTMLDivElement>(null);
  const desktopSocialCtaRef = useRef<HTMLDivElement>(null);

  const [blogItems, setBlogItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize ScrollTrigger configuration once
  useEffect(() => {
    initScrollTriggerConfig();
  }, []);

  // Setup parallax effect for featured image
  useParallax(
    imageContainerRef as React.RefObject<HTMLElement>,
    imageRef as React.RefObject<HTMLElement>,
    {
      intensity: 0.25,
      scrubAmount: 1.2,
      delay: 500,
    }
  );

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

  // Fetch blog posts
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

    // Cleanup when unmounting
    return () => {
      cleanupBlogPageAnimations();
    };
  }, []);

  // Initialize animations when page is loaded
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        initBlogPageAnimations({
          imageContainer: imageContainerRef.current,
          image: imageRef.current,
          title: titleRef.current,
          featuredDate: featuredDateRef.current,
          featuredCategory: featuredCategoryRef.current,
          postsSection: postsSectionRef.current,
          postsGrid: postsGridRef.current,
          desktopSocialCta: desktopSocialCtaRef.current,
        });
      }, 300);

      return () => {
        clearTimeout(timer);
      };
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
      <div className="blog-page" key={key}>
        <div className="blog-page__container">
          <div className="blog-page__social-sidebar">
            <div className="blog-page__social-wrapper">
              <span className="blog-page__social-label">Síguenos</span>
              <SocialIcons orientation="vertical" />
            </div>
          </div>

          <div className="blog-page__featured-section">
            {/* Separate offset background */}
            <div className="blog-page__featured-offset-background"></div>

            {/* Background Image Container */}
            <div
              ref={imageContainerRef}
              className="blog-page__featured-image-container"
            >
              {/* Image wrapper with the background image */}
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

              {/* Image overlay that darkens the image */}
              <div className="blog-page__featured-image-overlay"></div>
            </div>

            {/* Corner elements */}
            <div className="blog-page__featured-image-corner tl"></div>
            <div className="blog-page__featured-image-corner tr"></div>
            <div className="blog-page__featured-image-corner bl"></div>
            <div className="blog-page__featured-image-corner br"></div>

            <div className="blog-page__featured-content-container">
              <Link
                href={`/blog/${first_blog.slug}`}
                className="blog-page__featured-content-link"
              >
                <div
                  ref={featuredDateRef}
                  className="blog-page__featured-image-date"
                >
                  {formatDate(first_blog.date)}
                </div>
                <div
                  ref={featuredCategoryRef}
                  className="blog-page__featured-category"
                >
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

          <div
            ref={postsSectionRef}
            className="blog-page__posts-section"
            id="pagination-section"
          >
            <h2 className="posts-title">Artículos Recientes</h2>

            <div ref={postsGridRef} className="posts-grid">
              {currentItems.map((item, index) => (
                <div key={item.id} className="blog-page__post-item">
                  <BlogItem
                    key={`blog-item-${key}-${item.id}`}
                    item={item}
                    index={index}
                  />
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

          <div
            className="blog-page__desktop-social-cta"
            ref={desktopSocialCtaRef}
          >
            <div className="blog-page__desktop-social-cta-content">
              <h3>
                Mantente actualizado con nuestros últimos{" "}
                <span className="highlight">contenidos y proyectos</span>
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
