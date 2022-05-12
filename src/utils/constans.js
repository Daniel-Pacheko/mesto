
//Profile
export const buttonEdit = document.querySelector('.profile__button-edit'); //Кнопка открытия Поп-апа с формой редактирования профиля
//Cards
export const listElement = document.querySelector('.list');
//Popup profile
export const formEdit = document.querySelector('.popup__form_edit'); // Форма редактирования профеля
//Popup cards
export const popupAdd = document.querySelector('.popup_add'); //Поп-ап с формой добовления карточек
export const popupClose = document.querySelector('.popup__close');
export const buttonAdd = document.querySelector('.profile__button-add'); //Кнопка открытия Поп-апа с формой добовления карточек
export const formAdd = document.querySelector('.popup__form_add'); // Форма добавления карточки
//Inputs
export const inputName = document.querySelector('.popup__input_type_name'); // Поле для заполнения Имени в форме редактирования профиля 
export const inputJob = document.querySelector('.popup__input_type_job'); // Поле для заполнения Специальности(работы) в форме редактирования профиля
export const inputAddTitle = document.querySelector('.popup__input_type_title'); // Поле для заполнения Название картинки в форме добовления карточек
export const inputAddLink = document.querySelector('.popup__input_type_link'); // Поле для прикреплении ссылки на картинку в форме добовления карточек
// Переменная increasePopu = Секция увеличение картинки
export const popupIncrease = document.querySelector('.popup_increase');

export const selectors = {
  listElement: '.list',
  addPopup: '.popup_add',
  editPopup: '.popup_edit',
  increasePopup: '.popup_increase',
  imageElement: '.popup__photo-increase',
  increaseTitle: '.popup__title-increase',
  profileName: '.profile__title',
  profileJob: '.profile__subtitle'
};

// Масив карточек
export const listPlaceCards = [
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

export const config = {
  formSelector: '.popup__form', //все Формы на страницы
  inputSelector: '.popup__input', //все поля для заполнения в формах
  submitButtonSelector: '.popup__send', // Кнопки отправки во всех формах
  inputErrorClass: 'popup__input_type_error', // Стиль Ошибки валидации
  errorActiveClass: 'popup__input-error_active' // Активация ошибки валидации
}