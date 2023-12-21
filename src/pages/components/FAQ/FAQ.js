import React from "react";
import "./FAQ.css";

function FAQ(props) {
  const FAQarr = [
    { value: "Trading, Gifting, Market and Steam Points", id: 1 },
    { value: "My Account", id: 2 },
    { value: "Purchases", id: 3 },
    { value: "Games, Software, etc", id: 4 },
  ];

  return (
    <section className="support-section ">
      <div className="container-xl position-relative d-flex align-items-center justify-content-center flex-column">
        <div className="hero mb-5">
          <div className="hero-text fs-2 fst-italic fw-bold text-center mb-4">
            We’re here to help
          </div>
          <div className="hero-search">
            <form className="d-flex align-items-center justify-content-between rounded-5 w-100 ps-3">
              {props.BiSearchAlt}
              <input
                className="border-0 flex-fill py-3 px-2"
                type="text"
                placeholder="Search"
              />
            </form>
          </div>
        </div>
        <div className="support-wrapper rounded-4">
          <div className="help-section d-flex flex-column">
            {FAQarr.length > 0 &&
              FAQarr.map((item) => (
                <a
                  href="#"
                  className="py-3 px-3 d-flex align-items-center justify-content-between"
                  key={item.id}
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="fw-bold fs-6 ">{item.value}</span>
                  <div className="icon-box d-flex align-items-center justify-content-center rounded-5 fs-4">
                    {props.FiArrowRight}
                  </div>
                </a>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
