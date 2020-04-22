import { LOGIN, LOGOUT, REGISTER, STORE_USER_INFO } from "./types";
export const loginReducer = (response) => {
  return { type: LOGIN, payload: response };
};
export const store_user_info = (user) => {
  return { type: STORE_USER_INFO, payload: user };
};
export const register = (id) => {
  return { type: REGISTER, payload: id };
};
export const logoutReducer = (id) => {
  return { type: LOGOUT, payload: id };
};
