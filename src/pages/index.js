import './index.css';
import Card from '../componets/Card.js';
import FormValidator from '../componets/FormValidator.js';
import Section from '../componets/Section.js';
import PopupWithImage from '../componets/PopupWithImage.js';
import PopupWithForm from '../componets/PopupWithForm.js';
import PopupWithConfirm from '../componets/PopupWithConfirm.js';
import UserInfo from '../componets/UserInfo.js';
import Api from '../componets/Api.js';
import {
  selectors,
  buttonEdit,
  formEdit,
  buttonAdd,
  formAdd,
  inputName,
  inputJob,
  profileIconBtn,
  formAvatar,
  config
} from '../utils/constans.js';

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort36',
  headers: {
      authorization: '86559a47-cdf8-4862-a98f-377a7ae7e478',
      'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo({
  nameSelector: selectors.profileName,
  aboutSelector: selectors.profileJob,
  avatarSelector: selectors.profileAvatar
});

Promise.all([api.getUserData(), api.getCards()])
  .then((res) => {
    const userData = res[0];
    userInfo.setUserInfo(userData);

    const cardsData = res[1];
    cardsSection.rendererAll(cardsData);
  })
  .catch((err) => {console.log(err)});
  
const cardsSection = new Section({
  renderer: (item) => {
    cardsSection.addItemAppend(prependCard(item))
  }
},
  selectors.listElement);

const editProfilePopup = new PopupWithForm(selectors.editPopup, submitProfile
);
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(selectors.addPopup, submitCard);
addCardPopup.setEventListeners();

const confirmForm = new PopupWithConfirm(selectors.popupDelete, handleCardDelete);
confirmForm.setEventListeners();

const avatarForm = new PopupWithForm(selectors.popupAvatar, submitAvatar);
avatarForm.setEventListeners();

const popupWithImage = new PopupWithImage({popupSelector: selectors.increasePopup});
popupWithImage.setEventListeners();

function openCardDelete(card) {
  confirmForm.open(card);
}

function handleCardDelete() {
  api.deleteCard(this._card._cardId)
    .then(() => {
      this._card.removeCard();
      confirmForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    
}

function submitAvatar(inputs) {
  avatarForm.onLoading();
  api.setUserAvatar(inputs.avatar)
    .then((res) => {
      userInfo.setUserInfo(res);
      avatarForm.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      avatarForm.offLoading(true);
    })
}

function submitProfile(inputs) {
  editProfilePopup.onLoading();
  api.setUserProfile(inputs.name, inputs.about)
    .then((res) => {
      userInfo.setUserInfo(res);
      editProfilePopup.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      editProfilePopup.offLoading(true);
    })
}

function submitCard(inputs) {
  addCardPopup.onLoading();
  api.setCard(inputs.name, inputs.link)
  .then((res) => {
      const cardElement = prependCard(res);
      cardsSection.addItem(cardElement);
      addCardPopup.close();
  })
  .catch((err) => {
      console.log(err);
  })
  .finally(() => {
    addCardPopup.offLoading(true);
  })
}

function prependCard(item) {
  const card = new Card(item.name, item.link, item.owner, item.likes,  userInfo.getId(), item._id, '#card', handleCardClick, handleCardLike, openCardDelete);
  card.createCard();
  card.setEventListeners();
  return card.render();
}

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function handleCardLike(card) {
  if (card.hasLiked()) {
    api.removeLike(card._cardId)
    .then((res) => {
      
    card.likes = res.likes;
    card.removeLike(res.likes);
  })
    .catch((err) => {
    console.log(err);
  })
  }else {
    api.addLike(card._cardId)
    .then((res) => {
      console.log(res);
    card.likes = res.likes;
    card.addLike(res.likes);
    })
    .catch((err) => {
    console.log(err);
    })
  }  
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

profileIconBtn.addEventListener('click', () =>{
  formAvatarValidation.resetForm();
  avatarForm.open();
});

const editProfileValidator = new FormValidator(config, formEdit)
editProfileValidator.enableValidation()
const addCerdValidator = new FormValidator(config, formAdd)
addCerdValidator.enableValidation()
const formAvatarValidation = new FormValidator(config, formAvatar);
formAvatarValidation.enableValidation();