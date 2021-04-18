const config = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disable',
    errorClass: 'popup__error_visible'
  };

function enabledValidation (config) {
    const forms = Array.from(document.querySelectorAll(config.formSelector)); 
    forms.forEach(function (form) {
        const inputList = Array.from(form.querySelectorAll(config.inputSelector));
        inputList.forEach(function (input) {
            input.addEventListener('input', function () {
                checkInputValid(input);
                stateButton(inputList, form);
            });
        })
    })
}

//Функция показа сообщения об ошибке
function showError (input, errorMessage) {
    const inputError = document.querySelector(`#${input.id}-error`);
    input.classList.add(config.errorClass);
    inputError.classList.add(config.errorClass);
    inputError.textContent = errorMessage;
}

//Функция скрытия сообщения об ошибке
function hideError (input) {
    const inputError = document.querySelector(`#${input.id}-error`);
    input.classList.remove(config.errorClass);
    inputError.classList.remove(config.errorClass);
    inputError.textContent = "";
}

//Функция переключения кнопки отправки данных попапа в неактивное состояние
function disableFormButton (formButton) {
    formButton.classList.add(config.inactiveButtonClass);
    formButton.setAttribute("disabled");
    console.log('Вызван disable')
}

//Функция переключения кнопки отправки данных попапа в активное состояние
function enableFormButton (formButton) {
    formButton.classList.remove(config.inactiveButtonClass);
    formButton.removeAttribute("disabled");
    console.log('Вызван enable')
}

//Функция проверки корректности заполнения инпута и показа сообщения
function checkInputValid (input) {
    if (!input.validity.valid) {
        showError(input, input.validationMessage);
    } else { 
        hideError(input);
    }
}

//Функция переключения состояния кнопки отправки данных в зависимости от корректности инпутов
function stateButton (inputList, form) {
    const formButton = form.querySelector(config.submitButtonSelector);
    const inputValid = inputList.every((item) => {
        return item.validity.valid;
    });
    const inputfull = inputList.every(function (item) {
        return item.value.length > 0;
        });
    if (!inputValid || !inputfull) {
        disableFormButton(formButton);
    } else enableFormButton(formButton);
}

enabledValidation(config);