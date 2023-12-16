import React, { useEffect } from "react";
import "./Cart.css";
import { useSelector } from "react-redux";
import EmptyCart from "./EmptyCart/EmptyCart";
import { Link } from "react-router-dom";

function Cart(props) {
  const cartItems = useSelector((state) => state.cart);
  useEffect(() => {
    cartItems.forEach((item) => {
      const inputField = document.getElementById(`Quantity-${item.id}`);
      inputField.value = item.quantity;
    });
  });

  return (
    <section className="cart-section">
      <div className="container-xl">
        {cartItems.length > 0 ? (
          <div className="row">
            <CartItems
              cartItems={cartItems}
              addtocart={props.addtocart}
              decreaseqy={props.decreaseqy}
              removeFromCart={props.removeFromCart}
              quantitychange={props.quantitychange}
            />
            <FootCart cartItems={cartItems} />
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>
    </section>
  );
}

function CartItems(props) {
  return (
    <div className="main-cart-items col-lg-8 col-12">
      <div className="head-area">
        <h2 className="mb-4 text-capitalize fw-bold fst-italic">
          Shopping Cart
        </h2>
      </div>
      <div className="shopping-cart d-flex flex-column gap-3 py-5 mb-6">
        {props.cartItems.map((item) => {
          return (
            <div className="cart-item m-0 p-3 p-sm-6 rounded-4" key={item.id}>
              <div className="about-item d-flex gap-2 justify-content-between">
                <div className="content-item d-flex gap-3 gap-sm-4">
                  <Link
                    to={`/products/${item.id}`}
                    className="image-box d-inline-flex d-flex align-items-center justify-content-center"
                  >
                    <img
                      src={item.image}
                      alt="Image product"
                      className="h-100 rounded-3"
                      loading="lazy"
                    />
                  </Link>
                  <div className="info-item d-flex w-100 flex-column justify-content-between gap-3">
                    <div className="product-name">
                      <Link
                        to={`/products/${item.id}`}
                        className="d-block fs-6 fw-bold mb-2"
                      >
                        {item.title}
                      </Link>
                      <div className="price-item d-flex align-item-centre gap-1">
                        <div className="curr-price fw-bold">
                          ${item.price.toFixed(2)}
                        </div>
                        <div className="old-price text-decoration-line-through fs-6">
                          $15
                        </div>
                      </div>
                      <div className="product-option d-flex align-items-center gap-1 mt-2">
                        <span>Color:</span>
                        <span>White</span>
                      </div>
                    </div>
                    <div className="quantity">
                      <div className="quantity-form d-inline-flex align-items-center rounded-5">
                        <button
                          className="minus d-flex align-items-center justify-content-center border-0 h-100 fw-bold fs-5 px-2"
                          onClick={() => props.decreaseqy(item)}
                        >
                          -
                        </button>
                        <lable
                          htmlFor={`Quantity-${item.id}`}
                          className="d-none"
                        ></lable>
                        <input
                          type="text"
                          defaultValue="1"
                          className="border-0 py-2 px-1 fs-6 text-center"
                          id={`Quantity-${item.id}`}
                          onBlur={(event) => {
                            props.quantitychange(
                              item,
                              item.id,
                              event.target.value
                            );
                          }}
                        />
                        <button
                          className="plus d-flex align-items-center justify-content-center border-0 h-100 fw-bold fs-5 px-2"
                          onClick={() => props.addtocart(item)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right-area d-flex flex-column justify-content-between align-items-end">
                  <div
                    className="delete-item position-relative d-flex align-items-center justify-content-center"
                    onClick={() => props.removeFromCart(item)}
                  ></div>
                  <div className="total fw-bold">
                    $
                    {(item.price * item.quantity)
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <FootCartItem />
    </div>
  );
}

function FootCartItem() {
  return (
    <div className="foot-area d-flex align-items-center justify-content-between">
      <div className="left">
        <Link
          to="/ShopSidebarLeft"
          className="link-effect px-4 rounded-5  d-block fw-bold w-100"
        >
          <span className="inner-effect position-relative d-inline-block">
            <span className="line position-absolute top-50"></span>
            <span className="effect-l position-absolute">
              <span className="d-inline-block">Continue shopping</span>
            </span>
            <span className="effect-r position-absolute top-50">
              <span className="d-inline-block">Continue shopping</span>
            </span>
            <span className="effect-shade opacity-0">
              <span>Continue shopping</span>
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
}

function FootCart(props) {
  return (
    <div className="main-cart-footer col-lg-4 col-12">
      <div className="cart-footer">
        <div className="cart-note field mb-4 mt-3">
          <label className="mb-2 d-block fs-6 text-uppercase fw-bold lh-1">
            Add Order Note
          </label>
          <textarea
            rows={"5"}
            className="text-area field__input w-100 rounded-3 d-block mb-2 border-0 p-3 fs-6"
            placeholder="How can we help you?"
          ></textarea>
        </div>
        <div className="cart-total rounded-4 py-4 px-3">
          <h5 className="title h3 mb-3 d-flex align-items-center justify-content-between fw-bold lh-sm text-capitalize">
            Cart totals
          </h5>
          <div className="info-checkout fs-6 py-3 d-flex align-items-center justify-content-between">
            <span className="text">Subtotal </span>
            <span className="item subtotal">
              <span className="money" data-currency-usd="$576.00">
                $
                {props.cartItems
                  .map((item) => item.price * item.quantity)
                  .reduce((total, price) => total + price, 0)
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            </span>
          </div>
          <div className="coupon-form py-3">
            <form>
              <label className="fs-6 d-block">Have a promo code?</label>
              <div className="d-flex align-items-center justify-content-between">
                <input
                  type="text"
                  placeholder="Promo Code"
                  className="rounded-5 border-0 mt-1 me-1"
                />
                <Link
                  to="#"
                  onClick={(e) => e.preventDefault()}
                  className="link-effect px-4 rounded-5 border-0 d-block fw-bold"
                >
                  <span className="inner-effect position-relative d-inline-block">
                    <span className="line position-absolute top-50"></span>
                    <span className="effect-l position-absolute">
                      <span className="d-inline-block">Add</span>
                    </span>
                    <span className="effect-r position-absolute top-50">
                      <span className="d-inline-block">Add</span>
                    </span>
                    <span className="effect-shade opacity-0">
                      <span>Add</span>
                    </span>
                  </span>
                </Link>
              </div>
            </form>
          </div>
          <div
            className="cart__shipping_note fw-normal d-flex pt-3 note"
            data-shipping-note=""
          >
            Taxes and shipping calculated at checkout
          </div>
          <div className="group-button">
            <Link
              to="#"
              onClick={(e) => e.preventDefault()}
              className="link-effect px-4 rounded-5 border-0 d-block fw-bold btn_checkout w-100 text-center text-uppercase mt-3  "
            >
              <span className="inner-effect position-relative d-inline-block">
                <span className="line position-absolute top-50"></span>
                <span className="effect-l position-absolute">
                  <span className="d-inline-block">Check Out</span>
                </span>
                <span className="effect-r position-absolute top-50">
                  <span className="d-inline-block">Check Out</span>
                </span>
                <span className="effect-shade opacity-0">
                  <span>Check Out</span>
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
