import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRouteElement from "./ProtectedRoute";
import { api } from "../utils/Api";
import { getToken, setToken, removeToken } from "../utils/token";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import PageNotFound from "./PageNotFound";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [isTooltipSuccess, setIsTooltipSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      setLoggedIn(true);
      navigate("/");
    } else {
      setLoggedIn(false);
    }
  }, [navigate]);

  const handleLogin = (userData) => {
    setToken(userData.token);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    removeToken();
    navigate("/sign-in");
  };

  const handleCardClick = (card) => {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  };

  const handleTrashButtonClick = (card) => {
    setSelectedCard(card);
    setIsDeleteCardPopupOpen(true);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((id) => id === currentUser._id);
    (isLiked ? api.deleteLike : api.addLike)(card._id)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((e) => console.log(`Error! ${e}`));
  };

  const handleCardDelete = (card) => {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        setIsDeleteCardPopupOpen(false);
      })
      .catch((e) => console.log(`Error! ${e}`))
      .finally(() => setIsLoading(false));
  };

  const handleUpdateUser = (inputValues) => {
    setIsLoading(true);
    api
      .setUserInfo(inputValues)
      .then((newUser) => {
        setCurrentUser(newUser);
        setIsEditProfilePopupOpen(false);
      })
      .catch((e) => console.log(`Error! ${e}`))
      .finally(() => setIsLoading(false));
  };

  const handleUpdateAvatar = (inputValues) => {
    setIsLoading(true);
    api
      .updateAvatar({ avatarLink: inputValues.avatar })
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        setIsEditAvatarPopupOpen(false);
      })
      .catch((e) => console.log(`Error! ${e}`))
      .finally(() => setIsLoading(false));
  };

  const handleAddPlaceSubmit = (inputValues) => {
    setIsLoading(true);
    api
      .sentNewCard({
        profileName: inputValues.name,
        profileAbout: inputValues.link,
      })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch((e) => console.log(`Error! ${e}`))
      .finally(() => setIsLoading(false));
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
  };

  if (loggedIn === undefined) {
    return null;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <Header
          loggedIn={loggedIn}
          email={userEmail}
          onSignOut={handleLogout}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
                onEditProfile={() => setIsEditProfilePopupOpen(true)}
                onAddPlace={() => setIsAddPlacePopupOpen(true)}
                onOpenCard={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleTrashButtonClick}
                cards={cards}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                setTooltipSuccess={setIsTooltipSuccess}
                setInfoTooltipPopupOpen={setIsInfoTooltipPopupOpen}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                handleLogin={handleLogin}
                setTooltipSuccess={setIsTooltipSuccess}
                setInfoTooltipPopupOpen={setIsInfoTooltipPopupOpen}
                setUserEmail={setUserEmail}
              />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        {loggedIn && <Footer />}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          buttonName={isLoading ? "Сохранение..." : "Сохранить"}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          buttonName={isLoading ? "Сохранение..." : "Создать"}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          buttonName={isLoading ? "Сохранение..." : "Сохранить"}
        />
        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDelete={handleCardDelete}
          buttonName={isLoading ? "Удаление..." : "Да"}
          selectedCard={selectedCard}
        />
        <ImagePopup
          name="image"
          selectedCard={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isTooltipSuccess={isTooltipSuccess}
          message={
            isTooltipSuccess
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."
          }
        />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
