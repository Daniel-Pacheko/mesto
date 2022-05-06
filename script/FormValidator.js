export class FormValidator {
    constructor(settings, form) {
        this._form = form
        this.settings = settings
        // Находим все импуты внутри форм 
        this._inputList = Array.from(this._form.querySelectorAll(this.settings.inputSelector));
        // Находим кнопку
        this._buttonElement = this._form.querySelector(this.settings.submitButtonSelector);
    }
    _showInputError(inputElement) {
        const { inputErrorClass, errorActiveClass } = this.settings

        // Находим элемент ошибки
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`)
        //  Показываю Ошибку
        inputElement.classList.add(inputErrorClass);
        // Присвииваем текст Ошибки
        errorElement.textContent = inputElement.validationMessage;
        // Добовляем клаас активации ошибки
        errorElement.classList.add(errorActiveClass);
    };

    _hideInputError(inputElement) {
        const { inputErrorClass, errorActiveClass } = this.settings

        // Находим элемент ошибки
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`)
        // Убираю ошибку
        inputElement.classList.remove(inputErrorClass)
        // убераем клаас активации ошибки
        errorElement.classList.remove(errorActiveClass);
        // Очищаем текст ошибки
        errorElement.textContent = '';
    };


    _checkInputValidity(inputElement) {
        // Проверяем инпут на валидность
        // Если валидный убираем ошибку иначе покажываем ошибку
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement);
        } else {
            this._showInputError(inputElement)
        }
    }

    // Проверяем форму на валидность
    _hasInvalidInput() {
        return this._inputList.some(inputElement => !inputElement.validity.valid)
    };

    _toggleButtonState() {
        // Проверяем форму на валидность
        // Если валидный включаем кнопку иначе выключаем нкопку
        if (this._hasInvalidInput()) {
            this._buttonElement.disabled = true
        } else {
            this._buttonElement.disabled = false
        }
    };


    _setEventListeners() {
        // Вешаем слушатили на ввод в импут 
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                // Проверяем инпут на валидность 
                this._checkInputValidity(inputElement)
                this._toggleButtonState();
            });
        });
    }


    enableValidation() {
        this._setEventListeners();
    };

    resetForm() {
        this._form.reset()
        this._inputList.forEach((inputElement) => {
            // Проверяем инпут на валидность 
            this._hideInputError(inputElement);
        })
        this._toggleButtonState();
    };
}
