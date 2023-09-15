function _checkResponse(res) {
  if (res.ok) return res.json();
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
