import React, { useRef } from "react";
import { formatDate } from "@/utils/formatting/dateFormatting";
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
      {/* This is the wrapper that will get the parallax effect */}
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
  );
};

export default BlogDetailHeroSection;
