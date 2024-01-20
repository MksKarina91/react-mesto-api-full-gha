import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../utils/Auth";

const Register = ({ setTooltipSuccess, setInfoTooltipPopupOpen }) => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const { email, password } = formValue;
      auth
        .register(email, password)
        .then(() => {
          setTooltipSuccess(true);
          setInfoTooltipPopupOpen(true);
          navigate("/sign-in");
        })
        .catch((err) => {
          if (err.status === 400) {
            setError("Некорректно заполнено одно из полей");
          } else {
            setError("Ошибка при регистрации");
          }
          setTooltipSuccess(false);
          setInfoTooltipPopupOpen(true);
        });
    },
    [formValue, navigate, setTooltipSuccess, setInfoTooltipPopupOpen]
  );

  return (
    <>
      <div className="login">
        <p className="login__title">Регистрация</p>
        {error && <p className="login__error">{error}</p>}
        <form className="login__form" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            value={formValue.email}
            className="login__input"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <input
            onChange={handleChange}
            value={formValue.password}
            className="login__input"
            type="password"
            name="password"
            placeholder="Пароль"
            required
          />
          <button className="login__button">Зарегистрироваться</button>
        </form>
      </div>
      <div className="login__sign">
        <Link to="/sign-in" className="login__sign-link">
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </>
  );
};

export default Register;
