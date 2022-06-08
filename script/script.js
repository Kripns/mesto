
// нажимаем на эдит буттон, открываем попап
// заполняем вэлъю инпутов
const profilePopup = document.querySelector('.popup_type_profile');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__heading');
const profileJob = document.querySelector('.profile__subheading');

document.querySelector('.edit-button').addEventListener('click', () => {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});


// нажимаем на крестик, закрываем попап.
const popupCloseIcon = document.querySelector('.popup__close-icon');

profilePopup.querySelector('.popup__close-icon')
.addEventListener('click', () => closePopup(profilePopup));


// обработчик отправки формы
function profileFormSubmitHandler (event) {
  event.preventDefault();                               // отменяем стандартную отправку
  profileName.textContent = `${nameInput.value}`;       // заполняем инпуты
  profileJob.textContent = `${jobInput.value}`;
  closePopup(profilePopup);                             // закрываем по нажатию на субмит
};


document.getElementsByName('edit-profile-form')[0]      //находим форму изменения профайла
.addEventListener('submit', profileFormSubmitHandler);  // отслеживаем субмит


// Открываем попап добавления карточки
const cardAddingPopup = document.querySelector('.popup_type_card-adding');

document.querySelector('.add-card-button')
.addEventListener('click', () => openPopup(cardAddingPopup));

//Закрываем попап на крестик
cardAddingPopup.querySelector('.popup__close-icon')
.addEventListener('click', () => closePopup(cardAddingPopup));


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

const placeCardTemplate = document.querySelector('.place-card-template').content;

defaultCards.forEach((el) => renderDefaultCards(el));

function renderDefaultCards (card) {
  const placeCard = placeCardTemplate.querySelector('.place-card').cloneNode(true);
  placeCard.querySelector('.place-card__heading').textContent = card.name;
  placeCard.querySelector('.place-card__image').src = card.link;
  placeCard.querySelector('.place-card__image').alt = card.name;

  document.querySelector('.places').prepend(placeCard);
};

function openPopup (popupName) {
  popupName.classList.add('popup_opened')
}; // фн открывает попап

function closePopup (popupName) {
  popupName.classList.remove('popup_opened')
}; //фн закрывает попап
