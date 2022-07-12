
export default class Card {
  constructor(cardData, imagePopup, openPopup, templateSelector){
    this._cardData = cardData;
    this._templateSelector = templateSelector;
    this._imagePopup = imagePopup;
    this._openPopup = openPopup;
  };

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.place-card')
    .cloneNode(true);

    return cardElement;
  };

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

  _setEventListeners() {
    this._like = this._element.querySelector('.place-card__like');
    this._like.addEventListener('click', () => this._like
    .classList.toggle('place-card__like_active'));

    this._removeIcon = this._element.querySelector('.place-card__remove-icon');
    this._removeIcon.addEventListener('click', () => this._element.remove());

    this._cardImage.addEventListener('click', () => this._handlePopupOpening());
  };

  _handlePopupOpening() {
    this._fullsizeImage = this._imagePopup.querySelector('.popup__fullsize-image');
    this._fullsizeImage.src = this._cardData.link;
    this._fullsizeImage.alt = this._cardData.name;
    this._imagePopup.querySelector('.popup__subheading').textContent = this._cardData.name;
    this._openPopup(this._imagePopup);
  };
};
