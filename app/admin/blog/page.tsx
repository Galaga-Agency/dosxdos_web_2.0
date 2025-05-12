"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PlusCircle, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { BlogPost } from "@/types/blog-post-types";
import ProtectedRoute from "@/components/ProtectedRoute";
import { gsap } from "gsap";
import "./blog-list.scss";
import AdminBlogCard from "@/components/AdminBlogCard/AdminBlogCard";
import { deletePost, getAllPosts } from "@/lib/blog-service";
import Loading from "@/components/ui/Loading/Loading";
import Pagination from "@/components/ui/Pagination/Pagination";
import Modal from "@/components/ui/Modal/Modal";
import { AlertTriangle } from "lucide-react";
import SecondaryButton from "@/components/ui/SecondaryButton/SecondaryButton";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import { initScrollTriggerConfig } from "@/utils/animations/scrolltrigger-config";
import Footer from "@/components/layout/Footer/footer";

function BlogListPage() {
  // State
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const router = useRouter();
  const { data: session, status } = useSession();

  // Refs
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const postsContainerRef = useRef<HTMLDivElement>(null);
  const emptyStateRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  const isAuthenticated = status === "authenticated";

  // Direct calculation without hooks
  const itemsPerPage = 6;
  const pageCount = Math.ceil(posts.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const currentItems = posts.slice(startIndex, startIndex + itemsPerPage);

  // Fetch posts
  useEffect(() => {
    if (isAuthenticated) {
      getAllPosts()
        .then((fetchedPosts) => {
          setPosts(fetchedPosts);
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

  // Initialize ScrollTrigger
  useEffect(() => {
    initScrollTriggerConfig();
    return () => {
      // Clean up GSAP animations
      gsap.killTweensOf(".blog-list-page, .blog-list-page *");
    };
  }, []);

  // Handle page change
  const handlePageClick = (pageNumber: number) => {
    // Pause ScrollSmoother
    if ((window as any).__smoother__) {
      (window as any).__smoother__.paused(true);
    }

    // Update state
    setCurrentPage(pageNumber);

    // Scroll to top
    window.scrollTo(0, 0);

    // Resume ScrollSmoother after a delay
    setTimeout(() => {
      if ((window as any).__smoother__) {
        (window as any).__smoother__.paused(false);
      }
    }, 100);
  };

  // Animate header - using useLayoutEffect to prevent flickering
  useLayoutEffect(() => {
    if (loading || !headerRef.current) return;

    const tl = gsap.timeline();

    tl.fromTo(
      headerRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power3.out" }
    );

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
        "-=0.6"
      );
    }

    if (actionsRef.current) {
      tl.fromTo(
        actionsRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
        "-=0.6"
      );
    }
  }, [loading]);

  // Animate content - using useLayoutEffect to prevent flickering
  useLayoutEffect(() => {
    if (loading) return;

    // Short delay to ensure DOM is ready
    setTimeout(() => {
      // Empty state animation
      if (posts.length === 0 && emptyStateRef.current) {
        gsap.fromTo(
          emptyStateRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
      }
      // Posts animation
      else if (posts.length > 0 && postsContainerRef.current) {
        const cards = gsap.utils.toArray(
          postsContainerRef.current.querySelectorAll(".blog-post-card")
        );

        if (cards.length > 0) {
          gsap.set(cards, { opacity: 0, y: 30 });
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
          });
        }

        // Animate pagination if it exists
        if (paginationRef.current && posts.length > itemsPerPage) {
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
      }
    }, 50);
  }, [loading, currentPage, posts.length]);

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

  // Handle post deletion
  const confirmDelete = async () => {
    if (!postToDelete) return;

    try {
      setIsDeleteModalOpen(false);
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
            setPosts((prevPosts) =>
              prevPosts.filter((post) => post.id !== postToDelete.id)
            );
            setPostToDelete(null);
          },
        });
      } else {
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
      <SmoothScrollWrapper>
        <div className="blog-list-page">
          <div className="blog-list-page__container">
            <div className="blog-list-page__header" ref={headerRef}>
              <h1 ref={titleRef}>Panel de Administración</h1>
              <div className="blog-list-page__actions" ref={actionsRef}>
                <PrimaryButton
                  href="/admin/blog/nuevo"
                  className="blog-list-page__new-btn"
                >
                  <PlusCircle size={16} /> Nueva Entrada
                </PrimaryButton>
                <SecondaryButton
                  className="blog-list-page__logout-btn"
                  onClick={handleLogout}
                  lightBg={true}
                >
                  <LogOut size={16} /> Cerrar sesión
                </SecondaryButton>
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
                        key={`posts-grid-${currentPage}`}
                      >
                        {currentItems.map((post, index) => (
                          <div
                            key={`${
                              post.id || post.slug || index
                            }-page${currentPage}`}
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

                      {pageCount > 1 && (
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
        <Footer />
      </SmoothScrollWrapper>
    </ProtectedRoute>
  );
}

export default BlogListPage;
