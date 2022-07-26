//ИМПОРТЫ
import {
  defaultCards,
  profilePopup,
  profileForm,
  profileNameInput,
  profileJobInput,
  profileName,
  profileJob,
  cardAddingPopup,
  cardAddingForm,
  placeNameInput,
  placeLinkInput,
  imagePopup,
  popupImage,
  popupImageCaption,
  placesSection
} from '../utils/constants.js';

import Card from "../components/Card.js";
import validationConfig from "../utils/validationConfig.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';

const profileFormValidator = new FormValidator(validationConfig, profileForm);
const cardAddingFormValidator = new FormValidator(validationConfig, cardAddingForm);





//Включаем валидацию форм
profileFormValidator.enableValidation();
cardAddingFormValidator.enableValidation();


//ФУНКЦИИ

//Фн открывает попап
// function openPopup(popupName) {
//   popupName.classList.add('popup_opened');
//   document.addEventListener('keydown', closeByEscape);
//   popupName.addEventListener('mousedown', closeByOverlay);
// };

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


const defaultCardList = new Section({
  items: defaultCards,
  renderer: (cardData) => {
    const card = new Card(cardData,'.place-card-template', openImagePopup);
    const cardElement = card.generateCard();
    defaultCardList.addItem(cardElement)
  }
}, '.places');


function handleAddingCardFormSubmit(event) {
  handleFormSubmit(event);
  const newCard = {};
  newCard.name = placeNameInput.value;
  newCard.link = placeLinkInput.value;
  defaultCardList.addItem(newCard);
  cardAddingForm.reset();
  closePopup(cardAddingPopup);
};

//Фн создает экземпляр класса Кард
//заполняем данными и возвращаем новую карточку
// function createCard(cardData) {
//   const card = new Card(cardData,'.place-card-template', openImagePopup);
//   const cardElement = card.generateCard();
//   return cardElement;
// };

//Фн добавляет карточку в разметку
// function renderCard(cardData) {
//   placesSection.prepend(createCard(cardData));
// };


// //вставляем в разметку дефолтные карточки
// defaultCards.forEach((el) => renderCard(el));


//ОБРАБОТЧИКИ

//открываем попап редактирования профиля
//по клинку на эдит бтн
//заполняем вэлъю инпутов
//убираем ошибки, меняем кнопку

const profPopup = new Popup('.popup_type_profile');

document.querySelector('.edit-button').addEventListener('click', () => {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  profileFormValidator.resetInputError();
  profPopup.open();
});

//Нажимаем на крестик, закрываем попап.
// profilePopup.querySelector('.popup__close-icon')
// .addEventListener('click', () => closePopup(profilePopup));

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


 defaultCardList.renderItems();
