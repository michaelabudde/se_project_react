import "../ModalWithForm/ModalWithForm.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const SignUpModal = ({
  onClose,
  handleSignUp,
  handleClick,
  signupError,
  isLoading,
}) => {
  // isOpen removed
  const { values, handleChange, errors, resetForm } = useFormAndValidation();

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
  function onSubmit(e) {
    e.preventDefault();
    handleSignUp(values);
  }

  useEffect(() => {
    resetForm();
  }, [resetForm]);
  // isOpen removed
  return (
    <ModalWithForm
      formInfo={formInfo}
      onClose={onClose}
      extraButton={extraButton}
      modalName="sign-up"
      onSubmit={onSubmit}
      isLoading={isLoading}
    >
      <div className="modal-form__label-container">
        <label className="modal-form__label" htmlFor="email">
          Email*
        </label>
        <span className="modal-form__error" id="name-error">
          {errors.email || signupError || ""}
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
          Password*
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
      <div className="modal-form__label-container">
        <label className="modal-form__label" htmlFor="name">
          Name*
        </label>
        <span className="modal-form__error" id="name-error">
          {errors.name || ""}
        </span>
      </div>
      <input
        className="modal-form__input"
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
      <div className="modal-form__label-container">
        <label className="modal-form__label" htmlFor="link">
          Profile Picture URL
        </label>
        <span className="modal-form__error" id="link-error">
          {errors.avatar || ""}
        </span>
      </div>
      <input
        className="modal-form__input"
        id="link"
        name="avatar"
        placeholder="Image Link"
        type="url"
        onChange={handleChange}
        value={values.avatar || ""}
      />
    </ModalWithForm>
  );
};

export default SignUpModal;
