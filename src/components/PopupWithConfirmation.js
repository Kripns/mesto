import Popup from "./Popup.js";


export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, popupButtonHandler }) {
    super(popupSelector);
    this._popupButtonHandler = popupButtonHandler;
    this._popupButton = this._popup.querySelector('.popup__button');
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupButton.addEventListener('click', () => this._popupButtonHandler(this._cardId, this._removeCallback))
  }

  open(cardId, removeCallback) {
    super.open();
    this._cardId = cardId;
    this._removeCallback = removeCallback;
  }
}
