import React from "react";
import image from "../../../assets/images/icons8-money-50.png";
import image1 from "../../../assets/images/icons8-discount-50.png";
import image2 from "../../../assets/images/icons8-support-50.png";
import "./_Services.scss";

function Services() {
  const ServicesArr = [
    {
      title: "Money Return",
      subTitle: "Back guarantee in 7 days",
      img: image,
      id: 1,
    },
    {
      title: "Member Discount",
      subTitle: "On every order over $130.00",
      img: image1,
      id: 2,
    },
    {
      title: "Return Policy",
      subTitle: "Support 24 hours a day",
      img: image2,
      id: 3,
    },
  ];

  return (
    <section className="services py-5">
      <div className="container-xl">
        <div className="services-wrapper d-flex align-items-center justify-content-between flex-wrap">
          {ServicesArr.map((item) => (
            <div
              className="services-item d-flex align-items-center justify-content-between mb-3"
              key={item.id}
            >
              <div className="money-icon">
                <img
                  src={item.img}
                  alt="Money-icon"
                  loading="lazy"
                  className="w-100 h-100"
                />
              </div>
              <div className="info-service ms-3">
                <div className="service-title">{item.title}</div>
                <div className="service-subtitle">{item.subTitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
