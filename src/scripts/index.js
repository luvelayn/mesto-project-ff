import "../pages/index.css";
import { createCard, likeCard, deleteCard } from "./card";
import { openPopup, closePopup } from "./popup";
import { enableValidation, clearValidation } from "./validation";
import {
  getUserInfoApi,
  getInitialCardsApi,
  updateUserInfoApi,
  postCardApi,
  updateAvatarApi,
  likeCardApi,
  unlikeCardApi,
  deleteCardApi,
} from "./api";

// DOM Elements
const cardsList = document.querySelector(".places__list");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profilePhoto = document.querySelector(".profile__image");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const popups = document.querySelectorAll(".popup");
const profileEditPopup = document.querySelector(".popup_type_edit");
const cardAddPopup = document.querySelector(".popup_type_new-card");
const avatarEditPopup = document.querySelector(".popup_type_new-avatar");
const cardDeletePopup = document.querySelector(".popup_type_card-delete");
const cardPopup = document.querySelector(".popup_type_image");
const cardPopupImage = cardPopup.querySelector(".popup__image");
const cardPopupCaption = cardPopup.querySelector(".popup__caption");

const profileForm = profileEditPopup.querySelector(".popup__form");
const profileNameInput = profileForm.querySelector(".popup__input_type_name");
const profileJobInput = profileForm.querySelector(
  ".popup__input_type_description"
);

const cardForm = cardAddPopup.querySelector(".popup__form");
const cardNameInput = cardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = cardForm.querySelector(".popup__input_type_url");

const avatarForm = avatarEditPopup.querySelector(".popup__form");
const avatarLinkInput = avatarForm.querySelector(".popup__input_type_url");

const confirmationForm = cardDeletePopup.querySelector(".popup__form");

let currentUserId = null;
let handleConfirmationFormSubmit = null;

// Validation Config
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorVisibleClass: "popup__error_visible",
};

// Helpers
const renderLoading = (button, isLoading) => {
  button.textContent = isLoading ? "Сохранение..." : "Сохранить";
};

const getSubmitButton = (form) => form.querySelector(".popup__button");

const showError = (err) => console.error(`Error: ${err}`);

// Card Handlers
const openCardPopup = (image, title) => {
  cardPopupImage.src = image.src;
  cardPopupImage.alt = title.alt;
  cardPopupCaption.textContent = title.textContent;
  openPopup(cardPopup);
};

const handleCardLike = async (likeButton, likeCounter, cardId) => {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  try {
    const updatedCard = isLiked
      ? await unlikeCardApi(cardId)
      : await likeCardApi(cardId);
    likeCard(updatedCard, likeButton, likeCounter);
  } catch (err) {
    showError(err);
  }
};

const handleCardDelete = (cardElement, cardId) => {
  handleConfirmationFormSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await deleteCardApi(cardId);
      deleteCard(cardElement);
      closePopup(cardDeletePopup);
    } catch (err) {
      showError(err);
    }
  };

  openPopup(cardDeletePopup);
};

// Forms Handlers
const handleProfileFormSubmit = async (evt) => {
  evt.preventDefault();
  const name = profileNameInput.value;
  const job = profileJobInput.value;
  const submitButton = getSubmitButton(profileForm);

  renderLoading(submitButton, true);
  try {
    const updatedUser = await updateUserInfoApi(name, job);
    profileName.textContent = updatedUser.name;
    profileJob.textContent = updatedUser.about;
    closePopup(profileEditPopup);
  } catch (err) {
    showError(err);
  } finally {
    renderLoading(submitButton, false);
  }
};

const handleCardFormSubmit = async (evt) => {
  evt.preventDefault();
  const name = cardNameInput.value;
  const link = cardLinkInput.value;
  const submitButton = getSubmitButton(cardForm);

  renderLoading(submitButton, true);
  try {
    const newCard = await postCardApi(name, link);
    cardsList.prepend(
      createCard(
        newCard,
        handleCardDelete,
        handleCardLike,
        openCardPopup,
        currentUserId
      )
    );
    closePopup(cardAddPopup);
  } catch (err) {
    showError(err);
  } finally {
    renderLoading(submitButton, false);
  }
};

const handleAvatarFormSubmit = async (evt) => {
  evt.preventDefault();
  const avatarUrl = avatarLinkInput.value;
  const submitButton = getSubmitButton(avatarForm);

  renderLoading(submitButton, true);
  try {
    const updatedUser = await updateAvatarApi(avatarUrl);
    profilePhoto.style.backgroundImage = `url('${updatedUser.avatar}')`;
    closePopup(avatarEditPopup);
  } catch (err) {
    console.log(err);
  } finally {
    renderLoading(submitButton, false);
  }
};

// Event Listeners
editButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  clearValidation(profileForm, validationConfig);
  openPopup(profileEditPopup);
});

addButton.addEventListener("click", () => {
  cardForm.reset();
  clearValidation(cardForm, validationConfig);
  openPopup(cardAddPopup);
});

profilePhoto.addEventListener("click", () => {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  openPopup(avatarEditPopup);
});

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    const closeButton = popup.querySelector(".popup__close");
    if (evt.target === closeButton || evt.target === popup) {
      closePopup(popup);
    }
  });
});

profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);
avatarForm.addEventListener("submit", handleAvatarFormSubmit);
confirmationForm.addEventListener("submit", (evt) =>
  handleConfirmationFormSubmit(evt)
);

// Initialize
const initializeApp = async () => {
  try {
    const [user, cards] = await Promise.all([
      getUserInfoApi(),
      getInitialCardsApi(),
    ]);

    profileName.textContent = user.name;
    profileJob.textContent = user.about;
    profilePhoto.style.backgroundImage = `url('${user.avatar}')`;
    currentUserId = user._id;

    cards.forEach((card) =>
      cardsList.append(
        createCard(
          card,
          handleCardDelete,
          handleCardLike,
          openCardPopup,
          currentUserId
        )
      )
    );
  } catch (err) {
    showError(err);
  }
};

enableValidation(validationConfig);
initializeApp();
