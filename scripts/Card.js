
export default class Card {
  constructor(cardData, templateSelector, openImagePopup){
    this._cardData = cardData;
    this._templateSelector = templateSelector;
    this._openImagePopup = openImagePopup;
  };

//Получааем шаблон карточки
  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.place-card')
    .cloneNode(true);

    return cardElement;
  };

//Содаем готовую карточку
//заполняем все элементы данными
//добаляем обработчики
  generateCard() {
    this._element = this._getTemplate();
    this._cardHeading = this._element
      .querySelector('.place-card__heading');
    this._cardImage = this._element
      .querySelector('.place-card__image');

    this._cardHeading.textContent = this._cardData.name;
    this._cardImage.src = this._cardData.link;
    this._cardImage.alt = this._cardData.name;

    this._setEventListeners();

    return this._element;
  };

//Устанавливаем обработчики лайка,
//корзинки и открытия попапа с картинкой
  _setEventListeners() {
    this._like = this._element.querySelector('.place-card__like');
    this._like.addEventListener('click', () => this._setLike());

    this._removeIcon = this._element.querySelector('.place-card__remove-icon');
    this._removeIcon.addEventListener('click', () => this._removeCard());

    this._cardImage.addEventListener('click', () => {
      this._openImagePopup(this._cardData.link, this._cardData.name)
    });
  };

//Переключаем кнопку лайк
  _setLike() {
    this._like.classList.toggle('place-card__like_active')
  };

//Удаляем карточку
  _removeCard() {
    this._element.remove();
    this._element = null;
  };
};
