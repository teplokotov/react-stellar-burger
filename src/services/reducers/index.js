import { combineReducers } from 'redux';
import { loadingDataReducer } from './loadingData'
import { currentIdReducer } from './currentId';

// "rootReducer" allow to combine several reducers
export const rootReducer = combineReducers({
  data: loadingDataReducer,
  currentId: currentIdReducer,
});
