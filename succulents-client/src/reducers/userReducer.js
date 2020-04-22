import { LOGIN, LOGOUT, REGISTER, STORE_USER_INFO } from "../actions/types";

const initialState = {
  isLoggedIn: false,
  token: "",
  userInfo: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
      };
    case STORE_USER_INFO:
      return { ...state, userInfo: action.payload };
    case LOGOUT:
      return { isLoggedIn: false, token: "", userInfo: {} };
    default:
      return { ...state };
  }
}
