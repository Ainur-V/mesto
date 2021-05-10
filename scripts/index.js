import Card from './card.js';
import {initialCards} from './initialCards.js';
import FormValidator from './validate.js';
import {config} from './config.js';

const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelectorAll('.popup__close-button');
const profileUserName = document.querySelector('.profile__user-name');
const profileUserInfo = document.querySelector('.profile__user-info');
const addButton = document.querySelector('.profile__add-button');
const popupProfile = document.querySelector('#popup-edit-profile');
const popupAddElement = document.querySelector('#popup-add-element');

const formProfile = document.querySelector('#edit-profile');
const formProfileInputName = formProfile.querySelector('#edit-profile-name');
const formProfileInputInfo = formProfile.querySelector('#edit-profile-info');
const formProfileCloseButton = formProfile.querySelector('#edit-profile-close');

const formElement = document.querySelector('#add-element');
const formElementInputName = formElement.querySelector('#add-element-name');
const formElementInputLink = formElement.querySelector('#add-element-link');
const formElementCloseButton = formElement.querySelector('#add-element-close');

export const popupElement = document.querySelector('#popup-image-full');
export const popupElementImage = document.querySelector('.popup-element__image');
export const popupElementTitle = document.querySelector('.popup-element__title');
const popupElementClose = document.querySelector('.popup-element__close');

const elements = document.querySelector('.elements');

 //Функция наполнения элемента данными с последущим возвратом элемента
 function createElement(item) {
  const card = new Card(item.name, item.link, '#template-element');
  return card.getCard();
 }

//Функция добавления готового элемента на страницу
function addElement(element) {
    elements.prepend(element);
};

//Перебор и добавление элементов массива на страницу
initialCards.forEach(function (item) {
    addElement(createElement(item));
});

//Функция открытия попапа
export function openPopup (popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('click', toggleCloseByOverley);
    document.addEventListener('keydown', toggleCloseByEscape);
    document.addEventListener('mouseover', toggleOverleyMouseover);
    document.addEventListener('mouseout', toggleOverleyMouseout);
};

//Функция закрытия попапа
function closePopup (popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('click', toggleCloseByOverley);
    document.removeEventListener('keydown', toggleCloseByEscape);
    document.removeEventListener('mouseover', toggleOverleyMouseover);
    document.removeEventListener('mouseout', toggleOverleyMouseout);
}

//Реакция на клик по кнопке "Редактировать профиль"
editButton.addEventListener('click', () => {
  openPopup(popupProfile);
  formProfileInputName.value = profileUserName.textContent;
  formProfileInputInfo.value = profileUserInfo.textContent;
});

//Кнопка закрытия попапа "Редактировать профиль"
formProfileCloseButton.addEventListener('click', () => {
  closePopup(popupProfile);
  clearValidation(formProfile, config);
});

//Отправка данных попапа "Редактировать профиль"
formProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileUserName.textContent = formProfileInputName.value;
  profileUserInfo.textContent = formProfileInputInfo.value;
  closePopup(popupProfile);
});

//Реакция на клик по кнопке "Новое место"
addButton.addEventListener('click', () => {
  openPopup(popupAddElement);
});

//Кнопка закрытия попапа "Новое место"
formElementCloseButton.addEventListener('click', () => {
  closePopup(popupAddElement);
  clearValidation(formElement, config);
});

//Отправка данных попапа "Новое место"
formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const card = new Card (formElementInputName.value, formElementInputLink.value, '#template-element');
  addElement(card.getCard());
  closePopup(popupAddElement);
  formElement.reset();
  formElementValidator.disableFormButton();
});

//Кнопка закрытия попапа "Full image"
popupElementClose.addEventListener('click', () => {
  closePopup(popupElement);
});

//Функция закрытия попапа по клику на оверлей
function toggleCloseByOverley (evt) {
  if (evt.target.classList.contains('popup_opened')) {
  closePopup(document.querySelector('.popup_opened'));
  }
}

//Функция закрытия попапа по нажатию Escape
function toggleCloseByEscape (evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'))
  }
}

//Функция изменения курсора при наведении на оверлей
function toggleOverleyMouseover (evt) {
  if (evt.target.classList.contains('popup_opened')) {
    const popupNowOpen = document.querySelector('.popup_opened')
    popupNowOpen.classList.add('popup_overley-hover');
  } 
}

//Функция изменения курсора при уходе с оверлей
function toggleOverleyMouseout (evt) {
  if (evt.target.classList.contains('popup_opened')) {
    const popupNowOpen = document.querySelector('.popup_opened')
    popupNowOpen.classList.remove('popup_overley-hover');
  }
}

const formProfileValidator = new FormValidator(config, formProfile);
formProfileValidator.enableValidation();

const formElementValidator = new FormValidator(config, formElement);
formElementValidator.enableValidation();

function clearValidation (form, config) {
  const popupError = form.querySelectorAll(config.popupErrorClass);
  popupError.forEach(function(item) {
      item.textContent = "";
});
}