import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useContext } from "react";
import { useForm } from "../../hooks/useForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ onClose, isOpen, handleProfileUpdate }) => {
  const { values, handleChange, errors, isValid, resetForm } = useForm();
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
    if (isOpen && currentUser) {
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
  }, [isOpen, currentUser, resetForm]);

  return (
    <ModalWithForm
      formInfo={formInfo}
      onClose={onClose}
      onSubmit={onSubmit}
      // buttonState={isValid}
      extraButton={extraButton}
    >
      <label className="modal-form__form-label" htmlFor="name">
        Name
      </label>
      <input
        className="modal-form__form-input"
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
      <label className="modal-form__form-label" htmlFor="email">
        Email
      </label>
      <input
        className="modal-form__form-input"
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
      <label className="modal-form__form-label" htmlFor="link">
        Profile Picture URL
      </label>
      <input
        className="modal-form__form-input"
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
