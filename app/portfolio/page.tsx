"use client";

import React, { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import useScrollSmooth from "@/hooks/useScrollSmooth";

import { useDataStore } from "@/store/useDataStore";
import PortfolioHeader from "@/components/Portfolio2Page/PortfolioHeader/PortfolioHeader";
import PortfolioCTA from "@/components/Portfolio2Page/PortfolioCTA/PortfolioCTA";
import Footer from "@/components/layout/Footer/footer";
import MasProyectosGrid from "@/components/Portfolio2Page/MasProyectosGrid/MasProyectosGrid";

import {
  charAnimation,
  rollUpTextAnimation,
} from "@/utils/animations/text-anim";
import { revealForTouchDevices } from "@/utils/animations/touch-device-reveal";
import { cursorBubbleAnimation } from "@/utils/animations/cursor-bubble-anim";
import { randomGridAnim } from "@/utils/animations/random-grid-anim";
import { highlightAnimation } from "@/utils/animations/highlight-anim";

import "./portfolio-page.scss";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { Project } from "@/types/project-types";
import { useSession } from "next-auth/react";

const PortfolioPage: React.FC = () => {
  const cleanupRef = useRef<(() => void) | null>(null);
  const { data: session, status } = useSession();
  const projects = useDataStore((state) => state.projects);

  const isAuthenticated = status === "authenticated";

  useScrollSmooth();

  useGSAP(() => {
    const timer = setTimeout(() => {
      charAnimation();
      rollUpTextAnimation();
      revealForTouchDevices();
      randomGridAnim();
      highlightAnimation(1.2);

      cleanupRef.current = cursorBubbleAnimation();
    }, 300);

    return () => {
      clearTimeout(timer);
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, []);

  // Function to handle project order updates
  const handleUpdateProjectOrder = async (updatedProjects: Project[]) => {
    try {
      console.log(
        "Sending update request with projects:",
        updatedProjects.map((p) => ({ id: p.id, name: p.name, order: p.order }))
      );

      const response = await fetch("/api/proyectos/update-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projects: updatedProjects }),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      // Log the response body to see what error we're getting
      const responseText = await response.text();
      console.log("Response body:", responseText);

      if (!response.ok) {
        console.error(
          "Response not ok. Status:",
          response.status,
          "Body:",
          responseText
        );
        throw new Error(
          `Failed to update project order: ${response.status} - ${responseText}`
        );
      }

      // Try to parse as JSON
      let responseData;
      try {
        responseData = JSON.parse(responseText);
        console.log("Parsed response:", responseData);
      } catch (e) {
        console.error("Failed to parse response as JSON:", e);
        throw new Error("Invalid response format");
      }

      // Update the store with the new order
      useDataStore.getState().updateProjects(updatedProjects);

      console.log("Project order updated successfully");
    } catch (error) {
      console.error("Error updating project order:", error);
      throw error; // Re-throw to show user the error
    }
  };

  return (
    <PageWrapper>
      <main className="portfolio-page">
        <PortfolioHeader />
        <MasProyectosGrid
          projects={projects}
          isAdmin={isAuthenticated}
          onUpdateProjectOrder={handleUpdateProjectOrder}
        />
        <PortfolioCTA />
      </main>
      <Footer />
    </PageWrapper>
  );
};

export default PortfolioPage;
