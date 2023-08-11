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
