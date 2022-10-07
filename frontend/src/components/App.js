import Header from "./Header";
import Register from "./Register";
import Login from "./Login";
import React from 'react';
import * as Auth from './Auth.js';
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import MainPage from "./MainPage";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

function App() {

    const [loggedIn, setLoggedIn] = React.useState(false);
    const [userData, setUserData] = React.useState("");
    const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
    const [tooltipContent, setTooltipContent] = React.useState({})
    const [isOkinfo, setIsOkInfo] = React.useState(false);
    const history = useHistory();

    function auth(jwt) {
        return Auth.getContent(jwt)
          .then((res) => {
            if (res) {
              setLoggedIn(true);
              setUserData(res.data.email);
            }
          }).catch(console.log("Что-то пошло не так, возможно, нужно немного подождать."))
      };
    
      React.useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
          auth(jwt);
        }
      }, [loggedIn]);

      React.useEffect(()=>{
        if(loggedIn){
            history.push('/')
        }
      },[loggedIn])

      const onRegister = (password, email) => {
        return Auth.register(password, email).then((res) => {
          setTooltipContent({
            text: "Вы успешно зарегистрировались!",
          })
          setIsOkInfo(true)
          setIsTooltipOpen(true)
            return res;
          }).catch(()=> {
            setTooltipContent({
              text: "Что-то пошло не так! Попробуйте ещё раз.",
          })
          setIsOkInfo(false)
          setIsTooltipOpen(true)
          });
        };
    
      const onLogin = (email, password) => {
        return Auth.authorize(email, password).then((res) => {
            setLoggedIn(true);
            localStorage.setItem('jwt', res.token);
        }).catch(()=>{
          setTooltipContent({
            picture: "url(../images/failed.svg)",
            text: "Что-то пошло не так! Попробуйте ещё раз.",
          })
          setIsOkInfo(false)
          setIsTooltipOpen(true)
          });
      };
    
      const onSignOut = () => {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        history.push('/sign-in');
      };

      function onCloseTooltip(){
        setIsTooltipOpen(false);
        if(isOkinfo){
          history.push('/sign-in')
        }
      }
  
    return (
    <div className="App">
        <Switch>
            <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            onSignOut={onSignOut}
            component={MainPage}
            userData={userData}
            />
            <Route exact path="/sign-up">
              <Header name={"Войти"} link={"/sign-in"}/>
              <Register onRegister={onRegister}/>
              <InfoTooltip isOpen={isTooltipOpen} tooltipContent={tooltipContent} onCloseTooltip={onCloseTooltip} isOkinfo={isOkinfo}/>
            </Route>
            <Route exact path="/sign-in">
              <Header name={"Регистрация"} link={'sign-up'}/>
              <Login onLogin={onLogin}/>
              <InfoTooltip isOpen={isTooltipOpen} tooltipContent={tooltipContent} onCloseTooltip={onCloseTooltip}/>
            </Route>
            <Route>
                {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
        </Switch>
    </div>
  );
}

export default App;
