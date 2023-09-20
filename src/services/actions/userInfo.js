import { APIconfig } from "../../utils/constants";
import { getUserInfoRequest,
         sendUserInfoRequest,
         getAccessToLogin,
         getAccessToLogout,
         sendRegistrationData,
         getAccessToResetPassword,
         sendNewPassword
} from "../../utils/api";

// Actions

export const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAILED = 'GET_USER_INFO_FAILED';

export const PATCH_USER_INFO_REQUEST = 'PATCH_USER_INFO_REQUEST';
export const PATCH_USER_INFO_SUCCESS = 'PATCH_USER_INFO_SUCCESS';
export const PATCH_USER_INFO_FAILED = 'PATCH_USER_INFO_FAILED';

export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';
export const RESET_USER_INFO = 'RESET_USER_INFO';

export const POST_LOGIN_USER_REQUEST = 'POST_LOGIN_USER_REQUEST';
export const POST_LOGIN_USER_SUCCESS = 'POST_LOGIN_USER_SUCCESS';
export const POST_LOGIN_USER_FAILED = 'POST_LOGIN_USER_FAILED';

export const POST_LOGOUT_USER_REQUEST = 'POST_LOGOUT_USER_REQUEST';
export const POST_LOGOUT_USER_SUCCESS = 'POST_LOGOUT_USER_SUCCESS';
export const POST_LOGOUT_USER_FAILED = 'POST_LOGOUT_USER_FAILED';

export const POST_REGISTER_USER_REQUEST = 'POST_REGISTER_USER_REQUEST';
export const POST_REGISTER_USER_SUCCESS = 'POST_REGISTER_USER_SUCCESS';
export const POST_REGISTER_USER_FAILED = 'POST_REGISTER_USER_FAILED';

export const POST_RESET_PASSWORD_REQUEST = 'POST_RESET_PASSWORD_REQUEST';
export const POST_RESET_PASSWORD_SUCCESS = 'POST_RESET_PASSWORD_SUCCESS';
export const POST_RESET_PASSWORD_FAILED = 'POST_RESET_PASSWORD_FAILED';

export const POST_SAVE_NEW_PASSWORD_REQUEST = 'POST_SAVE_NEW_PASSWORD_REQUEST';
export const POST_SAVE_NEW_PASSWORD_SUCCESS = 'POST_SAVE_NEW_PASSWORD_SUCCESS';
export const POST_SAVE_NEW_PASSWORD_FAILED = 'POST_SAVE_NEW_PASSWORD_FAILED';

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

export function loginUser(email, password) {
  return function(dispatch) {
    dispatch({ type: POST_LOGIN_USER_REQUEST });
    return getAccessToLogin(APIconfig, email, password)
      .then(data => {
        if(data.success) {
          dispatch({
            type: POST_LOGIN_USER_SUCCESS,
            email: data.user.email,
            firstname: data.user.name
          });
        }
        return data;
      })
      .catch(err => {
        dispatch({ type: POST_LOGIN_USER_FAILED });
        console.log(err);
      });
  };
}

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

export function resetPassword(email) {
  return function(dispatch) {
    dispatch({ type: POST_RESET_PASSWORD_REQUEST });
    getAccessToResetPassword(APIconfig, email)
      .then(data => {
        if(data.success) {
          dispatch({ type: POST_RESET_PASSWORD_SUCCESS, email: email })
        };
      })
      .catch(err => {
        dispatch({ type: POST_RESET_PASSWORD_FAILED });
        console.log(err);
      });
  };
}

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
