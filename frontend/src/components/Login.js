import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as auth from "../utils/Auth";

const Login = ({
  handleLogin,
  setInfoTooltipPopupOpen,
  setTooltipSuccess,
  setUserEmail,
}) => {
  const [formValue, setFormValue] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormValue((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const { email, password } = formValue;

      if (!email || !password) {
        setErrorMessage("Необходимо заполнить все поля");
        setTooltipSuccess(false);
        setInfoTooltipPopupOpen(true);
        return;
      }

      auth
        .authorize(email, password)
        .then((res) => {
          if (res && res.token) {
            handleLogin(res);
            setUserEmail(email);
            navigate("/");
          }
        })
        .catch((err) => {
          if (err.statusCode === 400) {
            setErrorMessage("Не передано одно из полей");
          } else if (err.statusCode === 401) {
            setErrorMessage("Пользователь с email не найден");
          }
          setTooltipSuccess(false);
          setInfoTooltipPopupOpen(true);
        });
    },
    [
      formValue,
      navigate,
      handleLogin,
      setUserEmail,
      setTooltipSuccess,
      setInfoTooltipPopupOpen,
    ]
  );

  return (
    <>
      <div className="login">
        <p className="login__title">Вход</p>
        {errorMessage && <p className="login__error">{errorMessage}</p>}
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
          <button className="login__button">Войти</button>
        </form>
      </div>
    </>
  );
};

export default Login;
