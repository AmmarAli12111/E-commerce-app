import React, { useEffect } from "react";
import { LinkItem } from "../NavBar/NavBar";
import { dropdownLinks } from "../NavBar/dorpdownLinks";
import "./NavMobile.scss";
import { FiSearch } from "react-icons/fi";

function NavMobile(props) {
  const ItemComp = [];

  useEffect(() => {
    // Select all elements with the class "nav-mobile-item"
    const navMobileItems = document.querySelectorAll(".nav-mobile-item");

    // Select all links inside the dropdown
    const dropdownLinks = document.querySelectorAll(
      ".nav-mobile-item .dropdown li a"
    );

    // Hide and transform dropdown links initially
    dropdownLinks.forEach((link) => {
      link.style.opacity = 0;
      link.style.setProperty("display", "none", "important");
      link.style.transform = "translate(30%, 0px) rotateY(30deg)";
    });

    // Loop through each navigation item
    navMobileItems.forEach((item) => {
      // Select the back button inside the dropdown
      const dropdownBack = item.querySelector(".dropdown .dropdown-back");

      // Add click event listener to each navigation item
      item.addEventListener("click", (e) => {
        // Find the closest parent with the class "nav-mobile-item"
        const navMobileItem = e.target.closest(".nav-mobile-item");

        // Select all links inside the dropdown of the clicked navigation item
        const dropdownLinks = navMobileItem.querySelectorAll(".dropdown li a");
        const arr = Array.prototype.slice.call(dropdownLinks);

        // Animate and transform dropdown links on click
        dropdownLinks.forEach((link) => {
          // Calculate transition duration based on the link's index
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

        // The rest of the code remains the same

        // Select all links inside the navigation items
        const linkNavMobileItems = document.querySelectorAll(
          ".nav-mobile-item > a"
        );
        const arr2 = Array.prototype.slice.call(linkNavMobileItems);

        // Animate and transform links inside navigation items
        linkNavMobileItems.forEach((link) => {
          // Calculate transition duration based on the link's index
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

      // Add click event listener to the back button
      dropdownBack.addEventListener("click", (e) => {
        // Find the closest parent with the class "dropdown-back"
        const dropdownBack = e.target.closest(".dropdown-back");

        // Select all links inside the navigation items
        const linkNavMobileItems = document.querySelectorAll(
          ".nav-mobile-item > a"
        );
        const arr3 = Array.prototype.slice.call(linkNavMobileItems);

        // Animate and display links inside navigation items
        linkNavMobileItems.forEach((link) => {
          // Calculate transition duration based on the link's index
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

        // Reset the height of the navigation wrapper
        const navWrapper = document.querySelector(".nav-mobile-list");
        setTimeout(() => {
          navWrapper.style.removeProperty("height");
        }, 0);

        // Select all links inside the dropdown of the back button
        const dropdownLinks = dropdownBack.parentNode.querySelectorAll("li a");
        const arr4 = Array.prototype.slice.call(dropdownLinks);

        // Animate and transform dropdown links on back button click
        dropdownLinks.forEach((link) => {
          // Calculate transition duration based on the link's index
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
