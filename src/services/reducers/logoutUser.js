import {
  POST_LOGOUT_USER_REQUEST,
  POST_LOGOUT_USER_SUCCESS,
  POST_LOGOUT_USER_FAILED,
} from "../actions/logoutUser";

const initialState = {};

export function logoutUserReducer(state = initialState, action) {
  switch (action.type) {
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
    default: {
      return state;
    }
  }
};
