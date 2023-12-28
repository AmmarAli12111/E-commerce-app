import React from "react";
import "./_ContactUs.scss";
import { Link } from "react-router-dom";

function ContactUs(props) {
  const Arr = [
    {
      icon: props.AiOutlineMail,
      head: "Mail Us",
      about: "info@bluebase.com",
      id: 1,
    },
    {
      icon: props.BsTelephoneXFill,
      head: "CONTACT US",
      about: "+20 1208762488",
      id: 2,
    },
    {
      icon: props.BiCurrentLocation,
      head: "LOCATION",
      about: "22 Baker Street, Texas",
      about1: "United States W1U 3BW",
      id: 3,
    },
  ];

  return (
    <section className="contact-us-section py-5">
      <div className="container-xl">
        <div className="contact-wrapper d-flex justify-content-between gap-4">
          <div className="contact-info pt-4">
            <h3 className="fs-6 text-uppercase mb-4 fw-bold fst-italic">
              Contact Info :
            </h3>
            <ul className="contact-details mb-5">
              {Arr.length > 0 &&
                Arr.map((item) => (
                  <li
                    className="d-flex align-items-center justify-content-between gap-4"
                    key={item.id}
                  >
                    <div className="icon-box text-center rounded-3 d-flex align-items-center justify-content-center lh-lg fs-3">
                      {item.icon}
                    </div>
                    <div className="right flex-fill">
                      <span className="d-block text-uppercase lh-sm mb-1 opacity-50">
                        {item.about}
                      </span>
                      <h4 className="fs-6 opacity-75 mb-1 fw-normal">
                        {item.about}
                        {item.about1 && <br />}
                        {item.about1}
                      </h4>
                    </div>
                  </li>
                ))}
            </ul>
            <h3 className="fs-6 text-uppercase mb-4 fw-bold fst-italic">
              Social Info :
            </h3>
            <ul className="social-links d-flex align-items-center justify-content-start gap-3">
              <li>
                <a
                  href="#"
                  aria-label="Go to Facebook"
                  className="d-flex align-items-center justify-content-center  rounded-5"
                >
                  {props.TiSocialFacebook}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-label="Go to LinkidIn"
                  className="d-flex align-items-center justify-content-center  rounded-5"
                >
                  {props.TiSocialLinkedin}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-label="Go to Twitter"
                  className="d-flex align-items-center justify-content-center  rounded-5"
                >
                  {props.TiSocialTwitter}
                </a>
              </li>
            </ul>
          </div>
          <div className="form w-100">
            <form className="rounded-4 p-5">
              <h1 className="mb-4">
                Let’s work <span>together.</span>
              </h1>
              <div className="flex-input d-md-flex align-items-md-center justify-content-md-between gap-md-2">
                <input
                  className="w-100 d-inline-block rounded-5 fs-6 border-0 mb-3 py-3 px-4"
                  type="text"
                  placeholder="Your Name"
                />
                <input
                  className="w-100 d-inline-block rounded-5 fs-6 border-0 mb-3 py-3 px-4"
                  type="email"
                  placeholder="Enter Email"
                />
              </div>
              <input
                className="w-100 d-inline-block rounded-5 fs-6 border-0 mb-3 py-3 px-4"
                type="text"
                placeholder="Phone Number"
              />
              <textarea
                rows="5"
                className="w-100 d-inline-block rounded-5 fs-6 border-0 mb-3 py-3 px-4"
                placeholder="Message"
              ></textarea>
              <Link
                to="/ShopSidebarLeft"
                className="link-effect px-4 rounded-5 d-block fw-bold text-center w-100 border-0 lh-base fs-6 py-3 mt-1"
              >
                <span className="inner-effect position-relative d-inline-block">
                  <span className="line position-absolute top-50"></span>
                  <span className="effect-l position-absolute">
                    <span className="d-inline-block">Send Message</span>
                  </span>
                  <span className="effect-r position-absolute top-50">
                    <span className="d-inline-block">Send Message</span>
                  </span>
                  <span className="effect-shade opacity-0">
                    <span>Send Message</span>
                  </span>
                </span>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
