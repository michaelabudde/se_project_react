import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ handleCloseModal, onAddItem, isOpen, useForm }) => {
  const [name, setName] = useState("");
  /* const handleNameChange = (e) => {
    setName(e.target.value);
  };


  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  }; */
  const [link, setUrl] = useState("");
  const [weather, setWeather] = useState("");
  /*   const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  }; */
  const { values, handleChange, setValues } = useForm({
    name: "",
    link: "",
    weatherType: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(values);
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
            value={values.name}
            onChange={handleChange}
          />
        </label>
        <label className="modal__label">
          Image
          <input
            type="url"
            name="link"
            className="modal__input modal__input_type_url"
            placeholder="Image URL"
            value={values.link}
            onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
