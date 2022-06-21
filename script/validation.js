const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach(form => {
    setEventListener(form, config)
    console.log(form.checkValidity())
  });
};

function setEventListener(form, config) {
  form.addEventListener('submit', handleFormSubmit);
  form.addEventListener('input', () => toggleButtonState(form, config));

  const inputs = Array.from(form.querySelectorAll(config.inputSelector));

  inputs.forEach(input => {
    input.addEventListener('input',
      () => handleInputValidation(input, form, config));
  });

  toggleButtonState(form, config);
};

function toggleButtonState(form, config) {
  const submitButton = form.querySelector(config.submitButtonSelector);
  if(!form.checkValidity()) {
  submitButton.disabled = true;
  submitButton.classList.add(config.inactiveButtonClass)
  } else {
    submitButton.disabled = false;
    submitButton.classList.remove(config.inactiveButtonClass)
  }
};

function handleFormSubmit(event) {
  event.preventDefault();
};

function handleInputValidation(input, form, config) {
  if (!input.validity.valid) {
    showError(input, form, config);
  } else {
    hideError(input, form, config);
  }
};

function showError(input, form, config) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  errorElement.classList.add(config.errorClass);
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = input.validationMessage;
};

function hideError(input, form, config) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  errorElement.classList.remove(config.errorClass);
  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
};

enableValidation(validationConfig);
