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

  return (
    <section
      className="blog-detail__hero"
      style={{ backgroundImage: `url(${getImageSource(blogPost)})` }}
    >
      <div className="blog-detail__hero-wrapper">
        <div className="blog-detail__hero-content">
          <div className="blog-detail__hero-meta">
            <div className="blog-detail__hero-category">
              <span>{blogPost.category}</span>
            </div>
            <div  className="blog-detail__hero-date">
              <span>{formatDate(blogPost.date)}</span>
            </div>
          </div>

          <h1
            className="blog-detail__hero-title char-animation"
          >
            {blogPost.title}
          </h1>

          <div className="blog-detail__hero-author">
            <span>Por {blogPost.author}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailHeroSection;
