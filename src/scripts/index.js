import '../pages/index.css';
import { initialCards } from './cards';
import { createCard, deleteCard, likeCard } from './card';
import { openPopup, closePopup } from './popup';

const cardsList = document.querySelector('.places__list');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popups = document.querySelectorAll('.popup');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');
const cardPopup = document.querySelector('.popup_type_image');
const cardPopupImage = cardPopup.querySelector('.popup__image');
const cardPopupCaption = cardPopup.querySelector('.popup__caption');

const profileForm = editPopup.querySelector('.popup__form');
const profileNameInput = profileForm.querySelector('.popup__input_type_name');
const profileJobInput = profileForm.querySelector('.popup__input_type_description');

const cardForm = addPopup.querySelector('.popup__form');
const cardName = cardForm.querySelector('.popup__input_type_card-name');
const cardLink = cardForm.querySelector('.popup__input_type_url');

const openCardPopup = (cardImage, cardTitle) => {
  cardPopupImage.src = cardImage.src;
  cardPopupImage.alt = cardImage.alt;
  cardPopupCaption.textContent = cardTitle.textContent;

  openPopup(cardPopup);
}

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;

  closePopup(document.querySelector('.popup_is-opened'));
}

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();

  const newCard = {
    name: cardName.value,
    link: cardLink.value
  }

  cardsList.prepend(createCard(newCard, deleteCard, likeCard, openCardPopup));
  evt.currentTarget.reset();
  closePopup(document.querySelector('.popup_is-opened'));
}

initialCards.forEach(element => {
  cardsList.append(createCard(element, deleteCard, likeCard, openCardPopup));
});

editButton.addEventListener('click', () => {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent; 
  openPopup(editPopup);
});

addButton.addEventListener('click', () => {
  openPopup(addPopup);
});

popups.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    const closeButton = popup.querySelector('.popup__close');

    if (evt.target === closeButton || evt.target === popup) {
      closePopup(popup);
    }
  });
})

profileForm.addEventListener('submit', handleProfileFormSubmit);
cardForm.addEventListener('submit', handleCardFormSubmit);
