import React, { useEffect, useRef } from "react";
import "../Products.css";
import Sidebar from "../ProductsLeftSidebar/Sidebar";
import Products from "./Products";
import Control from "./Control";
import { useLocation } from "react-router";

function ProductsLeftSidebar(props) {
  const location = useLocation();

  const closeIcon = useRef(null);

  const closeFilter = (e) => {
    if (e.target.closest(".close_filter") === closeIcon.current) {
      console.log("yes");
      const filterTitle = document.querySelector(".filter-title");
      const productFilter = document.querySelector(".product-filter");
      const overlay = document.getElementById("overlay");
      if (
        filterTitle &&
        productFilter &&
        filterTitle.classList.contains("active") &&
        productFilter.classList.contains("open") &&
        overlay.classList.contains("open")
      ) {
        filterTitle.classList.remove("active");
        productFilter.classList.remove("open");
        overlay.classList.remove("open");
      }
    }
  };

  useEffect(() => {
    const removeOverlay = (e) => {
      if (e.target.classList.contains("open")) {
        e.target.classList.remove("open");
        const filterTitle = document.querySelector(".filter-title");
        const productFilter = document.querySelector(".product-filter");
        if (filterTitle && productFilter.classList.contains("open")) {
          filterTitle.classList.remove("active");
          productFilter.classList.remove("open");
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

  return (
    <>
      <div id="overlay"></div>
      <section className="products-section">
        <div className="container-xl">
          <div className="content">
            <div className="row">
              {location.pathname === "/ShopSidebarLeft" ? (
                <>
                  <div className="product-filter col-lg-3 col-md-12">
                    <div className="headerFilter d-flex align-items-center justify-content-between position-absolute top-0 start-0 w-100">
                      <div className="filter-header fs-4 fw-bold flex-fill py-1 px-2">
                        Filters
                      </div>
                      <span
                        className="close_filter position-relative d-flex align-items-center justify-content-center pe-1"
                        ref={closeIcon}
                        onClick={closeFilter}
                      ></span>
                    </div>
                    <Sidebar
                      setGenreFilter={props.setGenreFilter}
                      setPriceRangeFilter={props.setPriceRangeFilter}
                      setPlatformFilter={props.setPlatformFilter}
                      setFeatureFilter={props.setFeatureFilter}
                    />
                  </div>
                  <div className="product-filter-right-column mt-sm-5 mt-md-0 col-lg-9 col-md-12">
                    <Control BiChevronDown={props.BiChevronDown} />
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
                </>
              ) : (
                <>
                  <div className="product-filter-right-column mt-sm-5 mt-md-0  col-lg-9 col-md-12">
                    <Control BiChevronDown={props.BiChevronDown} />
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
                  <div className="product-filter col-lg-3 col-md-12">
                    <div className="headerFilter d-flex align-items-center justify-content-between position-absolute top-0 start-0 w-100">
                      <div className="filter-header fs-4 fw-bold flex-fill py-1 px-2">
                        Filters
                      </div>
                      <span
                        className="close_filter position-relative d-flex align-items-center justify-content-center pe-1"
                        ref={closeIcon}
                        onClick={closeFilter}
                      ></span>
                    </div>
                    <Sidebar
                      setGenreFilter={props.setGenreFilter}
                      setPriceRangeFilter={props.setPriceRangeFilter}
                      setPlatformFilter={props.setPlatformFilter}
                      setFeatureFilter={props.setFeatureFilter}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductsLeftSidebar;
