import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditAvatar, onAddPlace, onEditProfile, onCardClick, onCardLike, onCardDelete, cards }) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button onClick={onEditAvatar} className="profile__avatar-button">
          <img
            src={currentUser.avatar}
            alt="Аватар пользователя"
            className="profile__pic"
          />
        </button>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              onClick={onEditProfile}
              type="button"
              aria-label="Edit-Button"
              className="button open-button profile__edit-button"
            ></button>
          </div>
          <p className="profile__work">{currentUser.about}</p>
        </div>
        <button
          onClick={onAddPlace}
          type="button"
          aria-label="Add-Button"
          className="button open-button profile__add-button"
        ></button>
      </section>
      <section className="elements">
        {cards.map((cardData) => {
          return (
            <Card
              key={cardData._id}
              card={cardData}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={() => onCardDelete(cardData)}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
