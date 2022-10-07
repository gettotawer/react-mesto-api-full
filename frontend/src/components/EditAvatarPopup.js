import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props){

    const avatarRef = React.useRef();
    
    React.useEffect(()=>{
        avatarRef.current.value = ""
    },[props.isOpen])

    function handleSubmit(e){
        e.preventDefault();
        props.onUpdateAvatar(avatarRef.current.value);
    }

    return(
        <PopupWithForm name="avatar" isOpen={props.isOpen} onClose={props.onClose} title={"Обновить аватар"} onSubmit={handleSubmit} buttonText={'Сохранить'}>
            <>
                <div className="popup__input-container">
                    <input ref={avatarRef} id="url-avatar" name="cardDescription" type="url" className="popup__form popup__input popup-avatar__form popup-avatar__form_el_link" placeholder="Ссылка на картинку" required/>
                    <span id="url-avatar-error" className="popup__error"></span>
                </div>
            </>
        </PopupWithForm>
    )
}

export default EditAvatarPopup