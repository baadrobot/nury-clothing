import { CategoryItem } from "../categories/category.types";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { createAction, withMatcher, Action, ActionWithPayload } from "../../utils/reducer/reducer.utils";

// cart adding function that is also decides if it should add new items to cart
// or if there already that kind of item just add a quantity of it
const addCartItem = (
    cartItems: CartItem[], 
    productToAdd: CategoryItem
  ): CartItem[] => {
    // find if carItems contains productToAdds
      const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === productToAdd.id
    );
  
    // if above is found then increment the quantity and return the function
    if (existingCartItem) {
      return cartItems.map((cartItem) =>
        cartItem.id === productToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    }
  
      // if none of above matched then it means the function valled 1st time
      //  then return new array with modified cartItems/ new cart item and add quantity 1
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};
  
const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem): CartItem[] => {
    // find the cart item to remove
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === cartItemToRemove.id
    );
  
    // check if quantity is equal to 1, if it is remove that item from the cart
    if (existingCartItem && existingCartItem.quantity === 1) {
      return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    }
  
    // return back cartitems with matching cart item with reduced quantity
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
};

const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem): CartItem[] =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem>;

export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen => 
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean));

export const setCartItems = withMatcher(
  (cartItems: CartItem[]) =>
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);


export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return setCartItems(newCartItems);
};
export const removeItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const clearItemFromCart = (cartItems: CartItem[], cartItemToClear: CartItem) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};