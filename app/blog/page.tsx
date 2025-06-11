"use client";

import React, { useEffect, useState, useCallback } from "react";
import useScrollSmooth from "@/hooks/useScrollSmooth";
import { gsap } from "gsap";
import { ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

import Image from "next/image";
import SocialIcons from "@/components/SocialIcons/SocialIcons";
import BlogItem from "@/components/BlogItem/BlogItem";
import Pagination from "@/components/ui/Pagination/Pagination";
import usePagination from "@/hooks/usePagination";
import { formatDate } from "@/utils/dateFormatting";
import { useDataStore } from "@/store/useDataStore";
import Footer from "@/components/layout/Footer/footer";
import PageWrapper from "@/components/PageWrapper/PageWrapper";

import {
  charAnimation,
  rollUpTextAnimation,
} from "@/utils/animations/text-anim";
import { featuredImageAnimation } from "@/utils/animations/featured-image-anim";
import { animatePaginatedItems } from "@/utils/animations/stagger-items-anim";

import "./blog-page.scss";
import Link from "next/link";
import { footerAnimation } from "@/utils/animations/footer-anim";

const BlogPage: React.FC = () => {
  useScrollSmooth();

  // Get data from store (should already be loaded by DataPreloader)
  const posts = useDataStore((state) => state.posts);

  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);

  // Filter published posts
  const publishedBlogItems = posts.filter((post) => post.published === true);

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

  useEffect(() => {
    document.body.classList.add("smooth-scroll");

    return () => {
      document.body.classList.remove("smooth-scroll");
    };
  }, []);

  const first_blog = publishedBlogItems[0];
  const other_blogs = publishedBlogItems.slice(1);

  const { currentItems, handlePageClick, pageCount, currentPage } =
    usePagination({
      items: other_blogs,
      itemsPerPage: itemsPerPage,
    });

  // Callback for when hero image loads
  const handleHeroImageLoad = useCallback(() => {
    setHeroImageLoaded(true);
  }, []);

  useGSAP(() => {
    if (first_blog && heroImageLoaded) {
      const timer = setTimeout(() => {
        charAnimation();
        rollUpTextAnimation();
        featuredImageAnimation();
        footerAnimation();

        animatePaginatedItems(".blog-page__post-item", {
          container: ".posts-grid",
          stagger: 0.2,
          fromY: 40,
          duration: 0.8,
          ease: "power2.out",
        });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [first_blog, heroImageLoaded, currentPage]);

  // If no posts available
  if (publishedBlogItems.length === 0) {
    return (
      <PageWrapper>
        <div className="blog-page">
          <div className="blog-page__container container">
            <div className="blog-page__empty">
              <h2 className="secondary-title">No hay artículos disponibles</h2>
              <p className="text">Vuelve pronto para ver nuevo contenido.</p>
            </div>
          </div>
        </div>
        <Footer />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="blog-page">
        <div className="blog-page__container">
          {first_blog && (
            <div className="blog-page__featured-section">
              <div className="blog-page__featured-offset-background"></div>
              <div className="blog-page__featured-image-container featured-image-container">
                <div
                  className={`blog-page__featured-image-wrapper featured-image-wrapper hero-image-wrapper ${
                    heroImageLoaded ? "loaded" : "loading"
                  }`}
                >
                  <Image
                    src={
                      first_blog?.coverImage ||
                      "/assets/img/default-blog-image.jpg"
                    }
                    alt={first_blog?.title}
                    fill
                    priority
                    onLoad={handleHeroImageLoad}
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
                    <div className="blog-page__featured-image-date ">
                      {formatDate(first_blog?.date)}
                    </div>
                    <div className="blog-page__featured-category ">
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
          )}
          {currentItems.length > 1 && (
            <div className="blog-page__posts-section" id="pagination-section">
              <h2 className="posts-title small-title ">
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

              {pageCount > 1 && (
                <div className="blog-page__pagination ">
                  <Pagination
                    handlePageClick={(page) =>
                      handlePageClick({ selected: page })
                    }
                    pageCount={pageCount}
                    currentPage={currentPage}
                  />
                </div>
              )}
            </div>
          )}

          <div className="blog-page__mobile-social-section">
            <div className="blog-page__mobile-social-header">
              <h3 className="blog-page__mobile-social-title">Síguenos</h3>
              <div className="blog-page__mobile-social-divider"></div>
            </div>
            <SocialIcons orientation="horizontal" />
          </div>

          <div className="blog-page__desktop-social-cta ">
            <div className="blog-page__desktop-social-cta-content">
              <h3 className="small-title">
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
      <Footer />
    </PageWrapper>
  );
};

export default BlogPage;
