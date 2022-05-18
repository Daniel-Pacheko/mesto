export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._element = document.querySelector(containerSelector);
    }

    rendererAll(items) {
        items.forEach(item => {
            this._renderer(item);
        })
    }

    addItem(element) {
        this._element.prepend(element);
    }

    addItemAppend(element) {
        this._element.append(element); 
    }

} 