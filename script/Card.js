import { openPopup } from './utils.js'
import { imageElement, increasePopup, increaseTitle } from './consts.js'

export default class Card {
    constructor(name, link, templateListCards) {
        this._name = name;
        this._link = link;
        this._templateListCards = templateListCards;

        this._createCard();
        this._setEventListeners()
    }

    // Создаем карточку
    _createCard() {
        //нашли
        const cardTemplate = document.querySelector(this._templateListCards).content;
        this._placeCard = cardTemplate.querySelector('.list__place').cloneNode(true);
        this._likeButton = this._placeCard.querySelector('.list__place-like')
        this._cardImage = this._placeCard.querySelector('.list__place-photo')
        this._deleteButton = this._placeCard.querySelector('.list__place-delete')
        // заполнили
        this._placeCard.querySelector('.list__place-photo').src = this._link;
        this._placeCard.querySelector('.list__place-title').textContent = this._name;
        this._placeCard.querySelector('.list__place-photo').alt = `Тут должна быть картинка ${this._name}, но что-то пошло не так. Попробуйте ещё раз`;

    }

    _setEventListeners() {

        this._likeButton.addEventListener('click', () => this._likeActive());
        this._deleteButton.addEventListener('click', () => this._deletePlaceCard());
        this._cardImage.addEventListener('click', () => this._handlePreviewPicture());
    }

    //Функция: лайк.
    _likeActive() {
        this._likeButton.classList.toggle('list__place-like_active');
    };

    // Функция: удаляю крточку из списка
    _deletePlaceCard() {
        this._placeCard.remove();
    }

    _handlePreviewPicture() {
        imageElement.src = this._link;
        imageElement.alt = `Тут должна быть большая кортинка из карточки ${this._name}, но что-то пошло не так. Попробуйте ещё раз`;
        increaseTitle.textContent = this._name;
        openPopup(increasePopup);
    }

    render() {

        return this._placeCard;
    }
};