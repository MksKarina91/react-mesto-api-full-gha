export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup popup_type_image ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__image-container">
        <button
          className="button popup__close-button"
          aria-label="Close"
          type="button"
          onClick={onClose}
        ></button>
        <img className="popup__image" alt={card?.name} src={card?.link} />
        <p className="popup__subtitle">{card ? card.name : ""}</p>
      </div>
    </div>
  );
}
