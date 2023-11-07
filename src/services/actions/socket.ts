import { Middleware } from "redux";
import { getUserInfoRequest } from "../../utils/api";
import { APIconfig, wsURL } from "../../utils/constants";
import { AppThunk, RootState, TOrder } from "../types";

// Actions

export const ORDERS_WS_CONNECT: 'ORDERS_WS_CONNECT' = 'ORDERS_WS_CONNECT';
export const ORDERS_WS_DISCONNECT: 'ORDERS_WS_DISCONNECT' = 'ORDERS_WS_DISCONNECT';
export const ORDERS_WS_CONNECTING: 'ORDERS_WS_CONNECTING' = 'ORDERS_WS_CONNECTING';
export const ORDERS_WS_OPEN: 'ORDERS_WS_OPEN' = 'ORDERS_WS_OPEN';
export const ORDERS_WS_CLOSE: 'ORDERS_WS_CLOSE' = 'ORDERS_WS_CLOSE';
export const ORDERS_WS_ERROR: 'ORDERS_WS_ERROR' = 'ORDERS_WS_ERROR';
export const ORDERS_WS_MESSAGE: 'ORDERS_WS_MESSAGE' = 'ORDERS_WS_MESSAGE';

type TWSActions = {
  wsConnect: string;
  wsSendMessage? : string;
  wsDisconnect: string;
  wsConnecting: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
};

export const wsActions: TWSActions = {
  wsConnect: ORDERS_WS_CONNECT,
  wsDisconnect: ORDERS_WS_DISCONNECT,
  wsConnecting: ORDERS_WS_CONNECTING,
  onOpen: ORDERS_WS_OPEN,
  onClose: ORDERS_WS_CLOSE,
  onError: ORDERS_WS_ERROR,
  onMessage: ORDERS_WS_MESSAGE
}

export interface IOrdersWSConnect {
  readonly type: typeof ORDERS_WS_CONNECT;
}

export interface IOrdersWSDisconnect {
  readonly type: typeof ORDERS_WS_DISCONNECT;
}

export interface IOrdersWSConnecting {
  readonly type: typeof ORDERS_WS_CONNECTING;
}

export interface IOrdersWSOpen {
  readonly type: typeof ORDERS_WS_OPEN;
}

export interface IOrdersWSClose {
  readonly type: typeof ORDERS_WS_CLOSE;
}

export interface IOrdersWSError {
  payload: {
    connectingError: string;
  };
  readonly type: typeof ORDERS_WS_ERROR;
}

export interface IOrdersWSMessage {
  readonly type: typeof ORDERS_WS_MESSAGE;
  payload: {
    orders: TOrder[];
    total: number;
    totalToday: number;
  };
}

export type TSocketActions =
    IOrdersWSConnect
  | IOrdersWSDisconnect
  | IOrdersWSConnecting
  | IOrdersWSOpen
  | IOrdersWSClose
  | IOrdersWSError
  | IOrdersWSMessage;

// Thunks

export function connect(): AppThunk {
  return function(dispatch) {
    dispatch({
      type: ORDERS_WS_CONNECT,
      payload: `${wsURL}/orders/all`
    })
  }
};

export function connectPrivate(): AppThunk {
  const accessToken = localStorage.getItem("accessToken");
  return function(dispatch) {
    accessToken && getUserInfoRequest(APIconfig, accessToken)
      .then(data => {
        if(data.success && accessToken !== null) {
          dispatch({
            type: ORDERS_WS_CONNECT,
            payload: `${wsURL}/orders?token=${accessToken.split(' ')[1]}`
          })
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export function disconnect(): AppThunk {
  return function(dispatch) {
    dispatch({
      type: ORDERS_WS_DISCONNECT,
    })
  }
};

// Middleware

export function socketMiddleware(wsActions: TWSActions): Middleware<{}, RootState> {
  return store => {
      let socket: WebSocket | null;

      return next => action => {
          const { dispatch } = store;
          const { type } = action;
          const {
              wsConnect,
              wsSendMessage,
              onOpen,
              onClose,
              onError,
              onMessage,
              wsConnecting,
              wsDisconnect,
          } = wsActions;

          if (type === wsConnect) {
              socket = new WebSocket(action.payload);
              dispatch({ type: wsConnecting });
          }

          if (socket) {
              socket.onopen = () => {
                  dispatch({ type: onOpen });
              };

              socket.onerror = () => {
                  dispatch({ type: onError, payload: 'Error: WebSocket connection failed' });
              };

              socket.onmessage = event => {
                  const { data } = event;
                  const parsedData = JSON.parse(data);

                  dispatch({ type: onMessage, payload: parsedData });
              };

              socket.onclose = () => {
                  dispatch({ type: onClose });
              };

              if (type === wsSendMessage) {
                  socket.send(JSON.stringify(action.payload));
              }

              if (type === wsDisconnect) {
                  socket.close();
                  socket = null;
              }
          }

          next(action);
      };
  };
};
