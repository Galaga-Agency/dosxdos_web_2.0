"use client";

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import { createOrUpdateProject } from "@/lib/project-service";
import { Project } from "@/types/project-types";
import { useDataStore } from "@/store/useDataStore";
import {
  projectFormAnimation,
  projectFormSubmitAnimation,
  projectFormResetAnimation,
} from "@/utils/animations/project-form-anim";

import SecondaryButton from "@/components/ui/SecondaryButton/SecondaryButton";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import CustomCheckbox from "@/components/ui/CustomCheckbox/CustomCheckbox";
import Footer from "@/components/layout/Footer/footer";
import ProtectedRoute from "@/components/ProtectedRoute";

import "./new-project-page.scss";
import TagsInput from "@/components/TagsInput";
import CoverImageUpload from "@/components/CoverImageUpload/CoverImageUpload";
import GalleryUpload from "@/components/GalleryUpload";

gsap.registerPlugin(useGSAP);

export default function NewProjectPage() {
  const router = useRouter();

  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [projectImages, setProjectImages] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [projectId] = useState(() => uuidv4());

  // Refs
  const coverImageInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<Project>>({
    defaultValues: {
      name: "",
      client: "",
      location: "",
      duration: "",
      year: new Date().getFullYear(),
      description: "",
      challenge: "",
      solution: "",
      featured: false,
    },
  });

  // Initialize animations
  useGSAP(() => {
    const timer = setTimeout(() => {
      projectFormAnimation();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Handle cover image upload
  const handleCoverImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("articleId", projectId);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Cover image upload failed");
      }

      const { url } = await res.json();
      setCoverImage(url);
    } catch (err) {
      console.error("Failed to upload cover image:", err);
      alert("No se pudo subir la imagen de portada");
    }
  };

  // Handle removing cover image
  const handleRemoveCoverImage = () => {
    setCoverImage(null);
    if (coverImageInputRef.current) {
      coverImageInputRef.current.value = "";
    }
  };

  // Handle form submission
  const onSubmit = async (data: Partial<Project>) => {
    try {
      setIsSubmitting(true);

      // Animate form before submission
      await projectFormSubmitAnimation();

      // Create project object
      const newProject: Project = {
        id: uuidv4(),
        date: new Date().toISOString(),
        name: data.name || "",
        slug: "",
        client: data.client || "",
        tags: tags,
        location: data.location || "",
        duration: data.duration || "",
        year: data.year || new Date().getFullYear(),
        services: services,
        description: data.description || "",
        challenge: data.challenge || "",
        solution: data.solution || "",
        coverImage:
          coverImage ||
          projectImages[0] ||
          "/assets/img/default-project-image.jpg",
        images: projectImages,
        featured: data.featured || false,
      };

      // Submit project
      await createOrUpdateProject(newProject);

      // Update store with new project
      const fetchProjects = useDataStore.getState().fetchProjects;
      await fetchProjects();

      // Reset form animation and redirect
      await projectFormResetAnimation();
      router.push("/admin");
    } catch (error) {
      console.error("Error creating project:", error);
      alert("No se pudo crear el proyecto. Por favor, inténtalo de nuevo.");

      // Reset form animation on error
      await projectFormResetAnimation();
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="new-project-page">
        <div className="new-project-page__container container">
          {/* Header */}
          <div className="new-project-page__header header">
            <h1 className="secondary-title">Crear Nuevo Proyecto</h1>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="new-project-page__form"
          >
            {/* Project Name */}
            <div className="form-group">
              <label htmlFor="name">Nombre del Proyecto</label>
              <input
                id="name"
                type="text"
                className={`form-input ${errors.name ? "is-invalid" : ""}`}
                placeholder="Ingresa el nombre del proyecto"
                disabled={isSubmitting}
                {...register("name", { required: "El nombre es obligatorio" })}
              />
              {errors.name && (
                <p className="form-error">{errors.name.message}</p>
              )}
            </div>

            {/* Client and Location Row */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="client">Cliente</label>
                <input
                  id="client"
                  type="text"
                  className={`form-input ${errors.client ? "is-invalid" : ""}`}
                  placeholder="Nombre del cliente"
                  disabled={isSubmitting}
                  {...register("client", {
                    required: "El cliente es obligatorio",
                  })}
                />
                {errors.client && (
                  <p className="form-error">{errors.client.message}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="location">Ubicación</label>
                <input
                  id="location"
                  type="text"
                  className={`form-input ${
                    errors.location ? "is-invalid" : ""
                  }`}
                  placeholder="Ciudad, País"
                  disabled={isSubmitting}
                  {...register("location")}
                />
              </div>
            </div>

            {/* Duration and Year Row */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="duration">Duración</label>
                <input
                  id="duration"
                  type="text"
                  className={`form-input ${
                    errors.duration ? "is-invalid" : ""
                  }`}
                  placeholder="Ej: 3 meses, 6 semanas..."
                  disabled={isSubmitting}
                  {...register("duration")}
                />
              </div>

              <div className="form-group">
                <label htmlFor="year">Año</label>
                <input
                  id="year"
                  type="number"
                  min="2000"
                  max="2030"
                  className={`form-input ${errors.year ? "is-invalid" : ""}`}
                  placeholder="2024"
                  disabled={isSubmitting}
                  {...register("year", {
                    required: "El año es obligatorio",
                    min: { value: 2000, message: "Año mínimo: 2000" },
                    max: { value: 2030, message: "Año máximo: 2030" },
                  })}
                />
                {errors.year && (
                  <p className="form-error">{errors.year.message}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                rows={3}
                className={`form-textarea ${
                  errors.description ? "is-invalid" : ""
                }`}
                placeholder="Breve descripción del proyecto..."
                disabled={isSubmitting}
                {...register("description", {
                  required: "La descripción es obligatoria",
                })}
              />
              {errors.description && (
                <p className="form-error">{errors.description.message}</p>
              )}
            </div>

            {/* Challenge */}
            <div className="form-group">
              <label htmlFor="challenge">Desafío</label>
              <textarea
                id="challenge"
                rows={4}
                className={`form-textarea ${
                  errors.challenge ? "is-invalid" : ""
                }`}
                placeholder="Describe el desafío o problema que resolvió este proyecto..."
                disabled={isSubmitting}
                {...register("challenge", {
                  required: "El desafío es obligatorio",
                })}
              />
              {errors.challenge && (
                <p className="form-error">{errors.challenge.message}</p>
              )}
            </div>

            {/* Solution */}
            <div className="form-group">
              <label htmlFor="solution">Solución</label>
              <textarea
                id="solution"
                rows={6}
                className={`form-textarea ${
                  errors.solution ? "is-invalid" : ""
                }`}
                placeholder="Explica cómo se resolvió el desafío, qué estrategias se utilizaron..."
                disabled={isSubmitting}
                {...register("solution", {
                  required: "La solución es obligatoria",
                })}
              />
              {errors.solution && (
                <p className="form-error">{errors.solution.message}</p>
              )}
            </div>

            {/* Services - Reusing TagsInput component */}
            <div className="form-group">
              <label htmlFor="services">Servicios</label>
              <TagsInput
                tags={services}
                onTagsChange={setServices}
                disabled={isSubmitting}
                placeholder="Presiona Enter para agregar un servicio"
                inputId="services"
              />
            </div>

            {/* Tags */}
            <TagsInput
              tags={tags}
              onTagsChange={setTags}
              disabled={isSubmitting}
            />

            {/* Cover Image */}
            <div className="form-group">
              <label className="form-label">Imagen Principal</label>
              <CoverImageUpload
                coverImage={coverImage}
                coverImageInputRef={coverImageInputRef as any}
                isSubmitting={isSubmitting}
                onImageChange={handleCoverImageChange}
                onRemoveImage={handleRemoveCoverImage}
              />
            </div>

            {/* Gallery Images */}
            <GalleryUpload
              images={projectImages}
              onImagesChange={setProjectImages}
              projectId={projectId}
              disabled={isSubmitting}
            />

            {/* Featured Checkbox */}
            <div className="form-group">
              <CustomCheckbox
                id="featured"
                label="Proyecto destacado (aparecerá en la página de inicio)"
                disabled={isSubmitting}
                {...register("featured")}
              />
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <SecondaryButton
                type="button"
                onClick={() => router.push("/admin")}
                disabled={isSubmitting}
                lightBg={true}
              >
                Cancelar
              </SecondaryButton>
              <PrimaryButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creando..." : "Crear Proyecto"}
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </ProtectedRoute>
  );
}
