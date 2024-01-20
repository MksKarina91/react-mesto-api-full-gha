import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ onRegister }) {
  const [userData, setUserData] = useState({});

  function handleSubmit(evt) {
    evt.preventDefault();
    const { email, password } = userData;
    if (!email || !password) {
      return;
    }
    onRegister(userData);
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  return (
    <>
      <div className="auth__container">
        <h2 className="auth__title">Регистрация</h2>
        <form className="auth__form" onSubmit={handleSubmit} noValidate>
          <input
            name='email'
            className="auth__input"
            type="email"
            placeholder="Email"
            value={userData.email || ''}
            onChange={handleChange}
          />
          <input
            name='password'
            className="auth__input"
            type="password"
            placeholder="Пароль"
            value={userData.password || ''}
            onChange={handleChange}
          />
          <button className="button auth__submit-button" type="submit">
            Зарегистрироваться
          </button>
        </form>
        <Link className="auth__link" to="/sign-in">
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </>
  );
}
