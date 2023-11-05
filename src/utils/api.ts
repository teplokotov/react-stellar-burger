import { TIngredient, TOrder } from "../services/types";

type TOptions = {
  method?: 'POST' | 'GET' | 'PATCH';
  headers: {
    'Content-Type': string;
    authorization?: string;
  };
  body?: string;
};

type TConfig = {
  baseUrl: string;
  headers: {
    'Content-Type': string;
  };
};

interface IIngredient {
  data: TIngredient[];
}

interface IOrder {
  success: boolean;
  order: {
    number: number;
  };
}

interface IAccessToResetPassword {
  success: boolean;
}

interface ISendNewPassword {
  success: boolean;
}

interface IGetAccessToLogin {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
}

interface ISendRegistrationData {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
}

interface IGetAccessToLogout {
  success: boolean;
}

interface IRefreshToken {
  accessToken: string;
  refreshToken: string;
  success: any;
}

interface IGetOrderInfoRequest {
  success: boolean;
  orders: TOrder[];
}

function _checkResponse(res: Response){
  if (res.ok) return res.json();
  if (res.status === 401 || 403) {
    return res.json().then(data => Promise.reject(`Ошибка: ${res.status} - ${data.message}`));
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

function _request<T>(url: string, options: TOptions): Promise<T>{
  return fetch(url, options).then(_checkResponse);
};

export function getIngredientsFromServer(config: TConfig): Promise<IIngredient> {
  return _request(`${config.baseUrl}/ingredients`, {headers: config.headers});
};

export function sendOrderToServer(config: TConfig, cart: string[], accessToken: string): Promise<IOrder> {
  return _request(`${config.baseUrl}/orders`, {
    method: 'POST',
    headers: {
      ...config.headers,
      authorization: accessToken,
    },
    body: JSON.stringify({"ingredients": cart} )
  });
}

export function getAccessToResetPassword(config: TConfig, email: string): Promise<IAccessToResetPassword> {
  return _request(`${config.baseUrl}/password-reset`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({"email": email} )
  });
}

export function sendNewPassword(config: TConfig, password: string, token: string): Promise<ISendNewPassword> {
  return _request(`${config.baseUrl}/password-reset/reset`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({"password": password, "token": token} )
  });
}

export function getAccessToLogin(config: TConfig, email: string, password: string): Promise<IGetAccessToLogin> {
  return _request(`${config.baseUrl}/auth/login`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({"email": email, "password": password})
  });
}

export function sendRegistrationData(config: TConfig, email: string, password: string, name: string): Promise<ISendRegistrationData> {
  return _request(`${config.baseUrl}/auth/register`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({"email": email, "password": password, "name": name})
  });
}

export function getAccessToLogout(config: TConfig, refreshToken: string): Promise<IGetAccessToLogout> {
  return fetchWithRefresh(`${config.baseUrl}/auth/logout`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({"token": refreshToken})
  },
  config
  );
}

export function refreshToken(config: TConfig): Promise<IRefreshToken> {
  const refreshToken = localStorage.getItem("refreshToken");
  return _request(`${config.baseUrl}/auth/token`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({"token": refreshToken})
  });
}

export const fetchWithRefresh = async (url: string, options: TOptions, config: TConfig) => {
  try {
    const res = await fetch(url, options);
    return await _checkResponse(res);
  } catch (err) {
    if (err instanceof Error && err.message === "jwt expired") {
      const refreshData = await refreshToken(config);
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await _checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export function getUserInfoRequest(config: TConfig, accessToken: string) {
  return fetchWithRefresh(`${config.baseUrl}/auth/user`, {
    method: 'GET',
    headers: {
      ...config.headers,
      authorization: accessToken,
    }
  },
  config);
}

export function sendUserInfoRequest(config: TConfig, accessToken: string, email: string, name: string, password?: string) {
  return fetchWithRefresh(`${config.baseUrl}/auth/user`, {
    method: 'PATCH',
    headers: {
      ...config.headers,
      authorization: accessToken,
    },
    body: JSON.stringify(
      password !== '******' ? {"email": email, "password": password, "name": name} : {"email": email, "name": name}
    )
  },
  config);
}

export function getOrderInfoRequest(config: TConfig, numOfOrder: number): Promise<IGetOrderInfoRequest> {
  return _request(`${config.baseUrl}/orders/${numOfOrder}`, {
    method: 'GET',
    headers: {
      ...config.headers
    }
  });
}
