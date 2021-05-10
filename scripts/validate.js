//Экземпляр класса проверки ввода формы
export default class FormValidator {
    constructor (config, form) {
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._errorClass = config.errorClass;
        this._popupErrorClass = config.popupErrorClass;
        this._form = form;
    }

    //Публичный метод включения валидации
    enableValidation() {
        const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValid(input);
                this._setButtonState(inputList);
            })
        })
    }

    //Метод проверки корректности заполнения инпута и показа сообщения
    _checkInputValid(input) {
        if (!input.validity.valid) {
            this._showError(input, input.validationMessage);
        } else { 
            this._hideError(input);
        }
    }

    //Метод показа сообщения об ошибке
    _showError (input, errorMessage) {
        const inputError = this._form.querySelector(`#${input.id}-error`);
        input.classList.add(this._errorClass);
        inputError.classList.add(this._errorClass);
        inputError.textContent = errorMessage;
    }

    //Метод скрытия сообщения об ошибке
    _hideError (input) {
        const inputError = this._form.querySelector(`#${input.id}-error`);
        input.classList.remove(this._errorClass);
        inputError.classList.remove(this._errorClass);
        inputError.textContent = "";
    }

    //Метод переключения состояния кнопки отправки данных в зависимости от корректности инпутов
    _setButtonState (inputList) {
        const inputValid = inputList.every((item) => {
            return item.validity.valid;
        });
        const inputfull = inputList.every(function (item) {
            return item.value.length > 0;
            });
        if (!inputValid || !inputfull) {
            this.disableFormButton();
        } else this._enableFormButton();
    }

    //Метод переключения кнопки отправки данных попапа в неактивное состояние
    disableFormButton () {
        const formButton = this._form.querySelector(this._submitButtonSelector);
        formButton.classList.add(this._inactiveButtonClass);
        formButton.setAttribute("disabled", "disabled");
    }

    //Метод переключения кнопки отправки данных попапа в активное состояние
    _enableFormButton () {
        const formButton = this._form.querySelector(this._submitButtonSelector);
        formButton.classList.remove(this._inactiveButtonClass);
        formButton.removeAttribute("disabled");
    }
}
