import React, { useEffect, useState } from "react";
import "./Checkout.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Checkout() {
  const [clickedInput, setClickedInput] = useState(null);
  const [prevChecked, setPrevChecked] = useState(false);

  useEffect(() => {
    const handleLoading = () => {
      const elements = document.querySelectorAll(".input-radio:not(:checked)");
      if (elements) {
        elements.forEach((el) => {
          const paymentDiv = el.nextSibling.nextSibling;
          paymentDiv.style.height = 0;
        });
      }
    };

    if (document.readyState === "complete") {
      handleLoading();
    } else {
      document.addEventListener("DOMContentLoaded", handleLoading);
    }

    window.addEventListener("load", handleLoading);

    return () => {
      document.removeEventListener("DOMContentLoaded", handleLoading);
      window.removeEventListener("load", handleLoading);
    };
  }, []);

  useEffect(() => {
    const selectCheckbox = () => {
      if (clickedInput && clickedInput.classList.contains("input-radio")) {
        if (clickedInput.checked && prevChecked) {
          return; // Stop if input was already checked
        }
        // Uncheck all radio buttons
        document.querySelectorAll(".input-radio").forEach((input) => {
          input.checked = false;
        });

        // Collapse all payment method sections
        const paymentDivs =
          document.getElementsByClassName("payment_method_cod");
        for (let i = 0; i < paymentDivs.length; i++) {
          paymentDivs[i].style.overflow = "hidden";
          paymentDivs[i].style.height = paymentDivs[i].clientHeight + "px";
          paymentDivs[i].addEventListener(
            "transitionend",
            function transitionEnd() {
              paymentDivs[i].removeEventListener(
                "transitionend",
                transitionEnd
              );
              paymentDivs[i].style.removeProperty("overflow");
            },
            { once: true }
          );
          setTimeout(() => {
            paymentDivs[i].style.height = "0px";
          }, 10);
        }

        // Check the clicked radio button
        clickedInput.checked = true;

        // Expand the corresponding payment method section
        const paymentDiv = clickedInput.nextElementSibling.nextElementSibling;
        const element = paymentDiv.querySelector("p");
        const height = element.clientHeight;
        paymentDiv.style.overflow = "hidden";
        paymentDiv.style.height = "0px";
        setTimeout(() => {
          paymentDiv.style.height = height + 5 + "px";
          paymentDiv.addEventListener(
            "transitionend",
            () => {
              paymentDiv.style.removeProperty("height");
              paymentDiv.style.removeProperty("overflow");
            },
            { once: true }
          );
        }, 10);
        setPrevChecked(clickedInput.checked);
      }
    };

    document.addEventListener("click", selectCheckbox);

    return () => {
      document.removeEventListener("click", selectCheckbox);
    };
  }, [clickedInput, prevChecked]);

  const handleMouseDownCheckbox = (event) => {
    if (event.target.classList.contains("input-radio")) {
      if (clickedInput !== event.target) {
        setPrevChecked(event.target.checked);
        setClickedInput(event.target);
      }
    }
    if (
      event.target.previousElementSibling &&
      event.target.previousElementSibling.classList.contains("input-radio")
    ) {
      if (clickedInput !== event.target.previousElementSibling) {
        setPrevChecked(event.target.previousElementSibling.checked);
        setClickedInput(event.target.previousElementSibling);
      }
    }
  };

  const InputsArr = [
    { label: "first name", type: "text", id: 1 },
    { label: "last name", type: "text", id: 2 },
    {
      label: "company name (optional)",
      type: "text",

      id: 3,
    },
    { label: "country/region", type: "text", id: 4 },
    {
      label: "street address",
      type: "text",
      placeholder: "House number and street name",
      id: 5,
    },
    {
      type: "text",
      placeholder: "Apartment, suite, unit, etc. (optional)",
      id: 6,
    },
    { label: "zip code", type: "text", id: 7 },
    { label: "phone", type: "text", id: 8 },
    { label: "email address", type: "text", id: 9 },
  ];

  const cart_item = useSelector((state) => state.cart);

  return (
    <section className="check-out-section">
      <div className="container-xl">
        <div className="row">
          <div className="col-lg-6 col-12">
            <div className="billing-fields">
              <h3 className="fs-2 lh-sm fst-italic fw-bold my-4">
                Billing Details
              </h3>
              <form>
                {InputsArr.length > 0 &&
                  InputsArr.map((item) => (
                    <div key={item.id}>
                      {item.label && (
                        <label
                          className="lh-base text-uppercase fw-bold d-block mb-2"
                          htmlFor={item.label}
                        >
                          {item.label}
                        </label>
                      )}
                      <input
                        id={item.label}
                        type={item.type}
                        placeholder={item.placeholder}
                        className="d-inline-block w-100 rounded-5 border-0 fs-6 lh-base mb-4 py-3 px-4"
                      />
                    </div>
                  ))}
              </form>
            </div>
          </div>
          <div className="col-lg-6 col-12">
            <div className="order-review">
              <h3 className="fs-2 lh-sm fst-italic fw-bold my-4">Your order</h3>
              <div className="about-table rounded-3 mb-4 pt-2 px-3 pb-3">
                <table className="shop_table w-100">
                  <thead>
                    <tr>
                      <th className="product-name fs-6 lh-base text-uppercase fw-bold pt-3 border-0">
                        Product
                      </th>
                      <th className="product-total fs-6 lh-base text-uppercase fw-bold pt-3 border-0">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart_item.map((item) => {
                      return (
                        <tr className="cart_item" key={item.id}>
                          <td className="product-name fw-bold border-0 text-start">
                            {item.title}
                            <strong className="product-quantity">
                              {" "}
                              ×{item.quantity}
                            </strong>
                          </td>
                          <td className="product-total fw-bold border-0 text-start">
                            <span>
                              <bdi>
                                $
                                {(item.price * item.quantity)
                                  .toFixed(2)
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              </bdi>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th className=" fs-6 lh-base text-uppercase fw-normal pt-3 border-0">
                        Subtotal
                      </th>
                      <td className="fw-normal border-0 text-start">
                        $
                        {cart_item
                          .map((item) => item.price * item.quantity)
                          .reduce((total, price) => total + price, 0)
                          .toFixed(2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </td>
                    </tr>
                    <tr>
                      <th className=" fs-6 lh-base text-uppercase fw-bold pt-3 border-0">
                        Total
                      </th>
                      <td className="fw-bold border-0 text-start">
                        <strong>
                          $
                          {cart_item
                            .map((item) => item.price * item.quantity)
                            .reduce((total, price) => total + price, 0)
                            .toFixed(2)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </strong>
                      </td>
                    </tr>
                  </tfoot>
                </table>
                <div className="checkout-payment">
                  <ul
                    className="payment_methods"
                    onMouseDown={handleMouseDownCheckbox}
                  >
                    <li className="position-relative py-3 px-4">
                      <input
                        type="radio"
                        className="input-radio position-absolute start-0 border-0"
                        defaultChecked="checked"
                        id="radio_one"
                      />
                      <label
                        className="lh-sm text-uppercase fw-bold d-block "
                        htmlFor="radio_one"
                      >
                        Direct bank transfer
                      </label>
                      <div className="payment_method_cod">
                        <p className="mt-1 mb-0">
                          Make your payment directly into our bank account.
                          Please use your Order ID as the payment reference.
                          Your order will not be shipped until the funds have
                          cleared in our account.
                        </p>
                      </div>
                    </li>
                    <li className="position-relative py-3 px-4">
                      <input
                        type="radio"
                        className="input-radio position-absolute start-0 border-0"
                        id="radio_two"
                      />
                      <label
                        className="lh-sm text-uppercase fw-bold d-block "
                        htmlFor="radio_two"
                      >
                        Check payments
                      </label>
                      <div className="payment_method_cod">
                        <p className="mt-1 mb-0">
                          Please send a check to Store Name, Store Street, Store
                          Town, Store State / County, Store Postcode.
                        </p>
                      </div>
                    </li>
                    <li className="position-relative py-3 px-4">
                      <input
                        type="radio"
                        className="input-radio position-absolute start-0 border-0"
                        id="radio_three"
                      />
                      <label
                        className="lh-sm text-uppercase fw-bold d-block "
                        htmlFor="radio_three"
                      >
                        Cash on delivery
                      </label>
                      <div className="payment_method_cod">
                        <p className="mt-1 mb-0">
                          Pay with cash upon delivery.
                        </p>
                      </div>
                    </li>
                  </ul>
                  <div className="mt-3">
                    <div>
                      Your personal data will be used to process your order,
                      support your experience throughout this website, and for
                      other purposes described in our privacy policy.
                    </div>
                    <Link
                      to="#"
                      className="link-effect d-block fw-bold rounded-5 fw-bold  text-center px-4 mt-3 w-100"
                      onClick={(e) => e.preventDefault()}
                    >
                      <span className="inner-effect position-relative d-inline-block">
                        <span className="line position-absolute top-50"></span>
                        <span className="effect-l position-absolute">
                          <span className="d-inline-block">place order</span>
                        </span>
                        <span className="effect-r position-absolute top-50">
                          <span className="d-inline-block">place order</span>
                        </span>
                        <span className="effect-shade opacity-0">
                          <span>place order</span>
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="order-comment">
                <label className="lh-base text-uppercase fw-bold d-block mb-2">
                  order notes (optional)
                </label>
                <textarea
                  rows="5"
                  className="d-inline-block w-100 rounded-5 border-0 fs-6 lh-base mb-4 py-3 px-4"
                  placeholder="Notes about your order, e.g. special notes for delivery."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
