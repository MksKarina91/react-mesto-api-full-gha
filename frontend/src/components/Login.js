import { useState } from "react";

export default function Login({ onLogin }) {
  const [userData, setUserData] = useState({});

  function handleInputChange(evt) {
    const { name, value } = evt.target;
    setUserData({
      ...userData,
      [name]: value
    })
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const {email, password} = userData;
    if (!email || !password) {
      return
    }
    onLogin(userData);
  }

  return (
    <>
      <div className="auth__container">
        <h2 className="auth__title">Вход</h2>
        <form className="auth__form" onSubmit={handleSubmit} noValidate>
          <input
            name="email"
            className="auth__input"
            type="email"
            placeholder="Email"
            value={userData.email || ''}
            onChange={handleInputChange}
          />
          <input
            name="password"
            className="auth__input"
            type="password"
            placeholder="Пароль"
            value={userData.password || ''}
            onChange={handleInputChange}
          />
          <button className="button auth__submit-button" type="submit">
            Войти
          </button>
        </form>
      </div>
    </>
  );
}
