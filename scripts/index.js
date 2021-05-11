import Card from './Card.js';
import {initialCards} from './initialCards.js';
import FormValidator from './FormValidator.js';
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

const popupElement = document.querySelector('#popup-image-full');
const popupElementImage = document.querySelector('.popup-element__image');
const popupElementTitle = document.querySelector('.popup-element__title');
const popupElementClose = document.querySelector('.popup-element__close');

const elements = document.querySelector('.elements');

 //Функция наполнения элемента данными с последущим возвратом элемента
 function createElement(name, link, template) {
  const card = new Card(name, link, template, handleCardClick);
  return card.getCard();
 }

//Функция добавления готового элемента на страницу
function addElement(element) {
    elements.prepend(element);
};

//Перебор и добавление элементов массива на страницу
initialCards.forEach(function (item) {
    addElement(createElement(item.name, item.link, '#template-element'));
});

//Функция открытия попапа
export function openPopup (popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('click', toggleCloseByOverley);
    document.addEventListener('keydown', toggleCloseByEscape);
};

//Функция закрытия попапа
function closePopup (popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('click', toggleCloseByOverley);
    document.removeEventListener('keydown', toggleCloseByEscape);
}

//Реакция на клик по кнопке "Редактировать профиль"
editButton.addEventListener('click', () => {
  openPopup(popupProfile);
  formProfileInputName.value = profileUserName.textContent;
  formProfileInputInfo.value = profileUserInfo.textContent;
  formProfileValidator.resetValidation();
});

//Кнопка закрытия попапа "Редактировать профиль"
formProfileCloseButton.addEventListener('click', () => {
  closePopup(popupProfile);
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
  formElementValidator.resetValidation();
});

//Кнопка закрытия попапа "Новое место"
formElementCloseButton.addEventListener('click', () => {
  closePopup(popupAddElement);
});

//Отправка данных попапа "Новое место"
formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addElement(createElement(formElementInputName.value, formElementInputLink.value, '#template-element'));
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
  closePopup(evt.target);
  }
}

//Функция закрытия попапа по нажатию Escape
function toggleCloseByEscape (evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'))
  }
}

//Создание экземпляра класса для валидации инпутов у попапа "Редактировать профиль" и запуск валидации
const formProfileValidator = new FormValidator(config, formProfile);
formProfileValidator.enableValidation();

//Создание экземпляра класса для валидации инпутов у попапа "Новое место" и запуск валидации
const formElementValidator = new FormValidator(config, formElement);
formElementValidator.enableValidation();

//Функция наполнения и открытие попапа картинки карточки
function handleCardClick(name, link) {
  popupElementTitle.textContent = name;
  popupElementImage.src = link;
  openPopup(popupElement);
}