import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
const { values, handleChange, setValues } = useForm({});

const AddItemModal = ({ handleCloseModal, onAddItem, isOpen }) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [link, setUrl] = useState("");
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };
  const [weather, setWeather] = useState("");
  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, weather, link });
  };
  return (
    <ModalWithForm
      title="New Garment"
      name="new-card"
      onClose={handleCloseModal}
      onSubmit={handleSubmit}
      isOpen={isOpen}
    >
      <div>
        <label className="modal__label">
          Name
          <input
            type="text"
            name="name"
            className="modal__input modal__input_type_card-name"
            placeholder="Name"
            required
            minLength="1"
            maxLength="30"
            value={name}
            onChange={handleNameChange}
          />
        </label>
        <label className="modal__label">
          Image
          <input
            type="url"
            name="link"
            className="modal__input modal__input_type_url"
            placeholder="Image URL"
            value={link}
            onChange={handleUrlChange}
            required
          />
        </label>

        <label className="modal__label">Select the Weather Type:</label>
        <div className="modal__radio-inputs">
          <div>
            <input
              className="modal__input_type_radio"
              type="radio"
              id="choiceHot"
              name="weatherType"
              value="hot"
              onChange={handleWeatherChange}
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
              onChange={handleWeatherChange}
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
              onChange={handleWeatherChange}
            />
            <label className="modal__label_radio" htmlFor="choiceCold">
              Cold
            </label>
          </div>
        </div>
      </div>
    </ModalWithForm>
  );
};
export default AddItemModal;
