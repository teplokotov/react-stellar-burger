import { combineReducers } from 'redux';
import { loadingDataReducer } from './loadingData'
import { currentIdReducer } from './currentId';
import { exchangingOrderDetailsReducer } from './exchangingOrderDetails';
import { cartReducer } from './cart';
import { modalReducer } from './modal';
import { resetPasswordReducer } from './resetPassword';
import { saveNewPasswordReducer } from './saveNewPassword';
import { registerUser } from '../actions/registerUser';

// "rootReducer" allow to combine several reducers
export const rootReducer = combineReducers({
  data: loadingDataReducer,
  currentId: currentIdReducer,
  order: exchangingOrderDetailsReducer,
  cart: cartReducer,
  modal: modalReducer,
  resetPassword: resetPasswordReducer,
  saveNewPassword: saveNewPasswordReducer,
  registerUser: registerUser,
});
