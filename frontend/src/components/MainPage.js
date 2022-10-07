import api from "../utils/api"
import { UserContext } from "../contexts/CurrentUserContext"
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup'
import ImagePopup from './ImagePopup';
import React from 'react';

function MainPage(props) {

    React.useEffect(()=>{
        api.getUserInfo().then((data) =>{
            setCurrentUser(data);
        }).catch((err) => {
            console.log(err)
        });

        api.getCardsArray().then((data) => {
            setCards(data)
        }).catch((err) => {
            console.log(err)
        });
    },[])

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

    function closeAllPopups(){
        setIsAddPlacePopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard(null);
    }

    function handleEditAvatarClick(){
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }
    
    function handleEditProfileClick(){
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    }
    function handleAddPlaceClick(){
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    }
    function handleCardClick(card){
        setSelectedCard(card);
    }

    function handleUpdateUser(obj){
        api.editProfile(obj.name, obj.about).then((data)=>{
            setCurrentUser(data);
            closeAllPopups();
        }).catch((err) => {
            console.log(err)
        })
    }

    function handleUpdateAvatar(link){
        api.setNewAvatar(link).then((data)=>{
            setCurrentUser(data);
            closeAllPopups();
        }).catch((err) => {
            console.log(err)
        })
    }

    function handleAddCard(obj){
        api.addCard(obj.name, obj.link).then((data)=>{
            setCards([data,...cards]);
            closeAllPopups();
        }).catch((err) => {
            console.log(err)
        })
    }

    function handleCardLike(card){
        const isLiked = card.likes.some(i => i._id === currentUser._id)

        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        }).catch((err) => {
            console.log(err)
        });
    }

    function handleCardDelete(card){

        api.deleteCard(card._id).then(() => {
            setCards(() => cards.filter(c => c._id !== card._id))
        }).catch((err) => {
            console.log(err)
        })
    }
  
    return (
    <div className="App">
            <Header onSignOut={props.onSignOut} userData={props.userData} loggedIn={props.loggedIn} link="/"name={"Выйти"}/>
            <UserContext.Provider value={currentUser}>
                <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>
                <Footer />
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>   
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddCard}/>
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
                <PopupWithForm name="delete-card" title={"Вы уверены"} onClose={closeAllPopups} buttonText={'Да'}>
                </PopupWithForm>
                <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
            </UserContext.Provider>
    </div>
  );
}

export default MainPage;
