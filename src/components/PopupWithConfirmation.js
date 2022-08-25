import Popup from "./Popup.js";


export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, popupButtonHandler) {
    super(popupSelector);
    this.popupButtonHandler = popupButtonHandler;
    this._popupButton = this._popup.querySelector('.popup__button');
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupButton.addEventListener('click', () => this.popupButtonHandler())
  }

    open(id, element) {
      super.open();
      // return this._popupButton.addEventListener('click', () => {
      //   this.popupButtonHandler(id, element)
      // });
    }
}
