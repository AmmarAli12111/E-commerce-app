import React, { useEffect } from "react";
import "./MiniCart.scss";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useSelector } from "react-redux";

function MiniCart(props) {
  const cartItems = useSelector((state) => state.cart);
  const closeIcon = useRef(null);
  const closeCart = (e) => {
    if (e.target.closest(".close_popup") === closeIcon.current) {
      const cartPopup = document.getElementById("js-cart-popup");
      const overlay = document.getElementById("overlay-cart");
      const cartSidebarWrapper = document.getElementById(
        "cart-sidebar-wrapper"
      );
      if (
        cartPopup.classList.contains("act_opened") &&
        overlay.classList.contains("open")
      ) {
        cartPopup.classList.remove("act_opened");
        overlay.classList.remove("open");
        cartSidebarWrapper.classList.remove("open");
      }
    }
  };

  useEffect(() => {
    const removeOverlay = (e) => {
      if (e.target.classList.contains("open")) {
        e.target.classList.remove("open");

        const cartPopup = document.getElementById("js-cart-popup");
        const cartSidebarWrapper = document.getElementById(
          "cart-sidebar-wrapper"
        );
        if (
          cartPopup.classList.contains("act_opened") &&
          cartSidebarWrapper.classList.contains("open")
        ) {
          cartPopup.classList.remove("act_opened");
          cartSidebarWrapper.classList.remove("open");
        }
      }
    };

    const overlayCart = document.getElementById("overlay-cart");
    if (overlayCart) {
      overlayCart.addEventListener("click", removeOverlay);
    }

    return () => {
      if (overlayCart) {
        overlayCart.removeEventListener("click", removeOverlay);
      }
    };
  }, []);

  return (
    <>
      <div
        className="position-fixed top-0 bottom-0 end-0"
        id="cart-sidebar-wrapper"
      >
        <div id="overlay-cart"></div>
        <div
          className="cart-sidebar d-flex flex-column position-absolute end-0 top-0"
          id="js-cart-popup"
        >
          <div className="head-minicart mb-4 px-3 position-relative d-flex align-items-center">
            <div className="title w-100 text-start border-0 fs-6 fw-bold">
              SHOPPING CART
            </div>
            <span
              className="close_popup d-flex align-items-center justify-content-center position-relative"
              onClick={closeCart}
              ref={closeIcon}
            ></span>
          </div>
          <div className="cart-inner flex-fill d-flex align-items-center flex-column text-center p-0 ">
            {cartItems.length > 0 ? (
              <ProductMinicart
                cartItems={cartItems}
                addtocart={props.addtocart}
                decreaseqy={props.decreaseqy}
                removeFromCart={props.removeFromCart}
                quantitychange={props.quantitychange}
              />
            ) : (
              <>
                <span className="mb-4">{props.BsCartX}</span>
                <p>Your cart is empty.</p>
                <Link
                  to="/products"
                  className="link-effect py-3 px-4 rounded-5  d-block fw-bold"
                >
                  <span className="inner-effect position-relative d-inline-block">
                    <span className="line position-absolute top-50"></span>
                    <span className="effect-l position-absolute">
                      <span className="d-inline-block">Return to shop</span>
                    </span>
                    <span className="effect-r position-absolute top-50">
                      <span className="d-inline-block">Return to shop</span>
                    </span>
                    <span className="effect-shade opacity-0">
                      <span>Return to shop</span>
                    </span>
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function ProductMinicart(props) {
  const cartItems = useSelector((state) => state.cart);

  useEffect(() => {
    cartItems.forEach((item) => {
      const inputField = document.getElementById(`wbQuantity-${item.id}`);
      inputField.value = item.quantity;
    });
  });

  return (
    <div className="d-flex flex-fill align-items-center  flex-column w-100 p-4">
      <div className="w-100 flex-fill">
        <ul className="list-items  w-100">
          {cartItems.map((item) => {
            return (
              <li
                className="product-item d-flex align-items-center gap-2 mb-3"
                key={item.id}
              >
                <Link to={`/products/${item.id}`} className="d-inline-block">
                  <img
                    src={item.image}
                    alt="product image"
                    className="w-100 h-auto"
                    loading="lazy"
                  />
                </Link>
                <div className="info flex-fill text-start">
                  <Link
                    to={`/products/${item.id}`}
                    className="product-name mb-3 d-inline-block"
                  >
                    {item.title}
                  </Link>
                  <div className="product-item-qty w-100">
                    <span className="price d-flex align-items-center justify-content-between">
                      <span className="quantity">{item.quantity}x</span>
                      <div className="quantity-item d-flex align-items-center justify-content-between rounded-4 ms-1">
                        <a
                          href="#"
                          className="px-2"
                          onClick={(e) => {
                            e.preventDefault();
                            return props.decreaseqy(item);
                          }}
                        >
                          -
                        </a>
                        <label className="d-none"></label>
                        <input
                          type="number"
                          className="border-0 quantity`${item.id}`"
                          id={`wbQuantity-${item.id}`}
                          defaultValue={item.quantity}
                          onBlur={(event) => {
                            props.quantitychange(
                              item,
                              item.id,
                              event.target.value
                            );
                          }}
                        />
                        <a
                          href="#"
                          className="px-2"
                          onClick={(e) => {
                            e.preventDefault();
                            return props.addtocart(item);
                          }}
                        >
                          +
                        </a>
                      </div>
                    </span>
                    <span className="money fw-bold d-block">
                      $
                      {`${item.price}`.match(/[.]/gi)
                        ? item.price + "0"
                        : item.price + ".00"}
                    </span>
                  </div>
                </div>
                <a
                  href="#"
                  className="delete-item position-relative d-flex align-items-center justify-content-between align-self-start"
                  onClick={(e) => {
                    e.preventDefault();
                    return props.removeFromCart(item);
                  }}
                ></a>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="bottom-group w-100">
        <div className="subtotal d-flex align-items-center justify-content-between mb-4">
          <span className="text">Total</span>
          <span className="total-price fw-bold">
            $
            {cartItems
              .map((item) => item.price * item.quantity)
              .reduce((total, price) => total + price, 0)
              .toFixed(2)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
        </div>
        <div className="group-button d-flex flex-column align-items-center">
          <Link
            to="/Checkout"
            className="link-effect py-3 px-4 rounded-5  d-block fw-bold w-100"
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
          <Link
            to="/Cart"
            className="link-effect py-3 px-4 rounded-5  d-block fw-bold"
          >
            <span className="inner-effect position-relative d-inline-block">
              <span className="line position-absolute top-50"></span>
              <span className="effect-l position-absolute">
                <span className="d-inline-block">View Cart</span>
              </span>
              <span className="effect-r position-absolute top-50">
                <span className="d-inline-block">View Cart</span>
              </span>
              <span className="effect-shade opacity-0">
                <span>View Cart</span>
              </span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MiniCart;
