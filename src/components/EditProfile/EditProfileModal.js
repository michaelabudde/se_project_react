import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useContext } from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "../ModalWithForm/ModalWithForm.css";
const EditProfileModal = ({ onClose, handleProfileUpdate, isLoading }) => {
  // removed isopen
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();
  const { currentUser } = useContext(CurrentUserContext);

  const formInfo = {
    title: "Edit Profile",
    name: "edit-profile",
    buttonText: "Submit",
  };

  const extraButton = [
    {
      text: "Cancel",
      onClick: () => {
        onClose();
      },
      type: "button",
      disabled: false,
    },
  ];

  function onSubmit(e) {
    e.preventDefault();
    handleProfileUpdate(values);
  }

  useEffect(() => {
    // removed isOpen
    if (currentUser) {
      resetForm(
        {
          name: currentUser.name || "",
          email: currentUser.email || "",
          avatar: currentUser.avatar || "",
        },
        {},
        true
      );
    }
  }, [currentUser, resetForm]);
  // removed isOpen
  return (
    <ModalWithForm
      formInfo={formInfo}
      onClose={onClose}
      onSubmit={onSubmit}
      extraButton={extraButton}
      isLoading={isLoading}
    >
      <label className="modal-form__label" htmlFor="name">
        Name
      </label>
      <input
        className="modal-form__input"
        type="text"
        id="name"
        name="name"
        placeholder={"Name"}
        minLength="1"
        maxLength="30"
        onChange={handleChange}
        value={values.name}
      />
      <span className="modal-form__error" id="name-error">
        {errors.name || ""}
      </span>
      <label className="modal-form__label" htmlFor="email">
        Email
      </label>
      <input
        className="modal-form__input"
        type="email"
        id="email"
        name="email"
        placeholder={"Email"}
        minLength="1"
        maxLength="30"
        onChange={handleChange}
        value={values.email}
      />
      <span className="modal-form__error" id="name-error">
        {errors.email || ""}
      </span>
      <label className="modal-form__label" htmlFor="link">
        Profile Picture URL
      </label>
      <input
        className="modal-form__input"
        id="link"
        name="avatar"
        placeholder={"Image Link"}
        type="url"
        onChange={handleChange}
        value={values.avatar}
      />
      <span className="modal-form__error" id="link-error">
        {errors.avatar || ""}
      </span>
    </ModalWithForm>
  );
};

export default EditProfileModal;
