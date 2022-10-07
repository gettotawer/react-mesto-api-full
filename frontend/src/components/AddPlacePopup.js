import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props){

    React.useEffect(()=>{
        linkRef.current.value = "";
        nameRef.current.value = "";
    },[props.isOpen])

    const nameRef = React.useRef();
    const linkRef = React.useRef();

    function handleAddPlaceSubmit(e){
        e.preventDefault();

        props.onAddCard({
            name: nameRef.current.value,
            link: linkRef.current.value
        });
        
    }

    return(
        <PopupWithForm name="element" isOpen={props.isOpen} onClose={props.onClose} title={"Новое место"} onSubmit={handleAddPlaceSubmit} buttonText={'Создать'}>
            <>
            <div className="popup__input-container">
                <input ref={nameRef} id="el-name" name="cardName" type="text" className="popup__form popup__input popup-element__form popup-element__form_el_name" placeholder="Название" minLength="2" maxLength="30" required/>
                <span id="el-name-error" className="popup__error"></span>
            </div>
            <div className="popup__input-container">
                <input ref={linkRef} id="url" name="cardDescription" type="url" className="popup__form popup__form_lower popup__input popup-element__form popup-element__form_el_link" placeholder="Ссылка на картинку" required/>
                <span id="url-error" className="popup__error"></span>
            </div>
            </>
        </PopupWithForm>
    )
}

export default AddPlacePopup