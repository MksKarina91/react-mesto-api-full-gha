import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onOpenCard,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button
          className="profile__avatar-button"
          onClick={onEditAvatar}
          aria-label="Редактировать аватар"
        >
          <img
            alt="Аватар"
            className="profile__avatar"
            src={currentUser.avatar || ""}
          />
        </button>
        <div className="profile__info">
          <div className="profile__buttons">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              onClick={onEditProfile}
              aria-label="Редактировать профиль"
            ></button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          onClick={onAddPlace}
          aria-label="Добавить место"
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onOpenCard}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
