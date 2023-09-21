import {
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILED,
  PATCH_USER_INFO_REQUEST,
  PATCH_USER_INFO_SUCCESS,
  PATCH_USER_INFO_FAILED,
  SET_AUTH_CHECKED,
  RESET_USER_INFO,
  POST_LOGIN_USER_REQUEST,
  POST_LOGIN_USER_SUCCESS,
  POST_LOGIN_USER_FAILED,
  POST_LOGOUT_USER_REQUEST,
  POST_LOGOUT_USER_SUCCESS,
  POST_LOGOUT_USER_FAILED,
  POST_REGISTER_USER_REQUEST,
  POST_REGISTER_USER_SUCCESS,
  POST_REGISTER_USER_FAILED,
  POST_RESET_PASSWORD_REQUEST,
  POST_RESET_PASSWORD_SUCCESS,
  POST_RESET_PASSWORD_FAILED,
  POST_SAVE_NEW_PASSWORD_REQUEST,
  POST_SAVE_NEW_PASSWORD_SUCCESS,
  POST_SAVE_NEW_PASSWORD_FAILED,
} from "../actions/userInfo";

const initialState = {
  email: null,
  firstname: null,
  password: null,
  isAuthChecked: false,
};

export function exchangingUserInfoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_INFO_REQUEST: {
      return {
        ...state,
      };
    }
    case GET_USER_INFO_SUCCESS: {
      return {
        ...state,
        email: action.email,
        firstname: action.firstname
      };
    }
    case GET_USER_INFO_FAILED: {
      return {
        ...state,
      };
    }
    case PATCH_USER_INFO_REQUEST: {
      return {
        ...state,
      };
    }
    case PATCH_USER_INFO_SUCCESS: {
      return {
        ...state,
        email: action.email,
        firstname: action.firstname,
        password: action.password
      };
    }
    case PATCH_USER_INFO_FAILED: {
      return {
        ...state,
      };
    }
    case SET_AUTH_CHECKED: {
      return {
        ...state,
        isAuthChecked: action.isAuthChecked
      };
    }
    case RESET_USER_INFO: {
      return {
        ...state,
        email: null,
        firstname: null,
        password: null,
      };
    }
    case POST_LOGIN_USER_REQUEST: {
      return {
        ...state,
      };
    }
    case POST_LOGIN_USER_SUCCESS: {
      return {
        ...state,
        email: action.email,
        firstname: action.firstname,
      };
    }
    case POST_LOGIN_USER_FAILED: {
      return {
        ...state,
      };
    }
    case POST_LOGOUT_USER_REQUEST: {
      return {
        ...state,
      };
    }
    case POST_LOGOUT_USER_SUCCESS: {
      return {
        ...state,
      };
    }
    case POST_LOGOUT_USER_FAILED: {
      return {
        ...state,
      };
    }
    case POST_REGISTER_USER_REQUEST: {
      return {
        ...state,
      };
    }
    case POST_REGISTER_USER_SUCCESS: {
      return {
        ...state,
      };
    }
    case POST_REGISTER_USER_FAILED: {
      return {
        ...state,
      };
    }
    case POST_RESET_PASSWORD_REQUEST: {
      return {
        ...state,
      };
    }
    case POST_RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        email: action.email,
      };
    }
    case POST_RESET_PASSWORD_FAILED: {
      return {
        ...state,
      };
    }
    case POST_SAVE_NEW_PASSWORD_REQUEST: {
      return {
        ...state,
      };
    }
    case POST_SAVE_NEW_PASSWORD_SUCCESS: {
      return {
        ...state,
      };
    }
    case POST_SAVE_NEW_PASSWORD_FAILED: {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
};
