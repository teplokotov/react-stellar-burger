function _checkResponse(res) {
  if (res.ok) return res.json();
  if (res.status === 401 || 403) {
    return res.json().then(data => Promise.reject(`Ошибка: ${res.status} - ${data.message}`));
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

function _request(url, options) {
  return fetch(url, options).then(_checkResponse);
};

export function getIngredientsFromServer(config) {
  return _request(`${config.baseUrl}/ingredients`, {headers: config.headers});
};

export function sendOrderToServer(config, cart) {
  return _request(`${config.baseUrl}/orders`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({"ingredients": cart} )
  });
}

export function getAccessToResetPassword(config, email) {
  return _request(`${config.baseUrl}/password-reset`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({"email": email} )
  });
}

export function sendNewPassword(config, password, token) {
  return _request(`${config.baseUrl}/password-reset/reset`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({"password": password, "token": token} )
  });
}

export function getAccessToLogin(config, email, password) {
  return _request(`${config.baseUrl}/auth/login`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({"email": email, "password": password})
  });
}

export function sendRegistrationData(config, email, password, name) {
  return _request(`${config.baseUrl}/auth/register`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({"email": email, "password": password, "name": name})
  });
}

export function getAccessToLogout(config, refreshToken) {
  return fetchWithRefresh(`${config.baseUrl}/auth/logout`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({"token": refreshToken})
  });
}

export function refreshToken(config, refreshToken) {
  return _request(`${config.baseUrl}/auth/token`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({"token": refreshToken})
  });
}

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await _checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
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

export function getUserInfoRequest(config, accessToken) {
  return fetchWithRefresh(`${config.baseUrl}/auth/user`, {
    method: 'GET',
    headers: {
      ...config.headers,
      authorization: accessToken,
    }
  });
}

export function sendUserInfoRequest(config, accessToken, email, name, password) {
  return fetchWithRefresh(`${config.baseUrl}/auth/user`, {
    method: 'PATCH',
    headers: {
      ...config.headers,
      authorization: accessToken,
    },
    body: JSON.stringify(
      password !== '******' ? {"email": email, "password": password, "name": name} : {"email": email, "name": name}
    )
  });
}
