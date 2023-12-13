import {
  ADD_TO_CART,
  ADD_TO_WISHLIST,
  BUYING_PRODUCT,
  DECREASE_QY,
  QUANTITY_CHANGE,
  REMOVE_FROM_CART,
  REMOVE_FROM_WISHLIST,
} from "../constants/action_types";

export const AddToCart = (product) => {
  return { type: ADD_TO_CART, payload: product };
};

export const AddToWishlist = (product) => {
  return { type: ADD_TO_WISHLIST, payload: product };
};

export const RemoveFromCart = (product) => {
  return { type: REMOVE_FROM_CART, payload: product };
};

export const RemoveFromWishlist = (product) => {
  return { type: REMOVE_FROM_WISHLIST, payload: product };
};

export const buyingProduct = (product) => {
  return { type: BUYING_PRODUCT, payload: product };
};

export const DecreaseQy = (product) => {
  return { type: DECREASE_QY, payload: product };
};

export const quantityChange = (product, id, quantity) => {
  return { type: QUANTITY_CHANGE, payload: { product, id, quantity } };
};
