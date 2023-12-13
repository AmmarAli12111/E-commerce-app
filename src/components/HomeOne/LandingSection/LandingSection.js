import React from "react";
import "./LandingSection.css";
import image1 from "../../../assets/images/wallpaperflare.com_wallpaper (7).webp";
import image from "../../../assets/images/wallpaperflare.com_wallpaper (12).webp";
import { Swiper, SwiperSlide } from "swiper/react";

import { Link } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

// import required modules
import {
  Parallax,
  Pagination,
  Navigation,
  EffectFade,
  Autoplay,
} from "swiper/modules";

import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

function LandingSection(props) {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      effect={"fade"}
      parallax={true}
      navigation={{
        nextEl: ".button-next-slide",
        prevEl: ".button-prev-slide",
      }}
      loop
      pagination={{
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: (index, className) => {
          return '<span class="' + className + '">' + "</span>";
        },
      }}
      autoplay={{
        delay: 10000,
        disableOnInteraction: false,
      }}
      speed={700}
      modules={[Navigation, Parallax, EffectFade, Autoplay, Pagination]}
    >
      <SwiperSlide className="swiper-slide">
        <div className="image">
          <img
            src={image}
            alt="Slider Image"
            loading="lazy"
            className="w-100 h-100"
          />
          <div className="container-xl">
            <div className="caption position-absolute top-50">
              <p className="fs-6 my-4 lh-1 text-uppercase fw-normal">
                Find Your Next Adventure Here
              </p>
              <h1 className="fw-normal mb-auto lh-1">
                Your
                <span className="emphasis fst-italic d-inline-block fw-bold">
                  Next
                </span>
                <br />
                <span>Adventure Awaits.</span>
              </h1>
              <p className="paragraph fw-normal w-100 m-0">
                Welcome to Playtopia, where our passion for gaming is matched
                only by our dedication to providing you with the best possible
                experience.
              </p>
              <Link
                to="/ShopSidebarLeft"
                className="link-effect d-block fw-bold rounded-5 fw-bold mt-4 fs-6 text-center"
              >
                <span className="inner-effect position-relative d-inline-block">
                  <span className="line position-absolute top-50"></span>
                  <span className="effect-l position-absolute">
                    <span className="d-inline-block">Shop Now</span>
                  </span>
                  <span className="effect-r position-absolute top-50">
                    <span className="d-inline-block">Shop Now</span>
                  </span>
                  <span className="effect-shade opacity-0">
                    <span>Shop Now</span>
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="swiper-slide">
        <div className="image ">
          <img
            src={image1}
            alt="Slider Image"
            loading="lazy"
            className="w-100 h-100"
          />
          <div className="container-xl">
            <div className="caption position-absolute top-50">
              <p className="fs-6 my-4 lh-1 text-uppercase fw-normal">
                Find Your Next Adventure Here
              </p>
              <h1 className="fw-normal mb-auto lh-1">
                Your
                <span className="emphasis fst-italic d-inline-block fw-bold">
                  Next
                </span>
                <br />
                <span>Adventure Awaits.</span>
              </h1>
              <p className="paragraph fw-normal w-100 m-0">
                Welcome to Playtopia, where our passion for gaming is matched
                only by our dedication to providing you with the best possible
                experience.
              </p>
              <Link
                to="/ShopSidebarLeft"
                className="link-effect d-block fw-bold rounded-5 fw-bold mt-4 fs-6 text-center"
              >
                <span className="inner-effect position-relative d-inline-block">
                  <span className="line position-absolute top-50"></span>
                  <span className="effect-l position-absolute">
                    <span className="d-inline-block">Shop Now</span>
                  </span>
                  <span className="effect-r position-absolute top-50">
                    <span className="d-inline-block">Shop Now</span>
                  </span>
                  <span className="effect-shade opacity-0">
                    <span>Shop Now</span>
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <div className="swiper-pagination"></div>
      <div className="btns-box position-absolute d-flex justify-content-center flex-column top-50 gap-3">
        <div className="button-prev-slide rounded-5 d-flex align-items-center justify-content-center fs-4 fw-bold">
          <AiOutlineArrowUp />
        </div>
        <div className="button-next-slide rounded-5 d-flex align-items-center justify-content-center fs-4 fw-bold">
          <AiOutlineArrowDown />
        </div>
      </div>
    </Swiper>
  );
}

export default LandingSection;
