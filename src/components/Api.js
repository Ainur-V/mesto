export default class Api {
    constructor(url, token) {
        this._url = url;
        this._token = token;
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: this._token
            }
        })
        .then(this._checkResponse);
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: {
                authorization: this._token
            }
        })
        .then(this._checkResponse);
    }

    changeUserInfo(name, about) {
        return fetch (`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then(this._checkResponse);
    }

    addNewCard(name, link) {
        return fetch (`${this._url}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then(this._checkResponse);
    }

    deleteCard (id) {
        return fetch (`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
        .then(this._checkResponse);
    }

    likeCard (id) {
        return fetch (`${this._url}/cards/likes/${id}`, {
            method: 'PUT',
            headers: {
                authorization: this._token
            }
        })
        .then(this._checkResponse);
    }

    unlikeCard(id) {
        return fetch (`${this._url}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
        .then(this._checkResponse);
    }

    changeAvatar(link) {
        return fetch (`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: link
            })
        })
        .then(this._checkResponse);
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }
}