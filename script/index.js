import { openPopup, closePopup } from './utils.js'
import { increasePopup } from './consts.js'
import { FormValidator } from './FormValidator.js'
import Card from './Card.js'

// Попап
const editPopup = document.querySelector('.popup_edit');
const addPopup = document.querySelector('.popup_add');
//Кнопки
const editPopupCloseButton = document.querySelector('.popup__close_edit');
const addPopupCloseButton = document.querySelector('.popup__close_add');
const editButton = document.querySelector('.profile__button-edit');
const addButton = document.querySelector('.profile__button-add');
const increasePopupClose = document.querySelector('.popup__close_type_increase')
// Инпут
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const addTitleInput = document.querySelector('.popup__input_type_title');
const addLinkInput = document.querySelector('.popup__input_type_link');
// Заголовок 
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');
// Список карточек в HTML
const listElement = document.querySelector('.list');


// Масив карточек
const listPlaceCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__send',
  inputErrorClass: 'popup__input_type_error',
  errorActiveClass: 'popup__input-error_active'
}

// Форма отправка 
const editForm = document.querySelector('.popup__form_edit');
const addForm = document.querySelector('.popup__form_add');

const editProfileValidator = new FormValidator(config, editForm)
const addCerdValidator = new FormValidator(config, addForm)

editProfileValidator.enableValidation()
addCerdValidator.enableValidation()

const prependCard = (name, link,) => {
  const card = new Card(name, link, '#card');
  return card.render()
}

listPlaceCards.forEach(function (item) {
  listElement.append(prependCard(item.name, item.link));
});

// Функция сохранения card 
function submitCard(evt) {
  evt.preventDefault();
  listElement.prepend(prependCard(addTitleInput.value, addLinkInput.value));
  closePopup(addPopup);
  addTitleInput.value = '';
  addLinkInput.value = '';

}

// Функция: Добавляем в поля Инпут значение из профиля 
// Вызываем функцию открытия Попапа со значение конкретного попапа
function handlePopupEdit() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(editPopup)
}
// Функция: Изменяем значения профиля через заполнения инпута в попап
// Вызываем функцию закрытия Попапа со значение конкретного попапа
function handleEditForm(event) {
  event.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(editPopup);
}
// Слушаем клик по кнопки открытия попапа редактировать (edit). При клике начинает работать function handlePopupEdit()
editButton.addEventListener('click', function () { handlePopupEdit(), editProfileValidator._setEventListeners() });
// Слушаем клик по кнопки открытия попапа добавить карточку (add). 
addButton.addEventListener('click', function () { addCerdValidator.resetForm(), openPopup(addPopup) });
// Слушаем клик по кнопки закрытия попапа редактировать (edit). 
editPopupCloseButton.addEventListener('click', () => closePopup(editPopup));
// Слушаем клик по кнопки закрытия попапа добавить карточку (add). 
addPopupCloseButton.addEventListener('click', () => closePopup(addPopup));
// Слушаем клик по отправки формы редактировать (edit). При клике начинает работать handleEditForm(event)
editForm.addEventListener('submit', handleEditForm);
// Слушаем клик по отправки формы добавить карточку (add). При клике начинает работать handleAddForm(event)
addForm.addEventListener('submit', submitCard);
//Перебор массива.
// listPlaceCards.forEach(prependCard)
// Слушаем клик по кнопки закрытия попапа (increasePopup).
increasePopupClose.addEventListener('click', () => closePopup(increasePopup));