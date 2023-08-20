import { APIconfig } from "../../utils/constants";
import { sendOrderToServer } from "../../utils/api";

// Actions

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';

// Middlewares (thunks)

export function postOrder(cart, action) {
  return function(dispatch) {
    dispatch({ type: POST_ORDER_REQUEST });
    sendOrderToServer(APIconfig, cart)
      .then(data => {
        if(data.success) {
          dispatch({ type: POST_ORDER_SUCCESS, payload: data.order.number });
          action();
        }
      })
      .catch(err => {
        dispatch({ type: POST_ORDER_FAILED });
        console.log(err);
      });
  };
}
