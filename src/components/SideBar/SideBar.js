import React from "react";
import "./SideBar.css";
import avatar from "../../images/avatar.svg";

const SideBar = () => {
  return (
    <div className="sidebar">
      <img className="profile__image" src={avatar} alt="avatar"></img>
      <div className="profile__name">Terrence Tegegne</div>
    </div>
  );
};

export default SideBar;
