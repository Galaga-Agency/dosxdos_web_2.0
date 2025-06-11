"use client";

import React, { useEffect, useState } from "react";
import useScrollSmooth from "@/hooks/useScrollSmooth";
import { gsap } from "gsap";
import { ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

import { notFound } from "next/navigation";
import { BlogPost } from "@/types/blog-post-types";
import { formatDate } from "@/utils/dateFormatting";
import { formatBlogContent, getImageSource } from "@/utils/editor";
import ShareButtons from "@/components/ShareButtons/ShareButtons";
import { useDataStore } from "@/store/useDataStore";
import { findRelatedPosts } from "@/utils/similarity";
import BlogItem from "@/components/BlogItem/BlogItem";
import Footer from "@/components/layout/Footer/footer";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import HoverCircleButton from "@/components/ui/HoverCircleButton/HoverCircleButton";

import {
  charAnimation,
  rollUpTextAnimation,
} from "@/utils/animations/text-anim";
import { featuredImageAnimation } from "@/utils/animations/featured-image-anim";
import { hoverCircleButtonAnimation } from "@/utils/animations/hover-btn";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import { footerAnimation } from "@/utils/animations/footer-anim";

import "./blog-details.scss";

interface BlogDetailPageProps {
  params: Promise<{ blogArticleSlug: string }>;
}

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ params }) => {
  useScrollSmooth();

  const { blogArticleSlug } = React.use(params);
  const { getPostBySlug, posts } = useDataStore();
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const { isMobile, isTablet } = useDeviceDetect();

  // Get post from store
  const blogPost = getPostBySlug(blogArticleSlug);

  // Calculate related posts from store
  const relatedCount = isMobile ? 1 : isTablet ? 2 : 3;
  const relatedPosts = blogPost
    ? findRelatedPosts(blogPost, posts, relatedCount)
    : [];

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  useGSAP(() => {
    const timer = setTimeout(() => {
      charAnimation();
      rollUpTextAnimation();
      featuredImageAnimation();
      hoverCircleButtonAnimation();
      footerAnimation();
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const createMarkup = (htmlContent: string) => {
    return { __html: htmlContent };
  };

  if (!blogPost) {
    return null;
  }

  return (
    <PageWrapper>
      <div className="blog-detail">
        <section className="blog-detail__header">
          <div className="blog-detail__header-container">
            <div className="blog-detail__category ">
              <span>{blogPost.category}</span>
            </div>

            <h1 className="blog-detail__title title char-animation">
              {blogPost.title}
            </h1>

            <div className="blog-detail__meta ">
              <div className="blog-detail__author">
                <span>{blogPost.author}</span>
              </div>
              <div className="blog-detail__date">
                <span>{formatDate(blogPost.date)}</span>
              </div>
            </div>
          </div>
        </section>

        <div className="blog-detail__hero-container">
          <section
            className="blog-detail__hero hero-image-wrapper"
            style={{ backgroundImage: `url(${getImageSource(blogPost)})` }}
            data-speed="0.75"
          />
        </div>

        <div className="blog-detail__container">
          <div className="blog-detail__content">
            <div
              className="blog-detail__body"
              dangerouslySetInnerHTML={createMarkup(
                formatBlogContent(
                  blogPost.editorBlocks
                    ? JSON.parse(blogPost.editorBlocks)
                    : blogPost.content
                )
              )}
            />

            <div className="blog-detail__tags">
              <span className="blog-detail__tags-title">Etiquetas:</span>
              <div className="blog-detail__tags-list">
                {blogPost.tags && blogPost.tags.length > 0 ? (
                  blogPost.tags.map((tag, index) => (
                    <span key={index} className="blog-detail__tag">
                      {tag}
                    </span>
                  ))
                ) : (
                  <>
                    <span className="blog-detail__tag">Diseño</span>
                    <span className="blog-detail__tag">Marketing</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="blog-detail__share-section ">
            <h3 className="blog-detail__share-title small-title">
              Comparte este artículo
            </h3>
            <ShareButtons
              post={blogPost}
              url={currentUrl}
              color="primary"
              iconSize="medium"
              orientation="horizontal"
            />
          </div>

          {relatedPosts.length > 0 && (
            <div className="blog-detail__related-posts ">
              <h2 className="blog-detail__related-title secondary-title">
                Artículos relacionados
              </h2>
              <div className="blog-detail__related-grid">
                {relatedPosts.map((post, index) => (
                  <div key={post.id} className="blog-detail__related-item">
                    <BlogItem
                      key={`related-blog-item-${post.id}`}
                      item={post}
                      index={index}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="blog-detail__cta-section ">
            <div className="blog-detail__cta-content">
              <h2 className="blog-detail__cta-title small-title">
                Descubre más <span className="highlight">inspiración</span>
              </h2>
              <p className="blog-detail__cta-text subtitle">
                Explora nuestra colección de artículos y encuentra ideas para tu
                próximo proyecto.
              </p>
              <HoverCircleButton href="/blog" label="Ver más artículos" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </PageWrapper>
  );
};

export default BlogDetailPage;
