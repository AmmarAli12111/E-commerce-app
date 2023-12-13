import React, { Component } from "react";
import "./EmptyCart.css";
import { Link } from "react-router-dom";

class EmptyCart extends Component {
  render() {
    return (
      <section className="emptyCart-section">
        <div className="container-xl">
          <div className="empty-cart">
            <h2 className="fs-5 fw-bold">Shopping Cart</h2>
            <h3 className="fs-6">Your cart is currently empty.</h3>
            <div className="d-flex justify-content-end">
              <Link
                to="/ShopSidebarLeft"
                className="link-effect px-4 rounded-5 d-block fw-bold text-center "
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
        </div>
      </section>
    );
  }
}

export default EmptyCart;
