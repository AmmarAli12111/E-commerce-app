import React, { useEffect } from "react";
import LogoBar from "./LogoBar/LogBar";
import Announcement from "./Announcement/Announcement";
import "./Header.css";

function Header(props) {
  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;

      const announceContainer = document.querySelector(".announce-container");
      if (position > 0) {
        announceContainer.classList.add("hidden");
      } else {
        announceContainer.classList.remove("hidden");
      }

      const headerSection = document.querySelector(".header-section");
      if (position > 0) {
        headerSection.classList.add("head-fixed");
      } else {
        headerSection.classList.remove("head-fixed");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="header-section position-fixed top-0 start-0 end-0">
      <Announcement />
      <LogoBar />
    </div>
  );
}

export default Header;
