import React, { useRef, useEffect } from "react";
import "./LogoBar.scss";
import NavBar from "../NavBar/NavBar";
import { Link } from "react-router-dom";
import NavMobile from "../NavMobile/NavMobile";
import { useSelector } from "react-redux";
import { FiUser, FiShoppingCart } from "react-icons/fi";

function LogoBar(props) {
  const iconBar = useRef(null);
  const nav = useRef(null);
  const cartIcon = useRef(null);
  const userIcon = useRef(null);
  const cartItems = useSelector((state) => state.cart);

  const quantity = cartItems
    .map((item) => item.quantity)
    .reduce((a, b) => a + b, 0);

  const openCart = (e) => {
    let target = e.target;
    while (target !== null && target !== cartIcon.current) {
      target = target.parentNode;
    }
    if (target === cartIcon.current) {
      e.preventDefault();
      const cartPopup = document.getElementById("js-cart-popup");
      const overlay = document.getElementById("overlay-cart");
      const cartSidebarWrapper = document.getElementById(
        "cart-sidebar-wrapper"
      );
      if (cartPopup && !cartPopup.classList.contains("act_opened")) {
        cartPopup.classList.add("act_opened");
        overlay.classList.add("open");
        cartSidebarWrapper.classList.add("open");
      }
    }
  };

  useEffect(() => {
    const ClickOnUserIcon = (e) => {
      let target = e.target;
      while (target !== null && target !== userIcon.current) {
        target = target.parentNode;
      }
      if (target === userIcon.current) {
        e.preventDefault();
        userIcon.current.nextElementSibling.classList.toggle("open");
      }
    };
    userIcon.current.addEventListener("click", ClickOnUserIcon);
    return () => {
      userIcon.current.removeEventListener("click", ClickOnUserIcon);
    };
  }, []);

  useEffect(() => {
    // Define function to handle click events
    const handleClickDOM = (event) => {
      let target = event.target;
      while (target !== null && target !== cartIcon.current) {
        target = target.parentNode;
      }

      // Get reference to the navigation element
      const navigation = document.querySelector(".navigation");
      // Toggle the "open-menu" class on the navigation element if the clicked element has the "icon-bar" class
      if (
        iconBar.current &&
        event.target.closest(".icon-bar") === iconBar.current
      ) {
        if (navigation) {
          navigation.classList.toggle("open");
          iconBar.current.classList.toggle("active");
        }
      } else if (
        event.target.closest(".main-navigationbar") !== nav.current ||
        target === cartIcon.current
      ) {
        // Remove the "open-menu" class from the navigation element if it exists and the clicked element is not inside the navigation element
        if (
          navigation &&
          iconBar.current &&
          navigation.classList.contains("open")
        ) {
          navigation.classList.remove("open");
          iconBar.current.classList.remove("active");
        }
      }
    };

    // Add click event listener to the document with the handleClickDOM function
    document.addEventListener("click", handleClickDOM);

    // Remove click event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickDOM);
    };
  }, []);
  return (
    <>
      <div
        className="container-xl main-navigationbar position-relative py-2"
        ref={nav}
      >
        <div className=" d-flex align-items-center justify-content-between">
          <h1 className="Logo m-0">
            <a href="#">Playtopia</a>
          </h1>
          <div
            className="icon-bar position-relative rounded-5 d-flex align-items-center justify-content-center"
            ref={iconBar}
          >
            <div className="w-50 d-flex align-items-start justify-content-center flex-column text-start gap-1">
              <span className="w-100 rounded-1"></span>
              <span className="rounded-1"></span>
              <span className="rounded-1"></span>
            </div>
          </div>
          <>
            <NavMobile />
            <NavBar />
          </>
          <div className="header-control">
            <ul className="position-relative d-flex align-items-center mb-0 ">
              <li className="ps-2 position-relative">
                <a
                  href="#"
                  className="user-icon d-flex align-items-center justify-content-center rounded-5 fs-4"
                  aria-label="go head to wishlist page"
                  ref={userIcon}
                >
                  <FiUser />
                </a>
                <ul className="user-list position-absolute">
                  <li>
                    <Link to="/LogIn" className="link-effect d-block fw-bold">
                      <span className="inner-effect position-relative d-inline-block">
                        <span className="line position-absolute top-50"></span>
                        <span className="effect-l position-absolute">
                          <span className="d-inline-block">LogIn</span>
                        </span>
                        <span className="effect-r position-absolute top-50">
                          <span className="d-inline-block">LogIn</span>
                        </span>
                        <span className="effect-shade opacity-0">
                          <span>LogIn</span>
                        </span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/Register"
                      className="link-effect d-block fw-bold"
                    >
                      <span className="inner-effect position-relative d-inline-block">
                        <span className="line position-absolute top-50"></span>
                        <span className="effect-l position-absolute">
                          <span className="d-inline-block">Register</span>
                        </span>
                        <span className="effect-r position-absolute top-50">
                          <span className="d-inline-block">Register</span>
                        </span>
                        <span className="effect-shade opacity-0">
                          <span>Register</span>
                        </span>
                      </span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="ps-2">
                <div className="box-cart position-relative d-flex align-items-center justify-content-center fw-normal text-capitalize rounded-5 ">
                  <span className="mx-2">
                    {quantity > 99
                      ? "Cart: +99 items"
                      : `Cart: ${quantity} items`}
                  </span>
                  <a
                    href="#"
                    className="cart d-flex align-items-center justify-content-center rounded-5 h-100 fs-5"
                    aria-label="go head to products you selected"
                    onClick={openCart}
                    ref={cartIcon}
                  >
                    <FiShoppingCart />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogoBar;
