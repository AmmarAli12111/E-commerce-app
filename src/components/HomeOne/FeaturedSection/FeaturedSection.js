import React, { useEffect, useRef, useState } from "react";
import "./FeaturedSection.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineStar, AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import products from "../../../data/data";

function FeaturedSection(props) {
  const [startScrollLeft, setstartScrollLeft] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const elementRef = useRef(null);
  const [translatex, setTranslateX] = useState(0);
  const [maxTranslateX, setMaxTranslateX] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const wishlistItems = useSelector((state) => state.wishlist);

  useEffect(() => {
    const handleWheel = (e) => {
      if (e.deltaX !== 0) {
        e.preventDefault();
      }
    };

    elementRef.current.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const productItem = document.querySelector(".featured-item");
    if (productItem) {
      const maxScrollLeft =
        elementRef.current.scrollWidth - elementRef.current.clientWidth;
      if (
        translatex === maxTranslateX &&
        translatex !== 0 &&
        maxTranslateX !== 0
      ) {
        elementRef.current.scrollLeft = maxScrollLeft;
        setTranslateX(maxScrollLeft);
        setMaxTranslateX(maxScrollLeft);
      }
    }
  }, [windowWidth]);

  const handleClickedRight = (e) => {
    const productItem = elementRef.current.querySelector(".featured-item");
    const productItemWidth = productItem.getBoundingClientRect().width;
    const maxScrollLeft =
      elementRef.current.scrollWidth - elementRef.current.clientWidth;
    if (translatex < maxScrollLeft) {
      let translateX = translatex + productItemWidth;
      if (translateX < maxScrollLeft) {
        elementRef.current.scrollLeft = translateX;
        setTranslateX(translateX);
      } else {
        elementRef.current.scrollLeft = maxScrollLeft;
        setTranslateX(maxScrollLeft);
        setMaxTranslateX(maxScrollLeft);
      }
    } else {
      elementRef.current.scrollLeft = maxScrollLeft;
      setTranslateX(maxScrollLeft);
      setMaxTranslateX(maxScrollLeft);
    }
  };

  const handleClickedLeft = (e) => {
    const productItem = elementRef.current.querySelector(".featured-item");
    const productItemWidth = productItem.getBoundingClientRect().width;

    const maxScrollLeft =
      elementRef.current.scrollWidth - elementRef.current.clientWidth;
    setMaxTranslateX(maxScrollLeft);
    if (translatex > 0) {
      let translateX = translatex - productItemWidth;
      if (translateX < 0) {
        translateX = 0;
      }
      elementRef.current.scrollLeft = translateX;
      setTranslateX(translateX);
    } else {
      elementRef.current.scrollLeft = 0;
      setTranslateX(0);
    }
  };

  const onMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX);
    setstartScrollLeft(elementRef.current.scrollLeft);
    elementRef.current.classList.add("dragging");
    elementRef.current.style.cursor = "grab";
  };

  const onMouseLeave = () => {
    setIsDown(false);
    // elementRef.current.style.cursor = "default";
  };

  const onMouseUp = () => {
    setIsDown(false);
    elementRef.current.classList.remove("dragging");
    elementRef.current.style.cursor = "default";
  };

  const onMouseMove = (e) => {
    if (!isDown) {
      return;
    }
    let scrollLeft = startScrollLeft - (e.pageX - startX);
    elementRef.current.scrollLeft = scrollLeft;
    setTranslateX(scrollLeft);
    elementRef.current.style.cursor = "grabbing";
  };

  return (
    <section className="featured-section position-relative">
      <div className="container-xl text-center position-relative w-100">
        <div className="title-content d-flex align-items-center justify-content-between flex-wrap w-100  position-relative mb-5 py-1">
          <strong className="fs-1 fw-bold">Featured Items</strong>
          <Link
            to="/ShopSidebarLeft"
            className="link-effect px-4 py-2 rounded-5 d-block fw-bold text-center"
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
        <div className="wrapper position-relative">
          <div
            className="block-content position-relative"
            ref={elementRef}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            onMouseMove={onMouseMove}
          >
            {products.map((item) => {
              return (
                <div
                  className="product-item featured-item position-relative d-flex align-items-center justify-content-between flex-column rounded-3"
                  key={item.id}
                >
                  <div className="product-image position-relative w-100">
                    <Link
                      to={`/products/${item.id}`}
                      className="media-product w-100 d-inline-block"
                    >
                      <img
                        className="w-100 h-100"
                        src={item.image}
                        alt="Photo item"
                        draggable="false"
                        loading="lazy"
                      />
                    </Link>
                  </div>
                  <div className="product-info w-100 py-3 px-2">
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
                        <div className="price-product fw-bold fs-6">
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
              );
            })}
          </div>
          <div
            className="arrow-back position-absolute top-50 rounded-5 d-flex align-items-center justify-content-center opacity-0"
            id="left"
            onClick={handleClickedLeft}
          ></div>
          <div
            className="arrow-forward position-absolute top-50 rounded-5 d-flex align-items-center justify-content-center opacity-0"
            id="right"
            onClick={handleClickedRight}
          ></div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedSection;
