import React from "react";
import { Link } from "react-router-dom";


function Register(props){

    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();


    function handleEmailChange(e){
        setEmail(e.target.value)
    }
    function handlePasswordChange(e){
        setPassword(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        props.onRegister(password, email);
    }

    return(
        <div className="auth">
            <h1 className="auth__title register__title">Регистрация</h1>
            <form id="register__form" className="auth__form register__form" onSubmit={handleSubmit} noValidate>
                <div className="auth__input-container">
                    <input value={email || ""} id="auth-email" name="authEmail" type="email" className="auth__input" placeholder="Email" required onChange={handleEmailChange}/>
                    <span id="profile-name-error" className="popup__error"></span>
                </div>
                <div className="popup__input-container">
                    <input value={password || ""} id="auth-password" name="authPassword" type="password" className="auth__input" placeholder="Пароль" minLength="6" maxLength="200" required onChange={handlePasswordChange}/>
                    <span id="description-error" className="popup__error"></span>
                </div>  
            </form>
            <button form="register__form" name="submitButton" type="submit" className={`auth__submit-button`}>Зарегистрироваться</button>
            <p className="auth__link">Уже зарегистрированы? <Link className="auth__link" to="/sign-in">Войти</Link></p>
        </div>
    )
}

export default Register