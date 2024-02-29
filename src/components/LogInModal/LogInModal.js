import "../ModalWithForm/ModalWithForm.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const LogInModal = ({
  onClose,
  isOpen,
  handleLogIn,
  handleClick,
  loginError,
}) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

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

  function onSubmit(e) {
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
      onSubmit={onSubmit}
      extraButton={extraButton}
      modalName="login"
    >
      <div className="modal-form__label-container">
        <label className="modal-form__label" htmlFor="email">
          Email
        </label>
        <span className="modal-form__error" id="name-error">
          {errors.email || loginError || ""}
        </span>
      </div>
      <input
        className="modal-form__input"
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
      <div className="modal-form__label-container">
        <label className="modal-form__label" htmlFor="password">
          Password
        </label>
        <span className="modal-form__error" id="name-error">
          {errors.password || ""}
        </span>
      </div>
      <input
        className="modal-form__input"
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
    </ModalWithForm>
  );
};

export default LogInModal;
