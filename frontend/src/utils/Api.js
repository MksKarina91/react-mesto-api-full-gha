export class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    _checkError(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    _getTokenHeaders() {
        const token = localStorage.getItem('jwt');
        return { ...this._headers, 'Authorization': `Bearer ${token}` };
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._getTokenHeaders(),
            method: 'GET'
        })
            .then(this._checkError);
    }

    setUserInfo(inputValues) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._getTokenHeaders(),
            body: JSON.stringify({
                name: inputValues.name,
                about: inputValues.about
            })
        })
            .then(this._checkError);
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._getTokenHeaders(),
            method: 'GET'
        })
            .then(this._checkError);
    }

    sentNewCard(inputValues) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._getTokenHeaders(),
            body: JSON.stringify({
                name: inputValues.profileName,
                link: inputValues.profileAbout
            })
        })
            .then(this._checkError);
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._getTokenHeaders(),
        })
            .then(this._checkError);
    }

    addLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._getTokenHeaders(),
        })
            .then(this._checkError);
    }

    deleteLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._getTokenHeaders(),
        })
            .then(this._checkError);
    }

    updateAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._getTokenHeaders(),
            body: JSON.stringify({ avatar: data.avatarLink })
        })
            .then(this._checkError);
    }
}

export const api = new Api({
    url: 'https://api.mkskarina.nomoredomainsmonster.ru',
    headers: {
        'Content-Type': 'application/json'
    }
});
