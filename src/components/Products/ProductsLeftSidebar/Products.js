import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Products(props) {
  const filteredProducts = props.products.filter((product) => {
    if (props.genreFilter && !product.genre.includes(props.genreFilter)) {
      return false;
    }

    if (
      props.platformFilter &&
      !product.platform.includes(props.platformFilter)
    ) {
      return false;
    }

    if (props.featureFilter && !product.feature.includes(props.featureFilter)) {
      return false;
    }

    // Apply price range filter

    if (
      (typeof props.priceRangeFilter.min === "number" &&
        product.price < props.priceRangeFilter.min) ||
      (typeof props.priceRangeFilter.max === "number" &&
        product.price > props.priceRangeFilter.max)
    ) {
      return false;
    }

    return true;
  });

  const wishlistItems = useSelector((state) => state.wishlist);

  return (
    <div className="collection-section">
      <div className="products">
        {filteredProducts.map((item) => {
          return (
            <div
              className="product-item position-relative rounded-3 h-auto text-start"
              key={item.id}
              onClick={props.handleSelectProduct}
            >
              <div className="item-inner rounded-3">
                <Link to={`/products/${item.id}`} className="product-image">
                  <img
                    className="w-100 h-100"
                    src={item.image}
                    alt="Photo item"
                  />
                </Link>
                <div className="product-info px-2 py-3">
                  <div className="title-product fs-6 fw-bold">{item.title}</div>
                  <p className="description-product fw-normal fs-6">
                    {item.description}
                  </p>
                  <div className="description d-flex align-items-center justify-content-between">
                    <div className="rigth-side">
                      <div className="reviews d-flex align-items-center">
                        <span className="starts d-flex align-items-center me-1">
                          {props.AiFillStar}
                          {props.AiFillStar}
                          {props.AiFillStar}
                          {props.AiOutlineStar}
                          {props.AiOutlineStar}
                        </span>
                        <span className="text-reviews">No reviews</span>
                      </div>
                      <div className="price-product fw-bold">
                        $
                        {`${item.price}`.match(/[.]/gi)
                          ? item.price + "0"
                          : item.price + ".00"}
                      </div>
                    </div>
                    <div className="left-side">
                      <div
                        className="add-to-cart d-flex align-items-center justify-content-center rounded-5"
                        onClick={() => props.addtocart(item)}
                      >
                        {props.FiShoppingCart}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-hover position-absolute d-flex flex-column align-items-center justify-content-between gap-2">
                {wishlistItems.find((el) => el.id === item.id) !== undefined ? (
                  <button
                    className="rounded-5 position-relative d-flex align-items-center justify-content-center"
                    type="button"
                    aria-label="Add to wishlist"
                    onClick={() => props.removefromwishlist(item)}
                  >
                    {props.RiDeleteBin6Line}
                  </button>
                ) : (
                  <button
                    className="rounded-5 position-relative d-flex align-items-center justify-content-center"
                    type="button"
                    aria-label="Add to wishlist"
                    onClick={() => props.addtowishlist(item)}
                  >
                    {props.AiOutlineHeart}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
