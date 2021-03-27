let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
let profileUserName = document.querySelector('.profile__user-name');
let profileUserInfo = document.querySelector('.profile__user-info');
let popupUserName = document.querySelector('.popup__user-name');
let popupUserInfo = document.querySelector('.popup__user-info');
let popupSubmit = document.querySelector('form');

function popupOpened () {
    popup.classList.add('popup_opened');
    popupUserName.setAttribute('value', profileUserName.textContent);
    popupUserInfo.setAttribute('value', profileUserInfo.textContent);
}

function popupClosed () {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileUserName.textContent = popupUserName.value;
    profileUserInfo.textContent = popupUserInfo.value;
    popupClosed();
}


editButton.addEventListener('click', popupOpened);
closeButton.addEventListener('click', popupClosed);
popupSubmit.addEventListener('submit', formSubmitHandler);