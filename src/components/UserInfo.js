export default class UserInfo{
  constructor({ userNameSelector, userJobSelector }) {
    this._userNameSelector = userNameSelector;
    this._userJobSelector = userJobSelector;
    this._name = document.querySelector(this._userNameSelector);
    this._job = document.querySelector(this._userJobSelector);
  }

//Метод возвращает обьект с данными пользователя со страницы
  getUserInfo() {
    this._userData = {};
    this._userData.name = this._name.textContent;
    this._userData.job = this._job.textContent;

    return this._userData;
  }

//Метод вставляет данные из инпутов в профиль пользователя
  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._job.textContent = about;
  }
}
