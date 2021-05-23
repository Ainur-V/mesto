import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._form = this._popup.querySelector('.popup__container');
        this._inputs = [...this._form.querySelectorAll('.popup__input')];
    }

    _getInputValues() {
        const values = {};
        this._inputs.forEach( (input) => {
            values[input.name] = input.value;
        });
        return values;
    }

    setEventListener() {
        super.setEventListener();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitHandler(this._getInputValues());
        })
    }

    close = () => {
        this._form.reset();
        super.close();
    }
    
}