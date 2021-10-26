// Попап
const editPopup = document.querySelector('.popup_edit');
const addPopup = document.querySelector('.popup_add');
const increasePopup = document.querySelector('.popup-increase');
//Кнопки
const editPopupCloseButton = document.querySelector('.popup__close_edit');
const addPopupCloseButton = document.querySelector('.popup__close_add');
const editButton = document.querySelector('.profile__button-edit');
const addButton = document.querySelector('.profile__button-add');
const increasePopupClose = document.querySelector('.popup-increase__close')
// Форма отправка 
const editForm = document.querySelector('.popup__form_edit');
const addForm = document.querySelector('.popup__form_add');
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
//Элемент шаблона контента
const templateListCards = document.querySelector('.template').content;
//Элементы попапа increasePopup
const increasePhoto = document.querySelector('.popup-increase__photo');
const increaseTitle = document.querySelector('.popup-increase__title');
//Фото в формате кнопки
const listPlacePhoto = document.querySelector('.list__place-photo');
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
// Создаем карточку
function createCard(listPlaceCard) {
  const placeCard = templateListCards.querySelector('.list__place').cloneNode(true);
  placeCard.querySelector('.list__place-title').textContent = listPlaceCard.name;
  placeCard.querySelector('.list__place-photo').src = listPlaceCard.link;
  placeCard.querySelector('.list__place-photo').alt = 'Тут должна быть картинка, но что-то пошло не так. Попробуйте ещё раз';
  placeCard.querySelector('.list__place-delete').addEventListener('click', deletePlaceCard)
  placeCard.querySelector('.list__place-like').addEventListener('click', likeActive)
  placeCard.querySelector('.list__place-photo').addEventListener('click', (event) => {
    const imgIncrease = increasePopup.querySelector('.popup-increase__content');
    imgIncrease.querySelector('.popup-increase__photo').src = listPlaceCard.link;
    imgIncrease.querySelector('.popup-increase__title').textContent = listPlaceCard.name;
    console.log(increasePopup)
    openPopup(increasePopup);
  })
  return placeCard
}
//Функция: лайк.
function likeActive(event) {
  event.target.classList.toggle('list__place-like_active');
}
// Добавляю карточку
function prependCard(listPlaceCard) {
  const placeCard = createCard(listPlaceCard)
  listElement.prepend(placeCard)
}
//Функция отправки формы 
function handleAddForm(event) {
  event.preventDefault();
  const newAddTitleInput = addTitleInput.value;
  const newAddLinkInput = addLinkInput.value;
  const listPlaceCard = {
    name: newAddTitleInput,
    link: newAddLinkInput
  }
  prependCard(listPlaceCard);
  closePopup(addPopup);
  event.target.reset();
}
// Функция: удаляю крточку из списка
function deletePlaceCard(event) {
  event.target.closest('.list__place').remove();
}
// Функция открытия любого Попапа
function openPopup(popup) {
  popup.classList.add('popup_is-open');
}
// Функция закрытия любого Попапа
function closePopup(popup) {
  popup.classList.remove('popup_is-open');
}
// Функция: Добавляем в поля Инпут значение из профиля 
// Вызываем функцию открытия Попапа со значение конкретного попапа
function handlePopupEdit() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(editPopup);
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
editButton.addEventListener('click', handlePopupEdit);
// Слушаем клик по кнопки открытия попапа добавить карточку (add). 
addButton.addEventListener('click', () => openPopup(addPopup));
// Слушаем клик по кнопки закрытия попапа редактировать (edit). 
editPopupCloseButton.addEventListener('click', () => closePopup(editPopup));
// Слушаем клик по кнопки закрытия попапа добавить карточку (add). 
addPopupCloseButton.addEventListener('click', () => closePopup(addPopup));
// Слушаем клик по отправки формы редактировать (edit). При клике начинает работать handleEditForm(event)
editForm.addEventListener('submit', handleEditForm);
// Слушаем клик по отправки формы добавить карточку (add). При клике начинает работать handleAddForm(event)
addForm.addEventListener('submit', handleAddForm);
//Перебор массива.
listPlaceCards.forEach(prependCard)
// Слушаем клик по кнопки закрытия попапа (increasePopup).
increasePopupClose.addEventListener('click', () => closePopup(increasePopup));