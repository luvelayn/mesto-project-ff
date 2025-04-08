const getTemplate = () => {
  return document
    .querySelector("#card-template")
    .content.querySelector(".card")
    .cloneNode(true);
};

const createCard = (
  cardData,
  onDeleteCard,
  onLikeCard,
  onOpenImage,
  currentUserId
) => {
  const cardElement = getTemplate();
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");
  const cardId = cardData._id;

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length;

  if (cardData.owner._id !== currentUserId) {
    deleteButton.classList.add("card__delete-button_inactive");
  }

  if (cardData.likes.some((user) => user._id === currentUserId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  deleteButton.addEventListener("click", () =>
    onDeleteCard(cardElement, cardId)
  );
  likeButton.addEventListener("click", () =>
    onLikeCard(likeButton, likeCounter, cardId)
  );
  cardImage.addEventListener("click", () => 
    onOpenImage(cardImage, cardTitle)
  );

  return cardElement;
};

const deleteCard = (cardElement) => {
  cardElement.remove();
};

const likeCard = (card, likeButton, likeCounter) => {
  likeButton.classList.toggle("card__like-button_is-active");
  likeCounter.textContent = card.likes.length;
};

export { createCard, likeCard, deleteCard };
