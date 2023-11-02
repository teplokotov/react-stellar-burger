import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';
import { socketMiddleware, wsActions } from "./actions/socket";

// https://stackoverflow.com/questions/52800877/error-with-redux-devtools-extension-using-ts-property-redux-devtools-extens
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// Turn on Redux Devtools
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

// Apply "thunk" and "socketMiddleware" middlewares
const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions)));

// Store initialization with "reducers" and "enhancer".
// "rootReducer" allow to combine several reducers
export const store = createStore(rootReducer, enhancer);
