import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {editButton, addButton, formProfile, formProfileInputName, formProfileInputInfo, formProfileCloseButton, formElement, formElementCloseButton, popupElementClose, initialCards, config, formConfirmDelete, avatar, formAvatar, popupAddCard, popupEditInfo, popupAvatar} from '../utils/utils.js';
import Api from '../components/Api';
import PopupWithConfirm from '../components/PopupWithConfirm'; //'../../../mesto-main/src/components/PopupWithConfirm'

const popupImage = new PopupWithImage('#popup-image-full');
popupImage.setEventListener();
const popupProfile = new PopupWithForm('#popup-edit-profile', popupProfileSubmitHandler);
popupProfile.setEventListener();
const popupAddElement = new PopupWithForm('#popup-add-element', popupAddSubmitHandler);
popupAddElement.setEventListener();
const popupConfirmDelete = new PopupWithConfirm('#popup-confirm-delete');
popupConfirmDelete.setEventListener();
const popupAvatarChange = new PopupWithForm('#popup-avatar-change', popupAvatarSubmit);
popupAvatarChange.setEventListener();

const profileInfo = new UserInfo({nameSelector: '.profile__user-name', infoSelector: '.profile__user-info', avatarSelector: '.profile__avatar'});

const api = new Api('https://nomoreparties.co/v1/cohort-25', '0914c1e5-a82c-45d3-af24-5c2f24b3882c')

const cardsList = new Section({
  renderer: (item) => {
    cardsList.addItem(createCard(item));
   }
  }, '.elements');


//первоначальная загрузка информации с сервера
api.getUserInfo()
  .then((result) => {
    console.log(result)
    profileInfo.setUserInfo(result.name, result.about, result._id);
    profileInfo.setAvatar(result.avatar)
  })
api.getCards()
  .then((result)=> {
    console.log(result)
      cardsList.renderItem(result.reverse()); //reverse чтобы в корректном порядке выставить массив
  })


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
  loading(true, popupEditInfo);
  api.changeUserInfo(values.name, values.info)
    .then((data) => {
      profileInfo.setUserInfo(data.name, data.about);
    })
    .catch(e => console.log(`Ошибка при редактировании профиля: ${e}`))
    .finally(() => {
      loading(false, popupEditInfo)
    })
  popupProfile.close();
}

//Реакция на клик по кнопке "Новое место"  !!! 8 project !!!
addButton.addEventListener('click', () => {
  popupAddElement.open();
  formElementValidator.resetValidation();
});

//Отправка данных попапа "Новое место"   !!! 8 project !!!
function popupAddSubmitHandler (values) {
  loading(true, popupAddCard);
  api.addNewCard(values.name, values.link)
    .then((data)=> {
      cardsList.addItem(createCard(data));
    })
    .catch(e => console.log(`Ошибка при создании карточки: ${e}`))
    .finally(() => {
      loading(false, popupAddCard)
    })
  popupAddElement.close();
  formElementValidator.disableFormButton();
}

//Создание экземпляра класса для валидации инпутов у попапа "Редактировать профиль" и запуск валидации
const formProfileValidator = new FormValidator(config, formProfile);
formProfileValidator.enableValidation();

//Создание экземпляра класса для валидации инпутов у попапа "Новое место" и запуск валидации
const formElementValidator = new FormValidator(config, formElement);
formElementValidator.enableValidation();

//Создание экземпляра класса для валидации инпутов у попапа "Изменение аватарки" и запуск валидации
const formAvatarValidator = new FormValidator(config, formAvatar);
formAvatarValidator.enableValidation();

//Функция наполнения и открытие попапа картинки карточки 
function handleCardClick(name, link) {
     popupImage.open(name, link);
}

//функция создания карточки
function createCard(item) {
  const card = new Card(item.name, item.link, item.likes, item._id, item.owner._id, profileInfo.getUserId(), '#template-element', handleCardClick, deleteCardHandler, likeCardHandler);
  return card.getCard();
} 

//функция удаления карточки
function deleteCardHandler (card) {
  popupConfirmDelete.open();
  function deleteCard () {
    api.deleteCard(card.getId())
    .then((data)=> {
      card._deleteCard();
      popupConfirmDelete.close();
    })
    .catch(e => console.log(`Ошибка при удалении карточки: ${e}`))
  }
  popupConfirmDelete.setSubmit(deleteCard);
}

//функция постановки и удаления лайка
function likeCardHandler (card) {
  if (card.cardLiked) {
  api.unlikeCard(card.getId())
  .then((data)=> {
      card.setLikes(data);
  })
} else {
  api.likeCard(card.getId())
  .then((data)=> {
      card.setLikes(data);
  })
}
}

//функция отправки данных попапа смены аватарки
function popupAvatarSubmit(data) {
  loading(true, popupAvatar);
  api.changeAvatar(data.link)
    .then((data) => {
    profileInfo.setAvatar(data.avatar)
    })
    .catch(e => console.log(`Ошибка при смене аватарки: ${e}`))
    .finally(() => {
      loading(false, popupAvatar)
    })
  popupAvatarChange.close();
}

//слушатель клика по аватарке
avatar.addEventListener('click', () => {
  popupAvatarChange.open();
  formAvatarValidator.resetValidation();
})

//функция показа загрузки
function loading(process, popup) {
  if (process) {
    if (popup.classList.contains('popup__type_add-element')) {
      popup.querySelector('#add-element-submit').textContent = 'Создание...'
    } else if (popup.classList.contains('popup__type_edit-profile')) {
      popup.querySelector('#edit-profile-submit').textContent = 'Сохранение...'
    } else if (popup.classList.contains('popup__type_avatar')) {
      popup.querySelector('#popup-avatar-submit').textContent = 'Сохранение...'
    }
  } else {
    document.querySelector('#add-element-submit').textContent = 'Создать';
    document.querySelector('#edit-profile-submit').textContent = 'Сохранить';
    document.querySelector('#popup-avatar-submit').textContent = 'Сохранить';
  }
}