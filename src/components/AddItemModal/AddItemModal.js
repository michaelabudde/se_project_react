import React, { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
const AddItemModal = ({ onClose, onAddItem, response, isLoading }) => {
  // isopen removed
  const { values, handleChange, errors, resetForm } = useFormAndValidation();
  const formInfo = {
    title: "New Garment",
    name: "create",
    buttonText: "Add garment",
  };
  function onSubmit(e) {
    e.preventDefault();
    const newItem = { ...values };
    onAddItem(newItem);
  }

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <ModalWithForm
      onClose={onClose}
      onSubmit={onSubmit}
      // isOpen={isOpen}
      formInfo={formInfo}
      isLoading={isLoading}
    >
      <div>
        <div className="modal-form__label-container">
          <label className="modal-form__label" htmlFor="nameInput">
            Name
          </label>
          <span className="modal-form__error">{errors.name || " "}</span>
        </div>
        <input
          type="text"
          id="nameInput"
          name="name"
          className="modal-form__input modal__input_type_card-name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          value={values.name || ""}
          onChange={handleChange}
        />

        <div className="modal-form__label-container">
          <label className="modal-form__label" htmlFor="imageUrlInput">
            Image
          </label>
          <span className="modal-form__error">{errors.imageUrl || ""} </span>
        </div>
        <input
          type="url"
          id="imageUrlInput"
          name="imageUrl"
          className="modal-form__input modal__input_type_url"
          placeholder="Image URL"
          value={values.imageUrl || ""}
          onChange={handleChange}
          required
        />

        <div className="modal-form__label-container">
          <label className="modal-form__label" htmlFor="weatherInput">
            Select the Weather Type:
          </label>
          <span className="modal-form__error">{errors.weather || ""}</span>
        </div>

        <div className="modal-form__radio-inputs">
          <div>
            <input
              className="modal-form__input_type_radio"
              type="radio"
              id="choiceHot"
              name="weather"
              value={values.weather || "hot"}
              onChange={handleChange}
              required
            />
            <label className="modal-form__label_radio" htmlFor="choiceHot">
              Hot
            </label>
          </div>
          <div>
            <input
              className="modal-form__input_type_radio"
              type="radio"
              id="choiceWarm"
              name="weather"
              value={values.weather || "warm"}
              onChange={handleChange}
              required
            />
            <label className="modal-form__label_radio" htmlFor="choiceWarm">
              Warm
            </label>
          </div>
          <div>
            <input
              className="modal-form__input_type_radio"
              type="radio"
              id="choiceCold"
              name="weather"
              value={values.weather || "cold"}
              onChange={handleChange}
              required
            />
            <label className="modal-form__label_radio" htmlFor="choiceCold">
              Cold
            </label>
          </div>
        </div>
      </div>
    </ModalWithForm>
  );
};
export default AddItemModal;
