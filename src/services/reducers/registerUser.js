import {
  POST_REGISTER_USER_REQUEST,
  POST_REGISTER_USER_SUCCESS,
  POST_REGISTER_USER_FAILED,
} from "../actions/registerUser";

const initialState = {};

export function registerUserReducer(state = initialState, action) {
  switch (action.type) {
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
    default: {
      return state;
    }
  }
};
