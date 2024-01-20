import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditPopupProfile({
  isOpen,
  onClose,
  isLoadingForm,
  onUpdateUser,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameInputChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionInputChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      buttonTitle={isLoadingForm ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            className="popup__input popup__input_type_name"
            placeholder="Имя"
            name="name"
            required
            minLength={2}
            maxLength={40}
            value={name || ''}
            onChange={handleNameInputChange}
          />
          <input
            className="popup__input popup__input_type_work"
            placeholder="О себе"
            name="about"
            required
            minLength={2}
            maxLength={200}
            value={description || ''}
            onChange={handleDescriptionInputChange}
          />
        </>
      }
    />
  );
}
