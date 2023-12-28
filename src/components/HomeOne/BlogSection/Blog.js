import React from "react";
import image from "../../../assets/images/wallpaperflare.com_wallpaper (1).webp";
import "./Blog.scss";
import { Link } from "react-router-dom";
import { VscCalendar } from "react-icons/vsc";
import { BiCommentDots } from "react-icons/bi";

function Blog(props) {
  const arr = [];
  for (let i = 0; i < 3; i++) {
    arr.push(<BlogItem key={i + 1} />);
  }
  return (
    <section className="Blog-section position-relative text-center">
      <div className="container-xl">
        <strong className="title-blog position-relative fw-bold fs-1">
          Latest Blogs
        </strong>
        <div className="Blogs-wrapper d-flex flex-wrap align-items-center justify-content-between gap-1">
          {arr}
        </div>
      </div>
    </section>
  );
}

export function BlogItem(props) {
  return (
    <div className="Blog-item mb-4">
      <div className="Blog-item-img rounded-3 ">
        <img src={image} alt="image" className="w-100 h-100" />
      </div>
      <BlogContentItem p={props.p} />
    </div>
  );
}

function BlogContentItem(props) {
  return (
    <div className="Blog-item-content">
      <h1 className="text-start mt-3 fs-5">Activities Book International</h1>
      <ul className="d-flex align-items-center justify-content-between mt-3 mb-3">
        <li className="d-flex align-items-center gap-2">
          <VscCalendar />
          15 May, 2022
        </li>
        <li className="d-flex align-items-center gap-2">
          <BiCommentDots /> 0 comments
        </li>
      </ul>
      {props.p && (
        <p className="text-start ">
          Proin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed
          eget viverra egestas nisi in consequat. Fusce sodales augue a
          accumsan. Cras sollicitudin, ipsum eget blandit pulvinar. Integer
          tincidunt.…
        </p>
      )}
      <div className="d-flex align-items-center justify-content-between">
        <Link
          to="/BlogRightSidebar"
          className="link-effect d-block fw-bold rounded-5"
        >
          <span className="inner-effect position-relative d-inline-block">
            <span className="line position-absolute top-50"></span>
            <span className="effect-l position-absolute">
              <span className="d-inline-block">Read More</span>
            </span>
            <span className="effect-r position-absolute top-50">
              <span className="d-inline-block">Read More</span>
            </span>
            <span className="effect-shade opacity-0">
              <span>Read More</span>
            </span>
          </span>
        </Link>
        <div className="author">by Ammar</div>
      </div>
    </div>
  );
}

export default Blog;
