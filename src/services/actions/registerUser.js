import { APIconfig } from "../../utils/constants";
import { sendRegistrationData } from "../../utils/api";

// Actions

export const POST_REGISTER_USER_REQUEST = 'POST_REGISTER_USER_REQUEST';
export const POST_REGISTER_USER_SUCCESS = 'POST_REGISTER_USER_SUCCESS';
export const POST_REGISTER_USER_FAILED = 'POST_REGISTER_USER_FAILED';

// Middlewares (thunks)

export function registerUser(email, password, name) {
  return function(dispatch) {
    dispatch({ type: POST_REGISTER_USER_REQUEST });
    return sendRegistrationData(APIconfig, email, password, name)
      .then(data => {
        if(data.success) {
          dispatch({ type: POST_REGISTER_USER_SUCCESS });
        }
        return data;
      })
      .catch(err => {
        dispatch({ type: POST_REGISTER_USER_FAILED });
        console.log(err);
      });
  };
}
