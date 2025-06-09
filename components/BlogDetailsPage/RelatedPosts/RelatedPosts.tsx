import React, { useRef } from "react";
import Image from "next/image";
import { BlogPost } from "@/types/blog-post-types";
import { formatDate } from "@/utils/dateFormatting";
import { getImageSource } from "@/utils/editor";

interface RelatedPostsProps {
  relatedPosts: BlogPost[];
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ relatedPosts }) => {
  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="blog-detail__related-posts">
      <h2 className="blog-detail__related-title">Artículos relacionados</h2>
      <div className="blog-detail__related-grid">
        {relatedPosts.map((post) => (
          <a
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
              <h3 className="blog-detail__related-item-title">{post.title}</h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
