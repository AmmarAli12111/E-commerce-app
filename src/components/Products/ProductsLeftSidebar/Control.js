import React, { useEffect, useRef } from "react";

function Control(props) {
  const filterTitle = useRef(null);

  useEffect(() => {
    const openFilters = (event) => {
      if (event.target.classList.contains("filter-title")) {
        event.target.classList.toggle("active");
        const productFilter = document.querySelector(
          ".products-section .product-filter"
        );
        const overlayFilter = document.getElementById("overlay");
        if (!overlayFilter.classList.contains("open")) {
          productFilter.classList.add("open");
          overlayFilter.classList.add("open");
        }
      }
    };

    if (filterTitle.current) {
      filterTitle.current.addEventListener("click", openFilters);
    }
    return () => {
      if (filterTitle.current) {
        filterTitle.current.removeEventListener("click", openFilters);
      }
    };
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    document.querySelector(".filter-choice").classList.toggle("opened");
  };
  const SortArr = [
    { id: 1, name: "Featured" },
    { id: 2, name: "Best selling" },
    { id: 3, name: "Alphabetically, A-Z" },
    { id: 4, name: "Alphabetically, Z-A" },
    { id: 5, name: "Price, low to high" },
    { id: 6, name: "Price, high to low" },
    { id: 7, name: "Date, old to new" },
    { id: 8, name: "Date, new to old" },
  ];
  return (
    <div className="top-control mb-3">
      <div
        className="filter-title fs-6 me-4 fw-bold rounded-5 text-uppercase d-none"
        ref={filterTitle}
      >
        Filter
      </div>
      <div className="control d-flex align-items-center justify-content-between">
        <div className="product-count pe-3 col">
          <span className=" products-result-count  align-left">
            Showing 1–16 of 22 results
          </span>
        </div>
        {SortArr.length > 0 && (
          <div
            className="filter-choice d-flex justify-content-end  position-relative"
            onClick={handleClick}
          >
            <a
              href="#"
              className="d-flex align-items-center justify-content-between col-auto rounded-5 gap-5"
            >
              <span className="sr_txt_mb">Sort by: </span>
              <span className="js_sr_txt">Best selling</span>
              <span className="fs-5">{props.BiChevronDown}</span>
            </a>
            <div className="laber_sortby position-fixed bottom-0 start-0 w-100 fs-6 h-auto ">
              <div className="orderby py-3">
                {SortArr.map((item) => (
                  <a
                    href="#"
                    className="d-block position-relative px-3 py-1 fs-6"
                    key={item.id}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Control;
