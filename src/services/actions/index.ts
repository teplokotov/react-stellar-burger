import { APIconfig } from "../../utils/constants";
import { getIngredientsFromServer } from "../../utils/api";
import { AppDispatch, AppThunk, TIngredient } from "../types";

// Actions

export const GET_ITEMS_REQUEST: 'GET_ITEMS_REQUEST' = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS: 'GET_ITEMS_SUCCESS' = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED: 'GET_ITEMS_FAILED' = 'GET_ITEMS_FAILED';

export interface IGetItemsRequest {
  readonly type: typeof GET_ITEMS_REQUEST;
}

export interface IGetItemsSuccess {
  data: TIngredient[];
  readonly type: typeof GET_ITEMS_SUCCESS;
}

export interface IGetItemsFailed {
  readonly type: typeof GET_ITEMS_FAILED;
}

export type TItemsActions =
    IGetItemsRequest
  | IGetItemsSuccess
  | IGetItemsFailed;

// Middlewares (thunks)

export function loadData(): AppThunk {
  return function(dispatch: AppDispatch) {
    dispatch({ type: GET_ITEMS_REQUEST });
    getIngredientsFromServer(APIconfig)
      .then(data => dispatch({ type: GET_ITEMS_SUCCESS, data: data.data }))
      .catch(err => {
        dispatch({ type: GET_ITEMS_FAILED });
        console.log(err);
      });
  };
}


