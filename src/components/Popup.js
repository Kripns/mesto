
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeIcon = this._popup.querySelector('.popup__close-icon');
    this._handleEscapeClose = this._handleEscapeClose.bind(this);
  };

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscapeClose);
    this._popup.addEventListener('mousedown', evt => this._handleClickByOverlay(evt));

  };

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscapeClose);
  };

  setEventListeners() {
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
