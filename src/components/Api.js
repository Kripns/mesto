class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

   getDefaultCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(res => {
        if(res.ok) {return res.json()}
        return Promise.reject(`Ошибка: ${res.status}`)
        })

  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(res => {
        if(res.ok) {return res.json()}
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }

}

export default Api;
