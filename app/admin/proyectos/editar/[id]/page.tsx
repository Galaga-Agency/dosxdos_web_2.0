"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createOrUpdateProject } from "@/lib/project-service";
import { Project } from "@/types/project-types";
import "./edit-project-page.scss";
import { useRouter, useParams } from "next/navigation";
import { Trash2, Upload, Image } from "lucide-react";
import gsap from "gsap";
import SecondaryButton from "@/components/ui/SecondaryButton/SecondaryButton";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import CustomCheckbox from "@/components/ui/CustomCheckbox/CustomCheckbox";
import Loading from "@/components/ui/Loading/Loading";
import { useDataStore } from "@/store/useDataStore";
import Footer from "@/components/layout/Footer/footer";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [projectImages, setProjectImages] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [serviceInput, setServiceInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [notFound, setNotFound] = useState(false);

  // Refs
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const coverImageInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
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

  // Fetch existing project data
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setIsLoading(true);
        const project = await fetch(`/api/proyectos/${projectId}`).then(
          (res) => {
            if (!res.ok) {
              if (res.status === 404) {
                setNotFound(true);
              }
              throw new Error(`Error fetching project: ${res.statusText}`);
            }
            return res.json();
          }
        );

        if (!project) {
          setNotFound(true);
          setIsLoading(false);
          return;
        }

        // Populate form with existing data
        reset({
          name: project.name || "",
          client: project.client || "",
          location: project.location || "",
          duration: project.duration || "",
          year: project.year || new Date().getFullYear(),
          description: project.description || "",
          challenge: project.challenge || "",
          solution: project.solution || "",
          featured: project.featured || false,
        });

        // Set cover image if exists
        if (
          project.coverImage &&
          project.coverImage !== "/assets/img/default-project-image.jpg"
        ) {
          setCoverImage(project.coverImage);
        }

        // Set gallery images
        if (project.images && Array.isArray(project.images)) {
          setProjectImages(project.images);
        }

        // Set services
        if (project.services && Array.isArray(project.services)) {
          setServices(project.services);
        }

        // Set tags
        if (project.tags && Array.isArray(project.tags)) {
          setTags(project.tags);
        }

        setIsLoading(false);
        runEntryAnimations();
      } catch (error) {
        console.error("Error fetching project data:", error);
        setIsLoading(false);
      }
    };

    if (projectId) {
      fetchProjectData();
    }
  }, [projectId, reset]);

  // Animations
  const runEntryAnimations = () => {
    const tl = gsap.timeline();

    if (headerRef.current && formRef.current) {
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );

      tl.fromTo(
        formRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.3"
      );
    }
  };

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

  const handleGalleryImagesChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("articleId", projectId);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          throw new Error("Image upload failed");
        }

        const { url } = await res.json();
        return url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setProjectImages((prev) => [...prev, ...uploadedUrls]);
    } catch (err) {
      console.error("Failed to upload gallery images:", err);
      alert("No se pudieron subir algunas imágenes de la galería");
    }
  };

  const handleRemoveCoverImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCoverImage(null);
    if (coverImageInputRef.current) {
      coverImageInputRef.current.value = "";
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    setProjectImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleServiceKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && serviceInput.trim()) {
      e.preventDefault();
      if (!services.includes(serviceInput.trim())) {
        setServices([...services, serviceInput.trim()]);
      }
      setServiceInput("");
    }
  };

  const removeService = (service: string) => {
    setServices(services.filter((s) => s !== service));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const onSubmit = async (data: Partial<Project>) => {
    try {
      setIsSubmitting(true);

      // Create the updated project object
      const updatedProject: Partial<Project> = {
        id: projectId,
        name: data.name || "",
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
        slug: data.slug || undefined,
      };

      // Animation before submitting
      if (formRef.current) {
        await gsap.to(formRef.current, {
          opacity: 0.7,
          scale: 0.98,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      // Use the server action to update the project
      await createOrUpdateProject(updatedProject as Project);

      // Update store with updated project
      const fetchProjects = useDataStore.getState().fetchProjects;
      await fetchProjects(); // Refresh store data

      // Success animation
      if (formRef.current) {
        await gsap.to(formRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      // Redirect to admin panel
      router.push("/admin");
    } catch (error) {
      console.error("Error updating project:", error);
      alert(
        "No se pudo actualizar el proyecto. Por favor, inténtalo de nuevo."
      );

      // Reset form animation
      if (formRef.current) {
        gsap.to(formRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      setIsSubmitting(false);
    }
  };

  if (notFound) {
    return (
      <div className="edit-project-page not-found">
        <div className="edit-project-page__container">
          <h1>Proyecto no encontrado</h1>
          <p>El proyecto que intentas editar no existe.</p>
          <PrimaryButton type="button" onClick={() => router.push("/admin")}>
            Volver al panel
          </PrimaryButton>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="edit-project-page loading">
        <Loading />
        <p>Cargando proyecto...</p>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="edit-project-page" ref={pageRef}>
        <div className="edit-project-page__container container">
          <div className="edit-project-page__header header" ref={headerRef}>
            <h1 className="secondary-title">Editar Proyecto</h1>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="edit-project-page__form"
            ref={formRef}
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

            <div className="form-group">
              <label htmlFor="services">Servicios</label>
              <input
                type="text"
                id="services"
                className="form-input"
                placeholder="Presiona Enter para agregar un servicio"
                value={serviceInput}
                onChange={(e) => setServiceInput(e.target.value)}
                onKeyDown={handleServiceKeyDown}
                disabled={isSubmitting}
              />
              <div className="tag-list">
                {services.map((service) => (
                  <div key={service} className="tag-item">
                    {service}
                    <button
                      type="button"
                      onClick={() => removeService(service)}
                      className="tag-remove"
                      aria-label="Eliminar servicio"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="tags">Etiquetas</label>
              <input
                type="text"
                id="tags"
                className="form-input"
                placeholder="Presiona Enter para agregar una etiqueta"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                disabled={isSubmitting}
              />
              <div className="tag-list">
                {tags.map((tag) => (
                  <div key={tag} className="tag-item">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="tag-remove"
                      aria-label="Eliminar etiqueta"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Imagen Principal</label>
              <div className="cover-image-upload">
                <input
                  type="file"
                  ref={coverImageInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleCoverImageChange}
                  disabled={isSubmitting}
                />

                <div
                  className={`cover-image-preview ${
                    !coverImage ? "empty" : ""
                  }`}
                  onClick={() =>
                    !isSubmitting && coverImageInputRef.current?.click()
                  }
                >
                  {coverImage ? (
                    <>
                      <img src={coverImage} alt="Imagen principal" />
                      <button
                        type="button"
                        className="cover-image-delete-btn"
                        onClick={handleRemoveCoverImage}
                        disabled={isSubmitting}
                        aria-label="Eliminar imagen"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  ) : (
                    <div className="cover-image-placeholder">
                      <div className="cover-image-icon">
                        <Image size={32} />
                      </div>
                      <p>Haz clic para subir la imagen principal</p>
                      <span className="cover-image-note">
                        Esta será la imagen de portada del proyecto
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Galería de Imágenes</label>
              <div className="gallery-upload">
                <input
                  type="file"
                  ref={galleryInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  multiple
                  onChange={handleGalleryImagesChange}
                  disabled={isSubmitting}
                />

                <button
                  type="button"
                  className="gallery-upload-btn"
                  onClick={() =>
                    !isSubmitting && galleryInputRef.current?.click()
                  }
                  disabled={isSubmitting}
                >
                  <Upload size={20} />
                  Subir Imágenes
                </button>

                <div className="gallery-grid">
                  {projectImages.map((image, index) => (
                    <div key={index} className="gallery-item">
                      <img src={image} alt={`Imagen ${index + 1}`} />
                      <button
                        type="button"
                        className="gallery-item-delete"
                        onClick={() => handleRemoveGalleryImage(index)}
                        disabled={isSubmitting}
                        aria-label="Eliminar imagen"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

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
                {isSubmitting ? "Guardando..." : "Guardar Cambios"}
              </PrimaryButton>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
