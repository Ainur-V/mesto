import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {editButton, addButton, formProfile, formProfileInputName, formProfileInputInfo, formProfileCloseButton, formElement, formElementCloseButton, popupElementClose, initialCards, config} from '../utils/utils.js';

const popupImage = new PopupWithImage('#popup-image-full');
popupImage.setEventListener();
const popupProfile = new PopupWithForm('#popup-edit-profile', popupProfileSubmitHandler);
popupProfile.setEventListener();
const popupAddElement = new PopupWithForm('#popup-add-element', popupAddSubmitHandler);
popupAddElement.setEventListener();
const profileInfo = new UserInfo({nameSelector: '.profile__user-name', infoSelector: '.profile__user-info'});

//Реакция на клик по кнопке "Редактировать профиль"  !!! 8 project !!!
editButton.addEventListener('click', () => {
  popupProfile.open();
  const userInfo = profileInfo.getUserInfo();
  formProfileInputName.value = userInfo.name;
  formProfileInputInfo.value = userInfo.info;
  formProfileValidator.resetValidation();
});

//Отправка данных попапа "Редактировать профиль"  !!! 8 project !!!
function popupProfileSubmitHandler (values) {
  profileInfo.setUserInfo(values.name, values.info);
  popupProfile.close();
}

//Реакция на клик по кнопке "Новое место"  !!! 8 project !!!
addButton.addEventListener('click', () => {
  popupAddElement.open();
  formElementValidator.resetValidation();
});

//Отправка данных попапа "Новое место"   !!! 8 project !!!
function popupAddSubmitHandler (values) {
  cardsList.addItem(createCard(values));
  popupAddElement.close();
  formElementValidator.disableFormButton();
}

//Создание экземпляра класса для валидации инпутов у попапа "Редактировать профиль" и запуск валидации
const formProfileValidator = new FormValidator(config, formProfile);
formProfileValidator.enableValidation();

//Создание экземпляра класса для валидации инпутов у попапа "Новое место" и запуск валидации
const formElementValidator = new FormValidator(config, formElement);
formElementValidator.enableValidation();

//Функция наполнения и открытие попапа картинки карточки !!!! 8 project !!!
function handleCardClick(name, link) {
     popupImage.open(name, link);
}

//добавление элементов на страницу
const cardsList = new Section ({
  items: initialCards,
  renderer: (item) => {
    cardsList.addItem(createCard(item));
  }
}, '.elements');

//добавление элементов на страницу
cardsList.renderItem();

//функция создания карточки
function createCard(item) {
  const card = new Card(item.name, item.link, '#template-element', handleCardClick);
  return card.getCard();
} 