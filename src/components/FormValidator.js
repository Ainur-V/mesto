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
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._formButton = this._form.querySelector(this._submitButtonSelector);
        this._popupErrorList = this._form.querySelectorAll(this._popupErrorClass);
    }

    //Публичный метод включения валидации
    enableValidation() {
        this._inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValid(input);
                this._setButtonState(this._hasInvalidInput());
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

    _hideError(input) {
        const inputError = this._form.querySelector(`#${input.id}-error`);
        input.classList.remove(this._errorClass);
        inputError.classList.remove(this._errorClass);
        inputError.textContent = "";
    }
    
    _hasInvalidInput() {
        return this._inputList.some((item) => {
            return !item.validity.valid && item.value.length >= 0;
        })
    }

    //Метод переключения состояния кнопки отправки данных в зависимости от корректности инпутов
    _setButtonState (hasInvalidInput) {
        console.log(hasInvalidInput);
        if (hasInvalidInput) {
            this.disableFormButton();
        } else this._enableFormButton();
    }

    //Метод переключения кнопки отправки данных попапа в неактивное состояние
    disableFormButton () {
        this._formButton.classList.add(this._inactiveButtonClass);
        this._formButton.setAttribute("disabled", "disabled");
    }

    //Метод переключения кнопки отправки данных попапа в активное состояние
    _enableFormButton () {
        this._formButton.classList.remove(this._inactiveButtonClass);
        this._formButton.removeAttribute("disabled");
    }

    resetValidation() {
        this._popupErrorList.forEach((inputElement) => {
            inputElement.textContent = "";
        });
    
        this._setButtonState(this._hasInvalidInput());
    }

}
