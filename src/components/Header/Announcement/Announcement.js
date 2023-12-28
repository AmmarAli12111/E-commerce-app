import React, { Component } from "react";
import "./_Announcement.scss";

class Announcement extends Component {
  render() {
    return (
      <div className="container-xl announce-container">
        <section className="announce-bar d-flex align-items-center justify-content-center">
          <a href="#">
            <b>New Games -60 %</b> Off. <span>More</span>
          </a>
        </section>
      </div>
    );
  }
}

export default Announcement;
