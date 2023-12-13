import React, { lazy } from "react";

import CategorySection from "./CategorySection/CategorySection";
import LandingSection from "./LandingSection/LandingSection";
import FeaturedSection from "./FeaturedSection/FeaturedSection";
import Services from "./Services/Services";
import Blog from "./BlogSection/Blog";

function IndexOne(props) {
  return (
    <>
      <LandingSection />
      <CategorySection
        addtocart={props.addtocart}
        addtowishlist={props.addtowishlist}
        removefromwishlist={props.removefromwishlist}
      />
      <FeaturedSection
        addtocart={props.addtocart}
        addtowishlist={props.addtowishlist}
        removefromwishlist={props.removefromwishlist}
      />
      <Blog />
      <Services />
    </>
  );
}

export default IndexOne;
