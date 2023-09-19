import {
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILED,
  PATCH_USER_INFO_REQUEST,
  PATCH_USER_INFO_SUCCESS,
  PATCH_USER_INFO_FAILED
} from "../actions/userInfo";

const initialState = {
  email: null,
  firstname: null,
  password: null
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
    default: {
      return state;
    }
  }
};
