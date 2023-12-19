import React, { useEffect } from "react";
import FeaturesFilter from "./Filters/FilterComponent";
import Filters from "./Filters/Filters";

function Sidebar(props) {
  useEffect(() => {
    const openFilterSection = (event) => {
      if (event.target.classList.contains("name")) {
        const fliterCollapse = event.target.nextElementSibling;
        const filterBody = fliterCollapse.querySelector(".filter-body");
        const heightFilterBody = filterBody.clientHeight;
        if (!fliterCollapse.classList.contains("collapsing")) {
          fliterCollapse.classList.toggle("show");
          if (fliterCollapse.classList.contains("show")) {
            fliterCollapse.classList.add("collapsing");
            fliterCollapse.style.height = heightFilterBody + "px";
            fliterCollapse.addEventListener(
              "transitionend",
              () => {
                fliterCollapse.style.removeProperty("height");
                fliterCollapse.classList.remove("collapsing");
              },
              { once: true }
            );
          } else {
            fliterCollapse.style.height = heightFilterBody + "px";
            requestAnimationFrame(() => {
              fliterCollapse.style.height = 0 + "px";
            });
          }
        }
      }
    };

    document.addEventListener("click", openFilterSection);

    return () => {
      document.removeEventListener("click", openFilterSection);
    };
  }, []);

  const filters = [];
  for (let i = 0; i < Filters.length; i++) {
    filters.push(
      <FeaturesFilter
        title={Filters[i].title}
        arrFilters={Filters[i].filters}
        className={Filters[i].className}
        key={Filters[i].id}
        setGenreFilter={props.setGenreFilter}
        setPriceRangeFilter={props.setPriceRangeFilter}
        setPlatformFilter={props.setPlatformFilter}
        setFeatureFilter={props.setFeatureFilter}
      />
    );
  }

  return (
    <div className="content-sidebar">
      <div className="filter-wrapper">{filters}</div>
    </div>
  );
}

export default Sidebar;
