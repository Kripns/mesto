
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeIcon = this._popup.querySelector('.popup__close-icon');
    this._handleEscapeClose = this._handleEscapeClose.bind(this);
  };

//Вешаем обработчики на эскейп и клик по оверлэю при открытии попапа
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscapeClose);
    this._popup.addEventListener('mousedown', evt => this._handleClickByOverlay(evt));
  };

//Удаляем слушатель эскейпа при закрытиии попапа
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscapeClose);
  };

//Добавляем слушатель на крестик
  setEventListeners() {
    this._closeIcon.addEventListener('click', () => this.close());
  };

//Создаем метод закрытия попапа на эскейп
  _handleEscapeClose(evt) {
    if(evt.key === 'Escape') {
      this.close();
    };
  };

//Создаем метод закрытия попапа по клику на оверлэй
  _handleClickByOverlay(evt) {
    if(evt.target === this._popup) {
      this.close();
    }
  };
};
