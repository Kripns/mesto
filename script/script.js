

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

// находим попап редактрования профиля, инпуты в попапе и текст в профиле
const profilePopup = document.querySelector('.popup_type_profile');
const profileNameInput = document.querySelector('.popup__input_type_name');
const profileJobInput = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__heading');
const profileJob = document.querySelector('.profile__subheading');

// находим попап добавления карточки и инпуты в нутри него
const cardAddingPopup = document.querySelector('.popup_type_card-adding');
const placeNameInput = cardAddingPopup.querySelector('.popup__input_type_place-name');
const placeLinkInput = cardAddingPopup.querySelector('.popup__input_type_url');

// находим попап с картинкой и саму картинку
const imagePopup = document.querySelector('.popup_type_image');
const fullsizeImage = imagePopup.querySelector('.popup__fullsize-image');

// находим секцию, куда будем вставлять карточки
const placesSection = document.querySelector('.places');


// фн открывает попап
function openPopup (popupName) {
  popupName.classList.add('popup_opened')
};

//фн закрывает попап
function closePopup (popupName) {
  popupName.classList.remove('popup_opened')
};

// обработчик отправки формы создания профиля
// отменяем стандартную отправку
// заполняем инпуты
// закрываем по нажатию на субмит
function handleProfileFormSubmit (event) {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopup(profilePopup);
};

function handleAddingCardFormSubmit (event) {   // обработчик отправки формы добавления карточек
  event.preventDefault();                       // отменяем стандартную отправку

  const newCard = {};                           // создаем объект с новой карточкой
  newCard.name = placeNameInput.value;          // вставляем значения
  newCard.link = placeLinkInput.value;          // из инпутов

  placeNameInput.value = '';                    // очищаем
  placeLinkInput.value = '';                  // поля инпутов

  renderCard(newCard);                          // добавляем карточку в дом
  closePopup(cardAddingPopup);                  // закрываем попап
};

//фн добавляет карточки в дом (принимает объект в кач. аргумента)
function createCard (card) {
  //копируем содержимое темплейта
  const placeCard = placeCardTemplate.querySelector('.place-card').cloneNode(true);
  const placeCardHeading = placeCard.querySelector('.place-card__heading');
  const placeCardImage = placeCard.querySelector('.place-card__image');

  placeCardHeading.textContent = card.name;           //заполняем заголовок карточки
  placeCardImage.src = card.link;                     //заполняем сорс и альт
  placeCardImage.alt = card.name;

  placeCardImage.addEventListener('click', () => {    //отслеживаем клик по карточке
    fullsizeImage.src = card.link;                    //заполняем название и ссылку
    fullsizeImage.alt = card.name;                    //заполняем текст под картинкой

    imagePopup.querySelector('.popup__subheading').textContent = card.name;
    openPopup(imagePopup);        //открываем попап
  });

  //закрываем на крестик
  imagePopup.querySelector('.popup__close-icon')
  .addEventListener('click', () => closePopup(imagePopup));

  //реализуем нажатие лайков
  placeCard.querySelector('.place-card__like')
  .addEventListener('click', event => event.target.classList.toggle('place-card__like_active'));

  //реализуем удаление карточек
  placeCard.querySelector('.place-card__remove-icon')
  .addEventListener('click', event => event.target.closest('.place-card').remove());

  return placeCard;
};

//добавляем карточку в разметку
function renderCard (card) {
  placesSection.prepend(createCard(card));
};

// вставляем в разметку дефолтные карточки
defaultCards.forEach((el) => renderCard(el));


document.querySelector('.edit-button').addEventListener('click', () => {
  profileNameInput.value = profileName.textContent;            // редактироввания профиля
  profileJobInput.value = profileJob.textContent;              // заполняем вэлъю инпутов
  openPopup(profilePopup);                              // нажимаем на эдит буттон, открываем попап
});

// нажимаем на крестик, закрываем попап.
profilePopup.querySelector('.popup__close-icon')
.addEventListener('click', () => closePopup(profilePopup));

// находим форму изменения профайла
// отслеживаем субмит
document.querySelector('.popup__form')
.addEventListener('submit', handleProfileFormSubmit);

// Открываем попап добавления карточки
document.querySelector('.add-card-button')
.addEventListener('click', () => openPopup(cardAddingPopup));

// Закрываем попап на крестик
cardAddingPopup.querySelector('.popup__close-icon')
.addEventListener('click', () => closePopup(cardAddingPopup));

 // отслеживаем сабмит и закрываем попап
cardAddingPopup.querySelector('.popup__form')
.addEventListener('submit', handleAddingCardFormSubmit);

