import React from "react";
import "./BlogSection.css";
import SideBarBlog from "./SidebarBlog/SidebarBlog";
import { BlogItem } from "../HomeOne/BlogSection/Blog";
import { useLocation } from "react-router";

function BlogSection(props) {
  const locationPathname = useLocation().pathname;

  return (
    <section className="Blog-component">
      <div className="container-xl">
        <strong className="title-blog position-relative fw-bold fs-1">
          Latest Blogs
        </strong>
        <div className="row mt-5">
          {locationPathname === "/BlogRightSidebar" ? (
            <>
              <div className="Blogs-wrapper col-xl-8 col-lg-7">
                <BlogItem p={true} />
                <BlogItem p={true} />
                <BlogItem p={true} />
                <BlogItem p={true} />
                <BlogItem p={true} />
                <BlogItem p={true} />
              </div>
              <SideBarBlog
                BiSearchAlt={props.BiSearchAlt}
                TiSocialFacebook={props.TiSocialFacebook}
                TiSocialTwitter={props.TiSocialTwitter}
                TiSocialLinkedin={props.TiSocialLinkedin}
              />
            </>
          ) : locationPathname === "/BlogLeftSidebar" ? (
            <>
              <SideBarBlog
                BiSearchAlt={props.BiSearchAlt}
                TiSocialFacebook={props.TiSocialFacebook}
                TiSocialTwitter={props.TiSocialTwitter}
                TiSocialLinkedin={props.TiSocialLinkedin}
              />
              <div className="Blogs-wrapper col-xl-8 col-lg-7">
                <BlogItem p={true} />
                <BlogItem p={true} />
                <BlogItem p={true} />
                <BlogItem p={true} />
                <BlogItem p={true} />
                <BlogItem p={true} />
              </div>
            </>
          ) : (
            <div className="Blogs-wrapper">
              <BlogItem p={true} />
              <BlogItem p={true} />
              <BlogItem p={true} />
              <BlogItem p={true} />
              <BlogItem p={true} />
              <BlogItem p={true} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default BlogSection;
