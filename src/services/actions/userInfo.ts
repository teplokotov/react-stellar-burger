import { APIconfig } from "../../utils/constants";
import { getUserInfoRequest,
         sendUserInfoRequest,
         getAccessToLogin,
         getAccessToLogout,
         sendRegistrationData,
         getAccessToResetPassword,
         sendNewPassword
} from "../../utils/api";
import { AppDispatch, AppThunk } from "../types";

// Actions

export const GET_USER_INFO_REQUEST: 'GET_USER_INFO_REQUEST' = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS: 'GET_USER_INFO_SUCCESS' = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAILED: 'GET_USER_INFO_FAILED' = 'GET_USER_INFO_FAILED';

export const PATCH_USER_INFO_REQUEST: 'PATCH_USER_INFO_REQUEST' = 'PATCH_USER_INFO_REQUEST';
export const PATCH_USER_INFO_SUCCESS: 'PATCH_USER_INFO_SUCCESS' = 'PATCH_USER_INFO_SUCCESS';
export const PATCH_USER_INFO_FAILED: 'PATCH_USER_INFO_FAILED' = 'PATCH_USER_INFO_FAILED';

export const SET_AUTH_CHECKED: 'SET_AUTH_CHECKED' = 'SET_AUTH_CHECKED';
export const RESET_USER_INFO: 'RESET_USER_INFO' = 'RESET_USER_INFO';

export const POST_LOGIN_USER_REQUEST: 'POST_LOGIN_USER_REQUEST' = 'POST_LOGIN_USER_REQUEST';
export const POST_LOGIN_USER_SUCCESS: 'POST_LOGIN_USER_SUCCESS' = 'POST_LOGIN_USER_SUCCESS';
export const POST_LOGIN_USER_FAILED: 'POST_LOGIN_USER_FAILED' = 'POST_LOGIN_USER_FAILED';

export const POST_LOGOUT_USER_REQUEST: 'POST_LOGOUT_USER_REQUEST' = 'POST_LOGOUT_USER_REQUEST';
export const POST_LOGOUT_USER_SUCCESS: 'POST_LOGOUT_USER_SUCCESS' = 'POST_LOGOUT_USER_SUCCESS';
export const POST_LOGOUT_USER_FAILED: 'POST_LOGOUT_USER_FAILED' = 'POST_LOGOUT_USER_FAILED';

export const POST_REGISTER_USER_REQUEST: 'POST_REGISTER_USER_REQUEST' = 'POST_REGISTER_USER_REQUEST';
export const POST_REGISTER_USER_SUCCESS: 'POST_REGISTER_USER_SUCCESS' = 'POST_REGISTER_USER_SUCCESS';
export const POST_REGISTER_USER_FAILED: 'POST_REGISTER_USER_FAILED' = 'POST_REGISTER_USER_FAILED';

export const POST_RESET_PASSWORD_REQUEST: 'POST_RESET_PASSWORD_REQUEST' = 'POST_RESET_PASSWORD_REQUEST';
export const POST_RESET_PASSWORD_SUCCESS: 'POST_RESET_PASSWORD_SUCCESS' = 'POST_RESET_PASSWORD_SUCCESS';
export const POST_RESET_PASSWORD_FAILED: 'POST_RESET_PASSWORD_FAILED' = 'POST_RESET_PASSWORD_FAILED';

export const POST_SAVE_NEW_PASSWORD_REQUEST: 'POST_SAVE_NEW_PASSWORD_REQUEST' = 'POST_SAVE_NEW_PASSWORD_REQUEST';
export const POST_SAVE_NEW_PASSWORD_SUCCESS: 'POST_SAVE_NEW_PASSWORD_SUCCESS' = 'POST_SAVE_NEW_PASSWORD_SUCCESS';
export const POST_SAVE_NEW_PASSWORD_FAILED: 'POST_SAVE_NEW_PASSWORD_FAILED' = 'POST_SAVE_NEW_PASSWORD_FAILED';

export interface IGetUserInfoRequest {
  readonly type: typeof GET_USER_INFO_REQUEST;
}

export interface IGetUserInfoSuccess {
  firstname: string;
  email: string;
  readonly type: typeof GET_USER_INFO_SUCCESS;
}

export interface IGetUserInfoFailed {
  readonly type: typeof GET_USER_INFO_FAILED;
}

export interface IPatchUserInfoRequest {
  readonly type: typeof PATCH_USER_INFO_REQUEST;
}

export interface IPatchUserInfoSuccess {
  readonly type: typeof PATCH_USER_INFO_SUCCESS;
}

export interface IPatchUserInfoFailed {
  readonly type: typeof PATCH_USER_INFO_FAILED;
}

export interface ISetAuthChecked {
  isAuthChecked: boolean;
  readonly type: typeof SET_AUTH_CHECKED;
}

export interface IResetUserInfo {
  readonly type: typeof RESET_USER_INFO;
}

export interface IPostLoginUserRequest {
  readonly type: typeof POST_LOGIN_USER_REQUEST;
}

export interface IPostLoginUserSuccess {
  firstname: string;
  email: string;
  readonly type: typeof POST_LOGIN_USER_SUCCESS;
}

export interface IPostLoginUserFailed {
  readonly type: typeof POST_LOGIN_USER_FAILED;
}

export interface IPostLogoutUserRequest {
  readonly type: typeof POST_LOGOUT_USER_REQUEST;
}

export interface IPostLogoutUserSuccess {
  readonly type: typeof POST_LOGOUT_USER_SUCCESS;
}

export interface IPostLogoutUserFailed {
  readonly type: typeof POST_LOGOUT_USER_FAILED;
}

export interface IPostRegisterUserRequest {
  readonly type: typeof POST_REGISTER_USER_REQUEST;
}

export interface IPostRegisterUserSuccess {
  readonly type: typeof POST_REGISTER_USER_SUCCESS;
}

export interface IPostRegisterUserFailed {
  readonly type: typeof POST_REGISTER_USER_FAILED;
}

export interface IPostResetPasswordRequest {
  readonly type: typeof POST_RESET_PASSWORD_REQUEST;
}

export interface IPostResetPasswordSuccess {
  email: string;
  readonly type: typeof POST_RESET_PASSWORD_SUCCESS;
}

export interface IPostResetPasswordFailed {
  readonly type: typeof POST_RESET_PASSWORD_FAILED;
}

export interface IPostSaveNewPasswordRequest {
  readonly type: typeof POST_SAVE_NEW_PASSWORD_REQUEST;
}

export interface IPostSaveNewPasswordSuccess {
  readonly type: typeof POST_SAVE_NEW_PASSWORD_SUCCESS;
}

export interface IPostSaveNewPasswordFailed {
  readonly type: typeof POST_SAVE_NEW_PASSWORD_FAILED;
}

export type TUserInfoActions =
    IGetUserInfoRequest
  | IGetUserInfoSuccess
  | IGetUserInfoFailed
  | IPatchUserInfoRequest
  | IPatchUserInfoSuccess
  | IPatchUserInfoFailed
  | ISetAuthChecked
  | IResetUserInfo
  | IPostLoginUserRequest
  | IPostLoginUserSuccess
  | IPostLoginUserFailed
  | IPostLogoutUserRequest
  | IPostLogoutUserSuccess
  | IPostLogoutUserFailed
  | IPostRegisterUserRequest
  | IPostRegisterUserSuccess
  | IPostRegisterUserFailed
  | IPostResetPasswordRequest
  | IPostResetPasswordSuccess
  | IPostResetPasswordFailed
  | IPostSaveNewPasswordRequest
  | IPostSaveNewPasswordSuccess
  | IPostSaveNewPasswordFailed;

// Middlewares (thunks)

export function getUserInfo(): AppThunk {
  const accessToken = localStorage.getItem("accessToken");
  return function(dispatch: AppDispatch) {
    dispatch({ type: GET_USER_INFO_REQUEST });
    return accessToken && getUserInfoRequest(APIconfig, accessToken)
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

export function sendUserInfo(email: string, password: string, name?: string): AppThunk {
  const accessToken = localStorage.getItem("accessToken");
  return function(dispatch: AppDispatch) {
    dispatch({ type: PATCH_USER_INFO_REQUEST });
    return accessToken && sendUserInfoRequest(APIconfig, accessToken, email, password, name)
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

export function checkUserAuth(): AppThunk {
  const accessToken = localStorage.getItem("accessToken");
  return function(dispatch: AppDispatch) {
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

export function loginUser(email: string, password: string): AppThunk {
  return function(dispatch: AppDispatch) {
    dispatch({ type: POST_LOGIN_USER_REQUEST });
    getAccessToLogin(APIconfig, email, password)
      .then(data => {
        if(data.success) {
          dispatch({
            type: POST_LOGIN_USER_SUCCESS,
            email: data.user.email,
            firstname: data.user.name
          });
          localStorage.setItem("refreshToken", data.refreshToken);
          localStorage.setItem("accessToken", data.accessToken);
        }
      })
      .catch(err => {
        dispatch({ type: POST_LOGIN_USER_FAILED });
        console.log(err);
      });
  };
}

export function logoutUser(): AppThunk {
  const refreshToken = localStorage.getItem("refreshToken");
  return function(dispatch: AppDispatch) {
    dispatch({ type: POST_LOGOUT_USER_REQUEST });
    refreshToken && getAccessToLogout(APIconfig, refreshToken)
      .then(data => {
        if(data.success) {
          dispatch({ type: POST_LOGOUT_USER_SUCCESS });
          dispatch({ type: RESET_USER_INFO });
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("accessToken");
        }
      })
      .catch(err => {
        dispatch({ type: POST_LOGOUT_USER_FAILED });
        console.log(err);
      });
  };
}

export function registerUser(email: string, password: string, name: string): AppThunk {
  return function(dispatch: AppDispatch) {
    dispatch({ type: POST_REGISTER_USER_REQUEST });
    sendRegistrationData(APIconfig, email, password, name)
      .then(data => {
        if(data.success) {
          dispatch({ type: POST_REGISTER_USER_SUCCESS });
          localStorage.setItem("refreshToken", data.refreshToken);
          localStorage.setItem("accessToken", data.accessToken);
        }
      })
      .catch(err => {
        dispatch({ type: POST_REGISTER_USER_FAILED });
        console.log(err);
      });
  };
}

export function resetPassword(email: string): AppThunk {
  return function(dispatch: AppDispatch) {
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

export function saveNewPassword(password: string, token: string): AppThunk {
  return function(dispatch: AppDispatch) {
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
