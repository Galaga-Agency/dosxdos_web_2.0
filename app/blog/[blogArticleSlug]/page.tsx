"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { BlogPost } from "@/types/blog-post-types";
import { formatDate } from "@/utils/formatting/dateFormatting";
import { formatBlogContent, getImageSource } from "@/utils/editor";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import SocialIcons from "@/components/SocialIcons/SocialIcons";
import ShareButtons from "@/components/ShareButtons/ShareButtons";
import BlogMetadata from "@/components/BlogMetadata";
import { getAllPosts, getPostBySlug } from "@/lib/blog-service";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { findRelatedPosts } from "@/utils/similarity";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import {
  initBlogDetailAnimations,
  cleanupBlogDetailAnimations,
  setupBlogDetailHoverEffects,
} from "@/utils/animations/pages/blog-detail-anim";
import "./blog-details.scss";
import Loading from "@/components/ui/Loading/Loading";
import BlogItem from "@/components/BlogItem/BlogItem";
import Footer from "@/components/layout/Footer/footer";

interface BlogDetailPageProps {
  params: Promise<{ blogArticleSlug: string }>;
}

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ params }) => {
  const { blogArticleSlug } = React.use(params);
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [key] = useState(() => Date.now()); // For component remounting consistency
  const router = useRouter();
  const [currentUrl, setCurrentUrl] = useState<string>("");

  // Element refs for animations
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

  // Establecer la URL actual cuando el componente se monta
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  // Fetch blog post and related posts
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

    // Cleanup animations when unmounting
    return () => {
      cleanupBlogDetailAnimations();
    };
  }, [blogArticleSlug]);

  // Initialize animations when content is loaded
  useEffect(() => {
    if (!loading && blogPost) {
      // Register GSAP plugins
      if (typeof window !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
      }

      // Initialize animations with a slight delay to ensure DOM is ready
      const timer = setTimeout(() => {
        initBlogDetailAnimations({
          heroSection: heroRef.current,
          heroImage: heroImageRef.current,
          heroTitle: heroTitleRef.current,
          heroCategory: heroCategoryRef.current,
          heroDate: heroDateRef.current,
          heroAuthor: heroAuthorRef.current,
          backButton: backButtonRef.current,
          content: contentRef.current,
          relatedPosts: relatedPostsRef.current,
          ctaSection: ctaSectionRef.current,
        });
      }, 300);

      return () => clearTimeout(timer);
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

  // Texto para compartir en redes sociales
  const shareTitle = blogPost.title;
  const shareSummary =
    blogPost.excerpt ||
    `Artículo de ${blogPost.author} en Dos por Dos Grupo Imagen sobre ${blogPost.category}`;

  return (
    <SmoothScrollWrapper>
      <div className="blog-detail" key={key}>
        {/* <div ref={backButtonRef} className="blog-detail__back-button-wrapper">
          <PrimaryButton
            onClick={() => router.back()}
            size="small"
            className="blog-detail__back-button"
          >
            <span className="arrow">←</span> Volver
          </PrimaryButton>
        </div> */}

        <section
          ref={heroRef}
          className="blog-detail__hero"
          style={{ backgroundImage: `url(${getImageSource(blogPost)})` }}
        >
          <div ref={heroImageRef} className="blog-detail__hero-wrapper">
            <div className="blog-detail__hero-content">
              <div className="blog-detail__hero-meta">
                <div
                  ref={heroCategoryRef}
                  className="blog-detail__hero-category"
                >
                  <span>{blogPost.category}</span>
                </div>
                <div ref={heroDateRef} className="blog-detail__hero-date">
                  <span>{formatDate(blogPost.date)}</span>
                </div>
              </div>

              <h1
                ref={heroTitleRef}
                className="blog-detail__hero-title char-animation"
              >
                {blogPost.title}
              </h1>

              <div ref={heroAuthorRef} className="blog-detail__hero-author">
                <span>Por {blogPost.author}</span>
              </div>
            </div>
          </div>
        </section>

        <div className="blog-detail__container">
          <div ref={contentRef} className="blog-detail__content">
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
            <ShareButtons
              post={blogPost}
              url={currentUrl}
              color="primary"
              iconSize="medium"
              orientation="horizontal"
            />
          </div>

          {relatedPosts.length > 0 && (
            <div ref={relatedPostsRef} className="blog-detail__related-posts">
              <h2 className="blog-detail__related-title">
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

          <div ref={ctaSectionRef} className="blog-detail__cta-section">
            <div className="blog-detail__cta-content">
              <h2 className="blog-detail__cta-title">
                Descubre más inspiración
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
      <Footer />
    </SmoothScrollWrapper>
  );
};

export default BlogDetailPage;
