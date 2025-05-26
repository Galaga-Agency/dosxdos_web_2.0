import React, { useRef } from "react";
import { BlogPost } from "@/types/blog-post-types";
import { formatBlogContent } from "@/utils/editor";

interface BlogDetailContentProps {
  blogPost: BlogPost;
}

const BlogDetailContent: React.FC<BlogDetailContentProps> = ({ blogPost }) => {

  const createMarkup = (htmlContent: string) => {
    return { __html: htmlContent };
  };

  return (
    <div className="blog-detail__content">
      {blogPost.excerpt && (
        <div className="blog-detail__excerpt">
          <p>{blogPost.excerpt}</p>
        </div>
      )}

      <div
        className="blog-detail__body"
        dangerouslySetInnerHTML={createMarkup(
          formatBlogContent(blogPost.content)
        )}
      />

      <div className="blog-detail__tags">
        <span className="blog-detail__tags-title">Etiquetas:</span>
        <div className="blog-detail__tags-list">
          {blogPost.tags && blogPost.tags.length > 0 ? (
            blogPost.tags.map((tag, index) => (
              <span key={index} className="blog-detail__tag">
                {tag}
              </span>
            ))
          ) : (
            <>
              <span className="blog-detail__tag">Diseño</span>
              <span className="blog-detail__tag">Marketing</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetailContent;
