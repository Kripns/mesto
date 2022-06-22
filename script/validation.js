
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//фн включения валидации
function enableValidation(config) {
//получаем массив с формами, добаввляем всем обработчики
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach(form => setFormListener(form, config));
};

//фн добавления обработчиков формам
function setFormListener(form, config) {
//отменяем стандартную отправку формы
//отслеживаем инпут и переключаем состояние кнопки
  form.addEventListener('submit', handleFormSubmit);
  form.addEventListener('input', () => toggleButtonState(form, config));
//получаем массив инпутов, отслеживаем валидность
//и показываем/прячем ошибки
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  inputs.forEach(input => {
    input.addEventListener('input',
      () => handleInputValidation(input, form, config));
  });
  toggleButtonState(form, config);
};

//фн переключает состояние кнопки если форма валидна/или нет
function toggleButtonState(form, config) {
  const submitButton = form.querySelector(config.submitButtonSelector);
  if(!form.checkValidity()) {
  submitButton.disabled = true;
  submitButton.classList.add(config.inactiveButtonClass);
  } else {
    submitButton.disabled = false;
    submitButton.classList.remove(config.inactiveButtonClass);
  }
};

//фн отменяет дефолтную отпраку формы
function handleFormSubmit(event) {
  event.preventDefault();
};

//фн проверяет валидность инпута и показывает/прячет ошибки
function handleInputValidation(input, form, config) {
  if (!input.validity.valid) {
    showError(input, form, config);
  } else {
    hideError(input, form, config);
  }
};

//фн добавляет класс с ошибкой в инпут и спан
function showError(input, form, config) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  errorElement.classList.add(config.errorClass);
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = input.validationMessage;
};

//фн удаляет класс с ошибкой из инпута и спана
function hideError(input, form, config) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  errorElement.classList.remove(config.errorClass);
  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
};

enableValidation(validationConfig);
