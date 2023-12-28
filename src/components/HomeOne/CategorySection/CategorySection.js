import React from "react";
import "./CategorySection.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { AiOutlineStar, AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import products from "../../../data/data";

function CategorySection(props) {
  const wishlistItems = useSelector((state) => state.wishlist);

  return (
    <section className="best-selling-section position-relative">
      <div className="container-xl text-center position-relative">
        <div className="title-content position-relative text-center mb-5 py-1">
          <strong className="position-relative fs-1 fw-bold">
            Best Selling
          </strong>
        </div>
        <div className="block-content row">
          {products.map((item) => {
            return (
              <div key={item.id} className="mb-4 col-lg-4 col-md-6 col-12 ">
                <div className="product-item position-relative rounded-3 text-start ">
                  <div className="item-inner rounded-3">
                    <Link
                      to={`/products/${item.id}`}
                      className="product-image d-block"
                    >
                      <img
                        src={item.image}
                        alt="Photo item"
                        loading="lazy"
                        className="w-100 h-100"
                      />
                    </Link>
                    <div className="product-info py-3 px-2">
                      <div className="title-product fs-6 fw-bold">
                        {item.title}
                      </div>
                      <p className="description-product fw-normal">
                        {item.description}
                      </p>
                      <div className="description d-flex align-items-center justify-content-between">
                        <div className="rigth-side">
                          <div className="reviews d-flex align-items-center">
                            <span className="starts d-flex align-items-center me-1">
                              <AiFillStar />
                              <AiFillStar />
                              <AiFillStar />
                              <AiOutlineStar />
                              <AiOutlineStar />
                            </span>
                            <span className="text-reviews">No reviews</span>
                          </div>
                          <div className="price-product fs-6 fw-bold">
                            ${item.price.toFixed(2)}
                          </div>
                        </div>
                        <div className="left-side">
                          <div
                            className="add-to-cart d-flex align-items-center justify-content-center rounded-5"
                            onClick={() => props.addtocart(item)}
                          >
                            <FiShoppingCart />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product-hover d-flex align-items-center justify-content-between flex-column gap-2 position-absolute">
                    {wishlistItems.find((el) => el.id === item.id) !==
                    undefined ? (
                      <button
                        type="button"
                        aria-label="Add to wishlist"
                        className="d-flex align-items-center justify-content-center opacity-0 position-relative rounded-5"
                        onClick={() => props.removefromwishlist(item)}
                      >
                        <RiDeleteBin6Line />
                      </button>
                    ) : (
                      <button
                        type="button"
                        aria-label="Add to wishlist"
                        className="d-flex align-items-center justify-content-center opacity-0 position-relative rounded-5"
                        onClick={() => props.addtowishlist(item)}
                      >
                        <AiOutlineHeart />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <Link
            to="/ShopSidebarLeft"
            className="link-effect px-4 py-2 rounded-5 d-block fw-bold text-center mt-5 "
          >
            <span className="inner-effect position-relative d-inline-block">
              <span className="line position-absolute top-50"></span>
              <span className="effect-l position-absolute">
                <span className="d-inline-block">View More</span>
              </span>
              <span className="effect-r position-absolute top-50">
                <span className="d-inline-block">View More</span>
              </span>
              <span className="effect-shade opacity-0">
                <span>View More</span>
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
