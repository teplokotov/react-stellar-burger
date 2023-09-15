import { APIconfig } from "../../utils/constants";
import { sendNewPassword } from "../../utils/api";

// Actions

export const POST_SAVE_NEW_PASSWORD_REQUEST = 'POST_SAVE_NEW_PASSWORD_REQUEST';
export const POST_SAVE_NEW_PASSWORD_SUCCESS = 'POST_SAVE_NEW_PASSWORD_SUCCESS';
export const POST_SAVE_NEW_PASSWORD_FAILED = 'POST_SAVE_NEW_PASSWORD_FAILED';

// Middlewares (thunks)

export function saveNewPassword(password, token) {
  return function(dispatch) {
    dispatch({ type: POST_SAVE_NEW_PASSWORD_REQUEST });
    return sendNewPassword(APIconfig, password, token)
      .then(data => {
        if(data.success) {
          dispatch({ type: POST_SAVE_NEW_PASSWORD_SUCCESS });
        };
      })
      .catch(err => {
        dispatch({ type: POST_SAVE_NEW_PASSWORD_FAILED });
        console.log(err);
      });
  };
}
