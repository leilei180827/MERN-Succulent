import { STORE_RECIPIENT_INFO, CLEAR_RECIPIENT } from "../actions/types";

const initialState = {
  name: "",
  address: "",
};
export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_RECIPIENT_INFO:
      let address = composeAddress(action.payload);
      return {
        ...state,
        name: action.payload.name,
        address: address,
      };
    case CLEAR_RECIPIENT:
      return {
        name: "",
        address: "",
      };
    default:
      return { ...state };
  }
}
const composeAddress = (recipient) => {
  let result = "";
  recipient.street && (result += recipient.street);
  recipient.city && (result += "," + recipient.city);
  recipient.state && (result += "," + recipient.state);
  recipient.postcode && (result += "," + recipient.postcode);
  return result;
};
