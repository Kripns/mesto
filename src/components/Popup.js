
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeIcon = this._popup.querySelector('.popup__close-icon');
  };

  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  };

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', evt => this._handleEscapeClose(evt));
  };

  setEventListeners() {
    document.addEventListener('keydown', evt => this._handleEscapeClose(evt));
    this._popup.addEventListener('mousedown', evt => this._handleClickByOverlay(evt));
    this._closeIcon.addEventListener('click', () => this.close());
  };

  _handleEscapeClose(evt) {
    if(evt.key === 'Escape') {
      this.close();
    };
  };

  _handleClickByOverlay(evt) {
    if(evt.target === this._popup) {
      this.close();
    }
  };
};
