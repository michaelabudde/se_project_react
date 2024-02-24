import React, { useContext, useEffect } from "react";
import useEsc from "../../hooks/useEsc";
import { ResponseContext } from "../../contexts/ResponseContext";
import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  onClose,
  onSubmit,
  isLoading,
  formInfo,
  // buttonState,
  extraButton,
}) => {
  useEsc(onClose);
  const { response } = useContext(ResponseContext);

  return (
    <div className="modal-form">
      <div className="modal-form__overlay" onClick={onClose} />

      <div className="modal-form__container">
        <h1 className="modal-form__title">{formInfo.title}</h1>
        <div className="modal-form__label-container">
          <label className="modal-form__label"></label>
          <span className="modal-form__error modal__server-error">
            {response || ""}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="modal-form__close-button"
        />
        <form
          onSubmit={onSubmit}
          className="modal-form__inputs-container"
          name={`${formInfo.name}-form`}
        >
          {children}

          <div className="modal-form__button-wrapper">
            <button
              type="submit"
              className="modal-form__submit-button"
              buttontext={isLoading ? "Saving..." : "Save"}
              // disabled={!buttonState}
            >
              {formInfo.buttonText}
            </button>
            {extraButton &&
              extraButton.map((btn, index) => (
                <button
                  key={index}
                  className={btn.className || "modal-form__extra-button"}
                  type={btn.type || "button"}
                  onClick={btn.onClick}
                  // disabled={btn.disabled}
                >
                  {btn.text}
                </button>
              ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
