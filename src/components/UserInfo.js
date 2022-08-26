export default class UserInfo{
  constructor({ userNameSelector, userJobSelector, userAvatarSelector }) {
    this._userNameSelector = userNameSelector;
    this._userJobSelector = userJobSelector;
    this._avatarSelector = userAvatarSelector;
    this._name = document.querySelector(this._userNameSelector);
    this._job = document.querySelector(this._userJobSelector);
    this._avatar = document.querySelector(this._avatarSelector)
  }

//Метод возвращает обьект с данными пользователя со страницы
  getUserInfo() {
    this._userData = {};
    this._userData.name = this._name.textContent;
    this._userData.job = this._job.textContent;
    this._userData._id = this._id;

    return this._userData;
  }

//Метод вставляет данные с сервера в профиль пользователя
  setUserInfo({ name, about, avatar, _id }) {
    this._name.textContent = name;
    this._job.textContent = about;
    this._avatar.style.backgroundImage = `url(${avatar})`;
    this._id = _id;
  }
}
