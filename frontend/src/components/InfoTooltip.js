import icon_ok from "../images/success.svg";
import icon_cancel from "../images/error.svg";

function InfoTooltip(props) {
  const { isOpen, onClose, isTooltipSuccess, message } = props;
  const icon = isTooltipSuccess ? icon_ok : icon_cancel;

  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""} `}
      onClick={(e) => {
        if (e.target.classList.contains("popup_opened")) {
          onClose();
        }
      }}
    >
      <div className="popup__container popup__succes">
        <button
          type="button"
          className="popup__close-btn"
          onClick={onClose}
        ></button>
        <img src={icon} alt="Успех" className="popup__img-succes" />
        <p className="popup__succes-text">{message}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
