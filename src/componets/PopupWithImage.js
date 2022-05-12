import Popup from './Popup.js';
import { selectors } from '../utils/constans.js'

export default class PopupWithImage extends Popup {
  open = (name, link) => {
    this._popup.querySelector(selectors.imageElement).src = link;
    this._popup.querySelector(selectors.imageElement).alt = name;
    this._popup.querySelector(selectors.increaseTitle).textContent = name;

    super.open()
  }
} 