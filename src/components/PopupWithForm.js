import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, formSubmitHandler, defaultButtonText }) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelector('.popup__button');
    this._defaultButtonText = defaultButtonText;
  }

//Метод возвращает объект с данными из инпутов
  _getInputValues() {
    this._inputValues = {};
    this._inputs.forEach(input => this._inputValues[input.name] = input.value)
    return this._inputValues;
  }

//Перезаписываем метод, добавляем обработчик сабмита формам
  setEventListeners() {
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._formSubmitHandler(this._getInputValues());
    });
    super.setEventListeners();
  }

//Меняем текст кнопки при выполнении запроса на сервер
  handleLoading(isLoading) {
    isLoading
    ?this._submitButton.textContent = 'Сохранение...'
    :this._submitButton.textContent = this._defaultButtonText;
  }

//Добавляем в метод сброс формы перед закрытием
  close() {
    super.close();
    this._form.reset();
  }
}
