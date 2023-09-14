import "./ItemModal.css";
import "../ModalWithForm/ModalWithForm.css";
const ItemModal = ({ selectedCard, onClose }) => {
  return (
    <div className="modal">
      <div className="modal__container-image">
        <button
          type="button"
          onClick={onClose}
          className="modal__close-button-white"
        ></button>
        <img
          src={selectedCard.link}
          className="modal__image-preview"
          alt="image-preview"
        ></img>
        <div className="modal__item-name">{selectedCard.name}</div>
        <div className="modal__weather-type">
          Weather Type: {selectedCard.weather}
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
