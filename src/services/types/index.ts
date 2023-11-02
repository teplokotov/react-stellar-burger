import { ThunkAction } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { store } from "../store";
import { rootReducer } from "../reducers";

import { TItemsActions } from '../actions/index';
import { TCartActions } from '../actions/cart';
import { TCurrentIdActions } from '../actions/currentId';
import { TExchangingOrderDetailsActions } from '../actions/exchangingOrderDetails';
import { TModalActions } from '../actions/modal';
import { TSocketActions } from '../actions/socket';
import { TUserInfoActions } from '../actions/userInfo';

type TApplicationActions =
    TItemsActions
  | TCartActions
  | TCurrentIdActions
  | TExchangingOrderDetailsActions
  | TModalActions
  | TSocketActions
  | TUserInfoActions;

// If: https://redux.js.org/usage/usage-with-typescript#define-root-state-and-dispatch-types
// export type RootState = ReturnType<typeof store.getState>;
// But: https://github.com/reduxjs/redux/issues/4267
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;
// https://sylhare.github.io/2022/08/03/React-and-redux.html
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
