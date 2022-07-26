//КОНСТАНТЫ

//Массив с дефолтными карточками
export const defaultCards = [
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
export const profilePopup = document.querySelector('.popup_type_profile');
export const profileForm = profilePopup.querySelector('.popup__form');
export const profileNameInput = document.querySelector('.popup__input_type_name');
export const profileJobInput = document.querySelector('.popup__input_type_job');
export const profileName = document.querySelector('.profile__heading');
export const profileJob = document.querySelector('.profile__subheading');

//Элементы попапа добавления карточки
export const cardAddingPopup = document.querySelector('.popup_type_card-adding');
export const cardAddingForm = document.forms['add-card'];
export const placeNameInput = cardAddingPopup.querySelector('.popup__input_type_place-name');
export const placeLinkInput = cardAddingPopup.querySelector('.popup__input_type_url');

//Элементы попапа с картинкой
export const imagePopup = document.querySelector('.popup_type_image');
export const popupImage = imagePopup.querySelector('.popup__fullsize-image');
export const popupImageCaption = imagePopup.querySelector('.popup__subheading');

//Секция, куда будем вставлять карточки
export const placesSection = document.querySelector('.places');
