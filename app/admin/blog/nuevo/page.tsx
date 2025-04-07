"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { BlogPost, EditorBlock } from "@/types/blog-post-types";
import { createOrUpdatePost } from "@/lib/blog-service";
import { useAnimations, animateFormSubmission } from "@/hooks/useFormAnimation";
import { useImageUpload } from "@/hooks/useImageUpload";
import CoverImageUpload from "@/components/CoverImageUpload/CoverImageUpload";
import RichTextEditor, {
  processEditorContent,
  calculateReadTime,
} from "@/components/RichTextEditor/RichTextEditor";
import "./NewBlogPostPage.scss";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [editorContent, setEditorContent] = useState<EditorBlock[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
    const { headerRef, formRef } = useAnimations();
  const { 
    coverImage, 
    coverImageFile, 
    coverImageInputRef, 
    handleCoverImageChange, 
    handleRemoveCoverImage, 
    handleImageUpload,
    cleanup: cleanupImages
  } = useImageUpload();

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      cleanupImages();
    };
  }, [cleanupImages]);

  // Form setup
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

  // Find the first image in the editor content for use as default cover image
  const findFirstImage = () => {
    const imageBlock = editorContent.find((block) => block.type === "image");
    return imageBlock && typeof imageBlock.content === "string" ? imageBlock.content : null;
  };

  const onSubmit = async (data: Partial<BlogPost>) => {
    try {
      setIsSubmitting(true);

      // Use cover image or first image in content
      const effectiveCoverImage =
        coverImage || findFirstImage() || "/assets/img/default-blog-image.jpg";

      // Process editor content
      const htmlContent = processEditorContent(editorContent as any);

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
        await animateFormSubmission(formRef.current, true);
      }

      // Call server action to create post
      const createdPost = await createOrUpdatePost(newPost);

      // Success animation
      if (formRef.current) {
        await animateFormSubmission(formRef.current, false);
      }

      // Redirect to blog list
      router.push("/admin/blog");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("No se pudo crear el post. Por favor, inténtalo de nuevo.");

      // Reset form animation
      if (formRef.current) {
        animateFormSubmission(formRef.current, false);
      }

      setIsSubmitting(false);
    }
  };

  return (
    <div className="new-blog-post-page">
      <div className="new-blog-post-page__container">
        <div className="new-blog-post-page__header" ref={headerRef}>
          <h1>Crear Nueva Entrada de Blog</h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="new-blog-post-page__form"
          ref={formRef as any}
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
            <CoverImageUpload
              coverImage={coverImage}
              coverImageInputRef={coverImageInputRef as any}
              isSubmitting={isSubmitting}
              onImageChange={handleCoverImageChange}
              onRemoveImage={handleRemoveCoverImage}
            />
          </div>

          <div className="form-group editor-container">
            <label>Contenido</label>
            <div className="rich-editor-wrapper">
              <RichTextEditor
                value={editorContent as any}
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