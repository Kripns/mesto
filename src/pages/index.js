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
  formSubmitHandler: submitProfileForm,
  defaultButtonText: 'Сохранить'
});

const cardAddingPopup = new PopupWithForm({
  popupSelector: '.popup_type_card-adding',
  formSubmitHandler: submitCardAddingForm,
  defaultButtonText: 'Создать'
});

const avatarPopup = new PopupWithForm({
  popupSelector:'.popup_type_update-avatar',
  formSubmitHandler: submitAvatarForm,
  defaultButtonText: 'Сохранить'
})

const deleteCardPopup = new PopupWithConfirmation ({
  popupSelector: '.popup_type_delete',
  popupButtonHandler: handleDeletePopupButton
});

const userInfo = new UserInfo({
  userNameSelector: '.profile__heading',
  userJobSelector: '.profile__subheading',
  userAvatarSelector: '.profile__avatar'
});

//Промисы с данными пользователя и дефолтными карточками
const currentUser = api.getUser();
const initalCards = api.getCards();

//Заполняем профиль данными с сервера
currentUser
  .then(data => {
    userInfo.setUserInfo(data);
    userInfo.setAvatar(data);
})
  .catch(err => console.log(err));

//Отрисовываем дефолтные карточки
initalCards
  .then(cardsArray => cardsArray.reverse())
  .then(reversedArr => cardList.renderItems(reversedArr))
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

//Фн открытия попапа удаления карточки
function handleCardDelete(cardId, removeCallback) {
  deleteCardPopup.open(cardId, removeCallback);
}

//Фн обработчик лайка
function handleLike(cardData, likeCallback) {
  api.setLike(cardData._id)
    .then(updatedCard => {
      likeCallback(updatedCard)
    })
    .catch(err => console.log(err))
}

//Фн обработчик дислайка
function handleDislike(cardData, dislikeCallback) {
  api.deleteLike(cardData._id)
    .then(updatedCard => {
      dislikeCallback(updatedCard)
    })
    .catch(err => console.log(err));
}

//Фн сабмит формы создания карточки
function submitCardAddingForm(inputValues) {
  cardAddingPopup.handleLoading(true)
  api.saveCard(inputValues)
    .then(data => cardList.addItem(createCard(data)))
    .catch(err => console.log(err))
    .finally(() => cardAddingPopup.handleLoading(false))
  cardAddingPopup.close();
};

//Фн сабмит формы редактирования профиля
 function submitProfileForm(inputValues) {
  profilePopup.handleLoading(true)
  api.editProfile(inputValues)
    .then(data => userInfo.setUserInfo({ name: data.name, about: data.about }))
    .catch(err => console.log(err))
    .finally(() => profilePopup.handleLoading(false))
  profilePopup.close();
};

//Фн сабмит формы обновления аватара
function submitAvatarForm(inputValue) {
  avatarPopup.handleLoading(true)
  api.updateAvatar(inputValue)
    .then(res => userInfo.setAvatar(res))
    .catch(err => console.log(err))
    .finally(() => avatarPopup.handleLoading(false))
    avatarPopup.close();
}

//Фн обработчик попапа удаления карточки
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

