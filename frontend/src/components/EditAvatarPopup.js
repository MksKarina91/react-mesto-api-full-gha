import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  isLoadingForm,
  onUpdateAvatar,
}) {
  const inputRef = useRef(null);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value,
    })
  };

  useEffect(() => {
    inputRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      buttonTitle={isLoadingForm ? "Сохранение..." : "Сохранить"}
      children={
        <>
          <input
            className="popup__input popup__input_type_avatar"
            name="avatar"
            type="url"
            placeholder="Ссылка на картинку"
            ref={inputRef}
            required
          />
        </>
      }
    />
  );
}
