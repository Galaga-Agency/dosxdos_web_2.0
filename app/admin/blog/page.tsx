"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PlusCircle, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { BlogPost } from "@/types/blog-post-types";
import ProtectedRoute from "@/components/ProtectedRoute";
import gsap from "gsap";
import "./BlogList.scss";
import AdminBlogCard from "@/components/AdminBlogCard/AdminBlogCard";
import { deletePost, getAllPosts } from "@/lib/blog-service";
import Loading from "@/components/ui/Loading/Loading";

function BlogListPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const postsContainerRef = useRef<HTMLDivElement>(null);
  const emptyStateRef = useRef<HTMLDivElement>(null);

  const isAuthenticated = status === "authenticated";

  // Fetch posts with 3-second minimum loading time
  useEffect(() => {
    if (isAuthenticated) {
      getAllPosts()
        .then((fetchedPosts) => {
          setPosts(fetchedPosts);

          // Set a minimum loading time of 3 seconds
          setTimeout(() => {
            setLoading(false);
          }, 3000);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
          setError("Error al cargar los posts. Intenta recargar la página.");
          setLoading(false);
        });
    }
  }, [isAuthenticated]);

  // Header GSAP animation
  useEffect(() => {
    const tl = gsap.timeline();

    if (headerRef.current && titleRef.current && actionsRef.current) {
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3 ,ease: "power3.out" }
      );

      tl.fromTo(
        titleRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
        "-=0.6"
      );

      tl.fromTo(
        actionsRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
        "-=0.6"
      );
    }
  }, []);

  // Animate posts or empty state
  useEffect(() => {
    if (loading) return;

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (posts.length === 0 && emptyStateRef.current) {
        gsap.fromTo(
          emptyStateRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            onComplete: () => setHasAnimated(true),
          }
        );
      } else if (posts.length > 0 && postsContainerRef.current) {
        const cards = gsap.utils.toArray(
          postsContainerRef.current.querySelectorAll(".blog-post-card")
        );
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            onComplete: () => setHasAnimated(true),
          }
        );
      } else {
        setHasAnimated(true);
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [loading, posts]);

  const handleDeletePost = async (id: string) => {
    if (!id) return;

    if (confirm("¿Estás seguro de que quieres eliminar esta entrada?")) {
      try {
        await deletePost(id);

        const postElement = document.querySelector(`[data-id="${id}"]`);
        if (postElement) {
          gsap.to(postElement, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: "power3.out",
            onComplete: () => {
              setPosts(posts.filter((post) => post.id !== id));
            },
          });
        } else {
          setPosts(posts.filter((post) => post.id !== id));
        }
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("No se pudo eliminar la entrada del blog");
      }
    }
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/admin/login" });
  };

  if (error) {
    return (
      <div className="blog-list-page">
        <div className="blog-list-page__container">
          <div className="blog-list-page__error">
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Reintentar</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="blog-list-page">
        <div className="blog-list-page__container">
          <div className="blog-list-page__header" ref={headerRef}>
            <h1 ref={titleRef}>Panel de Administración</h1>
            <div className="blog-list-page__actions" ref={actionsRef}>
              <Link
                href="/admin/blog/nuevo"
                className="blog-list-page__new-btn"
              >
                <PlusCircle size={16} /> Nueva Entrada
              </Link>
              <button
                className="blog-list-page__logout-btn"
                onClick={handleLogout}
              >
                <LogOut size={16} /> Cerrar sesión
              </button>
            </div>
          </div>

          <div className="blog-list-page__content-area">
            {loading ? (
              <div className="blog-list-page__loader">
                <Loading />
              </div>
            ) : (
              <div className="blog-list-page__posts">
                {posts.length > 0 ? (
                  <div
                    className="blog-list-page__posts-grid"
                    ref={postsContainerRef}
                  >
                    {posts.map((post, index) => (
                      <div
                        key={post.slug || post.id || index}
                        className="blog-post-card"
                        data-id={post.id}
                        data-slug={post.slug}
                      >
                        <AdminBlogCard
                          post={post}
                          onDelete={handleDeletePost}
                          index={index}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="blog-list-page__empty" ref={emptyStateRef}>
                    <p>No hay entradas de blog disponibles.</p>
                    <Link
                      href="/admin/blog/nuevo"
                      className="blog-list-page__new-btn"
                    >
                      <PlusCircle size={16} /> Crear primera entrada
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default BlogListPage;
