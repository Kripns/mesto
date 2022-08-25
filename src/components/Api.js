class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _handleResponse(res) {
    if(res.ok) {return res.json()}
    return Promise.reject(`Ошибка: ${res.status}`)
  }

   getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(res => this._handleResponse(res))
  }

  editProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(res => this._handleResponse(res))
  }


  getUser() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
    .then(res => this._handleResponse(res))
  }

  saveCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(res => this._handleResponse(res))
  }

  setLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(res => this._handleResponse(res))
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => this._handleResponse(res))
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => this._handleResponse(res))
  }

  updateAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatar)
    })
    .then(res => this._handleResponse(res))
  }

}

export default Api;
