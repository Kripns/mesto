

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
]; // Создаем массив с дефолтными карточками

const placeCardTemplate = document.querySelector('.place-card-template').content; // находим шаблон карточки

defaultCards.forEach((el) => renderCard(el));   // вставляем в разметку дефолтные карточки


const profilePopup = document.querySelector('.popup_type_profile');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__heading');
const profileJob = document.querySelector('.profile__subheading');

document.querySelector('.edit-button').addEventListener('click', () => {
  openPopup(profilePopup);                              // нажимаем на эдит буттон, открываем попап
  nameInput.value = profileName.textContent;            // редактироввания профиля
  jobInput.value = profileJob.textContent;              // заполняем вэлъю инпутов
});


const popupCloseIcon = document.querySelector('.popup__close-icon');
profilePopup.querySelector('.popup__close-icon')            // нажимаем на крестик, закрываем попап.
.addEventListener('click', () => closePopup(profilePopup));


document.querySelector('.popup__form')                  // находим форму изменения профайла
.addEventListener('submit', profileFormSubmitHandler);  // отслеживаем субмит


const cardAddingPopup = document.querySelector('.popup_type_card-adding');
document.querySelector('.add-card-button')              // Открываем попап добавления карточки
.addEventListener('click', () => openPopup(cardAddingPopup));


cardAddingPopup.querySelector('.popup__close-icon')     // Закрываем попап на крестик
.addEventListener('click', () => closePopup(cardAddingPopup));


cardAddingPopup.querySelector('.popup__form')    // отслеживаем сабмит и закрываем попап
.addEventListener('submit', cardAddingSubmitHandler);



//фн декларэйшн

function renderCard (card) {                  //фн добавляет карточки в дом (принимает объект в кач. аргумента)
  const placeCard = placeCardTemplate.querySelector('.place-card').cloneNode(true);   //копируем содержимое темплейта
  const placeCardHeading = placeCard.querySelector('.place-card__heading');
  placeCardHeading.textContent = card.name;                        //заполняем заголовок карточки

  const placeCardImage = placeCard.querySelector('.place-card__image');
  placeCardImage.src = card.link;                                  //заполняем сорс и альт
  placeCardImage.alt = card.name;

  const imagePopup = document.querySelector('.popup_type_image');  //находим попап с картинкой
  placeCardImage.addEventListener('click', () => {                 //отслеживаем клик по карточке
    const fullsizeImage = imagePopup.querySelector('.popup__fullsize-image');
    fullsizeImage.src = card.link;                                 //заполняем название и ссылку
    fullsizeImage.alt = card.name;
    imagePopup.querySelector('.popup__subheading').textContent = card.name; //заполняем текст под картинкой
    openPopup(imagePopup);                                         //открываем попап
  });

  imagePopup.querySelector('.popup__close-icon')                   //закрываем а крестик
  .addEventListener('click', () => closePopup(imagePopup));


  placeCard.querySelector('.place-card__like')                     //реализуем нажатие лайков
  .addEventListener('click', event => event.target.classList.toggle('place-card__like_active'));

  placeCard.querySelector('.place-card__remove-icon')              //реализуем удаление карточек
  .addEventListener('click', event => event.target.closest('.place-card').remove());

  document.querySelector('.places').prepend(placeCard);            //добавляем карточку в разметку
};


function cardAddingSubmitHandler (event) {        //обработчик отправки формы добавления карточек
  event.preventDefault();                         //отменяем стандартную отправку

  const newCard = {};                             //создаем объект с новой карточкой
  let placeNameInput = cardAddingPopup.querySelector('.popup__input_type_place-name');
  let placePictureLink = cardAddingPopup.querySelector('.popup__input_type_url');
  newCard.name = placeNameInput.value;            //вставляем значения
  newCard.link = placePictureLink.value;          //из инпутов

  placeNameInput.value = '';                      //очищаем
  placePictureLink.value = '';                    //поля инпутов

  renderCard(newCard);                            //добавляем карточку в дом
  closePopup(cardAddingPopup);                    //закрываем попап
};


function profileFormSubmitHandler (event) {        // обработчик отправки формы создания профиля
  event.preventDefault();                          // отменяем стандартную отправку
  profileName.textContent = nameInput.value;       // заполняем инпуты
  profileJob.textContent = jobInput.value;
  closePopup(profilePopup);                        // закрываем по нажатию на субмит
};

function openPopup (popupName) {
  popupName.classList.add('popup_opened')          // фн открывает попап
};                                                 // принимают на вход попап

function closePopup (popupName) {                  //фн закрывает попап
  popupName.classList.remove('popup_opened')
};
