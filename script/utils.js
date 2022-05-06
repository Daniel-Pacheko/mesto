// Функция закрытия любого Попапа
export function closePopup(popup,) {
  popup.classList.remove('popup_is-open');
  document.removeEventListener('keydown', escClosePopup);
  document.removeEventListener('mouseup', overlayClosePopup);
}

// Функция закрытия любого Попапа по кнопки ESC
function escClosePopup(event) {
  if (event.key === 'Escape') {
    const popupOpen = document.querySelector('.popup_is-open');
    closePopup(popupOpen)
  }
}
function overlayClosePopup(event) {
  if (event.target.classList.contains('popup')) {
    const popupOpen = document.querySelector('.popup_is-open');
    closePopup(popupOpen)
  }
}

// Функция открытия любого Попапа
export function openPopup(popup) {
  popup.classList.add('popup_is-open');
  document.addEventListener('keydown', escClosePopup);
  document.addEventListener('mouseup', overlayClosePopup);
}

