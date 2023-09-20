import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
} from "../actions/exchangingOrderDetails";

const initialState = {
  numOfOrder: null,
  isLoading: false
};

export function exchangingOrderDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        isLoading: action.isLoading
      };
    }
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        numOfOrder: action.numOfOrder,
        isLoading: action.isLoading
      };
    }
    case POST_ORDER_FAILED: {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
};
