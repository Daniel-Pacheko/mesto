import './index.css';
import Card from '../componets/Card.js';
import FormValidator from '../componets/FormValidator.js';
import Section from '../componets/Section.js';
import PopupWithImage from '../componets/PopupWithImage.js';
import PopupWithForm from '../componets/PopupWithForm.js';
import UserInfo from '../componets/UserInfo.js';
import {
  selectors,
  buttonEdit,
  formEdit,
  buttonAdd,
  formAdd,
  inputName,
  inputJob,
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


const addCardPopup = new PopupWithForm(selectors.addPopup, 
  {onSubmitCb: (data) => {
    prependCard(data.name, data.link);
    submitCard();
}});
addCardPopup.setEventListeners();


const userInfo = new UserInfo({
  nameSelector: selectors.profileName,
  aboutSelector: selectors.profileJob
});


const editProfilePopup = new PopupWithForm(selectors.editPopup,
  {onSubmitCb: (data) => {
  userInfo.setUserInfo(data.name, data.about);
}
});
editProfilePopup.setEventListeners();


function prependCard(item) {
  const card = new Card(item.name, item.link, '#card', handleCardClick);
  card.createCard();
  card.setEventListeners();
  return card.render();
}


function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}
 

function submitCard() {
  cardsSection.addItem(prependCard(addCardPopup));
}


buttonEdit.addEventListener('click', () => {
  editProfileValidator.resetForm(true);
  const  {name, about} = userInfo.getUserInfo();
  inputName.value = name;
  inputJob.value = about;
  editProfilePopup.open();
});


buttonAdd.addEventListener('click', () => {
  addCerdValidator.resetForm();
  addCardPopup.open();
});


const editProfileValidator = new FormValidator(config, formEdit)
editProfileValidator.enableValidation()
const addCerdValidator = new FormValidator(config, formAdd)
addCerdValidator.enableValidation()