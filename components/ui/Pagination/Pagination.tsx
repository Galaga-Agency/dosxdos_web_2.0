"use client";

import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
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
  const [isMobile, setIsMobile] = useState(false);

  // Responsive logic
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener
    window.addEventListener("resize", checkMobile);
    
    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Custom click handler to prevent default behavior
  const handleClick = (data: { selected: number }) => {
    // Prevent scrolling to top
    if (typeof window !== 'undefined') {
      const currentScrollPosition = window.scrollY;
      
      // Call the original handler
      handlePageClick(data);
      
      // Use setTimeout to ensure the scroll position is maintained after state updates
      setTimeout(() => {
        window.scrollTo(0, currentScrollPosition);
      }, 0);
    } else {
      handlePageClick(data);
    }
  };

  if (pageCount <= 1) {
    return null; // Don't render pagination if there's only one page
  }

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="→"
      onPageChange={handleClick} // Use our custom handler instead
      pageRangeDisplayed={isMobile ? 1 : 2}
      marginPagesDisplayed={isMobile ? 1 : 1}
      pageCount={pageCount}
      previousLabel="←"
      renderOnZeroPageCount={null}
      containerClassName={`pagination ${className}`}
      activeClassName="pagination__item--active"
      previousClassName="pagination__item pagination__item--prev"
      nextClassName="pagination__item pagination__item--next"
      pageClassName="pagination__item"
      breakClassName="pagination__item pagination__item--break"
      forcePage={currentPage}
    />
  );
};

export default Pagination;