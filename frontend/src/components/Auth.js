export const BASE_URL = 'https://api.gettotawer-mesto.nomoredomains.icu';
// import Cookies from 'js-cookie';

function _checkResponse(res){
  if(res.ok){
      return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}


export const register = ( password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':  'https://api.gettotawer-mesto.nomoredomains.icu',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    },
    body: JSON.stringify({password: password, email: email})
  })
  .then(_checkResponse)
};


export const authorize = (email, password, ) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password: password, email: email})
  })
  .then(_checkResponse)
  // .then((data) => {
  //   if (data._id){
  //     localStorage.setItem('jwt', Cookies.get('jwt'));
  //     return data;
  //   } else {
  //     return;
  //   }
  // })
};


export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
      // 'Authorization': `Bearer ${token}`,
    }
  })
  .then(_checkResponse)
}