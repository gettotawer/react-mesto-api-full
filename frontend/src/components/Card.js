import React from "react";
import { UserContext } from "../contexts/CurrentUserContext";

function Card (props){
    const userData = React.useContext(UserContext);
    const isOwn = (props.card.owner._id === userData._id);
    const isLiked = props.card.likes.some(i => i._id === userData._id);
    return(
        <div className="element">
            <img src={props.card.link} alt={props.card.name} className="element__image" onClick={()=>props.onCardClick(props.card)}/>
            <div className="element__section">
            <h3 className="element__title">{props.card.name}</h3>
            <div className="element__like-container">
                <button type="button" className={`element__like-button ${isLiked && "element__like-button_active"}`} onClick={() => {props.onCardLike(props.card)}}></button>
                <p className="element__like-ammount">{props.card.likes.length}</p>
            </div>
            </div>
            <button name="deleteButton" type="button" className= {`element__delete-button ${!isOwn && "element__delete-button_hidden"}`} onClick = {() => {props.onCardDelete(props.card)}}></button>
        </div>
    )
}

export default Card