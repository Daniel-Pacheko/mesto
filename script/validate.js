const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__send',
    inputErrorClass: 'popup__input_type_error',
    inactiveButtonClass: 'popup__send_disabled'

}



// Функция включения валидации
function enableValidation(validationConfig) {
    // Нахожу форуму, делаю ее масивом, обращаюсь к config и жу что из него придет formSelector
    const forms = [...document.querySelectorAll(validationConfig.formSelector)]

    forms.forEach((form) => setFormListeners(form, validationConfig))

 
}



//Функция приема и обработки форм "набор слушателей формы"
function setFormListeners(form, config) {
    form.addEventListener('submit', handleSubmit);
    form.addEventListener('input', () => setSubmitButtonState(form, config))



    const input = [...document.querySelectorAll(config.inputSelector)]


    input.forEach(inputElement => {
        inputElement.addEventListener('input', 
            () => handleFieldValidation(inputElement, form, config))
    })

    setSubmitButtonState(form, config)
}


//функуия проверки кнопки 
function setSubmitButtonState(form, config){
    const button = form.querySelector(config.submitButtonSelector);

    button.disabled = form.checkValidity();
    button.classList.toggle(config.submitButtonErrorClass, !form.checkValidity())
}


function handleSubmit(event) {
    event.preventDefault()
}

function handleFieldValidation(input, form, config) {
    console.log(input)

    if (!input.validity.valid) {
        showInputError(input, form, config)
    } else {
        hideInputError(input, form, config)
    }
}
//функуция открытия ошибки 
function showInputError(input, form, config) {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.add(config.inputErrorClass);

    errorElement.textContent = input.validationMessage;

}

//функуция закрытия ошибки 
function hideInputError(input, form, config) {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.remove(config.inputErrorClass);

    errorElement.textContent = '';

}


enableValidation(config)