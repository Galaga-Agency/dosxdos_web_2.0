import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/types/blog-post-types";
import { formatDate } from "@/utils/formatting/dateFormatting";
import "./BlogItem.scss";

interface BlogItemProps {
  item: BlogPost;
  index?: number;
}

const BlogItem: React.FC<BlogItemProps> = ({ item, index = 0 }) => {
  return (
    <div
      className="blog-item"
      style={{ "--animation-order": index } as React.CSSProperties}
    >
      <div className="blog-item__image-container">
        <div className="blog-item__image-wrapper">
          <Image
            src={item.coverImage || (item.img && item.img[0]) || ""}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="blog-item__image"
          />
        </div>
        <div className="blog-item__date">
          <span>{formatDate(item.date)}</span>
        </div>
      </div>

      <div className="blog-item__content">
        <div className="blog-item__glass">
          <div className="blog-item__category">
            <span>{item.category}</span>
          </div>
          <h3 className="blog-item__title">
            <Link href={`/blog/${item.id}`}>{item.title}</Link>
          </h3>
          <p className="blog-item__excerpt">
            {item.excerpt ||
              (item.content && `${item.content.slice(0, 120)}...`)}
          </p>
          <div className="blog-item__link">
            <Link href={`/blog/${item.id}`} className="blog-item__read-more">
              Leer más
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
