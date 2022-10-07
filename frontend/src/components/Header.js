import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
function Header(props){
    return(
        <header className="header">
            <img src={logo} alt="Логотип проекта 'Место'" className="header__logo"/>
            <div className='header__container'>
                <p className={`header__login${props.userData && "_active"}`}>{props.userData}</p>
                <Link className={`header__link ${props.loggedIn && "header__link_authorized"}`} to={props.link} onClick={props.onSignOut}>{props.name}</Link>
            </div>
        </header>
    );
}

export default Header;