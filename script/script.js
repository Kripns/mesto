// нажимаем на эдит буттон, открываем попап
// заполняем вэлъю инпутов
const editButton = document.querySelector('.edit-button');
const popup = document.querySelector('.popup');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__heading');
const profileJob = document.querySelector('.profile__subheading');

editButton.addEventListener('click', () => {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

// нажимаем на крестик, закрываем попап.
const popupCloseIcon = document.querySelector('.popup__close-icon');

popupCloseIcon.addEventListener('click', () => {
  popup.classList.remove('popup_opened');
});


// обработчик отправки формы
// отменяем стандартную отправку
// заполняем инпуты
// закрываем по нажатию на субмит
const popupForm = document.querySelector('.popup__form');

const formSubmitHandler = (event) => {
  event.preventDefault();
  profileName.textContent = `${nameInput.value}`;
  profileJob.textContent = `${jobInput.value}`;
  popup.classList.remove('popup_opened');
}

// отслеживаем субмит
popupForm.addEventListener('submit', formSubmitHandler);
