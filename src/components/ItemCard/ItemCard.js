import "./ItemCard.css";

const ItemCard = ({ item, onCardClick }) => {
  return (
    <div className="card__element">
      <img
        src={item.imageUrl}
        className="card__image"
        onClick={() => onCardClick(item)}
        alt={item.name}
      />
      <h2 className="card__name"> {item.name}</h2>
    </div>
  );
};
export default ItemCard;
