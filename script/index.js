const popup = document.querySelector('.popup')
const popupCloseButton = document.querySelector('.popup__close')
const editButton = document.querySelector('.profile__button-edit')

const form = document.querySelector('.popup__form')

const nameInput = document.querySelector('.popup__input_type_name')
const jobInput = document.querySelector('.popup__input_type_job')
const nameProfile = document.querySelector('.profile__title')
const jobProfile = document.querySelector('.profile__subtitle')

function openPopup() {
    popup.classList.add('popup_is-open')
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
}
editButton.addEventListener('click', openPopup)

function closePopup() {
    popup.classList.remove('popup_is-open')
}
popupCloseButton.addEventListener('click', closePopup)

function submitForm(event) {
    event.preventDefault()
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup();
}
form.addEventListener('submit', submitForm)
