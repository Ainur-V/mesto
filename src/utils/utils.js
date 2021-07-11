const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const formProfile = document.querySelector('#edit-profile');
const formProfileInputName = formProfile.querySelector('#edit-profile-name');
const formProfileInputInfo = formProfile.querySelector('#edit-profile-info');
const formProfileCloseButton = formProfile.querySelector('#edit-profile-close');
const formElement = document.querySelector('#add-element');
const formElementCloseButton = formElement.querySelector('#add-element-close');
const popupElementClose = document.querySelector('.popup-element__close');
const formConfirmDelete = document.querySelector('#popup-confirm-delete');
const avatar = document.querySelector('.profile__avatar');
const formAvatar = document.querySelector('#change-avatar');

const popupAddCard = document.querySelector('.popup-add-element');
const popupEditInfo = document.querySelector('.popup-edit-profile');
const popupAvatar = document.querySelector('.popup-avatar');

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

  const config = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disable',
    errorClass: 'popup__error_visible',
    popupErrorClass: '.popup__error'
  };


  export {editButton, addButton, formProfile, formProfileInputName, formProfileInputInfo, formProfileCloseButton, formElement, formElementCloseButton, popupElementClose, initialCards, config, formConfirmDelete, avatar, formAvatar, popupAddCard, popupEditInfo, popupAvatar};