"use client";

import React, { useState } from "react";
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

import { generateSlug } from "@/utils/slug-generator";

import SecondaryButton from "@/components/ui/SecondaryButton/SecondaryButton";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import CustomCheckbox from "@/components/ui/CustomCheckbox/CustomCheckbox";
import Footer from "@/components/layout/Footer/footer";
import ProtectedRoute from "@/components/ProtectedRoute";

import "./new-project-page.scss";
import TagsInput from "@/components/TagsInput";
import VisualLayoutGallery from "@/components/VisualLayoutGallery/VisualLayoutGallery";

gsap.registerPlugin(useGSAP);

export default function NewProjectPage() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [portfolioThumbnail, setPortfolioThumbnail] = useState<string | null>(null);
  const [carouselImages, setCarouselImages] = useState<string[]>([]);
  const [finalSectionImages, setFinalSectionImages] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [projectId] = useState(() => uuidv4());

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<Project>>({
    defaultValues: {
      name: "",
      client: "",
      location: "",
      year: new Date().getFullYear(),
      description: "",
      challenge: "",
      solution: "",
      featured: false,
    },
  });

  useGSAP(() => {
    const timer = setTimeout(() => {
      projectFormAnimation();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (data: Partial<Project>) => {
    try {
      setIsSubmitting(true);

      await projectFormSubmitAnimation();

      const generatedSlug = generateSlug(data.name || "");

      const newProject: Project = {
        id: uuidv4(),
        date: new Date().toISOString(),
        name: data.name || "",
        slug: generatedSlug,
        client: data.client || "",
        categories: categories,
        location: data.location || "",
        year: data.year || new Date().getFullYear(),
        description: data.description || "",
        challenge: data.challenge || "",
        solution: data.solution || "",
        coverImage:
          coverImage ||
          carouselImages[0] ||
          finalSectionImages[0] ||
          "/assets/img/default-project-image.jpg",
        portfolioThumbnail: portfolioThumbnail || undefined,
        images: [...carouselImages, ...finalSectionImages],
        galleryImages: carouselImages,
        floatingImages: finalSectionImages,
        featured: data.featured || false,
      };

      await createOrUpdateProject(newProject);

      useDataStore.getState().addProject(newProject);

      await projectFormResetAnimation();
      router.push("/admin");
    } catch (error) {
      console.error("Error creating project:", error);
      alert("No se pudo crear el proyecto. Por favor, inténtalo de nuevo.");

      await projectFormResetAnimation();
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="new-project-page">
        <div className="new-project-page__container container">
          <div className="new-project-page__header header">
            <h1 className="secondary-title">Crear Nuevo Proyecto</h1>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="new-project-page__form"
          >
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

            <div className="form-row">
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

            <div className="form-group">
              <label htmlFor="services">Categorías</label>
              <TagsInput
                tags={categories}
                onTagsChange={setCategories}
                disabled={isSubmitting}
                placeholder="Presiona Enter para agregar una categoría"
                inputId="categories"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Descripción / Subtitúlo</label>
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

            <div className="form-group">
              <label htmlFor="challenge">Reto</label>
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

            <VisualLayoutGallery
              coverImage={coverImage}
              portfolioThumbnail={portfolioThumbnail}
              galleryImages={carouselImages}
              floatingImages={finalSectionImages}
              onCoverImageChange={setCoverImage}
              onPortfolioThumbnailChange={setPortfolioThumbnail}
              onGalleryImagesChange={setCarouselImages}
              onFloatingImagesChange={setFinalSectionImages}
              projectId={projectId}
              disabled={isSubmitting}
            />

            <div className="form-group">
              <CustomCheckbox
                id="featured"
                label="Proyecto destacado (aparecerá en la página de inicio)"
                disabled={isSubmitting}
                {...register("featured")}
              />
            </div>

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