import { REMOVE_FROM_CART, DECREMENT, INCREMENT, ADD_TO_CART } from "./types";
export const increment = id => {
  return { type: INCREMENT, payload: id };
};
export const add_to_cart = item => {
  return { type: ADD_TO_CART, payload: item };
};
export const decrement = id => {
  return { type: DECREMENT, payload: id };
};
export const remove_from_cart = id => {
  return { type: REMOVE_FROM_CART, payload: id };
};
