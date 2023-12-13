import {
  ADD_TO_CART,
  ADD_TO_WISHLIST,
  BUYING_PRODUCT,
  DECREASE_QY,
  QUANTITY_CHANGE,
  REMOVE_FROM_CART,
  REMOVE_FROM_WISHLIST,
} from "../constants/action_types";

const items =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const wishListItems =
  localStorage.getItem("wishList") !== null
    ? JSON.parse(localStorage.getItem("wishList"))
    : [];

const initialState = {
  cart: items,
  wishlist: wishListItems,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: action.payload,
      };

    case ADD_TO_WISHLIST:
      return {
        ...state,
        wishlist: action.payload,
      };

    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: action.payload,
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: action.payload,
      };

    case DECREASE_QY:
      return {
        ...state,
        cart: action.payload,
      };

    case QUANTITY_CHANGE:
      return {
        ...state,
        cart: action.payload,
      };

    case BUYING_PRODUCT:
      return {
        ...state,
        cart: action.payload,
      };

    default:
      return state;
  }
};

export const middleware = (store) => (next) => (action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return handleAddToCart(store, next, action);

    case ADD_TO_WISHLIST:
      return handleAddToWishlist(store, next, action);

    case REMOVE_FROM_CART:
      return handleRemoveFromCart(store, next, action);

    case REMOVE_FROM_WISHLIST:
      return handleRemoveFromWishlist(store, next, action);

    case DECREASE_QY:
      return handleDecreaseQuantity(store, next, action);

    case QUANTITY_CHANGE:
      return handleQuantityChange(store, next, action);

    case BUYING_PRODUCT:
      return handleBuyingProduct(store, next, action);

    default:
      return next(action);
  }
};

const handleAddToCart = (store, next, action) => {
  const cart = store.getState().cart;
  const findIndex = cart.findIndex((item) => item.id === action.payload.id);

  let newCart;

  if (findIndex !== -1) {
    const increasedItem = {
      ...cart[findIndex],
      quantity: cart[findIndex].quantity + 1,
    };
    newCart = [...cart];
    newCart[findIndex] = increasedItem;
  } else {
    const newItem = {
      ...action.payload,
      quantity: 1,
    };
    newCart = [...cart, newItem];
  }

  const modifiedAction = {
    ...action,
    payload: newCart,
  };

  localStorage.setItem(
    "cartItems",
    JSON.stringify(newCart.map((item) => item))
  );

  // Dispatch the modified action
  return next(modifiedAction);
};

const handleAddToWishlist = (store, next, action) => {
  // Dispatch the modified action
  const wishlist = store.getState().wishlist;

  let newWishlist = [...wishlist, action.payload];

  const modifiedAction = {
    ...action,
    payload: newWishlist,
  };

  localStorage.setItem(
    "wishList",
    JSON.stringify(newWishlist.map((item) => item))
  );

  return next(modifiedAction);
};

const handleRemoveFromCart = (store, next, action) => {
  const cart = store.getState().cart;
  const filterCart = cart.filter((item) => item.id !== action.payload.id);
  const modifiedAction = {
    ...action,
    payload: filterCart,
  };

  localStorage.setItem(
    "cartItems",
    JSON.stringify(filterCart.map((item) => item))
  );

  // Dispatch the modified action
  return next(modifiedAction);
};

const handleRemoveFromWishlist = (store, next, action) => {
  const wishlist = store.getState().wishlist;
  const filterWishlist = wishlist.filter(
    (item) => item.id !== action.payload.id
  );
  const modifiedAction = {
    ...action,
    payload: filterWishlist,
  };

  localStorage.setItem(
    "wishList",
    JSON.stringify(filterWishlist.map((item) => item))
  );

  // Dispatch the modified action
  return next(modifiedAction);
};

const handleDecreaseQuantity = (store, next, action) => {
  const cart = store.getState().cart;
  const decreasedItemIndex = cart.findIndex(
    (item) => item.id === action.payload.id
  );

  let decreasedCart;
  if (decreasedItemIndex !== -1) {
    const decreasedItem = {
      ...cart[decreasedItemIndex],
      quantity: cart[decreasedItemIndex].quantity - 1,
    };
    decreasedCart = [...cart];
    if (decreasedItem.quantity === 0) {
      decreasedCart.splice(decreasedItemIndex, 1);
    } else {
      decreasedCart[decreasedItemIndex] = decreasedItem;
    }
  } else {
    decreasedCart = [...cart];
  }

  const modifiedAction = {
    ...action,
    payload: decreasedCart,
  };

  localStorage.setItem(
    "cartItems",
    JSON.stringify(decreasedCart.map((item) => item))
  );

  // Dispatch the modified action
  return next(modifiedAction);
};

const handleQuantityChange = (store, next, action) => {
  const cart = store.getState().cart;
  const findItem = cart.findIndex((item) => item.id === action.payload.id);

  let newCart;

  if (findItem !== -1) {
    if (+action.payload.quantity > 0) {
      const changeQuantity = {
        ...cart[findItem],
        quantity: +action.payload.quantity,
      };
      newCart = [...cart];
      newCart[findItem] = changeQuantity;
    } else {
      newCart = [...cart];
      newCart.splice(findItem, 1);
    }
  } else {
    if (+action.payload.quantity > 0) {
      const newProduct = {
        ...action.payload.product,
        quantity: +action.payload.quantity,
      };
      newCart = [...cart, newProduct];
    } else {
      newCart = [...cart];
    }
  }

  const modifiedAction = {
    ...action,
    payload: newCart,
  };

  localStorage.setItem(
    "cartItems",
    JSON.stringify(newCart.map((item) => item))
  );

  return next(modifiedAction);
};

const handleBuyingProduct = (store, next, action) => {
  const cart = store.getState().cart;
  const findItem = cart.findIndex((item) => item.id === action.payload.id);

  let newCart;

  if (findItem === -1) {
    const newProduct = {
      ...action.payload,
    };
    newCart = [...cart, newProduct];
  } else {
    newCart = [...cart];
  }

  const modifiedAction = {
    ...action,
    payload: newCart,
  };

  localStorage.setItem("cartItems", JSON.stringify(cart.map((item) => item)));

  return next(modifiedAction);
};

export default reducer;
