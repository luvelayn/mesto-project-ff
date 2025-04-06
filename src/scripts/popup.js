const openPopup = (popup) => {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEsc);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEsc);
};

const handleEsc = (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
};

export { openPopup, closePopup };
