export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
    this._inputs = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
  };

//Включение валидации
//вешаем обработчики инпутов на каждую форму
  enableValidation() {
    this._setFormListener();
  };

//Обработчик формы
//отслеживаем валидность инпутов
//меняем состояние кнопки
  _setFormListener() {
    this._inputs.forEach(input => {
      input.addEventListener('input', () => {
        this._handleInputValidation(input)
        this._toggleButtonState()
      });
    });
    this._toggleButtonState();
  };

//Переключение состояния кнопки
//проверяем валидность формы
//переключаем состояние кнопки
  _toggleButtonState() {
    if(!this._formElement.checkValidity()) {
      this._submitButton.disabled = true;
      this._submitButton.classList.add(this._config.inactiveButtonClass);
      }
    else {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
      }
  };

//Проверяем валидность инпута,
//покаываем/прячем ошибки
  _handleInputValidation(input) {
    if (!input.validity.valid) {
      this._showError(input);
    } else {
      this._hideError(input);
    }
  };

//Добавляем класс с ошибкой инпуту и спану
//добавляем в спан текст ошибки
  _showError(input) {
    this._errorElement = this._formElement.querySelector(`.${input.id}-error`);
    this._errorElement.classList.add(this._config.errorClass);
    input.classList.add(this._config.inputErrorClass);
    this._errorElement.textContent = input.validationMessage;
  };

//Удаляем класс с ошибкой у инпута и спана
//очищаем спан
  _hideError(input) {
    this._errorElement = this._formElement.querySelector(`.${input.id}-error`);
    this._errorElement.classList.remove(this._config.errorClass);
    input.classList.remove(this._config.inputErrorClass);
    this._errorElement.textContent = '';
  };

//Сбрасываем ошибки при открытии попапов
  resetInputError() {
    this._inputs.forEach(input => this._hideError(input));
    this._toggleButtonState();
  };
};
