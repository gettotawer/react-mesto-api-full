function PopupWithForm (props){
    return(
        
        <div className={`popup popup-${props.name} ${props.isOpen && "popup_opened"}` }>
            <div className={`popup__content popup-${props.name}__content`}>
                <h2 className={`popup__title popup-${props.name}__title`}>{props.title}</h2>
                <form className="popup__submit-form" onSubmit={props.onSubmit} noValidate>
                    {props.children}
                    <button id={`popup-${props.name}__form-button`} name="submitButton" type="submit" className={`popup__submit-button popup-${props.name}__submit-button`}>{props.buttonText}</button>  
                </form>
                <button name="closeButton" type="button" className="popup__close-button" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default PopupWithForm