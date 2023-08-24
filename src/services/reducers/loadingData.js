import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
} from "../actions";

const initialState = {
  data: [],
  isLoading: false,
  hasError: false,
};

export function loadingDataReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        hasError: false,
        data: action.data,
      };
    }
    case GET_ITEMS_FAILED: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    }
    default: {
      return state;
    }
  }
};
