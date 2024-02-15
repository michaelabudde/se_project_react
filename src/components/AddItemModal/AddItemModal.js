import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";
import { useForm } from "../../hooks/useForm";

const AddItemModal = ({ onClose, onAddItem, isOpen }) => {
  const { values, handleChange } = useForm({
    name: "",
    imageUrl: "",
    weatherType: "",
  });
  const formInfo = {
    title: "New Garment",
    name: "create",
    buttonText: "Add garment",
  };
  return (
    <ModalWithForm
      onClose={onClose}
      onSubmit={(evt) => {
        evt.preventDefault();
        onAddItem(values);
      }}
      isOpen={isOpen}
      formInfo={formInfo}
    >
      <div>
        <label className="modal-form__label">
          Name
          <input
            type="text"
            name="name"
            className="modal-form__input modal__input_type_card-name"
            placeholder="Name"
            required
            minLength="1"
            maxLength="30"
            value={values.name}
            onChange={handleChange}
          />
        </label>
        <label className="modal-form__label">
          Image
          <input
            type="url"
            name="link"
            className="modal-form__input modal__input_type_url"
            placeholder="Image URL"
            value={values.imageUrl}
            onChange={handleChange}
            required
          />
        </label>

        <label className="modal-form__label">Select the Weather Type:</label>
        <div className="modal-form__radio-inputs">
          <div>
            <input
              className="modal-form__input_type_radio"
              type="radio"
              id="choiceHot"
              name="weatherType"
              value="hot"
              onChange={handleChange}
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
              name="weatherType"
              value="warm"
              onChange={handleChange}
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
              name="weatherType"
              value="cold"
              onChange={handleChange}
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
