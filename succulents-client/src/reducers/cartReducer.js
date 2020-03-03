import {
  REMOVE_FROM_CART,
  DECREMENT,
  INCREMENT,
  ADD_TO_CART
} from "../actions/types";

const initialState = {
  inCart: []
};
export default function(state = initialState, action) {
  switch (action.type) {
    case REMOVE_FROM_CART:
      return {
        ...state,
        inCart: state.inCart.filter(item => item.id !== action.payload)
      };
    case ADD_TO_CART:
      return { ...state, inCart: [action.payload, ...state.inCart] };
    case INCREMENT:
      return {
        ...state,
        inCart: state.inCart.map(item => {
          if (item.id === action.payload) {
            item.quantity++;
          }
          return item;
        })
      };
    case DECREMENT:
      return {
        ...state,
        inCart: state.inCart.map(item => {
          if (item.id === action.payload && item.quantity > 1) {
            item.quantity--;
          }
          return item;
        })
      };
    default:
      return { ...state };
  }
}
