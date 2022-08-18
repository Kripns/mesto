
export default class Card {
  constructor(data, templateSelector, handleCardClick, api) {
    this._data = data;
    this._link = this._data.link;
    this._name = this._data.name;
    this._cardId = this._data._id
    this._likes = this._data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._api = api;
    // this._isLiked = false;
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
    this._cardHeading = this._element.querySelector('.place-card__heading');
    this._cardImage = this._element.querySelector('.place-card__image');
    this._likeIcon = this._element.querySelector('.place-card__like');
    this._likesCounter = this._element.querySelector('.place-card__like-counter');

    this._cardHeading.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likesCounter.textContent = this._likes.length;

    if(this._isLiked()) {this._likeIcon.classList.add('place-card__like_active')}
    this._setEventListeners();

    return this._element;
  };

//Устанавливаем обработчики лайка,
//корзинки и открытия попапа с картинкой
  _setEventListeners() {
    this._likeIcon.addEventListener('click', () => {
      this._toggleLike();
    });

    this._removeIcon = this._element.querySelector('.place-card__remove-icon');
    this._removeIcon.addEventListener('click', () => this._removeCard());

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name)
    });
  };

  _isLiked() {
    return this._likes.some(user => user._id === "4f4cf416006cc29a431a5c97");
  }

//Переключаем кнопку лайк
  _toggleLike() {
    if(this._isLiked()) {
      this._api.deleteLike(this._cardId).then(res => this._updateLikes(res));
      this._likeIcon.classList.remove('place-card__like_active');
    }
    else {
      this._api.setLike(this._cardId).then(res => this._updateLikes(res));
      this._likeIcon.classList.add('place-card__like_active')
    }
  };

  _updateLikes(updatedCard) {
    this._likes = updatedCard.likes
    this._likesCounter.textContent = this._likes.length;
  }



//Удаляем карточку
  _removeCard() {
    this._element.remove();
    this._element = null;
  };
};
