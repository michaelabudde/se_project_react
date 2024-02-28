import React, { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";
import { useForm } from "../../hooks/useForm";

const AddItemModal = ({ onClose, onAddItem, isOpen }) => {
  const { values, handleChange, errors, setErrors, resetForm } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });
  const formInfo = {
    title: "New Garment",
    name: "create",
    buttonText: "Add garment",
  };
  function onSubmit(e) {
    e.preventDefault();
    if (values.weather === "") {
      // Display an error message for the weather field
      setErrors({ ...errors, message: "Please select a weather type" });
    } else {
      // Clear the weather-related error if weather is selected
      setErrors({ ...errors, message: "" });
      // Proceed with the form submission
      onAddItem(values);
    }
  }

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  // removed addItemError || from name error
  return (
    <ModalWithForm
      onClose={onClose}
      onSubmit={onSubmit}
      isOpen={isOpen}
      formInfo={formInfo}
    >
      <div>
        <div className="modal-form__label-container">
          <label className="modal-form__label">Name</label>
          <span className="modal-form__error">{errors.name || " "}</span>
        </div>
        <input
          type="text"
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
          <label className="modal-form__label">Image</label>
          <span className="modal-form__error">{errors.imageUrl || ""} </span>
        </div>
        <input
          type="url"
          name="imageUrl"
          className="modal-form__input modal__input_type_url"
          placeholder="Image URL"
          value={values.imageUrl || ""}
          onChange={handleChange}
          required
        />
        <div className="modal-form__label-container">
          <label className="modal-form__label">Select the Weather Type:</label>
          <span className="modal-form__error">{errors.weather || ""} </span>
        </div>
        <div className="modal-form__radio-inputs">
          <div>
            <input
              className="modal-form__input_type_radio"
              type="radio"
              id="choiceHot"
              name="weather"
              value="hot"
              onChange={(e) => {
                handleChange(e);
                setErrors({ ...errors, weather: "" }); // Clear the weather-related error
              }}
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
              value="warm"
              onChange={(e) => {
                handleChange(e);
                setErrors({ ...errors, weather: "" }); // Clear the weather-related error
              }}
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
              value="cold"
              onChange={(e) => {
                handleChange(e);
                setErrors({ ...errors, weather: "" }); // Clear the weather-related error
              }}
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
