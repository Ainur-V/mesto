export default class Card {
    constructor(name, link, templateSelector, handleCardClick) {
      this._name = name,
      this._link = link,
      this._templateElement = document.querySelector(templateSelector).content;
      this._handleCardClick = handleCardClick;
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
      return this._element;
    }
  
    _addEventListener () {
      this._likeButton.addEventListener('click', () => {
        this._toggleLikeButton();
      })
      this._deleteButton.addEventListener('click', () => {
        this._deleteCard();
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
  }