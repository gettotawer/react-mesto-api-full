import React from "react";
import success from "../images/success.svg"
import failed from "../images/failed.svg"

function InfoTooltip(props){

    return(
        <div className={`popup popup-${props.name} ${props.isOpen && "popup_opened"}`}>
        <div className={`popup__content popup__content_auth`}>
            <img className="popup__image" src={props.isOkinfo ? success:failed} alt ={props.isOkinfo ? "Успешно":"Что-то пошло не так."}></img>
            <h2 className={`popup__title popup__title_auth`}>{props.tooltipContent.text}</h2>
            <button name="closeButton" type="button" className="popup__close-button" onClick={props.onCloseTooltip}></button>
        </div>
        </div>
    )
}

export default InfoTooltip