import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import "../_Product.scss";
import { Link } from "react-router-dom";

function ProductDetails(props) {
  const { id } = useParams();
  const product = props.products[+id - 1];
  const cartItems = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  const [isProductInWishlist, setIsProductInWishlist] = useState(false);

  useEffect(() => {
    if (product) {
      const findProduct = wishlist.findIndex((p) => p.id === product.id);
      setIsProductInWishlist(findProduct !== -1);

      const item = cartItems.find((p) => p.id === product.id);
      const inputField = document.getElementById(`PrQuantity-${product.id}`);
      if (item && inputField) {
        inputField.value = item.quantity;
      } else if (inputField) {
        inputField.value = 0;
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
                    <span className="position-absolute d-inline-flex flex-wrap rounded-4 fw-bold">
                      New
                    </span>
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
                      <div className="product-quantity d-flex align-items-center rounded-5 mb-2 me-2">
                        <button
                          className="d-flex align-items-center justify-content-center border-0 h-100 fw-bold fs-5"
                          onClick={(event) => {
                            event.preventDefault();
                            props.decreaseqy(product);
                          }}
                        >
                          -
                        </button>
                        <label htmlFor={`PrQuantity-${product.id}`}></label>
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
                          className="border-0 rounded-5 mb-2 ms-2"
                          onClick={(event) => {
                            props.handleBuyingProduct(product);
                          }}
                        >
                          Buy It Now
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
  const handleClicked = (event) => {
    event.preventDefault();
    const content = document.getElementById(event.target.hash.substring(1));
    if (!content.classList.contains("active")) {
      document.querySelectorAll(".tab-pane").forEach((item) => {
        item.classList.remove("active");
      });
      content.classList.add("active");
    }
  };
  return (
    <div className="description-review-wrapper">
      <ul className="description-review-topbar position-relative d-flex align-items-center p-0 mb-4 list-unstyled">
        <li className="me-4">
          <a
            href="#tap-description"
            onClick={handleClicked}
            className="d-inline-block fw-bold p-3 fs-6 lh-1 text-center rounded-5"
          >
            Description
          </a>
        </li>
        <li>
          <a
            href="#tap-reviews"
            onClick={handleClicked}
            className="d-inline-block fw-bold p-3 fs-6 lh-1 text-center rounded-5"
          >
            Reviews
          </a>
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
                    <button
                      className="fw-bold position-relative fs-6 rounded-5 border-0"
                      type="submit"
                      value={"Submit"}
                    >
                      <span>Submit</span>
                    </button>
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

export default ProductDetails;
