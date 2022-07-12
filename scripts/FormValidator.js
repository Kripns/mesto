export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  };

  enableValidation() {
    this._forms = Array.from(document.querySelectorAll(this._config.formSelector));
    this._forms.forEach(form => this._setFormListener(form, this._config));
  };

  _setFormListener() {
    this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
    this._inputs = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._inputs.forEach(input => {
      input.addEventListener('input', () => {
        this._handleInputValidation(input, this._formElement, this._config)
        this._toggleButtonState(this._submitButton, this._formElement, this._config)
      });
    });
    this._toggleButtonState(this._submitButton, this._formElement, this._config);
  };

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

  _handleInputValidation() {
    if (!input.validity.valid) {
      showError(input, this._formElement, this._config);
    } else {
      hideError(input, this._formElement, this._config);
    }
  };



}
