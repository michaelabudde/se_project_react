import "../ModalWithForm/ModalWithForm.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";

const LogInModal = ({ onClose, isOpen, handleLogIn, handleClick }) => {
  const { values, handleChange, errors, isValid, resetForm } = useForm();

  const formInfo = {
    title: "Log in",
    name: "login",
    buttonText: "Log in",
  };

  const extraButton = [
    {
      text: "or Sign up",
      onClick: () => {
        handleClick("signup");
      },
      type: "submit",
      disabled: false,
    },
  ];

  function handleSubmit(e) {
    e.preventDefault();
    handleLogIn(values);
  }

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  return (
    <ModalWithForm
      formInfo={formInfo}
      onClose={onClose}
      handleSubmit={handleSubmit}
      buttonState={isValid}
      extraButton={extraButton}
      modalName="login"
    >
      <label className="form-modal__form-label" htmlFor="email">
        Email
      </label>
      <input
        className="form-modal__form-input"
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        minLength="1"
        maxLength="30"
        required
        onChange={handleChange}
        value={values.email || ""}
      />
      <span className="form-modal__error" id="name-error">
        {errors.email || ""}
      </span>
      <label className="form-modal__form-label" htmlFor="password">
        Password
      </label>
      <input
        className="form-modal__form-input"
        type="text"
        id="password"
        name="password"
        placeholder="Password"
        minLength="1"
        maxLength="30"
        required
        onChange={handleChange}
        value={values.password || ""}
      />
      <span className="form-modal__error" id="name-error">
        {errors.password || ""}
      </span>
    </ModalWithForm>
  );
};

export default LogInModal;
