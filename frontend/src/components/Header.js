import { Link, Route, Routes } from "react-router-dom";
import logo from "../img/logo.svg";

function Header({ userData, logOut }) {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="логотип Место" />
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link className="button header__button" to="/sign-up">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link className="button header__button" to="/sign-in">
              Войти
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <>
              <p className="header__email">{userData.email}</p>
              <button
                className='button header__button header__button_inactive'
                onClick={logOut}
              >
                Выйти
              </button>
            </>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
