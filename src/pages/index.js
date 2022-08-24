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
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';



//Экземпляры классов
const profileFormValidator = new FormValidator(validationConfig, profileForm);
const cardAddingFormValidator = new FormValidator(validationConfig, cardAddingForm);

const api = new Api(apiConfig);


const cardList = new Section(
  cardData => cardList.addItem(createCard(cardData)), '.places');



const currentUser = api.getUser()

currentUser.then(data => {
  userInfo.setUserInfo(data);
})
.catch(err => console.log(err));


const initalCards = api.getCards();

initalCards.then(data => {
  cardList.renderItems(data);
})
  .catch(err => console.log(err));


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




// function isOwner(cardData) {
//   return ownerId === cardData.owner._id;
// }

const deleteCardPopup = new PopupWithConfirmation ('.popup_type_delete', handleDeletePopupButton);
deleteCardPopup.setEventListeners();


function handleDeletePopupButton(cardId, element) {
  return api.deleteCard(cardId).then(res => {
    element.remove();
    element = null;
    deleteCardPopup.close();
  }).catch(err => console.log(err))
}

function handleCardDelete(cardId, element) {
  deleteCardPopup.open(cardId, element)
}

//ФУНКЦИИ

//Фн создания карточки
function createCard(cardData) {
  const card = new Card(cardData, '.place-card-template', {
    handleCardClick: handleCardClick,
    handleCardDelete: handleCardDelete,
    handleLike: handleLike,
    handleDislike: handleDislike,
    isLiked: isLiked
  }
  // () => {
  //   handleCardClick(cardData);
  // }, api, handleCardDelete, () => isOwner(cardData)
  )
  const cardElement = card.generateCard();
  return cardElement;
};

function isLiked(cardData) {
    currentUser
    .then(currentUserData => {
      return cardData.likes.some(user => currentUserData._id === user._id)
    })
    // .catch(err => console.log(err))
}

function handleLike(cardData, likeCallback) {
  api.setLike(cardData._id)
    .then(updatedCard => {
      likeCallback(updatedCard)
      cardData = updatedCard;
    })
    .catch(err => console.log(err))
}

function handleDislike(cardData, dislikeCallback) {
  api.deleteLike(cardData._id)
    .then(updatedCard => {
      dislikeCallback(updatedCard)
      cardData = updatedCard;
    })
    .catch(err => console.log(err));
}

//Фн открытия попапа с картинкой
function handleCardClick({ link: link, name: name }) {
  imagePopup.open({ link: link, name: name });
};

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



