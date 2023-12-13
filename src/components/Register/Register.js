import React, { Component } from "react";
import "./Register.css";

class Register extends Component {
  render() {
    return (
      <section className="register-section d-flex align-items-center justify-content-center py-5">
        <div className="form">
          <form className="rounded-4">
            <label className="mb-1">First Name *</label>
            <input
              type="text"
              placeholder="First Name"
              className="w-100 border-0 d-block fs-6 mb-2 rounded-3"
            />
            <label className="mb-1">Last Name *</label>
            <input
              type="text"
              placeholder="Last Name"
              className="w-100 border-0 d-block fs-6 mb-2 rounded-3"
            />
            <label className="mb-1">Email *</label>
            <input
              type="email"
              placeholder="Email"
              className="w-100 border-0 d-block fs-6 mb-2 rounded-3"
            />
            <label className="mb-1">Password *</label>
            <input
              type="password"
              placeholder="Password"
              className="w-100 border-0 d-block fs-6 mb-2 rounded-3"
            />
            <button
              className="theme-btn submit-btn w-100 border-0 d-block fs-6 mb-2 rounded-3 fw-bold"
              name="submit"
              type="submit"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    );
  }
}

export default Register;
