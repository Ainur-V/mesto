import {popupElement, popupElementImage, popupElementTitle, openPopup} from './index.js';

export default class Card {
    constructor(name, link, templateSelector) {
      this._name = name,
      this._link = link,
      this._templateElement = document.querySelector(templateSelector).content;
    }
  
    getCard () {
      this._element = this._templateElement.querySelector('.element').cloneNode(true);
      this._element.querySelector('.element__name').textContent = this._name;
      this._element.querySelector('.element__image').src = this._link;
      this._element.querySelector('.element__image').setAttribute('alt', `изображение карточки ${this._name}`);
      this._likeButton = this._element.querySelector('.element__like');
      this._deleteButton = this._element.querySelector('.element__delete');
      this._imageButton = this._element.querySelector('.element__image');
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
      this._imageButton.addEventListener('click', () => {
        openPopup(popupElement);
        popupElementImage.src = this._link;
        popupElementTitle.textContent = this._name;
      })
    }
  
    _toggleLikeButton() {
      this._likeButton.classList.toggle('element__like_active');
    }
  
    _deleteCard() {
      this._element.remove();
    }
  }