import React from "react";
import "./_Footer.scss";
import { RiWhatsappLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialLinkedin,
} from "react-icons/ti";

function Footer(props) {
  const arr = [
    {
      id: 0,
      title: "Quick Links",
      ul: [
        { link: "About Us", id: 0 },
        { link: "Delivery Information", id: 1 },
        { link: "Search", id: 2 },
        { link: "Privacy Policy", id: 3 },
        { link: "Shipping", id: 4 },
      ],
    },
    {
      id: 1,
      title: "Information",
      ul: [
        { link: "Contact Us", id: 0 },
        { link: "Careers", id: 1 },
        { link: "FAQs", id: 2 },
        { link: "Blog", id: 3 },
        { link: "Customer Reviews", id: 4 },
        { link: "Social Responsibility", id: 5 },
        { link: "Press Room", id: 6 },
      ],
    },
  ];

  return (
    <section className="footer">
      <div className="footer-section pt-5 pb-2">
        <div className="container-xl">
          <div className="row">
            <div className=" footer-item col-lg-3 col-md-6 col-12">
              <h1 className="m-0 mb-3 lh-1">Playtopia</h1>
            </div>
            {arr.map((e) => {
              return (
                <div
                  className="footer-item col-lg-4 col-xl-3 col-md-6 col-12"
                  key={e.id}
                >
                  <h2 className="mb-3 fs-5 fw-normal lh-1">{e.title}:</h2>
                  <ul>
                    {e.ul.map((item) => {
                      return (
                        <li key={item.id}>
                          <a
                            href="#"
                            className="d-inline-block position-relative fw-normal fs-6 lh-base mb-2"
                          >
                            {item.link}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
            <div className="footer-item contact_information col-lg-3 col-md-6 col-12">
              <div className="information">
                <h3 className="mb-3 lh-1">Let’s stay in touch</h3>
                <p>Keep up to date with our latest news and special offers.</p>
                <form className="d-flex align-items-center justify-content-between gap-1 mb-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="p-3 border-0 rounded-1"
                  />
                  <Link
                    to="#"
                    className="link-effect d-block fw-bold py-3 px-3  border-0 rounded-1"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span className="inner-effect position-relative d-inline-block">
                      <span className="line position-absolute top-50"></span>
                      <span className="effect-l position-absolute">
                        <span className="d-inline-block">Subscribe</span>
                      </span>
                      <span className="effect-r position-absolute top-50">
                        <span className="d-inline-block">Subscribe</span>
                      </span>
                      <span className="effect-shade opacity-0">
                        <span>Subscribe</span>
                      </span>
                    </span>
                  </Link>
                </form>
              </div>
              <div className="media">
                <ul className="social-media-links d-flex align-items-center justify-content-start gap-3 mt-4">
                  <li>
                    <a
                      href="#"
                      aria-label="Share on Facebook"
                      className="fs-4 d-flex align-items-center justify-content-center rounded-5"
                    >
                      <TiSocialFacebook />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      aria-label="Share on Facebook"
                      className="fs-4 d-flex align-items-center justify-content-center rounded-5"
                    >
                      <TiSocialTwitter />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      aria-label="Share on Facebook"
                      className="fs-4 d-flex align-items-center justify-content-center rounded-5"
                    >
                      <TiSocialLinkedin />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      aria-label="Share on Facebook"
                      className="fs-4 d-flex align-items-center justify-content-center rounded-5"
                    >
                      <RiWhatsappLine />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom pt-4">
          <div className="container-xl">
            <div className="d-flex align-item center justify-content-between">
              <div className="copyright ">
                <p>
                  Copyright Playtopia | Built with Playtopia by TechnonicThemes.
                </p>
              </div>
              <div className="payment-method "></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
