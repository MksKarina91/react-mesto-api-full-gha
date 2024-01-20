import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import Login from "./Login.js";
import Register from "./Register.js";

import ImagePopup from "./ImagePopup.js";
import EditPopupProfile from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ConfirmationPopup from "./ConfirmationPopup.js";
import InfoTooltip from "./InfoTooltip.js";

import ProtectedRoute from "./ProtectedRoute.js";

import api from "../utils/Api.js";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [userData, setUserData] = useState({});
  const [cards, setCards] = useState([]);

  const navigate = useNavigate();
  const [token, setToken] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      api.setAuthHeaders(token);
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn, token]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    setToken(jwt);
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }
    api.setAuthHeaders(token);
    api.getUserInfo()
    .then((userData) => {
      setUserData(userData);
      setIsLoggedIn(true);
      navigate("/");
    })
    .catch((err) => {
      console.log(err);
    });
  }, [token, navigate]);

  function handleLogin(dataLogin) {
    api
      .authorize(dataLogin)
      .then((dataUser) => {
        setToken(dataUser.token);
        localStorage.setItem("jwt", dataUser.token);
        setLoginStatus(true);
        setUserData(dataLogin);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function handleRegister(dataRegister) {
    api
      .register(dataRegister)
      .then(() => {
        setIsInfoTooltipPopupOpen(true);
        setLoginStatus(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function logOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setToken('');
    setUserData({});
    navigate("/sign-in");
  };

  function handleEditAvatarClick() {
    setIsEditAvatarOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteButtonClick(card) {
    setIsConfirmationPopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.setAuthHeaders(token);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete() {
    setLoadingForm(true);
    api.setAuthHeaders(token);
    api
      .deleteCard(selectedCard._id)
      .then(() => {
        setCards((cards) =>
          cards.filter((item) => item._id !== selectedCard._id)
        );
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingForm(false));
  }

  function handleUpdateUser(data) {
    setLoadingForm(true);
    api.setAuthHeaders(token);
    api
      .changeUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingForm(false));
  }

  function handleUpdateAvatar(data) {
    setLoadingForm(true);
    api.setAuthHeaders(token);
    api
      .editAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingForm(false));
  }

  function handleAddPlaceSubmit(data) {
    setLoadingForm(true);
    api.setAuthHeaders(token);
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingForm(false));
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userData={userData} isLoggedIn={isLoggedIn} logOut={logOut} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                loggedIn={isLoggedIn}
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteButtonClick}
                cards={cards}
                userData={userData}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register onRegister={handleRegister} isLoggedIn={isLoggedIn} />
            }
          />
          <Route
            path="/sign-in"
            element={<Login onLogin={handleLogin} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/*"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/sign-in" replace />
              )
            }
          />
        </Routes>
        {isLoggedIn && <Footer />}
        <EditPopupProfile
          isOpen={isEditProfilePopupOpen}
          isLoadingForm={loadingForm}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          isLoadingForm={loadingForm}
          onClose={closeAllPopups}
          onAddCard={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          isLoadingForm={loadingForm}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ConfirmationPopup
          isOpen={isConfirmationPopupOpen}
          isLoadingForm={loadingForm}
          onClose={closeAllPopups}
          onConfirm={handleCardDelete}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <InfoTooltip onClose={closeAllPopups} isOpen={isInfoTooltipPopupOpen} loginStatus={loginStatus} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
