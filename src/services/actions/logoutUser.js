import { APIconfig } from "../../utils/constants";
import { getAccessToLogout } from "../../utils/api";

// Actions

export const POST_LOGOUT_USER_REQUEST = 'POST_LOGOUT_USER_REQUEST';
export const POST_LOGOUT_USER_SUCCESS = 'POST_LOGOUT_USER_SUCCESS';
export const POST_LOGOUT_USER_FAILED = 'POST_LOGOUT_USER_FAILED';

// Middlewares (thunks)

export function logoutUser(refreshToken) {
  return function(dispatch) {
    dispatch({ type: POST_LOGOUT_USER_REQUEST });
    return getAccessToLogout(APIconfig, refreshToken)
      .then(data => {
        if(data.success) {
          dispatch({ type: POST_LOGOUT_USER_SUCCESS });
        }
        return data;
      })
      .catch(err => {
        dispatch({ type: POST_LOGOUT_USER_FAILED });
        console.log(err);
      });
  };
}
