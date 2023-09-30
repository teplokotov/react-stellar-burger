import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  GET_ORDER_INFO_REQUEST,
  GET_ORDER_INFO_SUCCESS,
  GET_ORDER_INFO_FAILED,
} from "../actions/exchangingOrderDetails";

const initialState = {
  numOfOrder: null,
  isLoading: false,
  orderInfo: [],
  hasError: false,
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
    case GET_ORDER_INFO_REQUEST: {
      return {
        ...state,
        isLoading: action.isLoading
      };
    }
    case GET_ORDER_INFO_SUCCESS: {
      return {
        ...state,
        isLoading: action.isLoading,
        orderInfo: action.orderInfo
      };
    }
    case GET_ORDER_INFO_FAILED: {
      return {
        ...state,
        hasError: action.hasError
      };
    }
    default: {
      return state;
    }
  }
};
