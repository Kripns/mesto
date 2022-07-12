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
//получаем массив инпутов, отслеживаем валидность
//и показываем/прячем ошибки
  const submitButton = form.querySelector(config.submitButtonSelector);
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  inputs.forEach(input => {
    input.addEventListener('input', () => {
        handleInputValidation(input, form, config)
        toggleButtonState(submitButton, form, config)
    });
  });
  toggleButtonState(submitButton, form, config);
};

//фн переключает состояние кнопки если форма валидна/или нет
function toggleButtonState(button, form, config) {
  if(!form.checkValidity()) {
  button.disabled = true;
  button.classList.add(config.inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(config.inactiveButtonClass);
  }
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

//фн убирает ошибки, если в попапе есть форма
function resetInputError (form) {
  const popupButton = form.querySelector('.popup__button');
  const inputs = Array.from(form.querySelectorAll('.popup__input'));
  inputs.forEach(input => hideError(input, form, validationConfig));
  toggleButtonState(popupButton, form, validationConfig);
};

enableValidation(validationConfig);
