import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, onSubmitCb) {
        super({ popupSelector: popupSelector });
        this._onSubmitCb = onSubmitCb;
        this._formElement = this._popup.querySelector('.popup__form');
        this._submitButton = this._popup.querySelector('.popup__send');
        this._savingButton = this._submitButton.textContent;
        this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    }

    _getInputValues() {
        this._result = {};
        this._inputList.forEach(input => {
            this._result[input.name] = input.value;
        });
        return this._result;
    }
    

    close() {
        super.close();
        this._formElement.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._onSubmitCb(this._getInputValues());
        });
    }

    onLoading(){
        this._submitButton.textContent = `Cохранение...`;
      }
    offLoading(){
        this._submitButton.textContent = this._savingButton;
      }
}

