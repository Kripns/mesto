
export default class Card {
  constructor(cardData, templateSelector){
    this._cardData = cardData;
    this._templateSelector = templateSelector;

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

    _setEventListeners();

    return this._element;
  };

  _setEventListeners() {
    this._like = this._element.querySelector('.place-card__like');
    this._like.addEventListener('click', () => this._like
    .classList.toggle('place-card__like_active'));

    this._removeIcon = this._element.querySelector('.place-card__remove-icon');
    this._removeIcon.addEventListener('click', () => this._element.remove());

    this._cardImage.addEventListener('click', this._openImagePopup);
  };

  _openImagePopup() {
    fullsizeImage.src = this._cardData.link;
    fullsizeImage.alt = this._cardData.name;
    imagePopup.querySelector('.popup__subheading').textContent = this._cardData.name;
    imagePopup.classList.add('popup_opened');
  };
};




