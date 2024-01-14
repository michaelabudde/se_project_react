import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";
import { useForm } from "../../hooks/useForm";

const AddItemModal = ({ handleCloseModal, onAddItem, isOpen }) => {
  const { values, handleChange } = useForm({
    name: "",
    link: "",
    weatherType: "",
  });

  return (
    <ModalWithForm
      title="New Garment"
      modalName="new-card"
      onClose={handleCloseModal}
      onSubmit={(evt) => {
        evt.preventDefault();
        onAddItem(values);
      }}
      isOpen={isOpen}
      buttontext={"Add Garment"}
    >
      <div>
        <label className="form-modal__label">
          Name
          <input
            type="text"
            name="name"
            className="form-modal__input modal__input_type_card-name"
            placeholder="Name"
            required
            minLength="1"
            maxLength="30"
            value={values.name}
            onChange={handleChange}
          />
        </label>
        <label className="form-modal__label">
          Image
          <input
            type="url"
            name="link"
            className="form-modal__input modal__input_type_url"
            placeholder="Image URL"
            value={values.link}
            onChange={handleChange}
            required
          />
        </label>

        <label className="form-modal__label">Select the Weather Type:</label>
        <div className="form-modal__radio-inputs">
          <div>
            <input
              className="form-modal__input_type_radio"
              type="radio"
              id="choiceHot"
              name="weatherType"
              value="hot"
              onChange={handleChange}
            />
            <label className="form-modal__label_radio" htmlFor="choiceHot">
              Hot
            </label>
          </div>
          <div>
            <input
              className="form-modal__input_type_radio"
              type="radio"
              id="choiceWarm"
              name="weatherType"
              value="warm"
              onChange={handleChange}
            />
            <label className="form-modal__label_radio" htmlFor="choiceWarm">
              Warm
            </label>
          </div>
          <div>
            <input
              className="form-modal__input_type_radio"
              type="radio"
              id="choiceCold"
              name="weatherType"
              value="cold"
              onChange={handleChange}
            />
            <label className="form-modal__label_radio" htmlFor="choiceCold">
              Cold
            </label>
          </div>
        </div>
      </div>
    </ModalWithForm>
  );
};
export default AddItemModal;
