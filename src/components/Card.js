
export default class Card {
  constructor(data, templateSelector, handlers) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handlers = handlers;
    this._link = this._data.link;
    this._name = this._data.name;
    // this._cardId = this._data._id;
    // this._ownerId = this._data.owner._id;
    this._likes = this._data.likes;
    this._handleCardClick = this._handlers.handleCardClick;
    this._isLiked = this._handlers.isLiked;
    this._handleLike = this._handlers.handleLike;
    this._handleDislike = this._handlers.handleDislike;
    this._handleCardDelete = this._handlers.handleCardDelete;
    // this._api = api;
    // this._isOwner = isOwner;
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
    this._removeIcon = this._element.querySelector('.place-card__remove-icon');

    this._cardHeading.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likesCounter.textContent = this._likes.length;
    this._element.id = this._cardId;

    if(this._isLiked(this._data)) {
      console.log(this._isLiked(this._data))
      this._likeIcon.classList.add('place-card__like_active')}
    this._setEventListeners();

    // if(!this._isOwner(this._ownerId)) {
    //   this._removeIcon.classList.add('place-card__remove-icon_hidden')
    // }

    return this._element;
  };

//Устанавливаем обработчики лайка,
//корзинки и открытия попапа с картинкой
  _setEventListeners() {
    this._likeIcon.addEventListener('click', () => {
      this._toggleLike()
    });

    this._removeIcon.addEventListener('click', () => {
      this._handleCardDelete(this._cardId, this._element)
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  };

  // _isLiked() {
  //   return this._likes.some(user => user._id === "4f4cf416006cc29a431a5c97");
  // }

//Переключаем кнопку лайк
  _toggleLike() {
    if(this._isLiked(this._data)) {
      this._handleDislike(this._data, updatedCard => {
        this._likeIcon.classList.remove('place-card__like_active');
        this._updateLikes(updatedCard);
      })
    }
    else {
      this._handleLike(this._data, updatedCard => {
        this._likeIcon.classList.add('place-card__like_active')
        this._updateLikes(updatedCard);
      })
    }
  };

  _updateLikes(updatedCard) {
    this._likes = updatedCard.likes;
    this._likesCounter.textContent = this._likes.length;
  }
};
