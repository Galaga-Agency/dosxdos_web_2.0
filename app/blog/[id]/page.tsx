"use client";

import React, { useEffect, useRef, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { BlogPost } from "@/types/blog-post-types";
import { formatDate } from "@/utils/formatting/dateFormatting";
import { charAnimation } from "@/utils/animations/title-anim";
import { useParallax } from "@/utils/animations/parallax-image";
import { formatBlogContent, getImageSource } from "@/utils/editor";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import SocialIcons from "@/components/SocialIcons/SocialIcons";
import { getAllPosts, getPostById } from "@/lib/blog-service";
import gsap from "gsap";
import "./BlogDetail.scss";

interface BlogDetailPageProps {
  params: Promise<{ id: string }>;
}

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ params }) => {
  const { id } = use(params);
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const router = useRouter();
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchBlogPost() {
      try {
        // Use getPostById instead of direct fetch
        const data = await getPostById(id);
        setBlogPost(data);

        // Fetch related posts using getAllPosts
        const allPosts = await getAllPosts();

        setRelatedPosts(
          allPosts
            .filter(
              (post) =>
                post.id !== id && data && post.category === data.category
            )
            .slice(0, 3)
        );
      } catch (error) {
        console.error("Error loading blog post:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    }

    fetchBlogPost();
  }, [id]);

  // Apply parallax effect to the featured image
  useParallax(
    imageContainerRef as React.RefObject<HTMLElement>,
    imageRef as React.RefObject<HTMLElement>,
    {
      intensity: 0.25,
      scrubAmount: 1.2,
      delay: 200,
    }
  );

  // Animate title characters
  useEffect(() => {
    if (titleRef.current && blogPost) {
      gsap.set(titleRef.current, {
        visibility: "hidden",
      });

      const timer = setTimeout(() => {
        charAnimation(titleRef.current);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [blogPost]);

  // Animate content elements
  useEffect(() => {
    if (contentRef.current && blogPost) {
      const paragraphs = contentRef.current.querySelectorAll(
        "p, blockquote, h2, h3, ul, ol"
      );

      gsap.fromTo(
        paragraphs,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.5,
        }
      );
    }
  }, [blogPost]);

  if (loading) {
    return <div className="blog-loading">Cargando artículo...</div>;
  }

  if (!blogPost) {
    notFound();
    return null;
  }

  // Function to create markup for HTML content
  const createMarkup = (htmlContent: string) => {
    return { __html: htmlContent };
  };

  return (
    <SmoothScrollWrapper>
      <div className="blog-detail">
        <div className="blog-detail__container">
          <div className="blog-detail__social-sidebar">
            <div className="blog-detail__social-wrapper">
              <span className="blog-detail__social-label">Síguenos</span>
              <SocialIcons orientation="vertical" color="primary" />
            </div>
          </div>

          <div className="blog-detail__header">
            <div
              onClick={() => router.back()}
              className="blog-detail__back-link"
            >
              ← Volver
            </div>
            <div className="blog-detail__meta">
              <div className="blog-detail__category">
                <span>{blogPost.category}</span>
              </div>
              <div className="blog-detail__date">
                <span>{formatDate(blogPost.date)}</span>
              </div>
            </div>
            <h1 ref={titleRef} className="blog-detail__title char-animation">
              {blogPost.title}
            </h1>
            <div className="blog-detail__author">
              <span>Por {blogPost.author}</span>
            </div>
          </div>

          <div className="blog-detail__featured-image-section">
            <div
              ref={imageContainerRef}
              className="blog-detail__featured-image-container"
            >
              <div
                ref={imageRef}
                className="blog-detail__featured-image-wrapper"
              >
                <Image
                  src={getImageSource(blogPost)}
                  alt={blogPost.title}
                  fill
                  priority
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    willChange: "transform",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="blog-detail__content" ref={contentRef}>
            {blogPost.excerpt && (
              <div className="blog-detail__excerpt">
                <p>{blogPost.excerpt}</p>
              </div>
            )}

            {/* Render HTML content safely using dangerouslySetInnerHTML */}
            <div 
              className="blog-detail__body"
              dangerouslySetInnerHTML={createMarkup(formatBlogContent(blogPost.content))}
            />

            {/* Tags section - Use hardcoded tags if none provided */}
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
                    <span className="blog-detail__tag">Web</span>
                    <span className="blog-detail__tag">Creatividad</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="blog-detail__share-section">
            <h3 className="blog-detail__share-title">Comparte este artículo</h3>
            <div className="blog-detail__share-icons">
              <SocialIcons orientation="horizontal" color="primary" />
            </div>
          </div>

          {relatedPosts.length > 0 && (
            <div className="blog-detail__related-posts">
              <h2 className="blog-detail__related-title">
                Artículos relacionados
              </h2>
              <div className="blog-detail__related-grid">
                {relatedPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.id}`}
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

          <div className="blog-detail__mobile-social-section">
            <div className="blog-detail__mobile-social-header">
              <h3 className="blog-detail__mobile-social-title">Síguenos</h3>
              <div className="blog-detail__mobile-social-divider"></div>
            </div>
            <SocialIcons orientation="horizontal" color="primary" />
          </div>
        </div>
      </div>
    </SmoothScrollWrapper>
  );
};

export default BlogDetailPage;