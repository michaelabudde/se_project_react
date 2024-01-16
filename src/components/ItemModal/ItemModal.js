import "./ItemModal.css";
import React from "react";

const ItemModal = ({ selectedCard, onClose, onDeleteItem }) => {
  const handleCardDelete = () => {
    onDeleteItem(selectedCard._id);
  };

  return (
    <div className="item-modal">
      <div className="item-modal__container-image">
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

          <button
            type="button"
            className="item-modal__delete-button"
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
