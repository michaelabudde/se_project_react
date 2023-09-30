import "./ItemModal.css";
import "../ModalWithForm/ModalWithForm.css";
import React from "react";

const ItemModal = ({ selectedCard, onClose, onDeleteItem }) => {
  const handleCardDelete = () => {
    onDeleteItem(selectedCard._id);
  };
  setEventListeners() {
    this._modalElement.addEventListener("mousedown", this._handleClickOutside);
    this.close();
  }
  return (
    <div className="modal">
      <div className="modal__container-image">
        <button
          type="button"
          onClick={onClose}
          className="modal__close-button-white"
        ></button>
        <img
          src={selectedCard.link}
          className="modal__image-preview"
          alt={selectedCard.name}
        ></img>
        <div className="modal__footer">
          <p className="modal__item-name">{selectedCard.name}</p>
          <div className="modal__weather-type">
            Weather Type: {selectedCard.weatherType}
          </div>

          <button
            type="button"
            className="modal__delete-button"
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
