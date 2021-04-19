const config = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disable',
    errorClass: 'popup__error_visible',
    popupErrorClass: '.popup__error'
  };

function enabledValidation (config) {
    const forms = Array.from(document.querySelectorAll(config.formSelector)); 
    forms.forEach(function (form) {
        const inputList = Array.from(form.querySelectorAll(config.inputSelector));
        inputList.forEach(function (input) {
            input.addEventListener('input', function () {
                checkInputValid(input, config);
                setButtonState (inputList, form, config);
            });
        })
    })
}

//Функция показа сообщения об ошибке
function showError (input, errorMessage, config) {
    const inputError = document.querySelector(`#${input.id}-error`);
    input.classList.add(config.errorClass);
    inputError.classList.add(config.errorClass);
    inputError.textContent = errorMessage;
}

//Функция скрытия сообщения об ошибке
function hideError (input, config) {
    const inputError = document.querySelector(`#${input.id}-error`);
    input.classList.remove(config.errorClass);
    inputError.classList.remove(config.errorClass);
    inputError.textContent = "";
}

//Функция переключения кнопки отправки данных попапа в неактивное состояние
function disableFormButton (form, config) {
    const formButton = form.querySelector(config.submitButtonSelector);
    formButton.classList.add(config.inactiveButtonClass);
    formButton.setAttribute("disabled", "disabled");
}

//Функция переключения кнопки отправки данных попапа в активное состояние
function enableFormButton (form, config) {
    const formButton = form.querySelector(config.submitButtonSelector);
    formButton.classList.remove(config.inactiveButtonClass);
    formButton.removeAttribute("disabled");
}

//Функция проверки корректности заполнения инпута и показа сообщения
function checkInputValid (input, config) {
    if (!input.validity.valid) {
        showError(input, input.validationMessage, config);
    } else { 
        hideError(input, config);
    }
}

//Функция переключения состояния кнопки отправки данных в зависимости от корректности инпутов
function setButtonState (inputList, form, config) {
    const inputValid = inputList.every((item) => {
        return item.validity.valid;
    });
    const inputfull = inputList.every(function (item) {
        return item.value.length > 0;
        });
    if (!inputValid || !inputfull) {
        disableFormButton(form, config);
    } else enableFormButton(form, config);
}

enabledValidation(config);

function clearValidation (form, config) {
    const popupError = form.querySelectorAll(config.popupErrorClass);
    popupError.forEach(function(item) {
        item.textContent = "";
});
}