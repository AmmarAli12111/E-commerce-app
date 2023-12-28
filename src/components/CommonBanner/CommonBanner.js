import React from "react";
import "./CommonBanner.scss";
import { Link, useLocation } from "react-router-dom";

function CommonBanner() {
  const location = useLocation();
  const title = location.pathname
    .slice(1)
    .split(/(?=[A-Z][a-z])/)
    .join(" ");

  return (
    <section className="banner-section">
      <div className="container-xl position-relative">
        <div className="banner-content">
          <div className="col-lg-6 col-md-10">
            <div className="main-content">
              <h2 className="fw-bold mb-4">
                <span>{title}</span>
              </h2>
              <p className="fs-four">
                Please provide your personal information and address for
                invoicing purposes, as well as your preferred payment method.
              </p>
            </div>
          </div>
          <div className="breadcrumb-area position-absolute end-0 bottom-0">
            <ol className="breadcrumb m-0 py-3 px-3 d-flex align-items-end justify-content-end">
              <li className="breadcrumb-item p-0 m-0">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {title}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CommonBanner;
