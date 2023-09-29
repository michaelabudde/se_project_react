import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
const ClothesSection = ({ onCreateModal, onCardClick, clothingArr }) => {
  return (
    <div className="clothing__section">
      <div className="profile__heading">
        <h3 className="profile__title">Your Items</h3>
        <button
          type="button"
          className="profile__add_button"
          onClick={onCreateModal}
        >
          + Add New
        </button>
      </div>
      <div className="clothing__section_cards">
        {clothingArr.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </div>
    </div>
  );
};

export default ClothesSection;
