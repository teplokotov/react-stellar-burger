import { combineReducers } from 'redux';
import { loadingDataReducer } from './loadingData'
import { currentIdReducer } from './currentId';
import { exchangingOrderDetailsReducer } from './exchangingOrderDetails';
import { cartReducer } from './cart';
import { modalReducer } from './modal';
import { exchangingUserInfoReducer } from './userInfo';

// "rootReducer" allow to combine several reducers
export const rootReducer = combineReducers({
  data: loadingDataReducer,
  currentId: currentIdReducer,
  order: exchangingOrderDetailsReducer,
  cart: cartReducer,
  modal: modalReducer,
  userInfo: exchangingUserInfoReducer,
});
