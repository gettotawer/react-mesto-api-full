import React from 'react';
import PopupWithForm from './PopupWithForm';
import { UserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props){

    const userData = React.useContext(UserContext);

    React.useEffect(() => {
        setName(userData.name);
        setDescription(userData.about);
    },[props.isOpen])

    const [name, setName] = React.useState();
    const [description, setDescription] = React.useState();

    function handleNameChange(e){
        setName(e.target.value)
    }
    function handleDescriptionChange(e){
        setDescription(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();

        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} name="profile" title={"Редактировать профиль"} onSubmit={handleSubmit} buttonText={'Сохранить'}>
            <>
                <div className="popup__input-container">
                    <input value={name || ""} id="profile-name" name="profileName" type="text" className="popup__form popup__input popup-profile__form popup-profile__form_el_name" placeholder="Как Вас зовут?" minLength="2" maxLength="40" required onChange={handleNameChange}/>
                    <span id="profile-name-error" className="popup__error"></span>
                </div>
                <div className="popup__input-container">
                    <input value={description || ""} id="description" name="profileDescription" type="text" className="popup__form popup__input popup__form_lower popup-profile__form popup-profile__form_el_description" placeholder="Расскажите о себе" minLength="2" maxLength="200" required onChange={handleDescriptionChange}/>
                    <span id="description-error" className="popup__error"></span>
                </div>
            </> 
        </PopupWithForm>
    )
}

export default EditProfilePopup;