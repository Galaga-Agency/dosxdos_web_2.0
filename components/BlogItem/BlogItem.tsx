import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/types/blog-post-types";
import { formatDate } from "@/utils/formatting/dateFormatting";
import { animateBlogItemCorners } from "@/utils/animations/homepage-anim";
import "./BlogItem.scss";

interface BlogItemProps {
  item: BlogPost;
  index?: number;
}

const BlogItem: React.FC<BlogItemProps> = ({ item, index = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Initialize corner animations when component mounts
  useEffect(() => {
    if (cardRef.current) {
      animateBlogItemCorners(cardRef.current);
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="blog-item"
      style={{ "--animation-order": index } as React.CSSProperties}
    >
      <div className="blog-item__image-container">
        <div className="blog-item__image-wrapper">
          <Image
            src={item.coverImage || (item.img && item.img[0]) || "/assets/img/blog/default-blog-image.jpg"}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 992px) 50vw, 33vw"
            className="blog-item__image"
            priority={index < 3}
          />
        </div>
        {item.date && (
          <div className="blog-item__date">
            <span>{formatDate(item.date)}</span>
          </div>
        )}
      </div>

      <div className="blog-item__content">
        <div className="blog-item__glass">
          {item.category && (
            <div className="blog-item__category">
              <span>{item.category}</span>
            </div>
          )}
          <h3 className="blog-item__title">
            <Link href={`/blog/${item.id}`}>{item.title}</Link>
          </h3>
          <p className="blog-item__excerpt">
            {item.excerpt ||
              (item.content && item.content.length > 120
                ? `${item.content.slice(0, 120)}...`
                : item.content)}
          </p>
          <div className="blog-item__link">
            <Link href={`/blog/${item.id}`} className="blog-item__read-more">
              Leer más
            </Link>
          </div>
        </div>
      </div>
      
      {/* Corner elements that will be animated */}
      <div className="blog-item__corner top-left"></div>
      <div className="blog-item__corner bottom-right"></div>
    </div>
  );
};

export default BlogItem;