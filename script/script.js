

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



function openPopup (popupName) {
  popupName.classList.add('popup_opened')     // фн открывает попап
};                                            // принимают на вход попап

function closePopup (popupName) {             //фн закрывает попап
  popupName.classList.remove('popup_opened')
};

function handleProfileFormSubmit (event) {    // обработчик отправки формы создания профиля
  event.preventDefault();                     // отменяем стандартную отправку
  profileName.textContent = profileNameInput.value;  // заполняем инпуты
  profileJob.textContent = profileJobInput.value;
  closePopup(profilePopup);                   // закрываем по нажатию на субмит
};

function handleAddingCardFormSubmit (event) {   // обработчик отправки формы добавления карточек
  event.preventDefault();                       // отменяем стандартную отправку

  const newCard = {};                           // создаем объект с новой карточкой
  newCard.name = placeNameInput.value;          // вставляем значения
  newCard.link = placeLinkInput.value;        // из инпутов

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
    fullsizeImage.alt = card.name;

    //заполняем текст под картинкой
    imagePopup.querySelector('.popup__subheading').textContent = card.name;
    openPopup(imagePopup);        //открываем попап
  });

  imagePopup.querySelector('.popup__close-icon')                   //закрываем на крестик
  .addEventListener('click', () => closePopup(imagePopup));

  placeCard.querySelector('.place-card__like')                     //реализуем нажатие лайков
  .addEventListener('click', event => event.target.classList.toggle('place-card__like_active'));

  placeCard.querySelector('.place-card__remove-icon')              //реализуем удаление карточек
  .addEventListener('click', event => event.target.closest('.place-card').remove());

  return placeCard;
};

function renderCard (card) {
  placesSection.prepend(createCard(card)) //добавляем карточку в разметку
};

defaultCards.forEach((el) => renderCard(el));   // вставляем в разметку дефолтные карточки


document.querySelector('.edit-button').addEventListener('click', () => {
  profileNameInput.value = profileName.textContent;            // редактироввания профиля
  profileJobInput.value = profileJob.textContent;              // заполняем вэлъю инпутов
  openPopup(profilePopup);                              // нажимаем на эдит буттон, открываем попап
});


profilePopup.querySelector('.popup__close-icon')            // нажимаем на крестик, закрываем попап.
.addEventListener('click', () => closePopup(profilePopup));


document.querySelector('.popup__form')                  // находим форму изменения профайла
.addEventListener('submit', handleProfileFormSubmit);  // отслеживаем субмит


document.querySelector('.add-card-button')              // Открываем попап добавления карточки
.addEventListener('click', () => openPopup(cardAddingPopup));


cardAddingPopup.querySelector('.popup__close-icon')     // Закрываем попап на крестик
.addEventListener('click', () => closePopup(cardAddingPopup));


cardAddingPopup.querySelector('.popup__form')    // отслеживаем сабмит и закрываем попап
.addEventListener('submit', handleAddingCardFormSubmit);

