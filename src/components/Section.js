export default class Section {
    constructor({renderer}, containerSelector) {
        // this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItem(items) {
        items.forEach((item) => {
           this._renderer(item);
        })
    }

    addItem(cardElement) {
        this._container.prepend(cardElement);
    }

}