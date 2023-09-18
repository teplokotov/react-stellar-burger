import { APIconfig } from "../../utils/constants";
import { getAccessToLogin } from "../../utils/api";

// Actions

export const POST_LOGIN_USER_REQUEST = 'POST_LOGIN_USER_REQUEST';
export const POST_LOGIN_USER_SUCCESS = 'POST_LOGIN_USER_SUCCESS';
export const POST_LOGIN_USER_FAILED = 'POST_LOGIN_USER_FAILED';

// Middlewares (thunks)

export function loginUser(email, password) {
  return function(dispatch) {
    dispatch({ type: POST_LOGIN_USER_REQUEST });
    return getAccessToLogin(APIconfig, email, password)
      .then(data => {
        if(data.success) {
          dispatch({ type: POST_LOGIN_USER_SUCCESS });
        }
        return data;
      })
      .catch(err => {
        dispatch({ type: POST_LOGIN_USER_FAILED });
        console.log(err);
      });
  };
}
