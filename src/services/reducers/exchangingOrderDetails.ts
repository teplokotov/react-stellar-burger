import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  GET_ORDER_INFO_REQUEST,
  GET_ORDER_INFO_SUCCESS,
  GET_ORDER_INFO_FAILED,
  SET_CURRENT_ORDER_ID,
  TExchangingOrderDetailsActions
} from "../actions/exchangingOrderDetails";
import { TOrder } from "../types";

type TInitialState = {
  numOfOrder: null | number;
  isLoading: boolean;
  orderInfo: TOrder[];
  hasError: boolean;
  currentOrderID: '' | string;
};

const initialState: TInitialState = {
  numOfOrder: null,
  isLoading: false,
  orderInfo: [],
  hasError: false,
  currentOrderID: ''
};

export function exchangingOrderDetailsReducer(state = initialState, action: TExchangingOrderDetailsActions): TInitialState {
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
    case SET_CURRENT_ORDER_ID: {
      return {
        ...state,
        currentOrderID: action.currentOrderID
      };
    }
    default: {
      return state;
    }
  }
};
