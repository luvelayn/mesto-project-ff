const getTemplate = () => {
  return document
    .querySelector("#card-template")
    .content.querySelector(".card")
    .cloneNode(true);
};

const createCard = (cardData, onDeleteCard, onLikeCard, onOpenImage) => {
  const cardElement = getTemplate();
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener("click", () => onDeleteCard(cardElement));
  likeButton.addEventListener("click", () => onLikeCard(likeButton));
  cardImage.addEventListener("click", () => onOpenImage(cardImage, cardTitle));

  return cardElement;
};

const deleteCard = (cardElement) => {
  cardElement.remove();
};

const likeCard = (likeButton) => {
  likeButton.classList.toggle("card__like-button_is-active");
};

export { createCard, deleteCard, likeCard };
