import React, { Children, useState } from "react";
import "./ModalWithForm.css";

const ModalWithForm = ({
  buttontext,
  title,
  children,
  onClose,
  modalName,
  onSubmit,
  isLoading,
}) => {
  return (
    <div className={`modal modal-type-${modalName}`}>
      <form onSubmit={onSubmit}>
        <div className="modal__container">
          <button
            type="button"
            onClick={onClose}
            className="modal__close-button"
          />
          <h3 className="modal__title">{title}</h3>
          {children}
          <button
            type="submit"
            className="modal__submit-button"
            buttontext={isLoading ? "Saving..." : "Save"}
          >
            {buttontext}
          </button>
        </div>
      </form>
    </div>
  );
};
export default ModalWithForm;
