import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
} from "../actions/exchangingOrderDetails";

const initialState = {
  numOfOrder: null,
};

export function exchangingOrderDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case POST_ORDER_REQUEST: {
      return {
        ...state,
      };
    }
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        numOfOrder: action.payload,
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
