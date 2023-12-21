import React, { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import products from "../data/data";

import {
  AddToCart,
  AddToWishlist,
  buyingProduct,
  DecreaseQy,
  quantityChange,
  RemoveFromCart,
  RemoveFromWishlist,
} from "../redux/actions/action";
import {
  AiOutlineStar,
  AiFillStar,
  AiOutlineHeart,
  AiOutlineMail,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  BsCartX,
  BsTelephoneXFill,
  BsFillHeartbreakFill,
} from "react-icons/bs";
import {
  FiArrowLeft,
  FiSearch,
  FiUser,
  FiShoppingCart,
  FiArrowRight,
} from "react-icons/fi";
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialLinkedin,
} from "react-icons/ti";
import { BiSearchAlt, BiChevronDown, BiCurrentLocation } from "react-icons/bi";

import IndexOne from "../components/HomeOne/index";
import CommonBanner from "../components/CommonBanner/CommonBanner";
import WishList from "../pages/components/WishList/WishList";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import MiniCart from "../pages/components/Cart/MiniCart/MiniCart";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ContactUs from "../pages/components/Contact Us/ContactUs";
import LogIn from "../pages/components/LogIn/LogIn";
import Register from "../pages/components/Register/Register";
import BlogSection from "../pages/components/Blog/BlogSection";
import FAQ from "../pages/components/FAQ/FAQ";
import Cart from "../pages/components/Cart/Cart";
import Checkout from "../pages/components/Checkout/Checkout";
import ProductsLeftSidebar from "../components/Products/ProductsLeftSidebar/ProductsLeftSidebar";
import ProductsFullWidth from "../components/Products/ProductsFullWidth/ProductsFullWidth";
import Product from "../components/Product/Product";

const App = () => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(AddToCart(product));
  };

  const handleAddToWishlist = (product) => {
    dispatch(AddToWishlist(product));
  };

  const handleRemoveFromWishlist = (product) => {
    dispatch(RemoveFromWishlist(product));
  };

  const handleRemoveFromCart = (product) => {
    dispatch(RemoveFromCart(product));
  };

  const handleIDecreaseQy = (product) => {
    dispatch(DecreaseQy(product));
  };

  const handleQuantityChange = (product, id, quantity) => {
    dispatch(quantityChange(product, id, quantity));
  };

  const handleBuyingProduct = (product) => {
    dispatch(buyingProduct(product));
  };

  const clearCart = () => {
    dispatch(clearCart());
  };

  const [genreFilter, setGenreFilter] = useState("");
  const [platformFilter, setPlatformFilter] = useState("");
  const [featureFilter, setFeatureFilter] = useState("");
  const [priceRangeFilter, setPriceRangeFilter] = useState({
    min: null,
    max: null,
  });

  const location = useLocation();
  const shouldRenderCommonBanner = location.pathname !== "/";

  return (
    <>
      <Header />
      {shouldRenderCommonBanner && <CommonBanner />}
      <MiniCart
        addtocart={handleAddToCart}
        decreaseqy={handleIDecreaseQy}
        removeFromCart={handleRemoveFromCart}
        quantitychange={handleQuantityChange}
        BsCartX={<BsCartX />}
      />
      <Routes>
        <Route
          path="/"
          element={
            <IndexOne
              addtocart={handleAddToCart}
              addtowishlist={handleAddToWishlist}
              removefromwishlist={handleRemoveFromWishlist}
            />
          }
        />
        <Route
          path="/FAQ"
          element={
            <FAQ
              BiSearchAlt={<BiSearchAlt />}
              FiArrowRight={<FiArrowRight />}
            />
          }
        />
        <Route
          path="/ContactUs"
          element={
            <ContactUs
              BsTelephoneXFill={<BsTelephoneXFill />}
              TiSocialFacebook={<TiSocialFacebook />}
              TiSocialTwitter={<TiSocialTwitter />}
              TiSocialLinkedin={<TiSocialLinkedin />}
              AiOutlineMail={<AiOutlineMail />}
              BiCurrentLocation={<BiCurrentLocation />}
            />
          }
        />
        <Route
          path="/Cart"
          element={
            <Cart
              addtocart={handleAddToCart}
              decreaseqy={handleIDecreaseQy}
              removeFromCart={handleRemoveFromCart}
              quantitychange={handleQuantityChange}
            />
          }
        />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/Register" element={<Register />} />

        <Route
          path="/BlogRightSidebar"
          element={
            <BlogSection
              BiSearchAlt={<BiSearchAlt />}
              TiSocialFacebook={<TiSocialFacebook />}
              TiSocialTwitter={<TiSocialTwitter />}
              TiSocialLinkedin={<TiSocialLinkedin />}
            />
          }
        />
        <Route
          path="/BlogLeftSidebar"
          element={
            <BlogSection
              BiSearchAlt={<BiSearchAlt />}
              TiSocialFacebook={<TiSocialFacebook />}
              TiSocialTwitter={<TiSocialTwitter />}
              TiSocialLinkedin={<TiSocialLinkedin />}
            />
          }
        />
        <Route
          path="/BlogNoSidebar"
          element={
            <BlogSection
              BiSearchAlt={<BiSearchAlt />}
              TiSocialFacebook={<TiSocialFacebook />}
              TiSocialTwitter={<TiSocialTwitter />}
              TiSocialLinkedin={<TiSocialLinkedin />}
            />
          }
        />
        <Route
          path="/SimpleProduct"
          element={
            <Product
              addtocart={handleAddToCart}
              addtowishlist={handleAddToWishlist}
              removefromwishlist={handleRemoveFromWishlist}
              decreaseqy={handleIDecreaseQy}
              products={products}
              quantitychange={handleQuantityChange}
              handleBuyingProduct={handleBuyingProduct}
              RiDeleteBin6Line={<RiDeleteBin6Line />}
              AiOutlineStar={<AiOutlineStar />}
              AiFillStar={<AiFillStar />}
              AiOutlineHeart={<AiOutlineHeart />}
            />
          }
        />
        <Route
          path="/NewProduct"
          element={
            <Product
              addtocart={handleAddToCart}
              addtowishlist={handleAddToWishlist}
              removefromwishlist={handleRemoveFromWishlist}
              decreaseqy={handleIDecreaseQy}
              products={products}
              quantitychange={handleQuantityChange}
              handleBuyingProduct={handleBuyingProduct}
              RiDeleteBin6Line={<RiDeleteBin6Line />}
              AiOutlineStar={<AiOutlineStar />}
              AiFillStar={<AiFillStar />}
              AiOutlineHeart={<AiOutlineHeart />}
            />
          }
        />
        <Route
          path="/SaleProduct"
          element={
            <Product
              addtocart={handleAddToCart}
              addtowishlist={handleAddToWishlist}
              removefromwishlist={handleRemoveFromWishlist}
              decreaseqy={handleIDecreaseQy}
              products={products}
              quantitychange={handleQuantityChange}
              handleBuyingProduct={handleBuyingProduct}
              RiDeleteBin6Line={<RiDeleteBin6Line />}
              AiOutlineStar={<AiOutlineStar />}
              AiFillStar={<AiFillStar />}
              AiOutlineHeart={<AiOutlineHeart />}
            />
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProductDetails
              addtocart={handleAddToCart}
              addtowishlist={handleAddToWishlist}
              removefromwishlist={handleRemoveFromWishlist}
              decreaseqy={handleIDecreaseQy}
              products={products}
              quantitychange={handleQuantityChange}
              handleBuyingProduct={handleBuyingProduct}
              RiDeleteBin6Line={<RiDeleteBin6Line />}
              AiOutlineStar={<AiOutlineStar />}
              AiFillStar={<AiFillStar />}
              AiOutlineHeart={<AiOutlineHeart />}
            />
          }
        />
        <Route
          path="/ShopSidebarLeft"
          element={
            <ProductsLeftSidebar
              setGenreFilter={setGenreFilter}
              setPriceRangeFilter={setPriceRangeFilter}
              setPlatformFilter={setPlatformFilter}
              setFeatureFilter={setFeatureFilter}
              genreFilter={genreFilter}
              priceRangeFilter={priceRangeFilter}
              platformFilter={platformFilter}
              featureFilter={featureFilter}
              addtocart={handleAddToCart}
              addtowishlist={handleAddToWishlist}
              removefromwishlist={handleRemoveFromWishlist}
              products={products}
              RiDeleteBin6Line={<RiDeleteBin6Line />}
              AiOutlineStar={<AiOutlineStar />}
              AiFillStar={<AiFillStar />}
              AiOutlineHeart={<AiOutlineHeart />}
              BiChevronDown={<BiChevronDown />}
              FiShoppingCart={<FiShoppingCart />}
            />
          }
        />
        <Route
          path="/ShopSidebarRight"
          element={
            <ProductsLeftSidebar
              setGenreFilter={setGenreFilter}
              setPriceRangeFilter={setPriceRangeFilter}
              setPlatformFilter={setPlatformFilter}
              setFeatureFilter={setFeatureFilter}
              genreFilter={genreFilter}
              priceRangeFilter={priceRangeFilter}
              platformFilter={platformFilter}
              featureFilter={featureFilter}
              addtocart={handleAddToCart}
              addtowishlist={handleAddToWishlist}
              removefromwishlist={handleRemoveFromWishlist}
              products={products}
              RiDeleteBin6Line={<RiDeleteBin6Line />}
              AiOutlineStar={<AiOutlineStar />}
              AiFillStar={<AiFillStar />}
              AiOutlineHeart={<AiOutlineHeart />}
              BiChevronDown={<BiChevronDown />}
              FiShoppingCart={<FiShoppingCart />}
            />
          }
        />
        <Route
          path="/ShopFullWidth"
          element={
            <ProductsFullWidth
              setGenreFilter={setGenreFilter}
              setPriceRangeFilter={setPriceRangeFilter}
              setPlatformFilter={setPlatformFilter}
              setFeatureFilter={setFeatureFilter}
              genreFilter={genreFilter}
              priceRangeFilter={priceRangeFilter}
              platformFilter={platformFilter}
              featureFilter={featureFilter}
              addtocart={handleAddToCart}
              addtowishlist={handleAddToWishlist}
              removefromwishlist={handleRemoveFromWishlist}
              products={products}
              RiDeleteBin6Line={<RiDeleteBin6Line />}
              AiOutlineStar={<AiOutlineStar />}
              AiFillStar={<AiFillStar />}
              AiOutlineHeart={<AiOutlineHeart />}
              BiChevronDown={<BiChevronDown />}
              FiShoppingCart={<FiShoppingCart />}
            />
          }
        />
        <Route
          path="/Wishlist"
          element={
            <WishList
              removefromwishlist={handleRemoveFromWishlist}
              addtocart={handleAddToCart}
              RiDeleteBin6Line={<RiDeleteBin6Line />}
              AiOutlineStar={<AiOutlineStar />}
              AiFillStar={<AiFillStar />}
              AiOutlineHeart={<AiOutlineHeart />}
              FiShoppingCart={<FiShoppingCart />}
              BsFillHeartbreakFill={<BsFillHeartbreakFill />}
            />
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
