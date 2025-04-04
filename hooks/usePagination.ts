import { useState, useCallback, useEffect } from "react";

export interface PaginationOptions<T> {
  items: T[];
  itemsPerPage?: number;
  scrollTargetId?: string;
}

export default function usePagination<T>({
  items,
  itemsPerPage = 6,
  scrollTargetId = "pagination-section", // Keep the parameter for backwards compatibility
}: PaginationOptions<T>) {
  const [currentPage, setCurrentPage] = useState(0);

  // Recalculate pages if items change
  useEffect(() => {
    // Reset to first page if current page is now out of bounds
    if (currentPage >= Math.ceil(items.length / itemsPerPage)) {
      setCurrentPage(0);
    }
  }, [items, itemsPerPage, currentPage]);

  // Calculate total pages
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Get current items
  const currentItems = items.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Handle page click - IMPORTANT: No scrolling logic here!
  const handlePageClick = useCallback((event: { selected: number }) => {
    // Simply update the page state
    setCurrentPage(event.selected);

    // DO NOT add any scrolling logic here
    // The scrollTargetId parameter is kept for backwards compatibility only
  }, []);

  // Reset to first page
  const resetToFirstPage = useCallback(() => {
    setCurrentPage(0);
  }, []);

  return {
    currentItems,
    handlePageClick,
    pageCount,
    currentPage,
    resetToFirstPage,
  };
}
