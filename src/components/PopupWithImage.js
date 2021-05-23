import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupCardImage = this._popup.querySelector('.popup-element__image');
        this._captionImage = this._popup.querySelector('.popup-element__title');
    }
    
    open(name, link) {
        this._captionImage.textContent = name;
        this._popupCardImage.src = link;
        super.open();
    }

}