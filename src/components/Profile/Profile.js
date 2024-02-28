import React from "react";
import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../Sidebar/Sidebar";

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
      <Sidebar
        handleLogoutClick={handleLogoutClick}
        handleEditProfileClick={handleEditProfileClick}
      />
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
