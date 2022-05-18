export default class Card {
    constructor(name, link, owner, likes,  userId, _id, templateListCards, handleCardClick, handleCardlike, handleCardDelete) {
        this._name = name;
        this._link = link;
        this._ownerId = owner._id;
        this._cardId = _id;
        this._userId = userId;
        this._templateListCards = templateListCards;
        this._handleCardClick = handleCardClick;
        this._handleCardLike = handleCardlike;
        this._handleCardDelete = handleCardDelete;
        this.likes = likes;
    }


    // Создаем карточку
    createCard() {
        //нашли
        const cardTemplate = document.querySelector(this._templateListCards).content;
        this._placeCard = cardTemplate.querySelector('.list__place').cloneNode(true);

        this._likeButton = this._placeCard.querySelector('.list__place-like')
        this._cardImage = this._placeCard.querySelector('.list__place-photo')
        this._likeCounter = this._placeCard.querySelector('.list__place-counter')
        this._deleteButton = this._placeCard.querySelector('.list__place-delete')

        // заполнили
        this._placeCard.querySelector('.list__place-title').textContent = this._name;
        this._placeCard.querySelector('.list__place-photo').src = this._link;
        this._placeCard.querySelector('.list__place-photo').alt = `Тут должна быть картинка ${this._name}, но что-то пошло не так. Попробуйте ещё раз`;
        if (this._ownerId != this._userId) {
            this._deleteButton.remove();
        };
        this._likeCounter.textContent = this.likes.length;
        this.markLiked();
    }

    //Устанавливаем Слушатели событий 
    setEventListeners() {
        this._likeButton.addEventListener('click', () => this._handleCardLike(this));
        this._deleteButton.addEventListener('click', () => this._handleCardDelete(this));
        this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
    }

    hasLiked() {
        let result = false;
        this.likes.forEach(like => {
            if (like._id === this._userId) {

                result = true;
            }
        });
        return result;
    }

    markLiked() {
        if (this.hasLiked()) {
            this._likeButton.classList.add('list__place-like_active');
        }
    }
    removeCard() {
        this._placeCard.closest('.list__place').remove();
    }

    removeLike(like) {
        this._likeButton.classList.remove('list__place-like_active');
        this._likeCounter.textContent = like.length;
    }

    addLike(like) {
        this._likeButton.classList.add('list__place-like_active');
        this._likeCounter.textContent = like.length;
    }

    render() {
        return this._placeCard;
    }
};