import './index.css';
import Card from '../componets/Card.js';
import FormValidator from '../componets/FormValidator.js';
import Section from '../componets/Section.js';
import PopupWithImage from '../componets/PopupWithImage.js';
import PopupWithForm from '../componets/PopupWithForm.js';
import UserInfo from '../componets/UserInfo.js';
import {
  selectors,
  editButton,
  editForm,
  addButton,
  addForm,
  nameInput,
  jobInput,
  addTitleInput,
  addLinkInput,
  listPlaceCards,
  config
} from '../utils/constans.js';

const cardsSection = new Section({
  items: listPlaceCards,
  renderer: (item) => {
    cardsSection.addItem(prependCard(item))

  }
},
  selectors.listElement);
cardsSection.rendererAll();

const popupWithImage = new PopupWithImage({
  popupSelector: selectors.increasePopup
});
popupWithImage.setEventListeners();

const addCardPopup = new PopupWithForm(selectors.addPopup, submitCard);
addCardPopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: selectors.profileName,
  aboutSelector: selectors.profileJob
});


const editProfilePopup = new PopupWithForm(selectors.editPopup, () => {
  const inputs = {
    name: nameInput.value,
    about: jobInput.value
  }
  userInfo.setUserInfo(inputs);
  console.log(inputs);
}
);
editProfilePopup.setEventListeners();

function prependCard(item) {
  const card = new Card(item.name, item.link, '#card', handleCardClick);
  return card.render();
}

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

// Функция сохранения card 
function submitCard(evt) {
  evt.preventDefault();
  cardsSection.addItem(prependCard({ name: addTitleInput.value, link: addLinkInput.value }));
}

editButton.addEventListener('click', () => {
  editProfileValidator.resetForm(true);
  const userInfoValue = userInfo.getUserInfo();
  nameInput.value = userInfoValue.name;
  jobInput.value = userInfoValue.about;
  editProfilePopup.open();
});

addButton.addEventListener('click', () => {
  addCerdValidator.resetForm();
  addCardPopup.open();
});


const editProfileValidator = new FormValidator(config, editForm)
editProfileValidator.enableValidation()
const addCerdValidator = new FormValidator(config, addForm)
addCerdValidator.enableValidation()
