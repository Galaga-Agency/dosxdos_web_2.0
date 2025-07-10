"use client";

import React, { useState, useEffect, useRef } from "react";
import { Project } from "@/types/project-types";
import "./AdminProjectOrdering.scss";
import { IoMdClose } from "react-icons/io";

interface AdminProjectOrderingProps {
  projects: Project[];
  onSaveOrder: (updatedProjects: Project[]) => Promise<void>;
  isVisible: boolean;
  onClose: () => void;
}

const AdminProjectOrdering: React.FC<AdminProjectOrderingProps> = ({
  projects,
  onSaveOrder,
  isVisible,
  onClose,
}) => {
  const [localProjects, setLocalProjects] = useState<Project[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize with current projects, adding order if not present
    const projectsWithOrder = projects.map((project, index) => ({
      ...project,
      order: project.order ?? index + 1,
    }));

    // Sort by current order
    const sortedProjects = projectsWithOrder.sort(
      (a, b) => (a.order || 0) - (b.order || 0)
    );
    setLocalProjects(sortedProjects);
  }, [projects]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isVisible) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isVisible]);

  const handleDragStart = (e: React.DragEvent, projectId: string) => {
    setDraggedItem(projectId);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.currentTarget.outerHTML);
    (e.currentTarget as HTMLElement).style.opacity = "0.5";
  };

  const handleDragEnd = (e: React.DragEvent) => {
    (e.currentTarget as HTMLElement).style.opacity = "1";
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();

    if (!draggedItem) return;

    const draggedIndex = localProjects.findIndex((p) => p.id === draggedItem);
    if (draggedIndex === -1) return;

    // Create new array with reordered items
    const newProjects = [...localProjects];
    const draggedProject = newProjects[draggedIndex];

    // Remove dragged item
    newProjects.splice(draggedIndex, 1);
    // Insert at new position
    newProjects.splice(dropIndex, 0, draggedProject);

    // Update order values
    const updatedProjects = newProjects.map((project, index) => ({
      ...project,
      order: index + 1,
    }));

    setLocalProjects(updatedProjects);
    setHasChanges(true);
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSaveOrder(localProjects);
      setHasChanges(false);
      onClose();
    } catch (error) {
      console.error("Error saving project order:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    const resetProjects = projects.map((project, index) => ({
      ...project,
      order: index + 1,
    }));
    setLocalProjects(resetProjects);
    setHasChanges(true);
  };

  if (!isVisible) return null;

  return (
    <div className="admin-project-ordering" ref={containerRef}>
      <div className="admin-content">
        <div className="admin-header container">
          <h2 className="secondary-title">Reordenar Proyectos</h2>
          <p className="text">Arrastra los proyectos para cambiar su orden</p>

          {/* Close button - inside content area */}
          <button
            type="button"
            onClick={onClose}
            className="admin-close-btn"
            disabled={isSaving}
          >
            <IoMdClose />
          </button>
        </div>

        <div className="admin-projects-container">
          {localProjects.map((project, index) => (
            <div
              key={project.id}
              className={`admin-project-card ${
                draggedItem === project.id ? "dragging" : ""
              } ${dragOverIndex === index ? "drag-over" : ""}`}
              draggable
              onDragStart={(e) => handleDragStart(e, project.id)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
            >
              {/* Order number */}
              <div className="order-number">{index + 1}</div>

              {/* Project image */}
              <div className="project-image">
                <img
                  src={project.portfolioThumbnail || project.coverImage}
                  alt={project.name}
                />
              </div>

              {/* Project name */}
              <div className="project-name">
                <h3>{project.name}</h3>
              </div>

              {/* Drag handle - right side */}
              <div className="drag-handle">
                <div className="drag-dots">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="admin-actions">
          <button
            type="button"
            onClick={handleReset}
            className="reset-btn"
            disabled={isSaving}
          >
            Resetear Orden
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="save-btn"
            disabled={!hasChanges || isSaving}
          >
            {isSaving ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProjectOrdering;
