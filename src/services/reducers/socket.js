import {
  ORDERS_WS_CONNECTING,
  ORDERS_WS_OPEN,
  ORDERS_WS_CLOSE,
  ORDERS_WS_ERROR,
  ORDERS_WS_MESSAGE,
} from '../actions/socket'

const initialState = {
  status: 'OFFLINE',
  connectingError: '',
  orders: [],
  total: 0,
  totalToday: 0,
};

export function socketReducer(state = initialState, action) {
  switch (action.type){
    case ORDERS_WS_CONNECTING:
        return {
          ...state,
          status: 'CONNECTING'
        };
    case ORDERS_WS_OPEN:
        return {
          ...state,
          status: 'ONLINE',
          connectingError: ''
        };
    case ORDERS_WS_CLOSE:
        return {
          ...state,
          status: 'OFFLINE',
        };
    case ORDERS_WS_ERROR:
        return {
          ...state,
          connectingError: action.payload.connectingError
        };
    case ORDERS_WS_MESSAGE:
        return {
          ...state,
          orders: action.payload.orders,
          total: action.payload.total,
          totalToday: action.payload.totalToday,
        }
    default:
        return state;
  }
}
