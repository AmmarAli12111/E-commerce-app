import React, { useLayoutEffect, useRef } from "react";
import Products from "../ProductsLeftSidebar/Products";
import "../Products.css";
import "./ProductsFullWidth.css";
import Control from "../ProductsLeftSidebar/Control";
import FeaturesFilter from "../ProductsLeftSidebar/Filters/FilterComponent";
import Filters from "../ProductsLeftSidebar/Filters/Filters";

function ProductsFullWidth(props) {
  const topSidebar = useRef(null);

  const filterTitle = useRef(null);

  useLayoutEffect(() => {
    const handleClicked = (event) => {
      if (event.target.classList.contains("filter-title-mobile")) {
        event.target.classList.toggle("active");
        const filterTop = topSidebar.current;
        const filterBody = filterTop.querySelector(".content-sidebar");
        const heightFilterBody = filterBody.clientHeight;
        if (!filterTop.classList.contains("collapsing")) {
          filterTop.classList.toggle("show");
          if (filterTop.classList.contains("show")) {
            filterTop.classList.add("collapsing");
            filterTop.style.height = heightFilterBody + "px";
            filterTop.addEventListener(
              "transitionend",
              () => {
                filterTop.style.removeProperty("height");
                filterTop.classList.remove("collapsing");
              },
              { once: true }
            );
          } else {
            filterTop.style.height = heightFilterBody + "px";
            requestAnimationFrame(() => {
              filterTop.style.height = 0 + "px";
            });
          }
        }
      }
    };
    document.addEventListener("click", handleClicked);

    return () => {
      document.removeEventListener("click", handleClicked);
    };
  }, []);

  useLayoutEffect(() => {
    const handleClicked = (event) => {
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

    document.addEventListener("click", handleClicked);

    return () => {
      document.removeEventListener("click", handleClicked);
    };
  }, []);

  useLayoutEffect(() => {
    const openFilters = (event) => {
      const overlayFilter = document.getElementById("overlay");
      if (event.target.classList.contains("filter-fullwidth-title")) {
        event.target.classList.add("active");
        const productFilter = document.querySelector(".filter-small-media");
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

  useLayoutEffect(() => {
    const removeOverlay = (e) => {
      if (e.target.classList.contains("open")) {
        e.target.classList.remove("open");
        const filterFullwidthTitle = document.querySelector(
          ".filter-fullwidth-title"
        );
        const productFilterFullwidth = document.querySelector(
          ".filter-small-media"
        );
        if (
          filterFullwidthTitle &&
          productFilterFullwidth &&
          filterFullwidthTitle.classList.contains("active") &&
          productFilterFullwidth.classList.contains("open")
        ) {
          filterFullwidthTitle.classList.remove("active");
          productFilterFullwidth.classList.remove("open");
        }
      }
    };
    const overlayFilter = document.getElementById("overlay");
    if (overlayFilter) {
      overlayFilter.addEventListener("click", removeOverlay);
    }

    return () => {
      if (overlayFilter) {
        overlayFilter.removeEventListener("click", removeOverlay);
      }
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
    <>
      <div id="overlay"></div>
      <section className="products-section products-fullwidth">
        <div className="content px-4">
          <div className="product-filter mb-3 d-flex align-items-center justify-content-between ">
            <div
              className="filter-fullwidth-title fs-6 me-4 fw-bold rounded-5 text-uppercase"
              ref={filterTitle}
            >
              Filter
            </div>
            <div className="filter-title-mobile fs-6 me-4 fw-bold rounded-5 text-uppercase">
              Filter
            </div>
            <Control BiChevronDown={props.BiChevronDown} />
          </div>
          <div
            className="sidebar-top"
            ref={topSidebar}
            style={{ height: "0px" }}
          >
            <div className="filter-header fs-4 fw-bold mb-3 d-none position-absolute top-0 start-0 end-0 py-1 px-2">
              Filters
            </div>
            <div className="content-sidebar d-flex gap-3 px-3">{filters}</div>
          </div>
          <div className="sidebar-top filter-small-media">
            <div className="filter-header fs-4 fw-bold mb-3 d-none position-absolute top-0 start-0 end-0 py-1 px-2">
              Filter
            </div>
            <div className="content-sidebar-wrapper">
              <div className="content-sidebar d-flex gap-3 px-3">{filters}</div>
            </div>
          </div>
          <Products
            genreFilter={props.genreFilter}
            priceRangeFilter={props.priceRangeFilter}
            platformFilter={props.platformFilter}
            featureFilter={props.featureFilter}
            addtocart={props.addtocart}
            addtowishlist={props.addtowishlist}
            removefromwishlist={props.removefromwishlist}
            handleSelectProduct={props.handleSelectProduct}
            products={props.products}
            RiDeleteBin6Line={props.RiDeleteBin6Line}
            AiOutlineStar={props.AiOutlineStar}
            AiFillStar={props.AiFillStar}
            AiOutlineHeart={props.AiOutlineHeart}
            FiShoppingCart={props.FiShoppingCart}
          />
        </div>
      </section>
    </>
  );
}

export default ProductsFullWidth;
