"use client";

import React, { useState, useEffect } from "react";
import { PlusCircle, LogOut, AlertTriangle } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { gsap } from "gsap";
import { ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";
import useScrollSmooth from "@/hooks/useScrollSmooth";
import { useDataStore } from "@/store/useDataStore";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

import { BlogPost } from "@/types/blog-post-types";
import { Project } from "@/types/project-types";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminBlogCard from "@/components/AdminBlogCard/AdminBlogCard";
import AdminProjectCard from "@/components/AdminProjectCard/AdminProjectCard";
import { deletePost, getAllPosts } from "@/lib/blog-service";
import { deleteProject, getAllProjects } from "@/lib/project-service";
import Pagination from "@/components/ui/Pagination/Pagination";
import Modal from "@/components/ui/Modal/Modal";
import SecondaryButton from "@/components/ui/SecondaryButton/SecondaryButton";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import Footer from "@/components/layout/Footer/footer";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { animatePaginatedItems } from "@/utils/animations/stagger-items-anim";
import { highlightAnimation } from "@/utils/animations/highlight-anim";

import "./admin-panel.scss";

type TabType = "blog" | "proyectos";

function AdminPanelPage() {
  useScrollSmooth();

  // State
  const [activeTab, setActiveTab] = useState<TabType>("blog");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    id: string;
    title: string;
    type: "blog" | "project";
  } | null>(null);

  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  // Direct calculation without hooks
  const itemsPerPage = 6;
  const currentItems = activeTab === "blog" ? posts : projects;
  const pageCount = Math.ceil(currentItems.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const displayItems = currentItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    if (isAuthenticated) {
      document.body.classList.add("smooth-scroll");

      return () => {
        document.body.classList.remove("smooth-scroll");
      };
    }
  }, [isAuthenticated]);

  // Fetch data
  useEffect(() => {
    if (isAuthenticated) {
      Promise.all([getAllPosts(), getAllProjects()])
        .then(([fetchedPosts, fetchedProjects]) => {
          setPosts(fetchedPosts);
          setProjects(fetchedProjects);
          setTimeout(() => {
            setLoading(false);
          }, 300);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setError("Error al cargar los datos. Intenta recargar la página.");
          setLoading(false);
        });
    }
  }, [isAuthenticated]);

  // Reset page when switching tabs
  useEffect(() => {
    setCurrentPage(0);
  }, [activeTab]);

  // GSAP animations
  useGSAP(() => {
    if (!isAuthenticated || loading) return;

    const timer = setTimeout(() => {
      highlightAnimation();
      const selector =
        activeTab === "blog" ? ".blog-post-card" : ".project-card";
      animatePaginatedItems(selector, {
        container: ".admin-panel-page__items-grid",
        stagger: 0.08,
        fromY: 30,
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, loading, currentPage, activeTab]);

  // Handle page change
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  // Handle tab change
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setCurrentPage(0);
  };

  // Open delete confirmation modal
  const openDeleteModal = (id: string, type: "blog" | "project") => {
    let item;
    let itemTitle = "este elemento";

    if (type === "blog") {
      item = posts.find((post) => post.id === id);
      itemTitle = item?.title || "esta entrada";
    } else {
      item = projects.find((project) => project.id === id);
      itemTitle = (item as Project)?.name || "este proyecto";
    }

    if (item) {
      setItemToDelete({
        id: item.id,
        title: itemTitle,
        type,
      });
      setIsDeleteModalOpen(true);
    }
  };

  // Handle deletion
  const confirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      setIsDeleteModalOpen(false);

      if (itemToDelete.type === "blog") {
        await deletePost(itemToDelete.id);
        // Update the store cache immediately
        useDataStore.getState().removePost(itemToDelete.id);
      } else {
        await deleteProject(itemToDelete.id);
        // Update the store cache immediately
        useDataStore.getState().removeProject(itemToDelete.id);
      }

      const itemElement = document.querySelector(
        `[data-id="${itemToDelete.id}"]`
      );

      if (itemElement) {
        gsap.to(itemElement, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: "power3.out",
          onComplete: () => {
            if (itemToDelete.type === "blog") {
              setPosts((prevPosts) =>
                prevPosts.filter((post) => post.id !== itemToDelete.id)
              );
            } else {
              setProjects((prevProjects) =>
                prevProjects.filter((project) => project.id !== itemToDelete.id)
              );
            }
            setItemToDelete(null);
          },
        });
      } else {
        if (itemToDelete.type === "blog") {
          setPosts((prevPosts) =>
            prevPosts.filter((post) => post.id !== itemToDelete.id)
          );
        } else {
          setProjects((prevProjects) =>
            prevProjects.filter((project) => project.id !== itemToDelete.id)
          );
        }
        setItemToDelete(null);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      const itemType =
        itemToDelete.type === "blog" ? "entrada del blog" : "proyecto";
      alert(`No se pudo eliminar la ${itemType}`);
      setItemToDelete(null);
    }
  };

  const handleLogout = async () => {
    try {
      // Clear any existing data first
      setPosts([]);
      setProjects([]);
      setLoading(true);

      // Force sign out
      await signOut({
        callbackUrl: "/login",
        redirect: false,
      });

      // Force redirect
      window.location.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Force redirect even if signOut fails
      window.location.replace("/login");
    }
  };

  if (error) {
    return (
      <PageWrapper>
        <div className="admin-panel-page">
          <div className="admin-panel-page__container">
            <div className="admin-panel-page__error">
              <p>{error}</p>
              <button onClick={() => window.location.reload()}>
                Reintentar
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </PageWrapper>
    );
  }

  return (
    <ProtectedRoute>
      <PageWrapper>
        <div className="admin-panel-page">
          <div className="admin-panel-page__container container">
            <div className="admin-panel-page__header">
              <h1 className="admin-panel-page__title">
                Panel de <span className="highlight">Administración</span>
              </h1>
              <div className="admin-panel-page__actions">
                <SecondaryButton onClick={handleLogout} lightBg={true}>
                  <LogOut size={16} /> Cerrar sesión
                </SecondaryButton>
              </div>
            </div>

            <div className="admin-panel-page__tabs">
              <button
                className={`admin-panel-page__tab ${
                  activeTab === "blog" ? "active" : ""
                }`}
                onClick={() => handleTabChange("blog")}
              >
                <span>Blog ({posts.length})</span>
              </button>
              <button
                className={`admin-panel-page__tab ${
                  activeTab === "proyectos" ? "active" : ""
                }`}
                onClick={() => handleTabChange("proyectos")}
              >
                <span>Portfolio ({projects.length})</span>
              </button>
            </div>
            <div className="admin-panel-page__content-area container">
              <div className="admin-panel-page__tab-actions">
                {activeTab === "blog" ? (
                  <PrimaryButton href="/admin/blog/nuevo">
                    <PlusCircle size={16} /> Nueva Entrada
                  </PrimaryButton>
                ) : (
                  <>
                    <PrimaryButton href="/admin/proyectos/nuevo">
                      <PlusCircle size={16} /> Nuevo Proyecto
                    </PrimaryButton>{" "}
                    <p className="small-text">
                      * Proyectos marcados como{" "}
                      <span className="nb-badge">Destacado</span> serán visibles
                      en la página de landing
                    </p>
                  </>
                )}
              </div>

              <div className="admin-panel-page__items">
                {displayItems.length > 0 ? (
                  <>
                    <div
                      className="admin-panel-page__items-grid"
                      key={`items-grid-${activeTab}-${currentPage}`}
                    >
                      {displayItems.map((item, index) => (
                        <div
                          key={`${
                            item.id || item.slug || index
                          }-page${currentPage}`}
                          className={
                            activeTab === "blog"
                              ? "blog-post-card"
                              : "project-card"
                          }
                          data-id={item.id}
                          data-slug={item.slug}
                        >
                          {activeTab === "blog" ? (
                            <AdminBlogCard
                              post={item as BlogPost}
                              onDelete={(id) => openDeleteModal(id, "blog")}
                              index={index}
                            />
                          ) : (
                            <AdminProjectCard
                              project={item as Project}
                              onDelete={(id) => openDeleteModal(id, "project")}
                              index={index}
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    {pageCount > 1 && (
                      <div className="admin-panel-page__pagination">
                        <Pagination
                          handlePageClick={handlePageClick}
                          pageCount={pageCount}
                          currentPage={currentPage}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="admin-panel-page__empty ">
                    <p>
                      {activeTab === "blog"
                        ? "No hay entradas de blog disponibles."
                        : "No hay proyectos disponibles."}
                    </p>
                    <PrimaryButton
                      href={
                        activeTab === "blog"
                          ? "/admin/blog/nuevo"
                          : "/admin/proyectos/nuevo"
                      }
                    >
                      <PlusCircle size={16} />
                      {activeTab === "blog"
                        ? "Crear primera entrada"
                        : "Crear primer proyecto"}
                    </PrimaryButton>
                  </div>
                )}
              </div>
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
          <p>
            ¿Estás seguro de que quieres eliminar este{" "}
            {itemToDelete?.type === "blog" ? "artículo" : "proyecto"}?
          </p>
          <strong>{itemToDelete?.title || "este elemento"}</strong>
          <p className="delete-warning">Esta acción no se puede deshacer.</p>
        </Modal>
        <Footer />
      </PageWrapper>
    </ProtectedRoute>
  );
}

export default AdminPanelPage;
