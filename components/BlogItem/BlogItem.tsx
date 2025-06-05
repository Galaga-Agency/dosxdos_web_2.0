// BlogItem.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/types/blog-post-types";
import { formatDate } from "@/utils/dateFormatting";
import "./BlogItem.scss";
import TransitionLink from "../Link";

interface BlogItemProps {
  item: BlogPost;
  index?: number;
}

const BlogItem: React.FC<BlogItemProps> = ({ item, index = 0 }) => {
  return (
    <Link href={`/blog/${item.slug}`} className="blog-item">
      <div className="blog-item__image-container">
        <div className="blog-item__image-wrapper">
          <Image
            src={
              item.coverImage ||
              (item.img && item.img[0]) ||
              "/assets/img/default-blog-image.jpg"
            }
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 992px) 50vw, 33vw"
            className="blog-item__image"
            priority={index < 3}
          />
        </div>
        {item.date && (
          <div className="blog-item__date">{formatDate(item.date)}</div>
        )}
      </div>

      <div className="blog-item__content">
        {item.category && (
          <div className="blog-item__category">{item.category}</div>
        )}
        <h3 className="blog-item__title">
          <span className="underline-text">{item.title}</span>
        </h3>
        {item.excerpt && <p className="blog-item__excerpt">{item.excerpt}</p>}
        <span className="blog-item__read-more">
          <span className="underline-text">Leer más</span>
        </span>
      </div>
    </Link>
  );
};

export default BlogItem;
