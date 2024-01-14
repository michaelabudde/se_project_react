import "../ModalWithForm/ModalWithForm.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";

const SignUpModal = ({ onClose, isOpen, handleSignup, handleClick }) => {
  const { values, handleChange, errors, isValid, resetForm } = useForm();

  const formInfo = {
    title: "Sign up",
    name: "sign-up",
    buttonText: "Next",
  };

  const extraButton = [
    {
      text: "or Log in",
      onClick: () => {
        handleClick("login");
      },
      type: "submit",
      disabled: false,
    },
  ];
  function handleSubmit(e) {
    e.preventDefault();
    handleSignup(values);
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
      modalName="sign-up"
    >
      <label className="form-modal__form-label" htmlFor="email">
        Email*
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
        Password*
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
      <label className="form-modal__form-label" htmlFor="name">
        Name*
      </label>
      <input
        className="form-modal__form-input"
        type="text"
        id="name"
        name="name"
        placeholder="Name"
        minLength="1"
        maxLength="30"
        required
        onChange={handleChange}
        value={values.name || ""}
      />
      <span className="form-modal__error" id="name-error">
        {errors.name || ""}
      </span>
      <label className="form-modal__form-label" htmlFor="link">
        Profile Picture URL
      </label>
      <input
        className="form-modal__form-input"
        id="link"
        name="avatar"
        placeholder="Image Link"
        type="url"
        onChange={handleChange}
        value={values.avatar || ""}
      />
      <span className="form-modal__error" id="link-error">
        {errors.avatar || ""}
      </span>
    </ModalWithForm>
  );
};

export default SignUpModal;
