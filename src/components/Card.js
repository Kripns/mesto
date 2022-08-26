
export default class Card {
  constructor(data, templateSelector, handlers) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handlers = handlers;
    this._link = this._data.link;
    this._name = this._data.name;
    this._cardId = this._data._id;
    this._ownerId = this._data.owner._id;
    this._currentUserId = this._data.currentUser._id;
    this._likes = this._data.likes;
    this._handleCardClick = this._handlers.handleCardClick;
    this._handleLike = this._handlers.handleLike;
    this._handleDislike = this._handlers.handleDislike;
    this._handleCardDelete = this._handlers.handleCardDelete;
    this._removeElement = this._removeElement.bind(this);
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

    this._setEventListeners();
    this._setInitialLikes();
    this._hideRemoveButtons();

    return this._element;
  };

//Устанавливаем обработчики лайка,
//корзинки и открытия попапа с картинкой
  _setEventListeners() {
    this._likeIcon.addEventListener('click', () => {
      this._toggleLike()
    });

    this._removeIcon.addEventListener('click', () => {
      this._handleCardDelete(this._cardId, this._removeElement)
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._data);
    });
  };

//Закрашиваем сердечки на дефолтных карточках
  _setInitialLikes() {
    if(this.isLiked()) {this._likeIcon.classList.add('place-card__like_active')}
  }

//Проверяем лайки
  isLiked() {
    return this._likes.some(likedUser => this._currentUserId === likedUser._id);
  }

//Прячем корзинки на чужих карточках
  _hideRemoveButtons() {
    if(!this.isOwner()) {this._removeIcon.classList.add('place-card__remove-icon_hidden')}
  }

//Проверяем владельца карточки
  isOwner() {
    return this._currentUserId === this._ownerId;
  }

//Переключаем кнопку лайк, обновляем счетчик
  _toggleLike() {
    if(this.isLiked()) {this._handleDislike(this._data, updatedCard => {
        this._likeIcon.classList.remove('place-card__like_active');
        this._updateLikesCounter(updatedCard);
      })
    }
    else {
      this._handleLike(this._data, updatedCard => {
        this._likeIcon.classList.add('place-card__like_active')
        this._updateLikesCounter(updatedCard);
      })
    }
  };

//Обновляем счетчики лайков
  _updateLikesCounter(updatedCard) {
    this._likes = updatedCard.likes;
    this._likesCounter.textContent = this._likes.length;
  }

//Удаляем карточку из разметки
  _removeElement() {
    this._element.remove();
    this._element = null;
  }
};
