// import api from "../utils/Api"
import React from "react";
import Card from "./Card"
import { UserContext } from "../contexts/CurrentUserContext";


function Main(props){

    const userData = React.useContext(UserContext);

    return(
        <main>
            <section className="profile">
                <div className="profile__container">
                    <div  alt="Аватар профиля" className="profile__avatar" onClick={props.onEditAvatar} style={{ backgroundImage: `url(${userData.avatar})` }} ></div>
                    <div className="profile__info">
                        <h1 className="profile__name">{userData.name}</h1>
                        <p className="profile__description">{userData.about}</p>
                        <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
                    </div>
                </div>
                <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
            </section>
        <section className="elements">
            {props.cards.map((card) => (
                <Card key ={card._id} card={card} onCardClick = {props.onCardClick} userId = {userData._id} onCardLike = {props.onCardLike} onCardDelete={props.onCardDelete}/>
            ))}
        </section>
        </main>
    );
}

export default Main;