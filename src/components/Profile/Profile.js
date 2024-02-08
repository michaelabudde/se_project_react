import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";

const Profile = ({
  clothingArray,
  handleAddClick,
  handleLogoutClick,
  handleEditProfileClick,
  onCardClick,
  onCardLike,
  /*   getInitials, */
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <section className="profile">
      <div className="profile__sidebar">
        <div className="profile__sidebar-user-info">
          <div className="profile__sidebar-image-container">
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt="user avatar"
                className="profile__sidebar-user-avatar"
              ></img>
            ) : (
              currentUser.name?.toUpperCase().charAt(0) || ""
            )}
          </div>
          <h3 className="profile__sidebar-username">
            {currentUser ? currentUser.name : "User Profile"}
          </h3>
        </div>
        <div className="profile__sidebar-options">
          <button
            className="profile__sidebar-button"
            type="button"
            onClick={handleEditProfileClick}
          >
            Change Profile Data
          </button>
          <button
            className="profile__sidebar-button"
            type="button"
            onClick={handleLogoutClick}
          >
            Log Out
          </button>
        </div>
      </div>
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
