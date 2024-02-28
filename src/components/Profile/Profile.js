import React from "react";
import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";

const Profile = ({
  clothingArray,
  handleAddClick,
  handleLogoutClick,
  handleEditProfileClick,
  onCardClick,
  onCardLike,
}) => {
  return (
    <section className="profile">
      <ClothesSection
        clothingArray={clothingArray}
        handleAddClick={handleAddClick}
        onCardLike={onCardLike}
        onCardClick={onCardClick}
      />
    </section>
  );
};
export default Profile;
