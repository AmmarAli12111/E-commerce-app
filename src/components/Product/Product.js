import React, { useEffect, useRef, useState } from "react";
import "./Product.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

function Product(props) {
  const cartItems = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  const product = props.products[0];
  const [isProductInWishlist, setIsProductInWishlist] = useState(false);

  const [location, setLocation] = useState(null);

  const locationPathname = useLocation().pathname;

  useEffect(() => {
    if (locationPathname === "/SimpleProduct") {
      setLocation("simple");
    } else if (locationPathname === "/NewProduct") {
      setLocation("new");
    } else if (locationPathname === "/SaleProduct") {
      setLocation("sale");
    }
  }, [locationPathname]);

  useEffect(() => {
    if (product) {
      const findProduct = wishlist.findIndex((p) => p.id === product.id);
      if (findProduct !== -1) {
        setIsProductInWishlist(true);
      } else {
        setIsProductInWishlist(false);
      }

      const item = cartItems.find((p) => p.id === product.id);
      if (item) {
        const inputField = document.getElementById(`PrQuantity-${product.id}`);
        if (inputField) {
          inputField.value = item.quantity;
        }
      } else {
        const inputField = document.getElementById(`PrQuantity-${product.id}`);
        if (inputField) {
          inputField.value = 0;
        }
      }
    }
  }, [cartItems, product, wishlist]);

  return (
    <section className="product-section">
      <div className="container-xl">
        <div className="content_wrap">
          <div className="content">
            {product ? (
              <div className="row">
                <div className="col-md-5">
                  <div className="product-image">
                    {location === "new" ? (
                      <span className="position-absolute d-inline-flex flex-wrap rounded-4 fw-bold">
                        New
                      </span>
                    ) : location === "sale" ? (
                      <span className="position-absolute d-inline-flex flex-wrap rounded-4 fw-bold">
                        10% sale
                      </span>
                    ) : (
                      ""
                    )}
                    <img
                      className="w-100 h-100 rounded-3"
                      src={product.image}
                      alt="product image"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="product-info">
                    <h2 className="product-title fs-2 my-2">{product.title}</h2>
                    <div className="product-reviews d-flex align-items-center mb-3">
                      <span className="d-flex align-items-center me-2">
                        {props.AiFillStar}
                        {props.AiFillStar}
                        {props.AiFillStar}
                        {props.AiOutlineStar}
                        {props.AiOutlineStar}
                      </span>
                      <span className="caption-reviews">No reviews</span>
                    </div>
                    <div className="product-price rounded-5 mb-3 py-3 px-4">
                      <p className="price-box m-0 fs-5 fw-bold">
                        <span className="special-price">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="old-price fs-6 fw-normal position-relative ms-2 text-decoration-line-through">
                          $15.00
                        </span>
                      </p>
                    </div>
                    <div className="product-description mb-3 lh-base">
                      <p>{product.description}</p>
                    </div>
                    <form className="d-flex flex-wrap align-items-center">
                      <div className="product-quantity d-flex align-items-center rounded-5 mb-2 me-2 ">
                        <button
                          className="d-flex align-items-center justify-content-center border-0 h-100 fw-bold fs-5"
                          onClick={(event) => {
                            event.preventDefault();
                            props.decreaseqy(product);
                          }}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="w-100 h-100 py-2 border-0 text-center"
                          defaultValue="0"
                          id={`PrQuantity-${product.id}`}
                          onBlur={(event) => {
                            props.quantitychange(
                              product,
                              product.id,
                              event.target.value
                            );
                          }}
                        />
                        <button
                          className="d-flex align-items-center justify-content-center border-0 h-100 fw-bold fs-5"
                          onClick={(event) => {
                            event.preventDefault();
                            props.addtocart(product);
                          }}
                        >
                          +
                        </button>
                      </div>
                      <div className="product-options d-flex align-items-center flex-wrap">
                        <Link
                          to="#"
                          className="link-effect d-block fw-bold rounded-5 mb-2"
                          onClick={(event) => {
                            event.preventDefault();
                            props.addtocart(product);
                          }}
                        >
                          <span className="inner-effect position-relative d-inline-block">
                            <span className="line position-absolute top-50"></span>
                            <span className="effect-l position-absolute">
                              <span className="d-inline-block">
                                Add To Cart
                              </span>
                            </span>
                            <span className="effect-r position-absolute top-50">
                              <span className="d-inline-block">
                                Add To Cart
                              </span>
                            </span>
                            <span className="effect-shade opacity-0">
                              <span>Add To Cart</span>
                            </span>
                          </span>
                        </Link>
                        <Link
                          to="/CheckOut"
                          className="link-effect d-block fw-bold rounded-5 mb-2 ms-2"
                          onClick={(event) => {
                            props.handleBuyingProduct(product);
                          }}
                        >
                          <span className="inner-effect position-relative d-inline-block">
                            <span className="line position-absolute top-50"></span>
                            <span className="effect-l position-absolute">
                              <span className="d-inline-block">Buy It Now</span>
                            </span>
                            <span className="effect-r position-absolute top-50">
                              <span className="d-inline-block">Buy It Now</span>
                            </span>
                            <span className="effect-shade opacity-0">
                              <span>Buy It Now</span>
                            </span>
                          </span>
                        </Link>
                      </div>
                    </form>
                    {isProductInWishlist ? (
                      <div
                        className="wishlist d-flex align-items-center mt-3"
                        onClick={() => props.removefromwishlist(product)}
                      >
                        <span className="d-flex align-items-center me-2">
                          {props.RiDeleteBin6Line}
                        </span>
                        <span>Delete From WishList</span>
                      </div>
                    ) : (
                      <div
                        className="wishlist d-flex align-items-center mt-3"
                        onClick={() => props.addtowishlist(product)}
                      >
                        <span className="d-flex align-items-center me-2">
                          {props.AiOutlineHeart}
                        </span>
                        <span>Add To WishList</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            <DescriptionReview />
          </div>
        </div>
      </div>
    </section>
  );
}

function DescriptionReview() {
  const review = useRef(null);
  const description = useRef(null);

  const toggleActive = (target) => {
    const ele = target.hash.split("#");
    const content = document.getElementById(ele[ele.length - 1]);
    if (!content.classList.contains("active")) {
      document.querySelectorAll(".tab-pane").forEach((item) => {
        item.classList.remove("active");
      });
      content.classList.add("active");
    }
  };

  const handleClickedRev = (event) => {
    event.preventDefault();
    let target = event.target;
    while (target !== null && target !== review.current) {
      target = target.parentNode;
    }
    toggleActive(target);
  };
  const handleClickedDes = (event) => {
    let target = event.target;
    while (target !== null && target !== description.current) {
      target = target.parentNode;
    }
    toggleActive(target);
  };
  return (
    <div className="description-review-wrapper">
      <ul className="description-review-topbar position-relative d-flex align-items-center flex-wrap p-0 mb-4 list-unstyled">
        <li className="me-4">
          <Link
            to="#tap-description"
            className="link-effect fw-bold rounded-5 d-inline-block fw-bold p-3 fs-6 lh-1 text-center mt-2 "
            onClick={handleClickedDes}
            ref={description}
          >
            <span className="inner-effect position-relative d-inline-block">
              <span className="line position-absolute top-50"></span>
              <span className="effect-l position-absolute">
                <span className="d-inline-block">Description</span>
              </span>
              <span className="effect-r position-absolute top-50">
                <span className="d-inline-block">Description</span>
              </span>
              <span className="effect-shade opacity-0">
                <span>Description</span>
              </span>
            </span>
          </Link>
        </li>
        <li>
          <Link
            to="#tap-reviews"
            className="link-effect fw-bold rounded-5 d-inline-block fw-bold p-3 fs-6 lh-1 text-center mt-2 active"
            onClick={handleClickedRev}
            ref={review}
          >
            <span className="inner-effect position-relative d-inline-block">
              <span className="line position-absolute top-50"></span>
              <span className="effect-l position-absolute">
                <span className="d-inline-block">Reviews</span>
              </span>
              <span className="effect-r position-absolute top-50">
                <span className="d-inline-block">Reviews</span>
              </span>
              <span className="effect-shade opacity-0">
                <span>Reviews</span>
              </span>
            </span>
          </Link>
        </li>
      </ul>
      <div className="description-review-content">
        <div className="tab-pane active d-none" id="tap-description">
          <div className="description fs-6 lh-lg">
            <p>
              Dicta sunt explicabo. Nemo enim ipsam voluptatem voluptas sit odit
              aut fugit, sed quia consequuntur. Lorem ipsum dolor. Aquia sit
              amet, elitr, sed diam nonum eirmod tempor invidunt labore et
              dolore magna aliquyam.erat, sed diam voluptua. At vero accusam et
              justo duo dolores et ea rebum. Stet clitain vidunt ut labore
              eirmod tempor invidunt magna aliquyam.
            </p>
          </div>
        </div>
        <div className="tab-pane d-none" id="tap-reviews">
          <div className="review d-flex gap-5">
            <div className="reviews flex-fill">
              <h2 className="review-title mb-2 fs-3 fw-bold">Reviews</h2>
              <p className="about-reviews">There are no reviews yet.</p>
            </div>
            <div className="review_form_wrapper">
              <div className="review_form">
                <h3 className="reply-title mb-3">Add a review</h3>
                <form>
                  <p className="comment-notes mb-4">
                    Your email address will not be published. Required fields
                    are marked *
                  </p>
                  <p className="comment-form-author mb-4">
                    <label className="d-block  lh-base fw-bold mb-2 text-uppercase">
                      Name *
                    </label>
                    <input
                      type="text"
                      className="d-inline-block w-100 rounded-5 border-0 fw-bold lh-base mb-3 py-3 px-4"
                    />
                  </p>
                  <p className="comment-form-email mb-4">
                    <label className="d-block  lh-base fw-bold mb-2 text-uppercase">
                      Email *
                    </label>
                    <input
                      type="email"
                      className="d-inline-block w-100 rounded-5 border-0 fw-bold lh-base mb-3 py-3 px-4"
                    />
                  </p>
                  <p className="comment-form-comment mb-4">
                    <label className="d-block  lh-base fw-bold mb-2 text-uppercase">
                      YOUR REVIEW *
                    </label>
                    <textarea
                      rows={"5"}
                      required={"requird"}
                      className="d-inline-block w-100 rounded-5 border-0 fw-bold lh-base mb-3 py-3 px-4"
                    />
                  </p>
                  <p className="comment-form-cookies d-flex align-items-center mb-4">
                    <input
                      type="checkbox"
                      className="position-relative me-2 rounded"
                    />
                    <label className="fs-6 lh-base fw-normal">
                      Save my name, email, and website in this browser for the
                      next time I comment.
                    </label>
                  </p>
                  <p className="form-submit">
                    <Link
                      to="#"
                      className="link-effect fw-bold rounded-5 d-inline-block fw-bold fs-6 lh-1 text-center mt-2 fw-bold position-relative fs-6 border-0"
                      onClick={(e) => e.preventDefault()}
                    >
                      <span className="inner-effect position-relative d-inline-block">
                        <span className="line position-absolute top-50"></span>
                        <span className="effect-l position-absolute">
                          <span className="d-inline-block">Submit</span>
                        </span>
                        <span className="effect-r position-absolute top-50">
                          <span className="d-inline-block">Submit</span>
                        </span>
                        <span className="effect-shade opacity-0">
                          <span>Submit</span>
                        </span>
                      </span>
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
