import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({
  handleCloseModal,
  onAddItem,
  isOpen,
  useForm,
  handleSubmit,
}) => {
  const { values, handleChange, setValues } = useForm({
    name: "",
    link: "",
    weatherType: "",
  });

  return (
    <ModalWithForm
      title="New Garment"
      modalName="new-card"
      onClose={handleCloseModal}
      onSubmit={() => {
        handleSubmit(onAddItem(values));
      }}
      isOpen={isOpen}
      buttontext={"Add Garment"}
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
