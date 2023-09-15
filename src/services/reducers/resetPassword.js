import {
  POST_RESET_PASSWORD_REQUEST,
  POST_RESET_PASSWORD_SUCCESS,
  POST_RESET_PASSWORD_FAILED,
} from "../actions/resetPassword";

const initialState = {
  email: '',
};

export function resetPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case POST_RESET_PASSWORD_REQUEST: {
      return {
        ...state,
      };
    }
    case POST_RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        email: action.payload,
      };
    }
    case POST_RESET_PASSWORD_FAILED: {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
};
