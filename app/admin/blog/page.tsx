"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PlusCircle, LogOut, AlertTriangle } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { gsap } from "gsap";
import { ScrollTrigger, SplitText, ScrollSmoother } from "@/plugins";
import { useGSAP } from "@gsap/react";
import useScrollSmooth from "@/hooks/useScrollSmooth";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

import { BlogPost } from "@/types/blog-post-types";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminBlogCard from "@/components/AdminBlogCard/AdminBlogCard";
import { deletePost, getAllPosts } from "@/lib/blog-service";
import Loading from "@/components/ui/Loading/Loading";
import Pagination from "@/components/ui/Pagination/Pagination";
import Modal from "@/components/ui/Modal/Modal";
import SecondaryButton from "@/components/ui/SecondaryButton/SecondaryButton";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import Footer from "@/components/layout/Footer/footer";

import { fadeAnimation } from "@/utils/animations/text-anim";
import { animatePaginatedItems } from "@/utils/animations/stagger-items-anim";

import "./blog-list.scss";

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

  const { status } = useSession();

  useScrollSmooth();

  const isAuthenticated = status === "authenticated";

  // Direct calculation without hooks
  const itemsPerPage = 6;
  const pageCount = Math.ceil(posts.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const currentItems = posts.slice(startIndex, startIndex + itemsPerPage);

  // Add smooth-scroll class to body
  useEffect(() => {
    document.body.classList.add("smooth-scroll");
    return () => {
      document.body.classList.remove("smooth-scroll");
    };
  }, []);

  // Fetch posts
  useEffect(() => {
    if (isAuthenticated) {
      getAllPosts()
        .then((fetchedPosts) => {
          setPosts(fetchedPosts);
          setTimeout(() => {
            setLoading(false);
          }, 300);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
          setError("Error al cargar los posts. Intenta recargar la página.");
          setLoading(false);
        });
    }
  }, [isAuthenticated]);

  // Initialize animations with useGSAP
  useGSAP(() => {
    if (loading) return;

    const timer = setTimeout(() => {
      fadeAnimation();
      animatePaginatedItems(".blog-post-card", {
        container: ".blog-list-page__posts-grid",
        stagger: 0.08,
        fromY: 30,
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [loading, currentPage]);

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
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="blog-list-page">
            <div className="blog-list-page__container">
              <div className="blog-list-page__header ">
                <h1 className="blog-list-page__title fade_bottom">
                  Panel de Administración
                </h1>
                <div className="blog-list-page__actions fade_bottom">
                  <PrimaryButton href="/admin/blog/nuevo">
                    <PlusCircle size={16} /> Nueva Entrada
                  </PrimaryButton>
                  <SecondaryButton onClick={handleLogout} lightBg={true}>
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
                          <div className="blog-list-page__pagination fade_bottom">
                            <Pagination
                              handlePageClick={handlePageClick}
                              pageCount={pageCount}
                              currentPage={currentPage}
                            />
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="blog-list-page__empty fade_bottom">
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
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default BlogListPage;
