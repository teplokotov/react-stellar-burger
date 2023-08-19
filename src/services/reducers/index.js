import { combineReducers } from 'redux';
import { loadingDataReducer } from './loadingData'

// "rootReducer" allow to combine several reducers
export const rootReducer = combineReducers({
  data: loadingDataReducer,
});
