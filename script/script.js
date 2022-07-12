
import Card from "./Card.js";

// Создаем массив с дефолтными карточками
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


// находим шаблон карточки
const placeCardTemplate = document.querySelector('.place-card-template').content;

// находим попап редактрования профиля, форму, инпуты в попапе и текст в профиле
const profilePopup = document.querySelector('.popup_type_profile');
const profileForm = profilePopup.querySelector('.popup__form');
const profileNameInput = document.querySelector('.popup__input_type_name');
const profileJobInput = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__heading');
const profileJob = document.querySelector('.profile__subheading');

// находим попап добавления карточки, форму и инпуты в нутри него
const cardAddingPopup = document.querySelector('.popup_type_card-adding');
const cardAddingForm = document.forms['add-card'];
const placeNameInput = cardAddingPopup.querySelector('.popup__input_type_place-name');
const placeLinkInput = cardAddingPopup.querySelector('.popup__input_type_url');

// находим попап с картинкой и саму картинку
const imagePopup = document.querySelector('.popup_type_image');
const fullsizeImage = imagePopup.querySelector('.popup__fullsize-image');

// находим секцию, куда будем вставлять карточки
const placesSection = document.querySelector('.places');


// фн открывает попап
function openPopup (popupName) {
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
  popupName.addEventListener('mousedown', closeByOverlay);
};

//фн закрывает попап
function closePopup (popupName) {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
  popupName.removeEventListener('mousedown', closeByOverlay);
};

//фн закрывает попап на эскейп
function closeByEscape (evt) {
  if(evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  };
};

//фн закрывает попап по клику на оверлэй
function closeByOverlay(evt) {
  if(evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  };
};

//фн отменяет дефолтную отпраку формы
function handleFormSubmit(event) {
  event.preventDefault();
};

// обработчик отправки формы создания профиля
// заполняем инпуты
// закрываем по нажатию на сабмит
function handleProfileFormSubmit (event) {
  handleFormSubmit(event);
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopup(profilePopup);
};

//добавляем карточку в разметку
const renderCard = (card) => {
  const cardElement = new Card(card, '.place-card-template');
  placesSection.prepend(cardElement);
};

// обработчик отправки формы добавления карточек
function handleAddingCardFormSubmit (event) {
  handleFormSubmit(event);
// создаем объект с новой карточкой
// вставляем значения из инпутов
  const newCard = {};
  newCard.name = placeNameInput.value;
  newCard.link = placeLinkInput.value;
// очищаем поля инпутов
  cardAddingForm.reset();
// добавляем карточку в дом
  renderCard(newCard);
// закрываем попап
  closePopup(cardAddingPopup);
};

// //фн добавляет карточки в дом (принимает объект в кач. аргумента)
// function createCard (card) {
// //копируем содержимое темплейта
// //находим заголовок и картинку
//   const placeCard = placeCardTemplate.querySelector('.place-card').cloneNode(true);
//   const placeCardHeading = placeCard.querySelector('.place-card__heading');
//   const placeCardImage = placeCard.querySelector('.place-card__image');
// //заполняем заголовок карточки, срси и альт
//   placeCardHeading.textContent = card.name;
//   placeCardImage.src = card.link;
//   placeCardImage.alt = card.name;
// //отслеживаем клик по карточке
//   placeCardImage.addEventListener('click', () => {
// //заполняем ссылку и название
//     fullsizeImage.src = card.link;
//     fullsizeImage.alt = card.name;
// //заполняем текст под картинкой
//     imagePopup.querySelector('.popup__subheading').textContent = card.name;
// //открываем попап
//     openPopup(imagePopup);
//   });

//   //реализуем нажатие лайков
//   placeCard.querySelector('.place-card__like')
//   .addEventListener('click', event => event.target.classList.toggle('place-card__like_active'));

//   //реализуем удаление карточек
//   placeCard.querySelector('.place-card__remove-icon')
//   .addEventListener('click', event => event.target.closest('.place-card').remove());

//   return placeCard;
// };



// вставляем в разметку дефолтные карточки
defaultCards.forEach((el) => renderCard(el));

//открываем попап редактирования профиля
//по клинку на эдит бтн
//заполняем вэлъю инпутов
document.querySelector('.edit-button').addEventListener('click', () => {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
//убираем ошибки, меняем кнопку
  resetInputError (profileForm);
  openPopup(profilePopup);
});

//нажимаем на крестик, закрываем попап.
profilePopup.querySelector('.popup__close-icon')
.addEventListener('click', () => closePopup(profilePopup));

//отслеживаем субмит
profileForm.addEventListener('submit', handleProfileFormSubmit);

//Открываем попап добавления карточки
document.querySelector('.add-card-button')
.addEventListener('click', () => {
  resetInputError (cardAddingForm);
  openPopup(cardAddingPopup)
});

//Закрываем попап на крестик
cardAddingPopup.querySelector('.popup__close-icon')
.addEventListener('click', () => closePopup(cardAddingPopup));

//отслеживаем сабмит и закрываем попап
cardAddingForm.addEventListener('submit', handleAddingCardFormSubmit);

 //закрываем с картинкой на крестик
 imagePopup.querySelector('.popup__close-icon')
 .addEventListener('click', () => closePopup(imagePopup));

 renderCard();
