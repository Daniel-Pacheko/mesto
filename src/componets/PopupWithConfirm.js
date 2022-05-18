import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, onSubmitCb){
    super ({popupSelector});
    this._onSubmitCb = onSubmitCb;
    this._formElement = this._popup.querySelector('.popup__form');
  }

  open(card) {
    this._card = card;
    super.open();
  }

  

  setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._onSubmitCb(this._card);
    });
    super.setEventListeners();
  }
}