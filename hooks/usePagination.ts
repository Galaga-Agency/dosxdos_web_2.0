import { useState, useEffect } from "react";

interface PaginationProps<T> {
  items: T[];
  itemsPerPage?: number;
}

export default function usePagination<T>({
  items,
  itemsPerPage = 6,
}: PaginationProps<T>) {
  // Current page state
  const [currentPage, setCurrentPage] = useState(0);

  // Compute derived values based on currentPage
  const pageCount = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const startIndex = currentPage * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  // Reset to first page if we're on an invalid page after items change
  useEffect(() => {
    if (currentPage >= pageCount && items.length > 0) {
      setCurrentPage(0);
    }
  }, [items.length, pageCount, currentPage]);

  // Handle page click
  const handlePageClick = (event: { selected: number }) => {
    // Set the current page
    setCurrentPage(event.selected);

    // Give React time to update before scrolling
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "auto", // Use 'auto' not 'smooth' to avoid conflict with ScrollSmoother
      });
    }, 0);
  };

  return {
    currentItems,
    handlePageClick,
    pageCount,
    currentPage,
    setCurrentPage,
  };
}
