function ImagePopup (props){
    return(
        <div className={`popup popup-card ${props.card && "popup_opened"}`}>
        <div className="popup-card__group ">
            <img src={props.card && props.card.link} alt={props.card && props.card.name} className="popup-card__image"/>
            <h3 className="popup-card__subtitle">{props.card && props.card.name}</h3>
            <button name="closeButton" type="button" className="popup__close-button" onClick={props.onClose}></button>
        </div>
        </div>
    )
}

export default ImagePopup