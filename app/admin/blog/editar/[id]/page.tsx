"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { createOrUpdatePost } from "@/lib/blog-service";
import { BlogPost } from "@/types/blog-post-types";
import {
  processEditorContent,
  calculateReadTime,
  parseHtmlContentToBlocks,
  lexicalToEditorBlocks,
} from "@/utils/editor";
import "./edit-blog-post-page.scss";
import { useRouter, useParams } from "next/navigation";
import { Trash2, Upload, Image } from "lucide-react";
import gsap from "gsap";
import RichTextEditor from "@/components/RichTextEditor/RichTextEditorWrapper";
import SecondaryButton from "@/components/ui/SecondaryButton/SecondaryButton";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import CustomCheckbox from "@/components/ui/CustomCheckbox/CustomCheckbox";
import Loading from "@/components/ui/Loading/Loading";
import Footer from "@/components/layout/Footer/footer";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;

  const [editorContent, setEditorContent] = useState<
    { type: string; content: string; alignment?: string; meta?: any }[]
  >([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [notFound, setNotFound] = useState(false);

  // Refs
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const coverImageInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<Partial<BlogPost>>({
    defaultValues: {
      title: "",
      category: "",
      excerpt: "",
      author: "Dos x Dos Grupo Imagen",
      published: true,
    },
  });

  // Fetch existing post data
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setIsLoading(true);
        const post = await fetch(`/api/blog/${postId}`).then((res) => {
          if (!res.ok) {
            if (res.status === 404) {
              setNotFound(true);
            }
            throw new Error(`Error fetching post: ${res.statusText}`);
          }

          return res.json();
        });

        if (!post) {
          setNotFound(true);
          setIsLoading(false);
          return;
        }

        // Populate form with existing data
        reset({
          title: post.title || "",
          category: post.category || "",
          excerpt: post.excerpt || "",
          author: post.author || "Dos x Dos Grupo Imagen",
          published: post.published ?? true,
        });

        // Set cover image if exists
        if (
          post.coverImage &&
          post.coverImage !== "/assets/img/default-blog-image.jpg"
        ) {
          setCoverImage(post.coverImage);
        }

        // Set tags
        if (post.tags && Array.isArray(post.tags)) {
          setTags(post.tags);
        }

        console.log("🧪 editorBlocks (raw):", post.editorBlocks);

        if (
          typeof post.editorBlocks === "string" &&
          post.editorBlocks.trim().length > 0
        ) {
          try {
            const blocks = JSON.parse(post.editorBlocks);

            if (Array.isArray(blocks)) {
              setEditorContent(blocks);
            } else if (typeof blocks === "object" && blocks.root) {
              const parsed = lexicalToEditorBlocks(post.editorBlocks);
              setEditorContent(parsed as any);
            }
          } catch (err) {
            console.error("❌ Error parsing editorBlocks:", err);
          }
        } else if (post.content) {
          const blocksFromHtml = parseHtmlContentToBlocks(post.content);
          setEditorContent(blocksFromHtml);
        }

        setIsLoading(false);

        // Run animations after data is loaded
        runEntryAnimations();
      } catch (error) {
        console.error("Error fetching post data:", error);
        setIsLoading(false);
      }
    };

    if (postId) {
      fetchPostData();
    }
  }, [postId, reset]);

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
    setCoverImageFile(file);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("articleId", postId); // Use existing post ID

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
  const handleRemoveCoverImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCoverImage(null);
    setCoverImageFile(null);
    if (coverImageInputRef.current) {
      coverImageInputRef.current.value = "";
    }
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

  useEffect(() => {
    if (editorContent.length > 0) {
      // Specifically log images
      const images = editorContent.filter((block) => block.type === "image");
      if (images.length > 0) {
        console.log("[EditBlogPostPage] Images in editor content:", images);
      }
    }
  }, [editorContent]);

  const handleImageUpload = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("articleId", postId); // Use existing post ID

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Image upload failed");
      }

      const data = await response.json();
      return data.url; // /uploads/[articleId]/filename.jpg
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const onSubmit = async (data: Partial<BlogPost>) => {
    try {
      setIsSubmitting(true);

      // Deduplicate images and other blocks
      const uniqueEditorContent = editorContent.filter(
        (block, index, self) =>
          // If not an image, always keep
          block.type !== "image" ||
          // For images, keep only the first occurrence with a unique content
          self.findIndex(
            (b) => b.type === "image" && b.content === block.content
          ) === index
      );

      // Determine cover image
      const effectiveCoverImage =
        coverImage ||
        uniqueEditorContent.find((block) => block.type === "image")?.content ||
        "/assets/img/default-blog-image.jpg";

      // Process editor content with unique blocks
      const htmlContent = processEditorContent(uniqueEditorContent as any);

      // Create the updated post object
      const updatedPost: Partial<BlogPost> = {
        id: postId,
        title: data.title || "",
        content: htmlContent,
        category: data.category || "",
        excerpt: data.excerpt || "",
        author: data.author || "Dos x Dos Grupo Imagen",
        published: data.published ?? true,
        coverImage: effectiveCoverImage,
        slug: data.slug || undefined,
        tags: tags,
        readTime: calculateReadTime(htmlContent),
        editorBlocks: JSON.stringify(uniqueEditorContent),
        // Don't update the date to preserve the original creation date
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

      // Use the server action to update the post
      await createOrUpdatePost(updatedPost as BlogPost);

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
      router.push("/admin");
    } catch (error) {
      console.error("Error updating post:", error);
      alert("No se pudo actualizar el post. Por favor, inténtalo de nuevo.");

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
      <div className="edit-blog-post-page not-found">
        <div className="edit-blog-post-page__container container">
          <h1>Entrada no encontrada</h1>
          <p>La entrada de blog que intentas editar no existe.</p>
          <PrimaryButton type="button" onClick={() => router.push("/admin")}>
            Volver al listado
          </PrimaryButton>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="edit-blog-post-page loading">
        <Loading />
        <p>Cargando entrada...</p>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="edit-blog-post-page" ref={pageRef}>
        <div className="edit-blog-post-page__container container">
          <div className="edit-blog-post-page__header header" ref={headerRef}>
            <h1 className="secondary-title">Editar Entrada de Blog</h1>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="edit-blog-post-page__form"
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
                className={`form-textarea ${
                  errors.excerpt ? "is-invalid" : ""
                }`}
                placeholder="Breve descripción de tu entrada"
                disabled={isSubmitting}
                {...register("excerpt")}
              />
            </div>

            <div className="form-group">
              <label htmlFor="tags">Etiquetas</label>
              <input
                type="text"
                id="tags"
                className="form-input"
                placeholder="Presiona Enter para agregar"
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
              <label className="form-label">Imagen de Portada</label>
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
                      <img src={coverImage} alt="Imagen de portada" />
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
                      <p>Haz clic para subir una imagen de portada</p>
                      <span className="cover-image-note">
                        Si no subes una imagen, se utilizará la primera imagen
                        del contenido
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="form-group editor-container">
              <label>Contenido</label>
              <div
                className="rich-editor-wrapper"
                onClick={(e) => e.stopPropagation()}
              >
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

            <div className="form-group">
              <CustomCheckbox
                id="published"
                label="Publicar inmediatamente (Si no marcas esta casilla, el artículo se guardará como borrador y no será visible en la página del blog hasta que lo publiques)"
                disabled={isSubmitting}
                {...register("published")}
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
              <PrimaryButton
                type="submit"
                disabled={isSubmitting || editorContent.length === 0}
              >
                {isSubmitting ? "Guardando..." : "Guardar Cambios"}
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>{" "}
      <Footer />
    </ProtectedRoute>
  );
}
