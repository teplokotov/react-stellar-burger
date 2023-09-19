import { APIconfig } from "../../utils/constants";
import { getAccessToResetPassword } from "../../utils/api";

// Actions

export const POST_RESET_PASSWORD_REQUEST = 'POST_RESET_PASSWORD_REQUEST';
export const POST_RESET_PASSWORD_SUCCESS = 'POST_RESET_PASSWORD_SUCCESS';
export const POST_RESET_PASSWORD_FAILED = 'POST_RESET_PASSWORD_FAILED';

// Middlewares (thunks)

export function resetPassword(email) {
  return function(dispatch) {
    dispatch({ type: POST_RESET_PASSWORD_REQUEST });
    getAccessToResetPassword(APIconfig, email)
      .then(data => {
        if(data.success) {
          dispatch({ type: POST_RESET_PASSWORD_SUCCESS, payload: email })
        };
      })
      .catch(err => {
        dispatch({ type: POST_RESET_PASSWORD_FAILED });
        console.log(err);
      });
  };
}
