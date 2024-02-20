import "./ItemCard.css";
import { React, useContext } from "react";
import likedButton from "../../images/likedButton.png";
import likeButton from "../../images/likeButton.png";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { AuthContext } from "../../contexts/AuthContext";

const ItemCard = ({ item, onCardClick, onCardLike }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const { isLoggedIn } = useContext(AuthContext);
  const isLiked = item.likes.includes(currentUser._id); // cannot read id?
  const likeButtonClassName = `card__like-button ${
    isLoggedIn ? "card__like-button_unhidden" : "card__like-button_hidden"
  }`;
  return (
    <div className="card__element">
      <div className="card__title-container">
        <h2 className="card__name"> {item.name}</h2>
        <img
          className={likeButtonClassName}
          src={isLiked ? likedButton : likeButton}
          alt="like button"
          onClick={onCardLike}
        ></img>
      </div>
      <img
        src={item.imageUrl}
        className="card__image"
        onClick={() => onCardClick(item)}
        alt={item.name}
      />
    </div>
  );
};
export default ItemCard;
