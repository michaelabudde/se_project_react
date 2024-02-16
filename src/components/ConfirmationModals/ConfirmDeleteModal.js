import React from "react";
import useEsc from "../../hooks/useEsc";
import "../ModalWithForm/ModalWithForm.css";
import "./ConfirmationModal.css";

const ConfirmDeleteModal = ({
  onClose,
  handleDelete,
  selectedCard,
  buttonDisplay,
}) => {
  useEsc(onClose);
  return (
    <div className="modal-form ">
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="confirmation-modal__container">
        <h1 className="confirmation-modal__query">
          Are you sure you want to delete this item?
        </h1>
        <h2 className="confirmation-modal__warning">
          This action is irreversible.
        </h2>
        <button
          type="button"
          className="confirmation-modal__delete"
          onClick={() => {
            handleDelete(selectedCard);
          }}
        >
          {buttonDisplay}
        </button>
        <button
          type="button"
          className="confirmation-modal__cancel"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="modal__close-button"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
