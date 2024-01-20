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

export const register = async (email, password) => {
  const res = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers,
        body: JSON.stringify({ email, password }),
    });
    return checkError(res);
};

export const authorize = async (email, password) => {
  const res = await fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers,
        body: JSON.stringify({ email, password }),
    });
    return checkError(res);
};

export const getContent = async (token) => {
  const res = await fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: { ...headers, "Authorization": `Bearer ${token}` },
    });
    return checkError(res);
};
