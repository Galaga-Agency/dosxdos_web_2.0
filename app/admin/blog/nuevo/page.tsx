"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { createOrUpdatePost } from "@/lib/blog-service";
import { BlogPost } from "@/types/blog-post-types";
import RichTextEditor, {
  processEditorContent,
  calculateReadTime,
} from "@/components/RichTextEditor/RichTextEditor";
import "./NewBlogPostPage.scss";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import gsap from "gsap";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [editorContent, setEditorContent] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);

  // Refs
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const coverImageInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<BlogPost>>({
    defaultValues: {
      title: "",
      category: "",
      excerpt: "",
      author: "Admin",
      published: true,
    },
  });

  // Animations
  useEffect(() => {
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
  }, []);

  // Handle cover image upload
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setCoverImageFile(file);

    // Create URL for preview
    const imageUrl = URL.createObjectURL(file);
    setCoverImage(imageUrl);
  };

  // Handle removing cover image
  const handleRemoveCoverImage = () => {
    setCoverImage(null);
    setCoverImageFile(null);
    if (coverImageInputRef.current) {
      coverImageInputRef.current.value = "";
    }
  };

  // Handle image uploads from the editor
  const handleImageUpload = async (file: File): Promise<string> => {
    try {
      // In a real app, you'd upload to your server
      // For this demo, create an object URL
      return new Promise((resolve) => {
        setTimeout(() => {
          const imageUrl = URL.createObjectURL(file);
          resolve(imageUrl);
        }, 1000); // Simulate upload delay
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  // Find the first image in the editor content for use as default cover image
  const findFirstImage = () => {
    const imageBlock = editorContent.find((block) => block.type === "image");
    return imageBlock?.content || null;
  };

  const onSubmit = async (data: Partial<BlogPost>) => {
    try {
      setIsSubmitting(true);

      // Use cover image or first image in content
      const effectiveCoverImage =
        coverImage || findFirstImage() || "/assets/img/default-blog-image.jpg";

      // Process editor content
      const htmlContent = processEditorContent(editorContent);

      // Create the post
      const newPost: BlogPost = {
        id: uuidv4(),
        date: new Date().toISOString(),
        title: data.title || "",
        content: htmlContent,
        category: data.category || "",
        excerpt: data.excerpt || "",
        author: data.author || "Admin",
        published: data.published ?? true,
        coverImage: effectiveCoverImage,
        slug: data.slug || undefined,
        tags: data.tags || undefined,
        readTime: calculateReadTime(htmlContent),
        editorBlocks: JSON.stringify(editorContent),
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

      // Call server action to create post
      const createdPost = await createOrUpdatePost(newPost);

      // Success animation
      if (formRef.current) {
        await gsap.to(formRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      // Redirect to blog list
      router.push("/admin/blog");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("No se pudo crear el post. Por favor, inténtalo de nuevo.");

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

  return (
    <div className="new-blog-post-page" ref={pageRef}>
      <div className="new-blog-post-page__container">
        <div className="new-blog-post-page__header" ref={headerRef}>
          <h1>Crear Nueva Entrada de Blog</h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="new-blog-post-page__form"
          ref={formRef}
        >
          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input
              id="title"
              type="text"
              className={`form-input ${errors.title ? "is-invalid" : ""}`}
              placeholder="Ingresa el título de tu entrada"
              disabled={isSubmitting}
              {...register("title", { required: "El título es obligatorio" })}
            />
            {errors.title && (
              <p className="form-error">{errors.title.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="category">Categoría</label>
            <input
              id="category"
              type="text"
              className={`form-input ${errors.category ? "is-invalid" : ""}`}
              placeholder="Ej: Tecnología, Diseño, Marketing..."
              disabled={isSubmitting}
              {...register("category")}
            />
          </div>

          <div className="form-group">
            <label htmlFor="excerpt">Extracto</label>
            <textarea
              id="excerpt"
              rows={3}
              className={`form-textarea ${errors.excerpt ? "is-invalid" : ""}`}
              placeholder="Breve descripción de tu entrada"
              disabled={isSubmitting}
              {...register("excerpt")}
            />
          </div>

          <div className="form-group">
            <label>Imagen de Portada</label>
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
                className={`cover-image-preview ${!coverImage ? "empty" : ""}`}
                onClick={() =>
                  !isSubmitting && coverImageInputRef.current?.click()
                }
              >
                {coverImage ? (
                  <>
                    <img src={coverImage} alt="Imagen de portada" />
                    <button
                      type="button"
                      className="cover-image-delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveCoverImage();
                      }}
                      disabled={isSubmitting}
                    >
                      <Trash2 size={16} />
                    </button>
                  </>
                ) : (
                  <div className="cover-image-placeholder">
                    <div className="cover-image-icon">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                    <p>Haz clic para subir una imagen de portada</p>
                    <span className="cover-image-note">
                      Si no subes una imagen, se utilizará la primera imagen del
                      contenido
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="form-group editor-container">
            <label>Contenido</label>
            <div className="rich-editor-wrapper">
              <RichTextEditor
                value={editorContent}
                onChange={setEditorContent}
                onImageUpload={handleImageUpload}
                placeholder="Comienza a escribir tu artículo aquí..."
              />
            </div>
            {/* Hidden validation field */}
            <input
              type="hidden"
              {...register("content", {
                validate: () =>
                  editorContent.length > 0 || "El contenido es obligatorio",
              })}
              value={editorContent.length > 0 ? "content" : ""}
            />
            {errors.content && (
              <p className="form-error">{errors.content.message}</p>
            )}
          </div>

          <div className="form-group form-checkbox">
            <input
              id="published"
              type="checkbox"
              {...register("published")}
              disabled={isSubmitting}
            />
            <label htmlFor="published">Publicar inmediatamente</label>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => router.push("/admin/blog")}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting || editorContent.length === 0}
            >
              {isSubmitting ? "Creando..." : "Crear Entrada"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
