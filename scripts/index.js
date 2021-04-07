const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelectorAll('.popup__close-button');
const profileUserName = document.querySelector('.profile__user-name');
const profileUserInfo = document.querySelector('.profile__user-info');
const addButton = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector('#popup-edit-profile');
const popupSubmitProfile = document.querySelector('#edit-profile');
const popupUserName = document.querySelector('#edit-profile-name');
const popupUserInfo = document.querySelector('#edit-profile-info');
const popupProfileClose = document.querySelector('#edit-profile-close');

const popupAddElement = document.querySelector('#popup-add-element');
const popupSubmitElement = document.querySelector('#add-element');
const popupElementName = document.querySelector('#add-element-name');
const popupElementLink = document.querySelector('#add-element-link');
const popupAddClose = document.querySelector('#add-element-close');

const templateElement = document.querySelector('#template-element').content;
const elements = document.querySelector('.elements');

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

 //Функция наполнения элемента данными с последущим возвратом элемента
function createElement(name, link) {
    const element = templateElement.querySelector('.element').cloneNode(true);
    const popupElement = element.querySelector('#popup-image-full');
    const popupElementImage = element.querySelector('.popup-element__image');
    const popupElementTitle = element.querySelector('.popup-element__title');
    const popupElementClose = element.querySelector('.popup-element__close');
    element.querySelector('.element__name').textContent = name;
    element.querySelector('.element__image').src = link;

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
      popupElement.classList.add('popup-element_opened');
      popupElementImage.src = link;
      popupElementTitle.textContent = name;
    });

    popupElementClose.addEventListener('click', () => {
      popupElement.classList.remove('popup-element_opened');
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
function popupOpened (evt) {
    evt.classList.add('popup_opened');
};

//Функция закрытия попапа
function popupClosed (evt) {
    evt.classList.remove('popup_opened');
}

//Реакция на клик по кнопке "Редактировать профиль"
editButton.addEventListener('click', () => {
  popupOpened(popupProfile);
  popupUserName.value = profileUserName.textContent;
  popupUserInfo.value = profileUserInfo.textContent;
});

//Кнопка закрытия попапа "Редактировать профиль"
popupProfileClose.addEventListener('click', () => {
  popupClosed(popupProfile);
});

//Отправка данных попапа "Редактировать профиль"
popupSubmitProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileUserName.textContent = popupUserName.value;
  profileUserInfo.textContent = popupUserInfo.value;
  popupClosed(popupProfile);
});

//Реакция на клик по кнопке "Новое место"
addButton.addEventListener('click', () => {
  popupOpened(popupAddElement);
});

//Кнопка закрытия попапа "Новое место"
popupAddClose.addEventListener('click', () => {
  popupClosed(popupAddElement);
});

//Отправка данных попапа "Новое место"
popupAddElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addElement(createElement(popupElementName.value, popupElementLink.value));
  popupClosed(popupAddElement);
  popupElementName.value ='';
  popupElementLink.value ='';
});