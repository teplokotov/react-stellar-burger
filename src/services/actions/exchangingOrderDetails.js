import { APIconfig } from "../../utils/constants";
import { sendOrderToServer } from "../../utils/api";
import { OPEN_MODAL } from "./modal";
import { CLEAR_CART } from "./cart";

// Actions

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';

// Middlewares (thunks)

export function postOrder(cart) {
  const accessToken = localStorage.getItem("accessToken");
  return function(dispatch) {
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
