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

const imagePopup = new PopupWithImage({
  popupSelector: '.popup_type_image'
});



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

function handleCardClick({ link: link, name: name }) {
  imagePopup.open({ link: link, name: name });
};

// //Фн закрывает попап
// function closePopup(popupName) {
//   popupName.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closeByEscape);
//   popupName.removeEventListener('mousedown', closeByOverlay);
// };

// //Фн закрывает попап на эскейп
// function closeByEscape(evt) {
//   if(evt.key === 'Escape') {
//     closePopup(document.querySelector('.popup_opened'));
//   };
// };

// //Фн закрывает попап по клику на оверлэй
// function closeByOverlay(evt) {
//   if(evt.target.classList.contains('popup')) {
//     closePopup(evt.target);
//   };
// };



//Фн обработчик отправки формы добавления карточек
//создаем объект с новой карточкой
//вставляем значения из инпутов
//очищаем поля инпутов
//добавляем карточку в дом
//закрываем попап


const defaultCardList = new Section({
  items: defaultCards,
  renderer: (cardData) => {
    defaultCardList.addItem(createCard(cardData.link, cardData.name))
  }
}, '.places');

defaultCardList.renderItems();


function createCard(link, name) {
  const card = new Card(link, name, '.place-card-template', () => {
    handleCardClick({ link: link, name: name });
  })
  const cardElement = card.generateCard();
  return cardElement;
}

//ОБРАБОТЧИКИ

//открываем попап редактирования профиля
//по клинку на эдит бтн
//заполняем вэлъю инпутов
//убираем ошибки, меняем кнопку

const profilePopup = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  formSubmitHandler: evt => submitProfileForm(evt)
});

const cardAddingPopup = new PopupWithForm({
  popupSelector: '.popup_type_card-adding',
  formSubmitHandler: evt => submitCardAddingForm(evt)
})




function submitCardAddingForm(evt) {
  handleFormSubmit(evt);
  const newCard = {};
  newCard.name = placeNameInput.value;
  newCard.link = placeLinkInput.value;
  defaultCardList.addItem(newCard);
  cardAddingPopup.close();
};

//Фн отменяет дефолтную отпраку формы
function handleFormSubmit(evt) {
  evt.preventDefault();
};

//Фн обработчик отправки формы создания профиля
//заполняем инпуты
//закрываем по нажатию на сабмит
function submitProfileForm(event) {
  handleFormSubmit(event);
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  profilePopup.close();
};



document.querySelector('.edit-button').addEventListener('click', () => {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  profileFormValidator.resetInputError();
  profilePopup.open();
});


// //Отслеживаем сабмит
// profileForm.addEventListener('submit', handleProfileFormSubmit);

//Открываем попап добавления карточки
//сбрасываем ошибки с формы
document.querySelector('.add-card-button')
.addEventListener('click', () => {
  cardAddingFormValidator.resetInputError();
  cardAddingPopup.open();
});

// //Закрываем попап на крестик
// cardAddingPopup.querySelector('.popup__close-icon')
// .addEventListener('click', () => closePopup(cardAddingPopup));

// //Отслеживаем сабмит и закрываем попап
// cardAddingForm.addEventListener('submit', submitCardAddingForm);

//  //Закрываем с картинкой на крестик
//  imagePopup.querySelector('.popup__close-icon')
//  .addEventListener('click', () => closePopup(imagePopup));



