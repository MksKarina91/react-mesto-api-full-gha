export const BASE_URL = "https://api.mkskarina.nomoredomainsmonster.ru";

const headers = {
  "Content-Type": "application/json",
};

function checkError(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  }).then(checkError);
};

export const autorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  }).then(checkError);
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: { ...headers, Authorization: `Bearer ${token}` },
  }).then(checkError);
};
