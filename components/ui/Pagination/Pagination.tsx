"use client";

import React, { useState, useEffect } from "react";
import "./Pagination.scss";

interface PaginationProps {
  handlePageClick: (event: { selected: number }) => void;
  pageCount: number;
  currentPage?: number;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  handlePageClick,
  pageCount,
  currentPage = 0,
  className = "",
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Responsive check
  useEffect(() => {
    const checkMobile = (): void => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (pageCount <= 1) return null;

  // Generate array of page numbers to display
  const getPageNumbers = (): (number | string)[] => {
    const displayed: (number | string)[] = [];
    const range = isMobile ? 1 : 2;

    // Always show first page
    displayed.push(0);

    // Show ellipsis if needed
    if (currentPage > range + 1) {
      displayed.push("ellipsis-start");
    }

    // Pages around current
    for (
      let i = Math.max(1, currentPage - range);
      i <= Math.min(pageCount - 2, currentPage + range);
      i++
    ) {
      displayed.push(i);
    }

    // Show ellipsis if needed
    if (currentPage < pageCount - range - 2) {
      displayed.push("ellipsis-end");
    }

    // Always show last page if there are multiple pages
    if (pageCount > 1) {
      displayed.push(pageCount - 1);
    }

    return displayed;
  };

  const pageNumbers = getPageNumbers();

  const handleButtonClick = (newPage: number, e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    // Save current scroll position
    const scrollPos = window.scrollY;

    // Only trigger if it's actually a different page
    if (newPage !== currentPage) {
      handlePageClick({ selected: newPage });
    }

    // Immediately force scroll position back
    window.scrollTo(0, scrollPos);

    // And again after a short delay to counter any effects
    setTimeout(() => window.scrollTo(0, scrollPos), 0);
  };

  return (
    <div className={`pagination ${className}`}>
      {/* Previous button */}
      <button
        className="pagination__item pagination__item--prev"
        onClick={(e) => handleButtonClick(Math.max(0, currentPage - 1), e)}
        disabled={currentPage === 0}
      >
        ←
      </button>

      {/* Page numbers */}
      {pageNumbers.map((page, index) => {
        // Ellipsis
        if (page === "ellipsis-start" || page === "ellipsis-end") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="pagination__item pagination__item--break"
            >
              ...
            </span>
          );
        }

        // Regular page number
        return (
          <button
            key={`page-${page}`}
            className={`pagination__item ${
              currentPage === page ? "pagination__item--active" : ""
            }`}
            onClick={(e) => handleButtonClick(page as number, e)}
          >
            {(page as number) + 1}
          </button>
        );
      })}

      {/* Next button */}
      <button
        className="pagination__item pagination__item--next"
        onClick={(e) =>
          handleButtonClick(Math.min(pageCount - 1, currentPage + 1), e)
        }
        disabled={currentPage === pageCount - 1}
      >
        →
      </button>
    </div>
  );
};

export default Pagination;
