"use client";

import React, { useEffect, useRef, useState } from "react";
import useScrollSmooth from "@/hooks/useScrollSmooth";
import { gsap } from "gsap";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { BlogPost } from "@/types/blog-post-types";
import { formatDate } from "@/utils/dateFormatting";
import { formatBlogContent, getImageSource } from "@/utils/editor";
import SocialIcons from "@/components/SocialIcons/SocialIcons";
import ShareButtons from "@/components/ShareButtons/ShareButtons";
import { getAllPosts, getPostBySlug } from "@/lib/blog-service";
import { findRelatedPosts } from "@/utils/similarity";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import Loading from "@/components/ui/Loading/Loading";
import BlogItem from "@/components/BlogItem/BlogItem";
import Footer from "@/components/layout/Footer/footer";

import {
  charAnimation,
  fadeAnimation,
  rollUpTextAnimation,
} from "@/utils/animations/text-anim";

import "./blog-details.scss";
import { featuredImageAnimation } from "@/utils/animations/featured-image-anim";
import { isMobile, isTablet } from "@/utils/device";
import useDeviceDetect from "@/hooks/useDeviceDetect";

interface BlogDetailPageProps {
  params: Promise<{ blogArticleSlug: string }>;
}

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ params }) => {
  useScrollSmooth();

  const { blogArticleSlug } = React.use(params);
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [key] = useState(() => Date.now());
  const router = useRouter();
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const { isMobile, isTablet  } = useDeviceDetect();
  const relatedCount = isMobile ? 1 : isTablet ? 2 : 3;


  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }

    document.body.classList.add("smooth-scroll");

    return () => {
      document.body.classList.remove("smooth-scroll");
    };
  }, []);

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
        const related = data ? findRelatedPosts(data, allPosts, relatedCount) : [];

        if (related.length === 0) {
          const categoryMatches = allPosts.filter(
            (post) =>
              post.slug !== data.slug && post.category === data?.category
          );
          setRelatedPosts(
            categoryMatches.slice(0, isMobile ? 1 : isTablet ? 2 : 3)
          );
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

  useGSAP(() => {
    if (!loading && blogPost) {
      const timer = setTimeout(() => {
        fadeAnimation();
        charAnimation();
        rollUpTextAnimation();
        featuredImageAnimation();

        gsap.set(
          ".blog-detail__body p, .blog-detail__body h1, .blog-detail__body h2, .blog-detail__body h3, .blog-detail__body ul, .blog-detail__body ol, .blog-detail__body blockquote, .blog-detail__tags, .blog-detail__cta-title, .blog-detail__cta-text, .blog-detail__cta-button, .blog-detail__mobile-social-section",
          {
            opacity: 1,
          }
        );
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [loading, blogPost]);

  const createMarkup = (htmlContent: string) => {
    return { __html: htmlContent };
  };

  const shareTitle = blogPost?.title || "";
  const shareSummary =
    blogPost?.excerpt ||
    `Artículo de ${blogPost?.author || ""} en Dos por Dos Grupo Imagen sobre ${
      blogPost?.category || ""
    }`;

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div className="blog-detail">
          {loading || !blogPost ? (
            <div className="blog-detail__loading">
              <Loading />
            </div>
          ) : (
            <>
              <section
                className="blog-detail__hero"
                style={{ backgroundImage: `url(${getImageSource(blogPost)})` }}
                data-speed="0.95"
              >
                <div className="blog-detail__hero-wrapper">
                  <div className="blog-detail__hero-content">
                    <div className="blog-detail__hero-meta">
                      <div className="blog-detail__hero-category fade_bottom">
                        <span>{blogPost.category}</span>
                      </div>
                      <div className="blog-detail__hero-date fade_bottom">
                        <span>{formatDate(blogPost.date)}</span>
                      </div>
                    </div>

                    <h1 className="blog-detail__hero-title char-animation">
                      {blogPost.title}
                    </h1>

                    <div className="blog-detail__hero-author fade_bottom">
                      <span>Por {blogPost.author}</span>
                    </div>
                  </div>
                </div>
              </section>

              <div className="blog-detail__container">
                <div className="blog-detail__content">
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

                <div className="blog-detail__share-section fade_bottom">
                  <h3 className="blog-detail__share-title">
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
                  <div className="blog-detail__related-posts fade_bottom">
                    <h2 className="blog-detail__related-title">
                      Artículos relacionados
                    </h2>
                    <div className="blog-detail__related-grid">
                      {relatedPosts.map((post, index) => (
                        <div
                          key={post.id}
                          className="blog-detail__related-item"
                        >
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

                <div className="blog-detail__cta-section fade_bottom">
                  <div className="blog-detail__cta-content">
                    <h2 className="blog-detail__cta-title">
                      Descubre más <span className="highlight">inspiración</span>
                    </h2>
                    <p className="blog-detail__cta-text">
                      Explora nuestra colección de artículos y encuentra ideas
                      para tu próximo proyecto.
                    </p>
                    <PrimaryButton
                      href="/blog"
                      className="blog-detail__cta-button"
                    >
                      <span className="button-text">Ver más artículos</span>
                      <span className="button-icon">→</span>
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default BlogDetailPage;
