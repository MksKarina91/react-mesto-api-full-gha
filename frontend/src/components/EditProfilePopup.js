import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, buttonName }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser && isOpen) {
      setName(currentUser.name || "");
      setDescription(currentUser.about || "");
    }
  }, [currentUser, isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({ name, about: description });
  };

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setName(currentUser.name || "");
        setDescription(currentUser.about || "");
      }}
      onSubmit={handleSubmit}
      buttonName={buttonName}
      children={
        <>
          <input
            onChange={handleNameChange}
            value={name}
            type="text"
            className="popup__input"
            id="popupName"
            placeholder="Имя"
            name="profileName"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="popupName-error popup__input-error"></span>
          <input
            onChange={handleDescriptionChange}
            value={description}
            type="text"
            className="popup__input"
            id="popupDescription"
            placeholder="Описание"
            name="profileAbout"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="popupDescription-error popup__input-error"></span>
        </>
      }
    />
  );
}

export default EditProfilePopup;
