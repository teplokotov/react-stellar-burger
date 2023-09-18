import {
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILED,
} from "../actions/userInfo";

const initialState = {
  email: null,
  firstname: null
};

export function getUserInfoReducer(state = initialState, action) {
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
    default: {
      return state;
    }
  }
};
