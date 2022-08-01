import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, formSubmitHandler }) {
    super(popupSelector);
    this.formSubmitHandler = formSubmitHandler;
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._form = this._popup.querySelector('.popup__form')
  }

  _getInputValues() {
    this._inputValues = {};

    this._inputs.forEach(input => {
      this._inputValues.value = input.value;
    })
// нужен при сабмите, чтоб както перенести данные из формы на страницу
// пока хз как
    return this._inputValues;
  }


  setEventListeners() {
    this._form.addEventListener('submit',
    evt => this.formSubmitHandler(evt));

    super.setEventListeners();
  }

  close() {
    this._form.reset();

    super.close();
  }
}
