"use client";

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import { useDataStore } from "@/store/useDataStore";

import { createOrUpdatePost } from "@/lib/blog-service";
import { BlogPost } from "@/types/blog-post-types";
import { processEditorContent, calculateReadTime } from "@/utils/editor";
import {
  blogFormAnimation,
  blogFormSubmitAnimation,
  blogFormResetAnimation,
} from "@/utils/animations/blog-form-anim";

import RichTextEditor from "@/components/RichTextEditor/RichTextEditorWrapper";
import SecondaryButton from "@/components/ui/SecondaryButton/SecondaryButton";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import CustomCheckbox from "@/components/ui/CustomCheckbox/CustomCheckbox";
import Footer from "@/components/layout/Footer/footer";
import ProtectedRoute from "@/components/ProtectedRoute";

import "./new-blog-post-page.scss";
import TagsInput from "@/components/TagsInput";
import CoverImageUpload from "@/components/CoverImageUpload/CoverImageUpload";
import { generateSlug } from "@/utils/slug-generator";

gsap.registerPlugin(useGSAP);

export default function NewBlogPostPage() {
  const router = useRouter();

  // Form state
  const [editorContent, setEditorContent] = useState<
    { type: string; content: string; alignment?: string; meta?: any }[]
  >([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [articleId] = useState(() => uuidv4());
  const [originalPost, setOriginalPost] = useState<BlogPost | null>(null);

  // Refs
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
      author: "Dos x Dos Grupo Imagen",
      published: true,
    },
  });

  // Initialize animations
  useGSAP(() => {
    const timer = setTimeout(() => {
      blogFormAnimation();
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
    setCoverImageFile(file);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("articleId", articleId);

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
    setCoverImageFile(null);
    if (coverImageInputRef.current) {
      coverImageInputRef.current.value = "";
    }
  };

  // Handle image upload for editor
  const handleImageUpload = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("articleId", articleId);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Image upload failed");
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  // Handle form submission
  const onSubmit = async (data: Partial<BlogPost>) => {
    try {
      setIsSubmitting(true);

      // Animate form before submission
      await blogFormSubmitAnimation();

      // Process content
      const uniqueEditorContent = editorContent.filter(
        (block, index, self) =>
          block.type !== "image" ||
          self.findIndex(
            (b) => b.type === "image" && b.content === block.content
          ) === index
      );

      const effectiveCoverImage =
        coverImage ||
        uniqueEditorContent.find((block) => block.type === "image")?.content ||
        "/assets/img/default-blog-image.jpg";

      const htmlContent = processEditorContent(uniqueEditorContent as any);

      const generatedSlug = generateSlug(data.title || "");

      // Create post object
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
        slug: generatedSlug,
        tags: tags,
        readTime: calculateReadTime(htmlContent),
        editorBlocks: JSON.stringify(uniqueEditorContent),
      };

      // Submit post
      await createOrUpdatePost(newPost);

      // UPDATE CACHE IMMEDIATELY AFTER SUCCESSFUL API CALL
      useDataStore.getState().addPost(newPost);

      // Reset form animation and redirect
      await blogFormResetAnimation();
      router.push("/admin");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("No se pudo crear el post. Por favor, inténtalo de nuevo.");

      // Reset form animation on error
      await blogFormResetAnimation();
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="new-blog-post-page">
        <div className="new-blog-post-page__container container">
          {/* Header */}
          <div className="new-blog-post-page__header header">
            <h1 className="secondary-title">Crear Nueva Entrada de Blog</h1>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="new-blog-post-page__form"
          >
            {/* Title */}
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

            {/* Category */}
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

            {/* Excerpt */}
            <div className="form-group">
              <label htmlFor="excerpt">Extracto</label>
              <textarea
                id="excerpt"
                rows={3}
                className={`form-textarea ${
                  errors.excerpt ? "is-invalid" : ""
                }`}
                placeholder="Breve descripción de tu entrada"
                disabled={isSubmitting}
                {...register("excerpt")}
              />
            </div>

            {/* Tags */}
            <div className="form-group">
              <label htmlFor="excerpt">Extracto</label>
              <TagsInput
                tags={tags}
                onTagsChange={setTags}
                disabled={isSubmitting}
              />
            </div>
            
            {/* Cover Image */}
            <div className="form-group">
              <label className="form-label">Imagen de Portada</label>
              <CoverImageUpload
                coverImage={coverImage}
                coverImageInputRef={coverImageInputRef as any}
                isSubmitting={isSubmitting}
                onImageChange={handleCoverImageChange}
                onRemoveImage={handleRemoveCoverImage}
              />
            </div>

            {/* Content Editor */}
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

            {/* Author */}
            <div className="form-group">
              <label htmlFor="author">Autor</label>
              <input
                id="author"
                type="text"
                className={`form-input ${errors.author ? "is-invalid" : ""}`}
                placeholder="Nombre del autor"
                disabled={isSubmitting}
                {...register("author")}
              />
            </div>

            {/* Published Checkbox */}
            <div className="form-group">
              <CustomCheckbox
                id="published"
                label="Publicar inmediatamente"
                disabled={isSubmitting}
                {...register("published")}
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
              <PrimaryButton
                type="submit"
                disabled={isSubmitting || editorContent.length === 0}
              >
                {isSubmitting ? "Creando..." : "Crear Entrada"}
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </ProtectedRoute>
  );
}
