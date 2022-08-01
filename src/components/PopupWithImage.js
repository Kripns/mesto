import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__fullsize-image');
    this._popupCapture = this._popup.querySelector('.popup__subheading');
  }

  open({ link, name }) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupCapture.textContent = name;

    super.open();
  }
}
