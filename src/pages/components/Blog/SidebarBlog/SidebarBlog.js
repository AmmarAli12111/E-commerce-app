import React from "react";
import "./_SidebarBlog.scss";

function SideBarBlog(props) {
  const getCoordinates = (e) => {
    const li = e.target.closest(".box-style");
    if (li) {
      var rect = e.target.getBoundingClientRect();
      var x = parseInt(e.clientX - rect.left); //x position within the element.
      var y = parseInt(e.clientY - rect.top); //y position within the element.
      li.style = `--x:${x}px; --y:${y}px`;
    }
  };

  const sideBarBlogArr = [
    {
      title: "Category",
      class: "categories-list",
      links: [
        { a: "Game Development", span: "(00)" },
        { a: "Game Art", span: "(00)" },
        { a: "Game Animation", span: "(07)" },
        { a: "Game QA Testing", span: "(12)" },
        { a: "Game UI/UX", span: "(01)" },
        { a: "Game Staffing", span: "(05)" },
      ],
    },
    {
      title: "Social",
      class: "social-list",
      links: [
        {
          a: props.TiSocialTwitter,
          title: "Twitter",
          ariaLable: "go to Twitter",
        },
        {
          a: props.TiSocialFacebook,
          title: "Facebook",
          ariaLable: "go to Facebook",
        },
        {
          a: props.TiSocialLinkedin,
          title: "LinkedIn",
          ariaLable: "go to LinkedIn",
        },
      ],
    },
    {
      title: "Category",
      class: "tags",
      links: [
        { a: "App" },
        { a: "Game App" },
        { a: "Game Art" },
        { a: "Game Animation" },
        { a: "3D ART" },
        { a: "Unity Development" },
        { a: "3D Characters" },
        { a: "3D Animation" },
        { a: "3D Game Modeling" },
      ],
    },
  ];

  const array = [];

  for (let i = 0; i < sideBarBlogArr.length; i++) {
    array.push(
      <div className="sidebar-area p-4 text-start rounded-4" key={i}>
        <h3 className="mb-6 fw-bold fs-3">{sideBarBlogArr[i].title}</h3>
        <ul className={`${sideBarBlogArr[i].class} d-flex flex-wrap gap-3`}>
          {sideBarBlogArr[i].links.map((link, j) => {
            return (
              <li
                key={j}
                onMouseEnter={getCoordinates}
                className={`${
                  link.span &&
                  "cat-item p-2 d-flex align-items-center gap-4 w-100"
                } box-style rounded-5`}
              >
                <a
                  href="#"
                  {...(sideBarBlogArr[i].title === "Social" && {
                    title: link.title,
                    target: "_blank",
                    "aria-label": link.ariaLable,
                    className:
                      "d-flex align-items-center justify-content-center rounded-5 p-2 d-inline-block fs-4",
                  })}
                  {...(sideBarBlogArr[i].title === "Category" && {
                    className: "d-inline-block py-2 px-3",
                  })}
                >
                  {link.a}
                </a>
                {link.span && <span className="count">{link.span}</span>}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div className="side-wrapper col-xl-4 col-lg-5">
      <div className="d-flex flex-column gap-5 position-sticky">
        <div className="sidebar-area p-4 text-start rounded-4">
          <h3 className="mb-6 fw-bold fs-3">Search</h3>
          <form className="d-flex align-items-center rounded-5 w-100 ps-3">
            <div className="box-style btn-box border-re p-2 border-0 fs-5">
              {props.BiSearchAlt}
            </div>
            <input
              type="text"
              placeholder="Enter keyword..."
              className="border-0 flex-fill py-3 px-2"
            />
          </form>
        </div>
        {array}
      </div>
    </div>
  );
}

export default SideBarBlog;
