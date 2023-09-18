import React, { Children, useState } from "react";
import "./ModalWithForm.css";

const ModalWithForm = ({
  buttonText = "Add Garment",
  title,
  children,
  onClose,
  modalName,
}) => {
  return (
    <div className={`modal modal-type-${modalName}`}>
      <form>
        <div className="modal__container">
          <button
            type="button"
            onClick={onClose}
            className="modal__close-button"
          />
          <h3 className="modal__title">{title}</h3>
          <form>{children}</form>
          <button type="submit" className="modal__submit-button">
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
};
export default ModalWithForm;
