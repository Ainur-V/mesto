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
  addElement(createElement(formElementInputName.value, formElementInputLink.value));
  closePopup(popupAddElement);
  formElement.reset();
  disableFormButton(formElement, config);
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