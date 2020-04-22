import { STORE_RECIPIENT_INFO ,CLEAR_RECIPIENT} from "./types";
export const store_recipient_info = (recipient) => {
  return { type: STORE_RECIPIENT_INFO, payload: recipient };
};
export const clear_recipient=()=>{
  return {type:CLEAR_RECIPIENT}
}
