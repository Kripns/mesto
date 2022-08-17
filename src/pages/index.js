//ИМПОРТЫ
import './index.css';

import {
  cardAddingForm,
  profileForm,
  profileNameInput,
  profileJobInput
} from '../utils/constants.js';

import validationConfig from "../utils/validationConfig.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import apiConfig from '../utils/apiConfig.js';


//Экземпляры классов
const profileFormValidator = new FormValidator(validationConfig, profileForm);
const cardAddingFormValidator = new FormValidator(validationConfig, cardAddingForm);

const api = new Api(apiConfig);

const cardList = new Section(
  cardData => cardList.addItem(createCard(cardData.link, cardData.name)), '.places');


api.getUser().then(data => {userInfo.setUserInfo(data)}).catch(err => console.log(err));

api.getDefaultCards().then(data => {cardList.renderItems(data)}).catch(err => console.log(err));



const imagePopup = new PopupWithImage({
  popupSelector: '.popup_type_image'
});

const profilePopup = new PopupWithForm({
 popupSelector: '.popup_type_profile',
  formSubmitHandler: submitProfileForm
});

const cardAddingPopup = new PopupWithForm({
  popupSelector: '.popup_type_card-adding',
  formSubmitHandler: submitCardAddingForm
});

const userInfo = new UserInfo({
  userNameSelector: '.profile__heading',
  userJobSelector: '.profile__subheading'
});


//ФУНКЦИИ

//Фн создания карточки
function createCard(link, name) {
  const card = new Card(link, name, '.place-card-template', () => {
    handleCardClick({ link: link, name: name });
  })
  const cardElement = card.generateCard();
  return cardElement;
};

//Фн открытия попапа с картинкой
function handleCardClick({ link: link, name: name }) {
  imagePopup.open({ link: link, name: name });
};

//Фн сабмит формы создания карточки
function submitCardAddingForm(inputValues) {
  debugger;
  api.saveCard(inputValues)
  .then(data => cardList.addItem(createCard(data.link, data.name)))
  // const newCard = {};
  // newCard.name = inputValues['place-name'];
  // newCard.link = inputValues['picture-link'];
  // cardList.addItem(createCard(newCard.link, newCard.name));
  cardAddingPopup.close();
};

//Фн сабмит формы редактирования профиля
 function submitProfileForm(inputValues) {
  api.editProfile(inputValues)
  .then(data => {
    userInfo.setUserInfo({
      name: data.name,
      about: data.about
    })
  }).catch(err => console.log(err))

  profilePopup.close();
};


//Слушатели попапов
imagePopup.setEventListeners();
profilePopup.setEventListeners();
cardAddingPopup.setEventListeners();

//Включаем валидацию форм
profileFormValidator.enableValidation();
cardAddingFormValidator.enableValidation();


//ОБРАБОТЧИКИ

document.querySelector('.edit-button')
.addEventListener('click', () => {
  profileNameInput.value = userInfo.getUserInfo().name;
  profileJobInput.value = userInfo.getUserInfo().job;
  profileFormValidator.resetInputError();
  profilePopup.open();
});

document.querySelector('.add-card-button')
.addEventListener('click', () => {
  cardAddingFormValidator.resetInputError();
  cardAddingPopup.open();
});



