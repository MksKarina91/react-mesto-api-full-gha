import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, buttonName }) {
  const avatarRef = useRef();

  useEffect(() => {
    if (isOpen) {
      avatarRef.current.value = "";
      avatarRef.current.focus();
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: avatarRef.current.value });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonName={buttonName}
      children={
        <>
          <input
            ref={avatarRef}
            type="url"
            className="popup__input"
            id="newAvatarImage"
            placeholder="Ссылка на изображение"
            name="avatarLink"
            required
          />
          <span className="newAvatarImage-error popup__avatar-error"></span>
        </>
      }
    />
  );
}

export default EditAvatarPopup;
