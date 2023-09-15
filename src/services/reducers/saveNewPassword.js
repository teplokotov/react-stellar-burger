import {
  POST_SAVE_NEW_PASSWORD_REQUEST,
  POST_SAVE_NEW_PASSWORD_SUCCESS,
  POST_SAVE_NEW_PASSWORD_FAILED,
} from "../actions/saveNewPassword";

const initialState = {};

export function saveNewPasswordReducer(state = initialState, action) {
  switch (action.type) {
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
