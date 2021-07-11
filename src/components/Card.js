export default class Card {
    constructor(name, link, likes, cardId, cardOwnerId, userId, templateSelector, handleCardClick, deleteCardHandler, likeCardHandler) {
      this._name = name,
      this._link = link,
      this._likes = likes;
      this._cardId = cardId;
      this._cardOwnerId = cardOwnerId;
      this._userId = userId;
      this._templateElement = document.querySelector(templateSelector).content;
      this._handleCardClick = handleCardClick;
      this._deleteCardHandler = deleteCardHandler;
      this._likeCardHandler = likeCardHandler;
    }

    setLikes(newCard) {
      if (newCard) {
        this._likes = newCard.likes;
  
      }
      this._element.querySelector('.element__like-counter').textContent = this._likes.length;

      this.cardLiked = this._likes.some(element => element._id === this._userId)
      if (this.cardLiked) {
        this._likeButton.classList.add('element__like_active');
      } else {
        this._likeButton.classList.remove('element__like_active');
      }
    }

  
    getCard () {
      this._element = this._templateElement.querySelector('.element').cloneNode(true);
      this._cardImage = this._element.querySelector('.element__image');
      this._element.querySelector('.element__name').textContent = this._name;
      this._cardImage.src = this._link;
      this._cardImage.setAttribute('alt', `изображение карточки ${this._name}`);
      this._likeButton = this._element.querySelector('.element__like');
      this._deleteButton = this._element.querySelector('.element__delete');
      this._addEventListener();
      this.setLikes();

      if (this._cardOwnerId === this._userId) {
        this._element.querySelector('.element__delete').classList.remove('element__delete_hidden');
      }

      return this._element;
    }
  
    _addEventListener () {
      this._likeButton.addEventListener('click', () => {
        this._likeCardHandler(this);
      })
      this._deleteButton.addEventListener('click', () => {
        this._deleteCardHandler(this);
      })
      this._cardImage.addEventListener('click', () => {
        this._handleCardClick(this._name, this._link);
      })
    }
  
    _toggleLikeButton() {
      this._likeButton.classList.toggle('element__like_active');
    }

    _deleteCard() {
      this._element.remove();
    }

    getId() {
      return this._cardId;
    }
  }