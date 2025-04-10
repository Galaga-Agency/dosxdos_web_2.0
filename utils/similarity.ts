import { BlogPost } from "@/types/blog-post-types";

/**
 * Extracts meaningful keywords from a blog post's title, content and excerpt
 * @param {BlogPost} post - The blog post object
 * @returns {string[]} Array of keywords
 */
export function extractKeywords(post: BlogPost): string[] {
  // Combine title, excerpt and content (if available)
  const text = `${post.title} ${post.excerpt || ""} ${
    typeof post.content === "string" ? post.content : ""
  }`.toLowerCase();

  // Remove HTML tags if present
  const withoutHtml = text.replace(/<[^>]*>/g, " ");

  // Remove punctuation and split into words
  const words = withoutHtml.replace(/[^\w\s]/g, " ").split(/\s+/);

  // Common Spanish and English stop words to remove
  const stopWords: string[] = [
    // Spanish stop words
    "el",
    "la",
    "los",
    "las",
    "un",
    "una",
    "unos",
    "unas",
    "y",
    "o",
    "pero",
    "si",
    "de",
    "del",
    "a",
    "ante",
    "bajo",
    "cabe",
    "con",
    "contra",
    "desde",
    "en",
    "entre",
    "hacia",
    "hasta",
    "para",
    "por",
    "según",
    "sin",
    "sobre",
    "tras",
    "durante",
    "mediante",
    "que",
    "como",
    "cuando",
    "donde",
    "su",
    "sus",

    // English stop words
    "the",
    "and",
    "a",
    "an",
    "in",
    "on",
    "of",
    "to",
    "for",
    "with",
    "by",
    "at",
    "from",
    "this",
    "that",
    "these",
    "those",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "being",
    "have",
    "has",
    "had",
    "do",
    "does",
    "did",
    "will",
    "would",
    "shall",
    "should",
    "can",
    "could",
    "may",
    "might",
  ];

  // Filter out stop words and keep only words with 3+ characters
  return words.filter((word) => word.length > 2 && !stopWords.includes(word));
}

/**
 * Calculates content similarity between two posts based on their keywords
 * @param {string[]} keywords1 - Keywords from first post
 * @param {string[]} keywords2 - Keywords from second post
 * @returns {number} Similarity score between 0-1
 */
export function calculateContentSimilarity(
  keywords1: string[],
  keywords2: string[]
): number {
  const set1 = new Set(keywords1);
  const set2 = new Set(keywords2);

  // Count matching words
  let matchingWords = 0;
  for (const word of set1) {
    if (set2.has(word)) {
      matchingWords++;
    }
  }

  // Jaccard similarity coefficient: intersection size / union size
  const union = new Set([...set1, ...set2]);
  return union.size > 0 ? matchingWords / union.size : 0;
}

/**
 * Calculates tag similarity between two posts
 * @param {string[] | undefined} tags1 - Tags from first post
 * @param {string[] | undefined} tags2 - Tags from second post
 * @returns {number} Similarity score between 0-1
 */
export function calculateTagSimilarity(
  tags1?: string[],
  tags2?: string[]
): number {
  if (!tags1?.length || !tags2?.length) return 0;

  // First check for exact tag matches
  let exactMatches = 0;
  for (const tag of tags1) {
    if (tags2.includes(tag)) {
      exactMatches++;
    }
  }

  // If we have exact matches, give a strong similarity score
  if (exactMatches > 0) {
    return Math.min(1, exactMatches / Math.min(tags1.length, tags2.length));
  }

  // For partial matching, split multi-word tags and compare individual words
  const words1 = tags1.flatMap((tag) => tag.toLowerCase().split(/[\s-]+/));
  const words2 = tags2.flatMap((tag) => tag.toLowerCase().split(/[\s-]+/));

  const set1 = new Set(words1);
  const set2 = new Set(words2);

  let partialMatches = 0;
  for (const word of set1) {
    if (set2.has(word)) {
      partialMatches++;
    }
  }

  if (partialMatches === 0) return 0;

  const union = new Set([...words1, ...words2]);
  return union.size > 0 ? (partialMatches / union.size) * 0.7 : 0; // Scale down partial matches
}

/**
 * Interface for blog post with similarity score
 */
interface ScoredBlogPost extends BlogPost {
  similarityScore: number;
}

/**
 * Find related posts with a sophisticated similarity algorithm
 * @param {BlogPost} currentPost - The current blog post
 * @param {BlogPost[]} allPosts - Array of all available blog posts
 * @param {number} numResults - Number of related posts to return
 * @returns {BlogPost[]} Array of related posts sorted by similarity
 */
export function findRelatedPosts(
  currentPost: BlogPost,
  allPosts: BlogPost[],
  numResults: number = 3
): BlogPost[] {
  if (!currentPost || !allPosts?.length) return [];

  const currentKeywords = extractKeywords(currentPost);

  // Calculate similarity scores using multiple signals
  const scoredPosts: ScoredBlogPost[] = allPosts
    .filter((post) => post.id !== currentPost.id)
    .map((post) => {
      // Content similarity (most important)
      const contentSimilarity = calculateContentSimilarity(
        currentKeywords,
        extractKeywords(post)
      );

      // Tag similarity (important for semantic matching)
      const tagSimilarity = calculateTagSimilarity(currentPost.tags, post.tags);

      // Category exact match (useful fallback)
      const categorySimilarity =
        post.category === currentPost.category ? 0.2 : 0;

      // Calculate total score with weighted components
      const totalScore =
        contentSimilarity * 0.6 +
        tagSimilarity * 0.3 +
        categorySimilarity * 0.1;

      return {
        ...post,
        similarityScore: totalScore,
      };
    });

  // Sort by similarity score (highest first)
  scoredPosts.sort((a, b) => b.similarityScore - a.similarityScore);

  // Only return posts with some meaningful similarity
  return scoredPosts
    .filter((post) => post.similarityScore > 0.05)
    .slice(0, numResults);
}
