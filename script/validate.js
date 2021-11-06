const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__send',
    inputErrorClass: 'popup__input_type_error',
    errorActiveClass: 'popup__input-error_active'
}

const enableValidation = (config) => {
    const { formSelector, ...restConfig } = config
    // Найти все формы на странице
    const formList = Array.from(document.querySelectorAll(formSelector));
    // Перебераю масив
    formList.forEach((formElement) => {
        setEventListeners(formElement, restConfig)
    })
}

const setEventListeners = (formElement, config) => {
    const { inputSelector, submitButtonSelector, ...restConfig } = config
    // Отмена перезагрузки формы
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault()
    });
    // Находим все импуты внутри форм 
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    // Находим кнопку
    const buttonElement = formElement.querySelector(submitButtonSelector);
    // Вешаем слушатили на ввод в импут 
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            // Проверяем инпут на валидность 
            checkInputValidity(formElement, inputElement, restConfig)
            toggleButtonState(inputList, buttonElement);
        })
    })
    toggleButtonState(inputList, buttonElement);
}

const showInputError = (formElement, inputElement, config) => {
    const { inputErrorClass, errorActiveClass } = config;
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
    //  Показываю Ошибку
    inputElement.classList.add(inputErrorClass);
    // Присвииваем текст Ошибки
    errorElement.textContent = inputElement.validationMessage;
    // Добовляем клаас активации ошибки
    errorElement.classList.add(errorActiveClass);
};

const hideInputError = (formElement, inputElement, config) => {
    const { inputErrorClass, errorActiveClass } = config;
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
    // Убираю ошибку
    inputElement.classList.remove(inputErrorClass)
    // убераем клаас активации ошибки
    errorElement.classList.remove(errorActiveClass);
    // Очищаем текст ошибки
    errorElement.textContent = '';
};

function resetForm(formParentElement, { formSelector, inputSelector, submitButtonSelector, ...config }) {
    // Сбрасываю значение инпутов
    const formElement = formParentElement.querySelector(formSelector);
    formElement.reset();
    // Сбрасываю ошибку
    const inputList = Array.from(formParentElement.querySelectorAll(inputSelector));
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, config)
    })
    // При посторном нажатии на попат делаю кнопку неактивной 
    const buttonElement = formElement.querySelector(submitButtonSelector);
    buttonElement.disabled = true;
};

const checkInputValidity = (formElement, inputElement, config) => {
    // Проверяем инпут на валидность
    // Если валидный убираем ошибку иначе покажываем ошибку
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, config);
    } else {
        showInputError(formElement, inputElement, config)
    }
}

// Проверяем форму на валидность
const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid)
};

const toggleButtonState = (inputList, buttonElement) => {
    // Проверяем форму на валидность
    // Если валидный включаем кнопку иначе выключаем нкопку
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true
    } else {
        buttonElement.disabled = false
    }
};
