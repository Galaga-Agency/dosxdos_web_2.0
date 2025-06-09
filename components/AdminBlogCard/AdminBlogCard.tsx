import React from "react";
import Image from "next/image";
import TransitionLink from "next/link";
import { Edit, Trash, Eye } from "lucide-react";
import { BlogPost } from "@/types/blog-post-types";
import { formatDate } from "@/utils/dateFormatting";
import "./AdminBlogCard.scss";
import Link from "next/link";

interface AdminBlogCardProps {
  post: BlogPost;
  onDelete: (slug: string) => void;
  index: number;
}

const AdminBlogCard: React.FC<AdminBlogCardProps> = ({
  post,
  onDelete,
  index,
}) => {
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (post.id) {
      onDelete(post.id);
    }
  };

  return (
    <div
      className="admin-blog-card"
      style={{ "--animation-order": index } as React.CSSProperties}
    >
      <div className="admin-blog-card__image-container">
        <div className="admin-blog-card__image-wrapper">
          <Image
            src={
              post.coverImage ||
              post.img ||
              "/assets/img/default-blog-image.jpg"
            }
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="admin-blog-card__image"
            priority={index < 3}
          />
        </div>
        <div className="admin-blog-card__date">
          <span>{formatDate(post.date)}</span>
        </div>
      </div>

      <div className="admin-blog-card__content">
        <div className="admin-blog-card__meta">
          {post.category && (
            <div className="admin-blog-card__category">
              <span>{post.category}</span>
            </div>
          )}
          {!post.published && (
            <div className="admin-blog-card__status draft">
              <span>Borrador</span>
            </div>
          )}
          {post.published && (
            <div className="admin-blog-card__status published">
              <span>Publicado</span>
            </div>
          )}
        </div>

        <h3 className="admin-blog-card__title">{post.title}</h3>

        <p className="admin-blog-card__excerpt">
          {post.excerpt || (post.content && `${post.content.slice(0, 120)}...`)}
        </p>

        <div className="admin-blog-card__actions">
          <a
            href={`/blog/${post.slug}`}
            className="admin-blog-card__action view"
          >
            <Eye size={16} /> <span>Ver</span>
          </a>
          <a
            href={`/admin/blog/editar/${post.id}`}
            className="admin-blog-card__action edit"
          >
            <Edit size={16} /> <span>Editar</span>
          </a>
          <button
            onClick={handleDeleteClick}
            className="admin-blog-card__action delete"
          >
            <Trash size={16} /> <span>Eliminar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogCard;
