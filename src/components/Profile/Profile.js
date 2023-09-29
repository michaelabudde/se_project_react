import React from "react";
import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
const Profile = ({ onCreateModal, onCardClick, clothingArr }) => {
  return (
    <section className="profile">
      <div className="profile__sidebar">
        <SideBar />
      </div>

      <ClothesSection
        onCreateModal={onCreateModal}
        onCardClick={onCardClick}
        clothingArr={clothingArr}
      />
    </section>
  );
};
export default Profile;
