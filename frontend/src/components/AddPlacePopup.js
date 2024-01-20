import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({
  isOpen,
  onClose,
  isLoadingForm,
  onAddCard,
}) {
  const [place, setPlace] = useState({ name: "", link: "" });

  useEffect(() => {
    if (isOpen) {
      setPlace({ name: "", link: "" });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlace((prevPlace) => ({ ...prevPlace, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCard(place);
  };

  return (
    <PopupWithForm
      name="add"
      title="Добавить место"
      isOpen={isOpen}
      onClose={onClose}
      buttonTitle={isLoadingForm ? "Создание..." : "Создать"}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_place"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        required
        name="name"
        onChange={handleChange}
        value={place.name}
      />
      <input
        className="popup__input popup__input_type_link"
        placeholder="Ссылка на картинку"
        required
        type="url"
        name="link"
        onChange={handleChange}
        value={place.link}
      />
    </PopupWithForm>
  );
}
