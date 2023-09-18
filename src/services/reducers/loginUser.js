import {
  POST_LOGIN_USER_REQUEST,
  POST_LOGIN_USER_SUCCESS,
  POST_LOGIN_USER_FAILED,
} from "../actions/loginUser";

const initialState = {};

export function loginUserReducer(state = initialState, action) {
  switch (action.type) {
    case POST_LOGIN_USER_REQUEST: {
      return {
        ...state,
      };
    }
    case POST_LOGIN_USER_SUCCESS: {
      return {
        ...state,
      };
    }
    case POST_LOGIN_USER_FAILED: {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
};
