import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, onSubmitCb) {
        super({ popupSelector: popupSelector });
        this._onSubmitCb = onSubmitCb;
        this._formElement = this._popup.querySelector('.popup__form');
    }

    _getInputValues() {
        const result = {};
        this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
        this._inputList.forEach(input => {
            result[input.name] = input.value;
        });
        return result;
    }

    close() {
        super.close();
        this._formElement.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._onSubmitCb(evt);
            this.close()
        });
    }
}