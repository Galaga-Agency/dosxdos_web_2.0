// /utils/social-sharing.ts
/**
 * Utilidad para generar metadatos para compartir en redes sociales
 */
import { BlogPost } from "@/types/blog-post-types";
import { getImageSource } from "./editor";

/**
 * Genera los metadatos Open Graph para un artículo del blog
 * @param post Artículo del blog
 * @param url URL absoluta del artículo
 * @returns Objeto con los metadatos Open Graph
 */
export function generateOpenGraphMeta(post: BlogPost, url: string) {
  return {
    title: post.title,
    description:
      post.excerpt ||
      `Artículo de ${post.author} en Dos por Dos Grupo Imagen sobre ${post.category}`,
    url: url,
    image: getImageSource(post),
    siteName: "Dos por Dos Grupo Imagen",
    type: "article",
  };
}

/**
 * Genera metadatos Twitter Card para un artículo del blog
 * @param post Artículo del blog
 * @returns Objeto con los metadatos Twitter Card
 */
export function generateTwitterCardMeta(post: BlogPost) {
  return {
    card: "summary_large_image",
    title: post.title,
    description:
      post.excerpt ||
      `Artículo de ${post.author} en Dos por Dos Grupo Imagen sobre ${post.category}`,
    image: getImageSource(post),
    site: "@dosxdosgrupoimagen", // Reemplazar con nombre de usuario real en Twitter si existe
  };
}

/**
 * Genera un mensaje para compartir en redes sociales
 * @param post Artículo del blog
 * @param includeHashtags Si debe incluir hashtags basados en categorías y etiquetas
 * @returns Texto formateado para compartir
 */
export function generateShareMessage(
  post: BlogPost,
  includeHashtags: boolean = true
) {
  let message = `"${post.title}" - ${post.author} en Dos por Dos Grupo Imagen`;

  if (includeHashtags && post.tags && post.tags.length > 0) {
    const hashtags = post.tags
      .map((tag) => `#${tag.replace(/\s+/g, "")}`)
      .join(" ");

    message += `\n\n${hashtags}`;
  }

  return message;
}

/**
 * Genera una descripción corta para LinkedIn
 * @param post Artículo del blog
 * @param maxLength Longitud máxima de la descripción
 * @returns Descripción formateada para LinkedIn
 */
export function generateLinkedInDescription(
  post: BlogPost,
  maxLength: number = 150
) {
  const description = post.excerpt || post.content.replace(/<[^>]*>?/gm, "");

  if (description.length <= maxLength) {
    return description;
  }

  return description.substring(0, maxLength - 3) + "...";
}

/**
 * Verifica si el navegador soporta la API Navigator Share
 * @returns Booleano indicando si el navegador soporta compartir nativo
 */
export function canUseNativeShare(): boolean {
  return typeof navigator !== "undefined" && !!navigator.share;
}

/**
 * Comparte una URL usando la API nativa de Share si está disponible
 * @param title Título para compartir
 * @param text Texto descriptivo para compartir
 * @param url URL para compartir
 * @returns Promise que se resuelve cuando se completa la acción de compartir
 */
export async function nativeShare(
  title: string,
  text: string,
  url: string
): Promise<boolean> {
  if (!canUseNativeShare()) {
    return false;
  }

  try {
    await navigator.share({
      title,
      text,
      url,
    });
    return true;
  } catch (error) {
    console.error("Error al compartir:", error);
    return false;
  }
}
