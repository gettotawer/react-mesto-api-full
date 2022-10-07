import React from "react";


function Login(props){

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
        props.onLogin(email, password);
        
    }

    return(
        <div className="auth">
            <h1 className="auth__title">Вход</h1>
            <form id="login__form" className="auth__form" onSubmit={handleSubmit} noValidate>
                <div className="auth__input-container">
                    <input value={email || ""} id="auth-email" name="authEmail" type="email" className="auth__input" placeholder="Email" required onChange={handleEmailChange}/>
                    <span id="profile-name-error" className="popup__error"></span>
                </div>
                <div className="popup__input-container">
                    <input value={password || ""} id="auth-password" name="authPassword" type="password" className="auth__input" placeholder="Пароль" minLength="6" maxLength="200" required onChange={handlePasswordChange}/>
                    <span id="description-error" className="popup__error"></span>
                </div>  
            </form>
            <button form="login__form" id="register__form" name="submitButton" type="submit" className={`auth__submit-button`}>Войти</button>
            
        </div>
    )
}

export default Login