import React from "react";
import gsap from "gsap";
import "./Filters.scss"

interface FiltersProps {
  categories: any[];
  currentFilter: string;
  onFilterChange: (filter: string) => void;
  isAnimating: boolean;
}

const Filters: React.FC<FiltersProps> = ({
  categories,
  currentFilter,
  onFilterChange,
  isAnimating,
}) => {
  const handleFilterChange = (newFilter: string) => {
    if (currentFilter === newFilter || isAnimating) return;

    // Animate filter buttons
    gsap.to(".portfolio-filter-btn", {
      scale: 1,
      duration: 0.3,
      ease: "power1.out",
    });

    gsap.to(`.portfolio-filter-btn[data-filter="${newFilter}"]`, {
      scale: 1.1,
      duration: 0.3,
      ease: "back.out(1.7)",
    });

    // Call the parent handler
    onFilterChange(newFilter);
  };

  return (
    <div className="portfolio-filters">
      {categories.slice(0, 5).map((category) => (
        <button
          key={category.id}
          data-filter={category.id}
          className={`portfolio-filter-btn ${
            currentFilter === category.id ? "active" : ""
          }`}
          onClick={() => handleFilterChange(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default Filters;
