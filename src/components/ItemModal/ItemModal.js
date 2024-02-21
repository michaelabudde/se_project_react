import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ItemModal.css";

const ItemModal = ({ selectedCard, onClose, onDeleteItem }) => {
  const { currentUser } = useContext(CurrentUserContext);

  const handleCardDelete = () => {
    onDeleteItem(selectedCard._id);
  };

  // Checking if the current user is the owner of the current clothing item
  const isOwn = selectedCard.owner === currentUser?._id;

  // Creating a variable which you'll then set in `className` for the delete button
  const itemDeleteButton = `item-modal__delete-button ${
    isOwn ? "item-modal__delete-button" : "item-modal__delete-button_hidden"
  }`;

  return (
    <div className="item-modal">
      <div className="item-modal__container">
        <button
          type="button"
          onClick={onClose}
          className="item-modal__close-button-white"
        ></button>
        <img
          src={selectedCard.imageUrl}
          className="item-modal__image-preview"
          alt={selectedCard.name}
        ></img>
        <div className="item-modal__footer">
          <p className="item-modal__item-name">{selectedCard.name}</p>
          <div className="item-modal__weather-type">
            Weather Type: {selectedCard.weather}
          </div>

          {/* Apply the conditional class to the delete button */}
          <button
            type="button"
            className={itemDeleteButton}
            onClick={handleCardDelete}
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
