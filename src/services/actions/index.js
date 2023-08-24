import { APIconfig } from "../../utils/constants";
import { getIngredientsFromServer } from "../../utils/api";

// Actions

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

// Middlewares (thunks)

export function loadData() {
  return function(dispatch) {
    dispatch({ type: GET_ITEMS_REQUEST });
    getIngredientsFromServer(APIconfig)
      .then(data => dispatch({ type: GET_ITEMS_SUCCESS, data: data.data }))
      .catch(err => {
        dispatch({ type: GET_ITEMS_FAILED });
        console.log(err);
      });
  };
}


