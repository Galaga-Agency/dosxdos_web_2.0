"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { BlogPost } from "@/types/blog-post-types";
import { formatDate } from "@/utils/formatting/dateFormatting";
import { formatBlogContent, getImageSource } from "@/utils/editor";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import SocialIcons from "@/components/SocialIcons/SocialIcons";
import { getAllPosts, getPostBySlug } from "@/lib/blog-service";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { findRelatedPosts } from "@/utils/similarity";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import {
  initBlogDetailAnimations,
  setupHoverEffects,
  cleanupBlogDetailAnimations,
} from "@/utils/animations/blog-detail-anim";
import "./blog-details.scss";
import Loading from "@/components/ui/Loading/Loading";

interface BlogDetailPageProps {
  params: Promise<{ blogArticleSlug: string }>;
}

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ params }) => {
  const { blogArticleSlug } = React.use(params);
  const [blogPost, setBlogPost] = React.useState<BlogPost | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [relatedPosts, setRelatedPosts] = React.useState<BlogPost[]>([]);
  const router = useRouter();

  const heroRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroCategoryRef = useRef<HTMLDivElement>(null);
  const heroDateRef = useRef<HTMLDivElement>(null);
  const heroAuthorRef = useRef<HTMLDivElement>(null);
  const backButtonRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const relatedPostsRef = useRef<HTMLDivElement>(null);
  const ctaSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchBlogPost() {
      try {
        const data = await getPostBySlug(blogArticleSlug);

        if (!data) {
          notFound();
          return;
        }

        setBlogPost(data);

        const allPosts = await getAllPosts();
        const related = data ? findRelatedPosts(data, allPosts, 3) : [];

        if (related.length === 0) {
          const categoryMatches = allPosts.filter(
            (post) =>
              post.slug !== data.slug && post.category === data?.category
          );
          setRelatedPosts(categoryMatches.slice(0, 3));
        } else {
          setRelatedPosts(related);
        }
      } catch (error) {
        console.error("Error loading blog post:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    }

    fetchBlogPost();
  }, [blogArticleSlug]);

  // Initialize animations when content is loaded
  useEffect(() => {
    if (!loading && blogPost) {
      // Register GSAP plugins
      gsap.registerPlugin(ScrollTrigger);

      // Initialize animations with a slight delay to ensure DOM is ready
      const timer = setTimeout(() => {
        requestAnimationFrame(() => {
          initBlogDetailAnimations({
            heroSection: heroRef.current || undefined,
            heroImage: heroImageRef.current || undefined,
            heroTitle: heroTitleRef.current || undefined,
            heroCategory: heroCategoryRef.current || undefined,
            heroDate: heroDateRef.current || undefined,
            heroAuthor: heroAuthorRef.current || undefined,
            backButton: backButtonRef.current || undefined,
            content: contentRef.current || undefined,
            relatedPosts: relatedPostsRef.current || undefined,
            ctaSection: ctaSectionRef.current || undefined,
          });

          // Setup hover effects
          setupHoverEffects();
        });
      }, 300);

      return () => {
        clearTimeout(timer);
        cleanupBlogDetailAnimations();
      };
    }
  }, [loading, blogPost]);

  if (loading) {
    return (
      <div className="blog-detail__loading">
        <Loading />
      </div>
    );
  }

  if (!blogPost) {
    notFound();
    return null;
  }

  const createMarkup = (htmlContent: string) => {
    return { __html: htmlContent };
  };

  return (
    <SmoothScrollWrapper>
      <div className="blog-detail">
        <div className="blog-detail__social-sidebar">
          <div className="blog-detail__social-wrapper">
            <span className="blog-detail__social-label">Síguenos</span>
            <SocialIcons orientation="vertical" color="white" />
          </div>
        </div>

        <div ref={backButtonRef} className="blog-detail__back-button-wrapper">
          <PrimaryButton
            onClick={() => router.back()}
            size="small"
            className="blog-detail__back-button"
          >
            <span className="arrow">←</span> Volver
          </PrimaryButton>
        </div>

        {/* Hero section structured like your project details page */}
        <section
          ref={heroRef}
          className="blog-detail__hero"
          style={{ backgroundImage: `url(${getImageSource(blogPost)})` }}
        >
          {/* This is the wrapper that will get the parallax effect */}
          <div ref={heroImageRef} className="blog-detail__hero-wrapper">
            <div className="blog-detail__hero-content">
              <div className="blog-detail__hero-meta">
                {/* Category */}
                <div
                  ref={heroCategoryRef}
                  className="blog-detail__hero-category"
                >
                  <span>{blogPost.category}</span>
                </div>
                {/* Date */}
                <div ref={heroDateRef} className="blog-detail__hero-date">
                  <span>{formatDate(blogPost.date)}</span>
                </div>
              </div>

              {/* Title - this won't parallax now */}
              <h1
                ref={heroTitleRef}
                className="blog-detail__hero-title char-animation"
              >
                {blogPost.title}
              </h1>

              {/* Author info */}
              <div ref={heroAuthorRef} className="blog-detail__hero-author">
                <span>Por {blogPost.author}</span>
              </div>
            </div>
          </div>

          {/* Corner elements */}
          <div className="blog-detail__hero-corner tl"></div>
          <div className="blog-detail__hero-corner tr"></div>
          <div className="blog-detail__hero-corner bl"></div>
          <div className="blog-detail__hero-corner br"></div>
        </section>

        <div className="blog-detail__container">
          <div ref={contentRef} className="blog-detail__content">
            {blogPost.excerpt && (
              <div className="blog-detail__excerpt">
                <p>{blogPost.excerpt}</p>
              </div>
            )}

            <div
              className="blog-detail__body"
              dangerouslySetInnerHTML={createMarkup(
                formatBlogContent(blogPost.content)
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

          <div className="blog-detail__share-section">
            <h3 className="blog-detail__share-title">Comparte este artículo</h3>
            <SocialIcons orientation="horizontal" color="primary" />
          </div>

          {relatedPosts.length > 0 && (
            <div ref={relatedPostsRef} className="blog-detail__related-posts">
              <h2 className="blog-detail__related-title">
                Artículos relacionados
              </h2>
              <div className="blog-detail__related-grid">
                {relatedPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="blog-detail__related-item"
                  >
                    <div className="blog-detail__related-image-container">
                      <Image
                        src={getImageSource(post)}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="blog-detail__related-image"
                      />
                      <div className="blog-detail__related-image-overlay"></div>
                      <div className="blog-detail__related-image-corner tl"></div>
                      <div className="blog-detail__related-image-corner tr"></div>
                      <div className="blog-detail__related-image-corner bl"></div>
                      <div className="blog-detail__related-image-corner br"></div>
                    </div>
                    <div className="blog-detail__related-content">
                      <span className="blog-detail__related-date">
                        {formatDate(post.date)}
                      </span>
                      <h3 className="blog-detail__related-item-title">
                        {post.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div ref={ctaSectionRef} className="blog-detail__cta-section">
            <div className="blog-detail__cta-content">
              <h2 className="blog-detail__cta-title">
                Descubre más <span className="highlight">inspiración</span>
              </h2>
              <p className="blog-detail__cta-text">
                Explora nuestra colección de artículos y encuentra ideas para tu
                próximo proyecto.
              </p>
              <PrimaryButton href="/blog" className="blog-detail__cta-button">
                <span className="button-text">Ver más artículos</span>
                <span className="button-icon">→</span>
              </PrimaryButton>
            </div>
          </div>
        </div>

        <div className="blog-detail__mobile-social-section">
          <div className="blog-detail__mobile-social-header">
            <h3 className="blog-detail__mobile-social-title">Síguenos</h3>
            <div className="blog-detail__mobile-social-divider"></div>
          </div>
          <SocialIcons orientation="horizontal" color="primary" />
        </div>
      </div>
    </SmoothScrollWrapper>
  );
};

export default BlogDetailPage;
