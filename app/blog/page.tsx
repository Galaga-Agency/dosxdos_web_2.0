"use client";

import React, { useEffect, useState } from "react";
import useScrollSmooth from "@/hooks/useScrollSmooth";
import { gsap } from "gsap";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

import Image from "next/image";
import Link from "next/link";
import SocialIcons from "@/components/SocialIcons/SocialIcons";
import BlogItem from "@/components/BlogItem/BlogItem";
import Pagination from "@/components/ui/Pagination/Pagination";
import usePagination from "@/hooks/usePagination";
import { formatDate } from "@/utils/dateFormatting";
import { BlogPost } from "@/types/blog-post-types";
import Loading from "@/components/ui/Loading/Loading";
import Footer from "@/components/layout/Footer/footer";

import {
  charAnimation,
  fadeAnimation,
  rollUpTextAnimation,
} from "@/utils/animations/text-anim";
import { featuredImageAnimation } from "@/utils/animations/featured-image-anim";
import { animatePaginatedItems } from "@/utils/animations/stagger-items-anim";

import "./blog-page.scss";

const BlogPage: React.FC = () => {
  useScrollSmooth();

  const [blogItems, setBlogItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Handle responsive itemsPerPage
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && window.innerWidth < 992) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Add smooth-scroll class and fetch blog posts
  useEffect(() => {
    document.body.classList.add("smooth-scroll");

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

    return () => {
      document.body.classList.remove("smooth-scroll");
    };
  }, []);

  const publishedBlogItems = blogItems.filter(
    (post) => post.published === true
  );

  const first_blog = publishedBlogItems[0];
  const other_blogs = publishedBlogItems.slice(1);

  const { currentItems, handlePageClick, pageCount, currentPage } =
    usePagination({
      items: other_blogs,
      itemsPerPage: itemsPerPage,
    });

  // Initialize animations with useGSAP
  useGSAP(() => {
    if (!loading && first_blog) {
      const timer = setTimeout(() => {
        fadeAnimation();
        charAnimation();
        rollUpTextAnimation();
        featuredImageAnimation();

        // Using the new utility for staggered animations
        animatePaginatedItems(".blog-page__post-item", {
          container: ".posts-grid",
          stagger: 0.2,
          fromY: 40,
          duration: 0.8,
          ease: "power2.out",
        });
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [loading, first_blog, currentPage]);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div className="blog-page">
          {loading || !first_blog ? (
            <Loading />
          ) : (
            <div className="blog-page__container">
              <div className="blog-page__featured-section">
                <div className="blog-page__featured-offset-background"></div>
                <div className="blog-page__featured-image-container featured-image-container">
                  <div className="blog-page__featured-image-wrapper featured-image-wrapper">
                    <Image
                      src={
                        first_blog?.coverImage ||
                        "/assets/img/default-blog-image.jpg"
                      }
                      alt={first_blog?.title}
                      fill
                      priority
                    />
                  </div>
                  <div className="blog-page__featured-image-overlay"></div>
                </div>
                <div className="blog-page__featured-content-container">
                  <Link
                    href={`/blog/${first_blog?.slug}`}
                    className="blog-page__featured-content-link"
                  >
                    <div className="blog-page__labels-container">
                      <div className="blog-page__featured-image-date fade_bottom">
                        {formatDate(first_blog?.date)}
                      </div>
                      <div className="blog-page__featured-category fade_bottom">
                        <span>{first_blog?.category}</span>
                      </div>
                    </div>

                    <h1 className="blog-page__featured-image-title secondary-title char-animation">
                      {first_blog?.title}
                    </h1>
                    <div className="blog-page__featured-excerpt">
                      <p>{first_blog?.excerpt}</p>
                      <span className="blog-page__featured-read-more">
                        Leer más <span className="arrow">→</span>
                      </span>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="blog-page__posts-section" id="pagination-section">
                <h2 className="posts-title fade_bottom">
                  Artículos <span className="highlight">Recientes</span>
                </h2>

                <div className="posts-grid">
                  {currentItems.map((item, index) => (
                    <div key={item.id} className="blog-page__post-item">
                      <BlogItem
                        key={`blog-item-${item.id}`}
                        item={item}
                        index={index}
                      />
                    </div>
                  ))}
                </div>

                <div className="blog-page__pagination fade_bottom">
                  <Pagination
                    handlePageClick={(page) =>
                      handlePageClick({ selected: page })
                    }
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

              <div className="blog-page__desktop-social-cta fade_bottom">
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
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default BlogPage;
