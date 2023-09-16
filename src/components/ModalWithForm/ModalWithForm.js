import React, { useState, useMemo } from "react";
import "./ModalWithForm.css";

const ModalWithForm = ({
  buttonText = "Add Garment",
  title,
  onClose,
  modalName,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    link: "",
    weatherType: "hot", // Default value for radio buttons
  });

  const [formErrors, setFormErrors] = useState({});

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate the form inputs
  const validateForm = useMemo(() => {
    const errors = {};

    if (formData.name.trim() === "") {
      errors.name = "Name is required.";
    }

    if (formData.link.trim() === "") {
      errors.link = "Image URL is required.";
    }

    if (!formData.weatherType) {
      errors.weatherType = "Please select a weather type.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  return (
    <div className={`modal modal-type-${modalName}`}>
      <div className="modal__container">
        <button
          type="button"
          onClick={onClose}
          className="modal__close-button"
        />
        <h3 className="modal__title">{title}</h3>
        <label className="modal__label">
          Name
          {formErrors.name && (
            <span className="modal__error">{formErrors.name}</span>
          )}
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="modal__input modal__input_type_card-name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
        />
        <label className="modal__label">
          Image
          {formErrors.link && (
            <span className="modal__error">{formErrors.link}</span>
          )}
        </label>
        <input
          type="url"
          name="link"
          value={formData.link}
          onChange={handleInputChange}
          className="modal__input modal__input_type_url"
          placeholder="Image URL"
          required
        />

        <label className="modal__label">Select the Weather Type:</label>
        <div className="modal__radio-inputs">
          <div>
            <input
              className="modal__input_type_radio"
              type="radio"
              id="choiceHot"
              name="weatherType"
              value="hot"
              checked={formData.weatherType === "hot"}
              onChange={handleInputChange}
            />
            <label className="modal__label_radio" htmlFor="choiceHot">
              Hot
            </label>
          </div>
          <div>
            <input
              className="modal__input_type_radio"
              type="radio"
              id="choiceWarm"
              name="weatherType"
              value="warm"
              checked={formData.weatherType === "warm"}
              onChange={handleInputChange}
            />
            <label className="modal__label_radio" htmlFor="choiceWarm">
              Warm
            </label>
          </div>
          <div>
            <input
              className="modal__input_type_radio"
              type="radio"
              id="choiceCold"
              name="weatherType"
              value="cold"
              checked={formData.weatherType === "cold"}
              onChange={handleInputChange}
            />
            <label className="modal__label_radio" htmlFor="choiceCold">
              Cold
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="modal__submit-button"
          disabled={!validateForm} // Disable the button if the form is not valid
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};
export default ModalWithForm;
