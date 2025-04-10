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
import Pagination from "@/components/ui/Pagination/Pagination";
import usePagination from "@/hooks/usePagination";
import Modal from "@/components/ui/Modal/Modal";
import { AlertTriangle } from "lucide-react";

function BlogListPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const router = useRouter();
  const { data: session, status } = useSession();

  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const postsContainerRef = useRef<HTMLDivElement>(null);
  const emptyStateRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  const isAuthenticated = status === "authenticated";

  // Set up pagination (6 posts per page like in the blog page)
  const { currentItems, handlePageClick, pageCount, currentPage } =
    usePagination({
      items: posts,
      itemsPerPage: 6,
    });

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
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power3.out" }
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

        // Animate pagination if it exists
        if (paginationRef.current && posts.length > 6) {
          gsap.fromTo(
            paginationRef.current,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: 0.3,
              ease: "power3.out",
            }
          );
        }
      } else {
        setHasAnimated(true);
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [loading, posts]);

  // Open delete confirmation modal
  const openDeleteModal = (id: string) => {
    const post = posts.find((post) => post.id === id);
    if (post) {
      setPostToDelete({
        id: post.id,
        title: post.title || "esta entrada",
      });
      setIsDeleteModalOpen(true);
    }
  };

  // Replace the confirmDelete function in your BlogListPage component with this:

  const confirmDelete = async () => {
    if (!postToDelete) return;

    try {
      // First close the modal
      setIsDeleteModalOpen(false);

      // Then perform the deletion
      await deletePost(postToDelete.id);

      const postElement = document.querySelector(
        `[data-id="${postToDelete.id}"]`
      );

      if (postElement) {
        gsap.to(postElement, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: "power3.out",
          onComplete: () => {
            // Update the state after the animation
            setPosts((prevPosts) =>
              prevPosts.filter((post) => post.id !== postToDelete.id)
            );
            setPostToDelete(null);
          },
        });
      } else {
        // If we can't find the element, just update the state
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post.id !== postToDelete.id)
        );
        setPostToDelete(null);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("No se pudo eliminar la entrada del blog");
      setPostToDelete(null);
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
                  <>
                    <div
                      className="blog-list-page__posts-grid"
                      ref={postsContainerRef}
                    >
                      {currentItems.map((post, index) => (
                        <div
                          key={post.slug || post.id || index}
                          className="blog-post-card"
                          data-id={post.id}
                          data-slug={post.slug}
                        >
                          <AdminBlogCard
                            post={post}
                            onDelete={openDeleteModal}
                            index={index}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Add pagination if there are more than 6 posts */}
                    {posts.length > 6 && (
                      <div
                        className="blog-list-page__pagination"
                        ref={paginationRef}
                      >
                        <Pagination
                          handlePageClick={handlePageClick}
                          pageCount={pageCount}
                          currentPage={currentPage}
                        />
                      </div>
                    )}
                  </>
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

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        confirmText="Eliminar"
        cancelText="Cancelar"
        size="small"
        title="Confirmar eliminación"
        icon={<AlertTriangle size={40} />}
        centered
      >
        <p>¿Estás seguro de que quieres eliminar este artículo?</p>
        <strong>{postToDelete?.title || "esta entrada"}</strong>
        <p className="delete-warning">Esta acción no se puede deshacer.</p>
      </Modal>
    </ProtectedRoute>
  );
}

export default BlogListPage;
