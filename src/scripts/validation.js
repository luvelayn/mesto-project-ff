const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorVisibleClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorVisibleClass);
};

const hideInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  errorVisibleClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorVisibleClass);
  errorElement.textContent = "";
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  const hasInvalid = hasInvalidInput(inputList);
  buttonElement.classList.toggle(inactiveButtonClass, hasInvalid);
  buttonElement.disabled = hasInvalid;
};

const checkInputValidity = (
  formElement,
  inputElement,
  inputErrorClass,
  errorVisibleClass
) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  const errorMessage = inputElement.validationMessage;
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      errorMessage,
      inputErrorClass,
      errorVisibleClass
    );
  } else {
    hideInputError(
      formElement,
      inputElement,
      inputErrorClass,
      errorVisibleClass
    );
  }
};

const setEventListeners = (
  formElement,
  inputSelector,
  submitButtonSelector,
  inputErrorClass,
  errorVisibleClass,
  inactiveButtonClass
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(
        formElement,
        inputElement,
        inputErrorClass,
        errorVisibleClass
      );
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

const enableValidation = (validationConfigObject) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfigObject.formSelector)
  );

  formList.forEach((formElement) => {
    setEventListeners(
      formElement,
      validationConfigObject.inputSelector,
      validationConfigObject.submitButtonSelector,
      validationConfigObject.inputErrorClass,
      validationConfigObject.errorVisibleClass,
      validationConfigObject.inactiveButtonClass
    );
  });
};

const clearValidation = (formElement, validationConfigObject) => {
  const buttonElement = formElement.querySelector(
    validationConfigObject.submitButtonSelector
  );
  const inputList = formElement.querySelectorAll(
    validationConfigObject.inputSelector
  );

  buttonElement.classList.add(validationConfigObject.inactiveButtonClass);
  buttonElement.disabled = true;
  inputList.forEach((inputElement) => {
    hideInputError(
      formElement,
      inputElement,
      validationConfigObject.inputErrorClass,
      validationConfigObject.errorVisibleClass
    );
  });
};

export { enableValidation, clearValidation };
