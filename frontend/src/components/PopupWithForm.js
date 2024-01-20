function PopupWithForm({
  name,
  title,
  children,
  isOpen,
  onClose,
  onSubmit,
  buttonName,
}) {
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup popup-${name} ${isOpen ? "popup_opened" : ""}`}
      onClick={handleClickOutside}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-btn"
          onClick={onClose}
          aria-label="Закрыть"
        ></button>
        <form
          onSubmit={onSubmit}
          className="popup__content popup__edit-form"
          name={`${name}Form`}
          method="post"
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button className="popup__save-btn" type="submit">
            {buttonName}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
