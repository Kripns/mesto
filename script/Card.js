
class Card {
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

  _generateCard() {
    this._element = this._getTemplate();
    this._cardHeading = this._element
      .querySelector('.place-card__heading');
    this._cardImage = this._element
      .querySelector('.place-card__image');

    this._cardHeading.textContent = this._cardData.name;
    this._cardImage.src = this._cardData.link;
    this._cardImage.alt = this._cardData.name;

  };


}



export default Card;
