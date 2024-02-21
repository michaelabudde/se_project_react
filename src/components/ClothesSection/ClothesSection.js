import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React, { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
const ClothesSection = ({
  onCardClick,
  clothingArray,
  handleAddClick,
  onCardLike,
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  console.log("Fetched user clothes:", clothingArray);
  const userClothingArray = Array.isArray(clothingArray)
    ? clothingArray.filter((item) => item.owner === currentUser._id)
    : [];

  return (
    <div className="clothes__section">
      <div className="clothes__section__header-wrapper">
        <h2 className="clothes__section__title">Your items</h2>
        <button
          type="button"
          className="clothes__section__add-clothes"
          onClick={handleAddClick}
        >
          + Add New
        </button>
      </div>
      <ul className="clothes__section_cards">
        {userClothingArray.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ClothesSection;
