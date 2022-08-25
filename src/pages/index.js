//ИМПОРТЫ
import './index.css';

import {
  cardAddingForm,
  profileForm,
  avatarForm,
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
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';



//Экземпляры классов
const profileFormValidator = new FormValidator(validationConfig, profileForm);
const cardAddingFormValidator = new FormValidator(validationConfig, cardAddingForm);
const avatarFormValidator = new FormValidator(validationConfig, avatarForm)
const api = new Api(apiConfig);
const cardList = new Section(cardData => cardList.addItem(createCard(cardData)), '.places');
const imagePopup = new PopupWithImage({ popupSelector: '.popup_type_image'});

const profilePopup = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  formSubmitHandler: submitProfileForm
});

const cardAddingPopup = new PopupWithForm({
  popupSelector: '.popup_type_card-adding',
  formSubmitHandler: submitCardAddingForm
});

const avatarPopup = new PopupWithForm({
  popupSelector:'.popup_type_update-avatar',
  formSubmitHandler: submitAvatarForm
})

const deleteCardPopup = new PopupWithConfirmation ('.popup_type_delete', handleDeletePopupButton);

const userInfo = new UserInfo({
  userNameSelector: '.profile__heading',
  userJobSelector: '.profile__subheading',
  userAvatarSelector: '.profile__avatar'
});


const currentUser = api.getUser()
const initalCards = api.getCards();


currentUser.then(data => {
  userInfo.setUserInfo(data);
  userInfo.setAvatar(data)
})
.catch(err => console.log(err));


initalCards.then(data => {
  cardList.renderItems(data);
})
  .catch(err => console.log(err));


//ФУНКЦИИ

//Фн создания карточки
function createCard(cardData) {
  cardData.currentUser = currentUser;
  const card = new Card(cardData, '.place-card-template', {
    handleCardClick: handleCardClick,
    handleCardDelete: handleCardDelete,
    handleLike: handleLike,
    handleDislike: handleDislike,
  })
  const cardElement = card.generateCard();
  return cardElement;
};

//Фн открытия попапа с картинкой
function handleCardClick({ link, name }) {
  imagePopup.open({ link, name });
};

function handleCardDelete(cardId, removeCallback) {
  debugger;
  deleteCardPopup.open(cardId, removeCallback);
}

function handleLike(cardData, likeCallback) {
  api.setLike(cardData._id)
    .then(updatedCard => {
      likeCallback(updatedCard)
    })
    .catch(err => console.log(err))
}

function handleDislike(cardData, dislikeCallback) {
  api.deleteLike(cardData._id)
    .then(updatedCard => {
      dislikeCallback(updatedCard)
    })
    .catch(err => console.log(err));
}



//Фн сабмит формы создания карточки
function submitCardAddingForm(inputValues) {
  api.saveCard(inputValues)
    .then(data => cardList.addItem(createCard(data)))
    .catch(err => console.log(err));
  cardAddingPopup.close();
};

//Фн сабмит формы редактирования профиля
 function submitProfileForm(inputValues) {
  api.editProfile(inputValues)
    .then(data => userInfo.setUserInfo({ name: data.name, about: data.about }))
    .catch(err => console.log(err))
  profilePopup.close();
};

function submitAvatarForm(inputValue) {
  api.updateAvatar(inputValue)
    .then(res => userInfo.setAvatar(res))
    .catch(err => console.log(err));
    avatarPopup.close();
}


function handleDeletePopupButton(cardId, removeCallback) {
  return api.deleteCard(cardId)
    .then(() => {
      removeCallback();
      deleteCardPopup.close();
  }).catch(err => console.log(err))
}




//Слушатели попапов
imagePopup.setEventListeners();
profilePopup.setEventListeners();
cardAddingPopup.setEventListeners();
avatarPopup.setEventListeners();
deleteCardPopup.setEventListeners();


//Включаем валидацию форм
profileFormValidator.enableValidation();
cardAddingFormValidator.enableValidation();
avatarFormValidator.enableValidation();


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

document.querySelector('.profile__avatar')
.addEventListener('click', () => {
  avatarFormValidator.resetInputError();
  avatarPopup.open();
})

