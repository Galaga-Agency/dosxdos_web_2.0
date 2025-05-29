import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Edit, Trash, Eye } from "lucide-react";
import { Project } from "@/types/project-types";
import { FaLocationDot } from "react-icons/fa6";

import "./AdminProjectCard.scss";

interface AdminProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
  index: number;
}

const AdminProjectCard: React.FC<AdminProjectCardProps> = ({
  project,
  onDelete,
  index,
}) => {
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (project.id) {
      onDelete(project.id);
    }
  };

  return (
    <div
      className="admin-project-card"
      style={{ "--animation-order": index } as React.CSSProperties}
    >
      <div className="admin-project-card__image-container">
        <div className="admin-project-card__image-wrapper">
          <Image
            src={project.coverImage || "/assets/img/default-project-image.jpg"}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="admin-project-card__image"
            priority={index < 3}
          />
        </div>
        <div className="admin-project-card__date">
          <span>{project.year}</span>
        </div>
      </div>

      <div className="admin-project-card__content">
        <div className="admin-project-card__meta">
          {project.client && (
            <div className="admin-project-card__client">
              <span>{project.client}</span>
            </div>
          )}
          {project.location && (
            <div className="admin-project-card__location">
              <span>
                <FaLocationDot />
                &nbsp;
                {project.location}
              </span>
            </div>
          )}
        </div>

        <h3 className="admin-project-card__title">{project.name}</h3>

        <p className="admin-project-card__description">
          {project.description && `${project.description.slice(0, 120)}...`}
        </p>

        <div className="admin-project-card__status">
          {project.featured && (
            <div className="admin-project-card__badge">Destacado</div>
          )}
        </div>

        <div className="admin-project-card__actions">
          <Link
            href={`/portfolio/${project.slug}`}
            className="admin-project-card__action view"
          >
            <Eye size={16} /> <span>Ver</span>
          </Link>
          <Link
            href={`/admin/proyectos/editar/${project.id}`}
            className="admin-project-card__action edit"
          >
            <Edit size={16} /> <span>Editar</span>
          </Link>
          <button
            onClick={handleDeleteClick}
            className="admin-project-card__action delete"
          >
            <Trash size={16} /> <span>Eliminar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProjectCard;
