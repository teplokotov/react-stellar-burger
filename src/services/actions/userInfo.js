import { APIconfig } from "../../utils/constants";
import { getUserInfoRequest, sendUserInfoRequest } from "../../utils/api";

// Actions

export const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAILED = 'GET_USER_INFO_FAILED';

export const PATCH_USER_INFO_REQUEST = 'PATCH_USER_INFO_REQUEST';
export const PATCH_USER_INFO_SUCCESS = 'PATCH_USER_INFO_SUCCESS';
export const PATCH_USER_INFO_FAILED = 'PATCH_USER_INFO_FAILED';

export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';
export const RESET_USER_INFO = 'RESET_USER_INFO';

// Middlewares (thunks)

export function getUserInfo(accessToken) {
  return function(dispatch) {
    dispatch({ type: GET_USER_INFO_REQUEST });
    return getUserInfoRequest(APIconfig, accessToken)
      .then(data => {
        if(data.success) {
          dispatch({
            type: GET_USER_INFO_SUCCESS,
            email: data.user.email,
            firstname: data.user.name
          });
        }
        return data;
      })
      .catch(err => {
        dispatch({ type: GET_USER_INFO_FAILED });
        console.log(err);
      });
  };
}

export function sendUserInfo(accessToken, email, password, name) {
  return function(dispatch) {
    dispatch({ type: PATCH_USER_INFO_REQUEST });
    return sendUserInfoRequest(APIconfig, accessToken, email, password, name)
      .then(data => {
        if(data.success) {
          dispatch({ type: PATCH_USER_INFO_SUCCESS });
        }
        return data;
      })
      .catch(err => {
        dispatch({ type: PATCH_USER_INFO_FAILED });
        console.log(err);
      });
  };
}

export function checkUserAuth(accessToken) {
  return function(dispatch) {
    dispatch({ type: GET_USER_INFO_REQUEST });
    if (accessToken) {
      getUserInfoRequest(APIconfig, accessToken)
        .then(data => {
          if(data.success) {
            dispatch({
              type: GET_USER_INFO_SUCCESS,
              email: data.user.email,
              firstname: data.user.name
            });
          }
        })
        .catch(() => {
          dispatch({ type: GET_USER_INFO_FAILED, email: null, firstname: null});
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        })
        .finally(() => dispatch({ type: SET_AUTH_CHECKED, isAuthChecked: true }));
    } else {
      dispatch({ type: SET_AUTH_CHECKED, isAuthChecked: true });
    }
  };
};
