import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageIncrease = this._popup.querySelector('.popup__photo-increase')
    this._titleIncrease = this._popup.querySelector('.popup__title-increase')
  }

  open = (name, link) => {
    this._imageIncrease.src = link;
    this._imageIncrease.alt = name;
    this._titleIncrease.textContent = name;

    super.open()
  }
} 