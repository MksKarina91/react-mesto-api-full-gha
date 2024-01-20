import { configApi } from "./constant";

class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
    this._authHeaders = null;
  }

  setAuthHeaders(token) {
    this._authHeaders = {
      ...this._headers,
      authorization: `Bearer ${token}`,
    };
  };

  _onResponse(res) {
    return res.ok ? res.json() : res.json().then(errData => Promise.reject(errData));
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._authHeaders,
    })
      .then(this._onResponse);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._authHeaders,
    })
      .then(this._onResponse);
  }

  changeUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._authHeaders,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
      .then(this._onResponse);
  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._authHeaders,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._onResponse);
  };

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._authHeaders,
    })
      .then(this._onResponse);
  }

  setLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._authHeaders,
    })
      .then(this._onResponse);
  }

  deleteLike(id, token) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._authHeaders,
    })
      .then(this._onResponse);
  }

  editAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._authHeaders,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(this._onResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.setLike(id);
    } else {
      return this.deleteLike(id);
    }
  }

  register({ email, password }) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(this._onResponse);
    }
  
  authorize({ email, password }) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(this._onResponse);
  }
}

const api = new Api(configApi);
export default api;