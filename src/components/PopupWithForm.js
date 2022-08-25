import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, formSubmitHandler }) {
    super(popupSelector);
    this.formSubmitHandler = formSubmitHandler;
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelector('.popup__button');
  }

//Метод возвращает объект с данными из инпутов
  _getInputValues() {
    this._inputValues = {};

    this._inputs.forEach(input => {
      this._inputValues[input.name] = input.value;
    })

    return this._inputValues;
  }

//Перезаписываем метод, добавляем обработчик сабмита формам
  setEventListeners() {
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._submitButton.textContent = 'Сохранение...'
      this.formSubmitHandler(this._getInputValues());
    });

    super.setEventListeners();
  }


//Добавляем в метод сброс формы перед закрытием
  close() {
    this._form.reset();
    super.close();
  }
}
