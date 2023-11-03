import {
  ORDERS_WS_CONNECTING,
  ORDERS_WS_OPEN,
  ORDERS_WS_CLOSE,
  ORDERS_WS_ERROR,
  ORDERS_WS_MESSAGE,
  TSocketActions,
} from '../actions/socket'
import { TOrder } from '../types';

type TInitialState = {
  status: string;
  connectingError: string;
  orders: TOrder[];
  total: number;
  totalToday: number;
}

const initialState: TInitialState = {
  status: 'OFFLINE',
  connectingError: '',
  orders: [],
  total: 0,
  totalToday: 0,
};

export function socketReducer(state = initialState, action: TSocketActions): TInitialState {
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
