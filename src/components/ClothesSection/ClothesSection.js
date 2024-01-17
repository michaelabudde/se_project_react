import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React, { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
const ClothesSection = ({
  onCardClick,
  allClothingArray,
  handleAddClick,
  onCardLike,
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  console.log("Fetched user clothes:", allClothingArray);
  const userclothingArray = allClothingArray.filter(
    (item) => item.owner === currentUser._id
  );
  return (
    <div className="clothing__section">
      <div className="clothes-section__header-wrapper">
        <h2 className="clothes-section__title">Your items</h2>
        <button
          type="button"
          className="clothes-section__add-clothes"
          onClick={handleAddClick}
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__cards-list">
        {userclothingArray.map((item) => {
          return (
            <ItemCard
              key={item._id}
              handleClick={onCardClick(item)}
              clothingItem={item}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ClothesSection;
