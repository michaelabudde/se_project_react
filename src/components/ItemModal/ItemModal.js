import "./ItemModal.css";
import "../ModalWithForm/ModalWithForm.css";
import React from "react";

const ItemModal = ({ selectedCard, onClose }) => {
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
        <p className="modal__item-name">{selectedCard.name}</p>
        <p className="modal__weather-type">
          Weather Type: {selectedCard.weatherType}
        </p>
      </div>
    </div>
  );
};

export default ItemModal;
