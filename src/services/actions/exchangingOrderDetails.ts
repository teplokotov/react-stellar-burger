import { APIconfig } from "../../utils/constants";
import { sendOrderToServer, getOrderInfoRequest } from "../../utils/api";
import { OPEN_MODAL } from "./modal";
import { CLEAR_CART } from "./cart";
import { AppDispatch, AppThunk } from "../types";

// Actions

export const POST_ORDER_REQUEST: 'POST_ORDER_REQUEST' = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS: 'POST_ORDER_SUCCESS' = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED: 'POST_ORDER_FAILED' = 'POST_ORDER_FAILED';

export const GET_ORDER_INFO_REQUEST: 'GET_ORDER_INFO_REQUEST' = 'GET_ORDER_INFO_REQUEST';
export const GET_ORDER_INFO_SUCCESS: 'GET_ORDER_INFO_SUCCESS' = 'GET_ORDER_INFO_SUCCESS';
export const GET_ORDER_INFO_FAILED: 'GET_ORDER_INFO_FAILED' = 'GET_ORDER_INFO_FAILED';

export const SET_CURRENT_ORDER_ID: 'SET_CURRENT_ORDER_ID' = 'SET_CURRENT_ORDER_ID';

export interface IPostOrderRequest {
  isLoading: boolean;
  readonly type: typeof POST_ORDER_REQUEST;
}

export interface IPostOrderSuccess {
  isLoading: boolean;
  numOfOrder: number | null;
  readonly type: typeof POST_ORDER_SUCCESS;
}

export interface IPostOrderFailed{
  readonly type: typeof POST_ORDER_FAILED;
}

export interface IGetOrderInfoRequest {
  isLoading: boolean;
  readonly type: typeof GET_ORDER_INFO_REQUEST;
}

export interface IGetOrderInfoSuccess {
  orderInfo: string[];
  isLoading: boolean;
  readonly type: typeof GET_ORDER_INFO_SUCCESS;
}

export interface IGetOrderInfoFailed {
  hasError: boolean;
  readonly type: typeof GET_ORDER_INFO_FAILED;
}

export interface ISetCurrentOrderId {
  currentOrderID: number | "";
  readonly type: typeof SET_CURRENT_ORDER_ID;
}

export type TExchangingOrderDetailsActions =
    IPostOrderRequest
  | IPostOrderSuccess
  | IPostOrderFailed
  | IGetOrderInfoRequest
  | IGetOrderInfoSuccess
  | IGetOrderInfoFailed
  | ISetCurrentOrderId;

// Middlewares (thunks)

export function postOrder(cart: string[]): AppThunk {
  const accessToken = localStorage.getItem("accessToken");
  return function(dispatch: AppDispatch) {
    dispatch({ type: POST_ORDER_REQUEST, isLoading: true });
    sendOrderToServer(APIconfig, cart, accessToken)
      .then(data => {
        if(data.success) {
          dispatch({ type: POST_ORDER_SUCCESS,
                     numOfOrder: data.order.number,
                     isLoading: false
          });
          dispatch({ type: OPEN_MODAL, typeOfModal: 'order' });
          dispatch({ type: CLEAR_CART });
        }
      })
      .catch(err => {
        dispatch({ type: POST_ORDER_FAILED });
        console.log(err);
      });
  };
}

export function getOrderInfo(numOfOrder: number): AppThunk {
  return function(dispatch: AppDispatch) {
    dispatch({ type: GET_ORDER_INFO_REQUEST, isLoading: true });
    getOrderInfoRequest(APIconfig, numOfOrder)
      .then(data => {
        if(data.success) {
          dispatch({ type: GET_ORDER_INFO_SUCCESS,
                     isLoading: false,
                     orderInfo: data.orders
          });
        }
      })
      .catch(err => {
        dispatch({ type: GET_ORDER_INFO_FAILED, hasError: true });
        console.log(err);
      });
  };
}
