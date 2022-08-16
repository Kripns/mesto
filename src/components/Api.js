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

  editProfile(data) {
    // debugger;
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(res => {
        if(res.ok) {return res.json()}
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }


  getUser() {
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
