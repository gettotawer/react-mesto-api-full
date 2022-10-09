export const BASE_URL = 'https://api.gettotawer-mesto.nomoredomains.icu';

function _checkResponse(res){
  if(res.ok){
      return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}


export const register = ( password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({password: password, email: email})
  })
  .then(_checkResponse)
};


export const authorize = (email, password, ) => {
  return fetch(`${BASE_URL}/signin`, {
    credentials: 'include',
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

export const logOut = () => {
  console.log('выходим')
  return fetch(`${BASE_URL}/signout`, {
    credentials: 'include',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res)=>console.log(res))
  .then(_checkResponse)
}

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    credentials: 'include',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
      // 'Authorization': `Bearer ${token}`,
    }
  })
  .then(_checkResponse)
}