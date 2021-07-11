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
        .then(res => {
            if (res.ok) {
              return res.json();
            }
          });
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: {
                authorization: this._token
            }
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
          });
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
        .then(res => {
            if (res.ok) {
              return res.json();
            }
          });
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
        .then(res => {
            if (res.ok) {
              return res.json();
            }
          });
    }

    deleteCard (id) {
        return fetch (`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
          });
    }

    likeCard (id) {
        return fetch (`${this._url}/cards/likes/${id}`, {
            method: 'PUT',
            headers: {
                authorization: this._token
            }
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
          });
    }

    unlikeCard(id) {
        return fetch (`${this._url}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
          });
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
        .then(res => {
            if (res.ok) {
              return res.json();
            }
          });
    }
}