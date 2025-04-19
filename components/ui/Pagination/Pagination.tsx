import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Pagination.scss";

interface PaginationProps {
  handlePageClick: (pageNumber: number) => void;
  pageCount: number;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  handlePageClick,
  pageCount,
  currentPage,
}) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const totalShownPages = 5; // max number of page buttons to show
    let startPage, endPage;

    if (pageCount <= totalShownPages) {
      // show all pages if total pages is less than max to show
      startPage = 0;
      endPage = pageCount;
    } else {
      // calculate start and end page based on current page
      const leftOffset = Math.floor(totalShownPages / 2);
      const rightOffset = Math.ceil(totalShownPages / 2) - 1;

      if (currentPage <= leftOffset) {
        // current page near the start
        startPage = 0;
        endPage = totalShownPages;
      } else if (currentPage + rightOffset >= pageCount) {
        // current page near the end
        startPage = pageCount - totalShownPages;
        endPage = pageCount;
      } else {
        // current page somewhere in the middle
        startPage = currentPage - leftOffset;
        endPage = currentPage + rightOffset;
      }
    }

    // add page number buttons
    for (let i = startPage; i < endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`pagination__button ${currentPage === i ? "active" : ""}`}
          aria-label={`Go to page ${i + 1}`}
          aria-current={currentPage === i ? "page" : undefined}
        >
          {i + 1}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      <button
        className="pagination__nav-button"
        onClick={() => {
          if (currentPage > 0) handlePageClick(currentPage - 1);
        }}
        disabled={currentPage === 0}
        aria-label="Previous page"
      >
        <ChevronLeft size={20} />
      </button>

      {renderPageNumbers()}

      <button
        className="pagination__nav-button"
        onClick={() => {
          if (currentPage < pageCount - 1) handlePageClick(currentPage + 1);
        }}
        disabled={currentPage === pageCount - 1}
        aria-label="Next page"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;