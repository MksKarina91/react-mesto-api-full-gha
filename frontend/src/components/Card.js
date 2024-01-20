import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const { owner, likes, link, name } = card;
  const isOwn = owner === currentUser._id;
  const isLiked = likes.some((id) => id === currentUser._id);
  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_active" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="element">
      <img
        className="element__image"
        src={link}
        alt={name}
        onClick={handleClick}
      />
      {isOwn && (
        <button className="element__trash-btn" onClick={handleDeleteClick} />
      )}
      <div className="element__description">
        <h2 className="element__title">{name}</h2>
        <div className="element__likes">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          />
          <p className="element__counter">{likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
