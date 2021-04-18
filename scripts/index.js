const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelectorAll('.popup__close-button');
const profileUserName = document.querySelector('.profile__user-name');
const profileUserInfo = document.querySelector('.profile__user-info');
const addButton = document.querySelector('.profile__add-button');
const popupProfile = document.querySelector('#popup-edit-profile');
const popupAddElement = document.querySelector('#popup-add-element');

const formProfile = document.querySelector('#edit-profile'); // popupSubmitProfile
const formProfileInputName = formProfile.querySelector('#edit-profile-name'); // popupUserName
const formProfileInputInfo = formProfile.querySelector('#edit-profile-info'); // popupUserInfo
const formProfileCloseButton = formProfile.querySelector('#edit-profile-close'); // popupProfileClose

const formElement = document.querySelector('#add-element'); // popupSubmitElement
const formElementInputName = formElement.querySelector('#add-element-name'); // popupElementName
const formElementInputLink = formElement.querySelector('#add-element-link'); // popupElementLink
const formElementCloseButton = formElement.querySelector('#add-element-close'); // popupAddClose

const popupElement = document.querySelector('#popup-image-full');
const popupElementImage = document.querySelector('.popup-element__image');
const popupElementTitle = document.querySelector('.popup-element__title');
const popupElementClose = document.querySelector('.popup-element__close');

const templateElement = document.querySelector('#template-element').content;
const elements = document.querySelector('.elements');

 //Функция наполнения элемента данными с последущим возвратом элемента
function createElement(name, link) {
    const element = templateElement.querySelector('.element').cloneNode(true);
    element.querySelector('.element__name').textContent = name;
    element.querySelector('.element__image').src = link;
    element.querySelector('.element__image').setAttribute('alt', `изображение карточки ${name}`);

    const likeButton = element.querySelector('.element__like');
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('element__like_active');
    });

    const deleteButton = element.querySelector('.element__delete');
    deleteButton.addEventListener('click', () => {
      element.remove();
    });

    const imageButton = element.querySelector('.element__image');
    imageButton.addEventListener('click', function () {
    openPopup(popupElement);
    popupElementImage.src = link;
    popupElementTitle.textContent = name;
    });

    return element;
};

//Функция добавления готового элемента на страницу
function addElement(element) {
    elements.prepend(element);
};

//Перебор и добавление элементов массива на страницу
initialCards.forEach(function (item) {
    addElement(createElement(item.name, item.link));
});

//Функция открытия попапа
function openPopup (popup) {
    popup.classList.add('popup_opened');
};

//Функция закрытия попапа
function closePopup (popup) {
    popup.classList.remove('popup_opened');
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
  const popupError = popupProfile.querySelectorAll('.popup__error');
  popupError.forEach(function(item) {
    item.textContent = "";
  })
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
  formElementInputName.value ='';
  formElementInputLink.value ='';
  const popupError = popupAddElement.querySelectorAll('.popup__error');
  popupError.forEach(function(item) {
    item.textContent = "";
  })
});

//Отправка данных попапа "Новое место"
formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addElement(createElement(formElementInputName.value, formElementInputLink.value));
  closePopup(popupAddElement);
  formElementInputName.value ='';
  formElementInputLink.value ='';
});

//Кнопка закрытия попапа "Full image"
popupElementClose.addEventListener('click', () => {
  closePopup(popupElement);
});

//закрытие любого открытого попапа по нажатию на оверлей
document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    const popupNowOpen = document.querySelector('.popup_opened')
    closePopup(popupNowOpen);
  }
})

//закрытие любого открытого попапа по нажатию Escape
document.addEventListener('keydown', (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'))
  }
})

//изменение курсора при наведении на оверлей
document.addEventListener('mouseover', (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    const popupNowOpen = document.querySelector('.popup_opened')
    popupNowOpen.classList.add('popup_overley-hover');
  }
})

//изменение курсора при уходе с оверлей
document.addEventListener('mouseout', (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    const popupNowOpen = document.querySelector('.popup_opened')
    popupNowOpen.classList.remove('popup_overley-hover');
  }
})