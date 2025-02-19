const cardsList = document.querySelector('.places__list');

const getTemplate = () => {
  return document
    .querySelector('#card-template')
    .content.querySelector('.card')
    .cloneNode(true);
}

const createCard = (cardData, onDeleteCard) => {
  const cardElement = getTemplate();
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener('click', () => onDeleteCard(cardElement));

  return cardElement;
}

const deleteCard = (cardElement) => {
  cardElement.remove();
}

initialCards.forEach(element => {
  cardsList.append(createCard(element, deleteCard));
});