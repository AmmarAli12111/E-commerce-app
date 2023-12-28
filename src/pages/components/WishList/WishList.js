import React from "react";
import "./WishList.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function WishList(props) {
  const wishlistItems = useSelector((state) => state.wishlist);
  return (
    <section className="wishlist-section">
      <div className="container-xl">
        <div className="wrap_title mb-5">
          <h4 className="fs-6">Wishlist Products</h4>
          <h3 className="fw-bold fs-6 m-0">Your favourite product</h3>
          <div className="content fs-6 mt-3 ">
            Commodo sociosqu venenatis cras dolor sagittis integer luctus
            maecenas.
          </div>
        </div>
        <div className="content_section">
          {wishlistItems.length > 0 ? (
            <WishListCollection
              removefromwishlist={props.removefromwishlist}
              addtocart={props.addtocart}
              RiDeleteBin6Line={props.RiDeleteBin6Line}
              AiOutlineStar={props.AiOutlineStar}
              AiFillStar={props.AiFillStar}
              AiOutlineHeart={props.AiOutlineHeart}
              FiShoppingCart={props.FiShoppingCart}
            />
          ) : (
            <WishlistEmpty BsFillHeartbreakFill={props.BsFillHeartbreakFill} />
          )}
        </div>
      </div>
    </section>
  );
}

function WishlistEmpty(props) {
  return (
    <div className="collection-wishlist-empty d-flex align-items-center justify-content-center flex-column">
      <div className="icon">{props.BsFillHeartbreakFill}</div>
      <p className="m-0 fs-6 mt-3">Wishlist is empty.</p>
    </div>
  );
}

function WishListCollection(props) {
  const wishlistItems = useSelector((state) => state.wishlist);
  return (
    <div className="js-collection-wishlist row">
      {wishlistItems.map((item) => {
        return (
          <div className="px-2 mb-3" key={item.id}>
            <div className="wishlist-item featured-item ">
              <Link to={`/products/${item.id}`} className="product-image">
                <img
                  src={item.image}
                  alt="Photo item"
                  draggable="false"
                  loading="lazy"
                />
              </Link>
              <div className="product-info">
                <div className="title-product">{item.title}</div>
                <p className="description-product">{item.description}</p>
                <div className="description">
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
                    <div className="price-product">
                      $
                      {`${item.price}`.match(/[.]/gi)
                        ? item.price + "0"
                        : item.price + ".00"}
                    </div>
                  </div>
                  <div className="left-side">
                    <div
                      className="add-to-cart"
                      onClick={() => props.addtocart(item)}
                    >
                      {props.FiShoppingCart}
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-hover">
                <div
                  className="delete-item"
                  onClick={() => props.removefromwishlist(item)}
                >
                  {props.RiDeleteBin6Line}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default WishList;
