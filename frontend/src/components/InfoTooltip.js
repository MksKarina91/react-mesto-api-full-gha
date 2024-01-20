import login__failed from '../img/login_failed.svg';
import login__success from '../img/login_success.svg'

export default function InfoTooltip({ onClose, isOpen, loginStatus }) {
  return (
    <div className={`popup popup_type_info ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="button popup__close-button"
          aria-label="Close"
          type="button"
          onClick={onClose}
        ></button>
        <img className="popup__info-image" src={loginStatus ? login__success : login__failed} alt='Статус входа'/>
        <h2 className='popup__info-title'>{loginStatus ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</h2>
      </div>
    </div>
  );
}
