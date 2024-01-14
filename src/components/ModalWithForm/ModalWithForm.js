import React, { useContext, useEffect } from "react";
import useEsc from "../../hooks/useEsc";
import { ResponseContext } from "../../contexts/ResponseContext";
import "./ModalWithForm.css";

const ModalWithForm = ({
  buttonText,
  title,
  children,
  onClose,
  onSubmit,
  isLoading,
  formInfo,
  buttonState,
  extraButton,
}) => {
  useEsc(onClose);
  const { response } = useContext(ResponseContext);

  return (
    <div className="form-modal">
      <div className="form-modal__overlay" onClick={onClose} />

      <div className="form-modal__container">
        <h1 className="form-modal__title">{title}</h1>
        <span className="form-modal__error modal__server-error">
          {response || ""}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="form-modal__close-button"
        />
        <form
          onSubmit={onSubmit}
          className="form-modal__inputs-container"
          name={`${formInfo.name}-form`}
        >
          {children}

          <div className="form-modal__button-wrapper">
            <button
              type="submit"
              className="form-modal__submit-button"
              buttontext={isLoading ? "Saving..." : "Save"}
              disabled={!buttonState}
            >
              {buttonText}
            </button>
            {extraButton &&
              extraButton.map((btn, index) => (
                <button
                  key={index}
                  className={btn.className || "form-modal__extra-button"}
                  type={btn.type || "button"}
                  onClick={btn.onClick}
                  disabled={btn.disabled}
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
