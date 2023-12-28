import React, { useEffect } from "react";
import "./_NavBar.scss";
import { dropdownLinks } from "./dorpdownLinks";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiSolidLeftArrowAlt } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";

function Navigation(props) {
  const navigation = document.querySelector(".navigation");
  const openSearchInput = () => {
    navigation.classList.add("openSearch");
    document
      .querySelector(".navigation:not(.nav-mobile .navigation) .search-input")
      .focus();
  };

  const handleClickCloseIcon = () => {
    navigation.classList.remove("openSearch");
  };

  useEffect(() => {
    let timeoutIds = new Map();

    const handleMouseEnter = (event) => {
      const dropdown = event.currentTarget.querySelector(".dropdown");
      if (!dropdown) return;

      const mainNav = document.querySelector(".main-navigationbar");
      const mainNavStyle = window.getComputedStyle(mainNav);
      const marginBottom = parseInt(mainNavStyle.marginBottom);
      const paddingBottom = parseInt(mainNavStyle.paddingBottom);
      const marginTop = marginBottom + paddingBottom + 2 + "px";

      dropdown.style.marginTop = marginTop;
      dropdown.addEventListener("transitionend", function transitionend() {
        dropdown.removeEventListener("transitionend", transitionend);
      });
      dropdown.style.display = "block";
      clearTimeout(timeoutIds.get(event.currentTarget));
      const timeoutId = setTimeout(() => {
        dropdown.style.opacity = 1;
      }, 10);
      timeoutIds.set(event.currentTarget, timeoutId);
    };

    const handleMouseLeave = (event) => {
      const dropdown = event.currentTarget.querySelector(".dropdown");
      if (!dropdown) return;

      const mainNav = document.querySelector(".main-navigationbar");
      const mainNavStyle = window.getComputedStyle(mainNav);
      const marginBottom = parseInt(mainNavStyle.marginBottom);
      const paddingBottom = parseInt(mainNavStyle.paddingBottom);
      const marginTop = marginBottom + paddingBottom + 2 + "px";

      dropdown.style.marginTop = marginTop;
      dropdown.addEventListener("transitionend", function transitionend() {
        dropdown.removeEventListener("transitionend", transitionend);
      });

      clearTimeout(timeoutIds.get(event.currentTarget));
      dropdown.style.opacity = 0;
      timeoutIds.delete(event.currentTarget);
      const timeoutId = setTimeout(() => {
        dropdown.style.display = "none";
      }, 300);
      timeoutIds.set(event.currentTarget, timeoutId);
    };

    const links = document.querySelectorAll(
      ".navigation:not(.nav-mobile .navigation) > .nav-item"
    );

    links.forEach((link) => {
      link.addEventListener("mouseenter", handleMouseEnter);
      link.addEventListener("mouseleave", handleMouseLeave);
    });

    // Clean up the event listeners when the component unmounts
    return () => {
      timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleMouseEnter);
        link.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  const ItemComp = [];

  for (let i = 0; i < dropdownLinks.length; i++) {
    ItemComp.push(
      <LinkItem
        label={dropdownLinks[i].label}
        items={dropdownLinks[i].links}
        key={dropdownLinks[i].id}
      >
        {dropdownLinks[i].label}
      </LinkItem>
    );
  }

  return (
    <>
      <ul className="navigation position-relative d-flex align-items-center justify-content-end list-unstyled  p-0 mb-0 ">
        <li className="position-absolute start-0 h-100 d-inline-block">
          <div
            onClick={openSearchInput}
            className="position-absolute start-0 top-0 d-flex align-items-center justify-content-center rounded-5 h-100 fs-3"
          >
            <FiSearch />
          </div>
        </li>
        <li className="d-inline-block">
          <input
            type="text"
            placeholder="Search..."
            className="search-input fs-6 rounded-5 h-100 w-100 position-absolute start-0 border-0"
          />
        </li>
        <li>
          <div
            className="close-icon position-absolute d-flex align-items-center justify-content-center opacity-0 fs-3 top-50"
            onClick={handleClickCloseIcon}
          >
            +
          </div>
        </li>
        {ItemComp}
      </ul>
    </>
  );
}

export function LinkItem(props) {
  const cartItem = useSelector((state) => state.cart);
  return (
    <li
      className={`nav-item position-relative d-inline-block ${
        props.DropdownBack
          ? "dropdown-back"
          : props.NavMobile
          ? "nav-mobile-item"
          : ""
      }`}
    >
      <Link
        to={
          props.link === "/CheckOut" && cartItem.length === 0
            ? "/Cart"
            : props.link
        }
        className="link-effect d-block fw-bold"
      >
        {props.DropdownBack && (
          <span className="fw-bold">
            <BiSolidLeftArrowAlt />
          </span>
        )}
        <span className="inner-effect position-relative d-inline-block">
          <span className="line position-absolute top-50"></span>
          <span className="effect-l position-absolute">
            <span className="d-inline-block">{props.label}</span>
          </span>
          <span className="effect-r position-absolute top-50">
            <span className="d-inline-block">{props.label}</span>
          </span>
          <span className="effect-shade opacity-0">
            <span>{props.label}</span>
          </span>
        </span>
      </Link>
      {props.items && (
        <Dropdown items={props.items} NavMobile={props.NavMobile} />
      )}
    </li>
  );
}

function Dropdown(props) {
  return (
    <ul className="dropdown position-absolute start-0 py-3 rounded-3">
      {props.NavMobile && <LinkItem label={"Back"} DropdownBack={true} />}
      {props.items?.map((item) => (
        <LinkItem key={item.id} link={item.link} label={item.label} />
      ))}
    </ul>
  );
}

export default Navigation;
