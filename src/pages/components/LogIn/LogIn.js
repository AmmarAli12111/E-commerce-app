import React, { Component } from "react";
import "./_LogIn.scss";

class LogIn extends Component {
  render() {
    return (
      <section className="login-section d-flex align-items-center justify-content-center py-5">
        <div className="form">
          <form className="rounded-4">
            <label>Username or email *</label>
            <input
              type="email"
              placeholder="Username or email"
              className="w-100 border-0 rounded-3 py-3 px-4 fs-6 d-block mb-2"
            />
            <label>Password *</label>
            <input
              type="password"
              placeholder="Password"
              className="w-100 border-0 rounded-3 py-3 px-4 fs-6 d-block mb-2"
            />
            <button
              className="theme-btn submit-btn w-100 border-0 rounded-2 fs-6 py-3 px-4 mt-1 fw-bold"
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

export default LogIn;
