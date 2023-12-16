import React, { useEffect } from "react";
import { LinkItem } from "../NavBar/NavBar";
import { dropdownLinks } from "../NavBar/dorpdownLinks";
import "./NavMobile.css";
import { FiSearch } from "react-icons/fi";

function NavMobile(props) {
  const ItemComp = [];

  useEffect(() => {
    const navMobileItems = document.querySelectorAll(".nav-mobile-item");

    const dropdownLinks = document.querySelectorAll(
      ".nav-mobile-item .dropdown li a"
    );

    dropdownLinks.forEach((link) => {
      link.style.opacity = 0;
      link.style.setProperty("display", "none", "important");
      link.style.transform = "translate(30%, 0px) rotateY(30deg)";
    });

    navMobileItems.forEach((item) => {
      const dropdownBack = item.querySelector(".dropdown .dropdown-back");

      item.addEventListener("click", (e) => {
        const navMobileItem = e.target.closest(".nav-mobile-item");

        const dropdownLinks = navMobileItem.querySelectorAll(".dropdown li a");
        const arr = Array.prototype.slice.call(dropdownLinks);

        dropdownLinks.forEach((link) => {
          let tr = (arr.indexOf(link) + 2) * 0.1;
          link.style.transition = `opacity ${tr}s ease, transform ${tr}s ease`;
          link.style.opacity = 0;
          link.style.setProperty("display", "block", "important");
          link.addEventListener("transitionend", () => {}, { once: true });
          setTimeout(() => {
            link.style.opacity = 1;
            link.style.transform = "translate(0px, 0px) ";
          }, 0);
        });

        const dropdown = navMobileItem.querySelector(".dropdown");
        const heightDropdown = dropdown.clientHeight;

        const navWrapper = document.querySelector(".nav-mobile-list");

        navWrapper.style.height = `${heightDropdown}px`;

        // The rest of the code remains the same
        const linkNavMobileItems = document.querySelectorAll(
          ".nav-mobile-item > a"
        );
        const arr2 = Array.prototype.slice.call(linkNavMobileItems);

        linkNavMobileItems.forEach((link) => {
          let tr = (arr2.indexOf(link) + 2) * 0.1;
          link.style.transition = `opacity ${tr}s ease, transform ${tr}s ease`;
          link.style.opacity = 0.9;
          link.addEventListener("transitionend", () => {}, { once: true });
          setTimeout(() => {
            link.style.opacity = 0;
            link.style.transform = "translate(-30%, 0px) rotateY(-30deg)";
          }, 0);

          setTimeout(() => {
            link.style.setProperty("display", "none", "important");
          }, 100);
        });
      });

      dropdownBack.addEventListener("click", (e) => {
        const dropdownBack = e.target.closest(".dropdown-back");

        const linkNavMobileItems = document.querySelectorAll(
          ".nav-mobile-item > a"
        );

        const arr3 = Array.prototype.slice.call(linkNavMobileItems);

        linkNavMobileItems.forEach((link) => {
          let tr = (arr3.indexOf(link) + 2) * 0.1;
          link.style.transition = `opacity ${tr}s ease, transform ${tr}s ease`;
          link.addEventListener("transitionend", () => {}, { once: true });
          setTimeout(() => {
            link.style.display = "block";
          }, 200);

          setTimeout(() => {
            link.style.opacity = 1;
            link.style.transform = "translate(0px, 0px) ";
          }, 300);
        });
        const navWrapper = document.querySelector(".nav-mobile-list");
        setTimeout(() => {
          navWrapper.style.removeProperty("height");
        }, 0);

        const dropdownLinks = dropdownBack.parentNode.querySelectorAll("li a");
        const arr4 = Array.prototype.slice.call(dropdownLinks);

        dropdownLinks.forEach((link) => {
          let tr = (arr4.indexOf(link) + 2) * 0.1;
          link.style.transition = `opacity ${tr}s ease, transform ${tr}s ease`;
          link.addEventListener("transitionend", () => {}, { once: true });
          setTimeout(() => {
            link.style.opacity = 0;
            link.style.transform = "translate(30%, 0px) rotateY(30deg)";
          }, 100);

          setTimeout(() => {
            link.style.setProperty("display", "none", "important");
          }, 500);
        });
      });
    });
  }, []);
  for (let i = 0; i < dropdownLinks.length; i++) {
    ItemComp.push(
      <LinkItem
        label={dropdownLinks[i].label}
        items={dropdownLinks[i].links}
        key={dropdownLinks[i].id}
        NavMobile={true}
      >
        {dropdownLinks[i].label}
      </LinkItem>
    );
  }
  return (
    <div className="nav-mobile position-fixed">
      <>
        <ul className="navigation position-relative d-flex align-items-center justify-content-end list-unstyled  p-0 mb-0 ">
          <li className="position-absolute start-0 h-100 d-inline-block">
            <div className="position-absolute start-0 top-0 d-flex align-items-center justify-content-center rounded-5 h-100 fs-3">
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
            <div className="close-icon position-absolute d-flex align-items-center justify-content-center opacity-0 fs-3 top-50">
              +
            </div>
          </li>
          <li>
            <ul className="nav-mobile-list w-100">{ItemComp}</ul>
          </li>
        </ul>
      </>
    </div>
  );
}

export default NavMobile;
