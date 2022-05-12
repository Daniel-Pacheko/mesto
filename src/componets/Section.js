export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;

        this._element = document.querySelector(containerSelector);
    }

    rendererAll() {
        this._renderedItems.forEach(item => {
            this._renderer(item)
        });
    }

    addItem(element) {
        this._element.prepend(element);
    }

} 