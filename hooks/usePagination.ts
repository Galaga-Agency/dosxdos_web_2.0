import { useState, useCallback, useEffect } from "react";

export interface PaginationOptions<T> {
  items: T[];
  itemsPerPage?: number;
  scrollTargetId?: string;
}

export default function usePagination<T>({
  items,
  itemsPerPage = 6,
  scrollTargetId = "pagination-section",
}: PaginationOptions<T>) {
  const [currentPage, setCurrentPage] = useState(0);

  // Recalculate pages if items change
  useEffect(() => {
    // Reset to first page if current page is now out of bounds
    if (currentPage >= Math.ceil(items.length / itemsPerPage)) {
      setCurrentPage(0);
    }
  }, [items, itemsPerPage]);

  // Calculate total pages
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Get current items
  const currentItems = items.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Handle page click
  const handlePageClick = useCallback(
    (event: { selected: number }) => {
      // Update the current page
      setCurrentPage(event.selected);

      // Scroll to the target section if it exists
      if (typeof window !== "undefined") {
        const element = document.getElementById(scrollTargetId);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    },
    [scrollTargetId]
  );

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
