//ИМПОРТЫ

import Card from "./Card.js";
import validationConfig from "./validationConfig.js";
import FormValidator from "./FormValidator.js";


//КОНСТАНТЫ

//Массив с дефолтными карточками
const defaultCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Элементы попапа редактрования профиля
const profilePopup = document.querySelector('.popup_type_profile');
const profileForm = profilePopup.querySelector('.popup__form');
const profileNameInput = document.querySelector('.popup__input_type_name');
const profileJobInput = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__heading');
const profileJob = document.querySelector('.profile__subheading');
const profileFormValidator = new FormValidator(validationConfig, profileForm);

//Элементы попапа добавления карточки
const cardAddingPopup = document.querySelector('.popup_type_card-adding');
const cardAddingForm = document.forms['add-card'];
const placeNameInput = cardAddingPopup.querySelector('.popup__input_type_place-name');
const placeLinkInput = cardAddingPopup.querySelector('.popup__input_type_url');
const cardAddingFormValidator = new FormValidator(validationConfig, cardAddingForm);

//Элементы попапа с картинкой
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__fullsize-image');
const popupImageCaption = imagePopup.querySelector('.popup__subheading');

//Секция, куда будем вставлять карточки
const placesSection = document.querySelector('.places');


//Включаем валидацию форм
profileFormValidator.enableValidation();
cardAddingFormValidator.enableValidation();


//ФУНКЦИИ

//Фн открывает попап
function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
  popupName.addEventListener('mousedown', closeByOverlay);
};

function openImagePopup(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageCaption.textContent = name;
  openPopup(imagePopup);
};

//Фн закрывает попап
function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
  popupName.removeEventListener('mousedown', closeByOverlay);
};

//Фн закрывает попап на эскейп
function closeByEscape(evt) {
  if(evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  };
};

//Фн закрывает попап по клику на оверлэй
function closeByOverlay(evt) {
  if(evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  };
};

//Фн отменяет дефолтную отпраку формы
function handleFormSubmit(event) {
  event.preventDefault();
};

//Фн обработчик отправки формы создания профиля
//заполняем инпуты
//закрываем по нажатию на сабмит
function handleProfileFormSubmit(event) {
  handleFormSubmit(event);
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopup(profilePopup);
};

//Фн обработчик отправки формы добавления карточек
//создаем объект с новой карточкой
//вставляем значения из инпутов
//очищаем поля инпутов
//добавляем карточку в дом
//закрываем попап
function handleAddingCardFormSubmit(event) {
  handleFormSubmit(event);
  const newCard = {};
  newCard.name = placeNameInput.value;
  newCard.link = placeLinkInput.value;
  cardAddingForm.reset();
  renderCard(newCard);
  closePopup(cardAddingPopup);
};

//Фн создает экземпляр класса Кард
//заполняем данными и возвращаем новую карточку
function createCard(cardData) {
  const card = new Card(cardData,'.place-card-template', openImagePopup);
  const cardElement = card.generateCard();
  return cardElement;
};

//Фн добавляет карточку в разметку
function renderCard(cardData) {
  placesSection.prepend(createCard(cardData));
};


//вставляем в разметку дефолтные карточки
defaultCards.forEach((el) => renderCard(el));


//ОБРАБОТЧИКИ

//открываем попап редактирования профиля
//по клинку на эдит бтн
//заполняем вэлъю инпутов
//убираем ошибки, меняем кнопку
document.querySelector('.edit-button').addEventListener('click', () => {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  profileFormValidator.resetInputError();
  openPopup(profilePopup);
});

//Нажимаем на крестик, закрываем попап.
profilePopup.querySelector('.popup__close-icon')
.addEventListener('click', () => closePopup(profilePopup));

//Отслеживаем сабмит
profileForm.addEventListener('submit', handleProfileFormSubmit);

//Открываем попап добавления карточки
//сбрасываем ошибки с формы
document.querySelector('.add-card-button')
.addEventListener('click', () => {
  cardAddingFormValidator.resetInputError();
  openPopup(cardAddingPopup)
});

//Закрываем попап на крестик
cardAddingPopup.querySelector('.popup__close-icon')
.addEventListener('click', () => closePopup(cardAddingPopup));

//Отслеживаем сабмит и закрываем попап
cardAddingForm.addEventListener('submit', handleAddingCardFormSubmit);

 //Закрываем с картинкой на крестик
 imagePopup.querySelector('.popup__close-icon')
 .addEventListener('click', () => closePopup(imagePopup));
