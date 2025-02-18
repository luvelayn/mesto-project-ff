const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');

function createCard(cardData, deleteCardFunc) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener('click', (event) => deleteCardFunc(event));

  return cardElement;
}

function deleteCard(event) {
  const card = event.target.closest('.card');
  card.remove();
}

initialCards.forEach(element => {
  cardsList.append(createCard(element, deleteCard));
});