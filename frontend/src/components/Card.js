import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `elements__like-button ${
    isLiked && "elements__like-button_active"
  }`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleCardLike() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <div className="elements__item">
      {isOwn && <button className="button elements__delete" onClick={handleCardDelete} />}
      <img
        className="elements__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="elements__dashboard">
        <h2 className="elements__text">{card.name}</h2>
        <div className="elements__like-area">
          <button
            type="button"
            className={`button ${cardLikeButtonClassName}`}
            aria-label="Like"
            onClick={handleCardLike}
          ></button>
          <p className="elements__like-count">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}
