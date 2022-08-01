//ИМПОРТЫ
import {
  defaultCards,
  // profilePopup,
  profileForm,
  profileNameInput,
  profileJobInput,
  profileName,
  profileJob,
  // cardAddingPopup,
  cardAddingForm,
  placeNameInput,
  placeLinkInput,
  // imagePopup,
  popupImage,
  popupImageCaption,
  placesSection
} from '../utils/constants.js';

import Card from "../components/Card.js";
import validationConfig from "../utils/validationConfig.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

const profileFormValidator = new FormValidator(validationConfig, profileForm);
const cardAddingFormValidator = new FormValidator(validationConfig, cardAddingForm);

const cardList = new Section({
  items: defaultCards,
  renderer: cardData => {
    cardList.addItem(createCard(cardData.link, cardData.name))
  }
}, '.places');

const imagePopup = new PopupWithImage({ popupSelector: '.popup_type_image' });
imagePopup.setEventListeners();

const profilePopup = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  formSubmitHandler: evt => submitProfileForm(evt)
});

profilePopup.setEventListeners();

const cardAddingPopup = new PopupWithForm({
  popupSelector: '.popup_type_card-adding',
  formSubmitHandler: submitCardAddingForm
});

cardAddingPopup.setEventListeners();



cardList.renderItems();

//Включаем валидацию форм
profileFormValidator.enableValidation();
cardAddingFormValidator.enableValidation();


//ФУНКЦИИ

function createCard(link, name) {
  const card = new Card(link, name, '.place-card-template', () => {
    handleCardClick({ link: link, name: name });
  })
  const cardElement = card.generateCard();
  return cardElement;
};

function handleCardClick({ link: link, name: name }) {
  imagePopup.open({ link: link, name: name });
};

function submitCardAddingForm(inputValues) {
  const newCard = {};
  newCard.name = inputValues['place-name'];
  newCard.link = inputValues['picture-link'];
  cardList.addItem(createCard(newCard.link, newCard.name));
  cardAddingPopup.close();
};


//Фн обработчик отправки формы создания профиля
//заполняем инпуты
//закрываем по нажатию на сабмит
function submitProfileForm(inputValue) {
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  profilePopup.close();
};

//ОБРАБОТЧИКИ

//открываем попап редактирования профиля
//по клинку на эдит бтн
//заполняем вэлъю инпутов
//убираем ошибки, меняем кнопку
document.querySelector('.edit-button').addEventListener('click', () => {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  profileFormValidator.resetInputError();
  profilePopup.open();
});

//Открываем попап добавления карточки
//сбрасываем ошибки с формы
document.querySelector('.add-card-button')
.addEventListener('click', () => {
  cardAddingFormValidator.resetInputError();
  cardAddingPopup.open();
});


