import Popup from "./Popup.js";


export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, popupButtonHandler) {
    super(popupSelector);
    this.popupButtonHandler = popupButtonHandler;
    this._popupButton = this._popup.querySelector('.popup__button');
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupButton.addEventListener('click', () => this.popupButtonHandler(this._cardId, this._removeCallback))
  }

    open(cardId, removeCallback) {
      super.open();
      this._cardId = cardId;
      this._removeCallback = removeCallback;
      // return this._popupButton.addEventListener('click', () => {
      //   this.popupButtonHandler(id, element)
      // });
    }
}
