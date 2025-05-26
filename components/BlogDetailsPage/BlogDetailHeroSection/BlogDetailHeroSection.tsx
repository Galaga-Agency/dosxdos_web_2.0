import React, { useRef } from "react";
import { formatDate } from "@/utils/dateFormatting";
import { BlogPost } from "@/types/blog-post-types";
import { getImageSource } from "@/utils/editor";

interface BlogDetailHeroSectionProps {
  blogPost: BlogPost;
}

const BlogDetailHeroSection: React.FC<BlogDetailHeroSectionProps> = ({
  blogPost,
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroCategoryRef = useRef<HTMLDivElement>(null);
  const heroDateRef = useRef<HTMLDivElement>(null);
  const heroAuthorRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={heroRef}
      className="blog-detail__hero"
      style={{ backgroundImage: `url(${getImageSource(blogPost)})` }}
    >
      <div ref={heroImageRef} className="blog-detail__hero-wrapper">
        <div className="blog-detail__hero-content">
          <div className="blog-detail__hero-meta">
            {/* Category */}
            <div ref={heroCategoryRef} className="blog-detail__hero-category">
              <span>{blogPost.category}</span>
            </div>
            {/* Date */}
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

          {/* Author info */}
          <div ref={heroAuthorRef} className="blog-detail__hero-author">
            <span>Por {blogPost.author}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailHeroSection;
