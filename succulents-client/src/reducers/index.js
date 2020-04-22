import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import userReducer from "./userReducer";
import recipientReducer from "./recipientReducer";
export default combineReducers({
  cart: cartReducer,
  user: userReducer,
  recipient: recipientReducer,
});
