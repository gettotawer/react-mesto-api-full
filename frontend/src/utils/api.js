export class Api{
    constructor({baseUrl, headers}){
        this._headers = headers;
        this._baseUrl = baseUrl;
    }

    _checkResponse(res){
        if(res.ok){
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo(){
       return fetch(`${this._baseUrl}/users/me`,{
        headers: this._headers})
        .then(this._checkResponse)
    }

    getCardsArray(){
        return fetch(`${this._baseUrl}/cards`,{
            headers: this._headers})
            .then(this._checkResponse)
    }

    editProfile(newName, newAbout){
        return fetch(`${this._baseUrl}/users/me`,{
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: `${newName}`,
                about: `${newAbout}`,
            })
        }).then(this._checkResponse)
    }

    addCard(cardName, cardLink){
        return fetch(`${this._baseUrl}/cards`,{
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: `${cardName}`,
                link: `${cardLink}`,
            })
        }).then(this._checkResponse)
    }

    deleteCard(cardId){
        return fetch(`${this._baseUrl}/cards/${cardId}`,{
            method: 'DELETE',
            headers: this._headers
        }).then(this._checkResponse)
    }

    changeLikeCardStatus(cardId, isLiked){
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`,{
            method: isLiked ? 'PUT' : 'DELETE',
            headers: this._headers
        }).then(this._checkResponse)
    }

    setNewAvatar(avatarLink){
        return fetch(`${this._baseUrl}/users/me/avatar/`,{
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: `${avatarLink}`,
            })
        }).then(this._checkResponse)
    }
}

const api = new Api({
    baseUrl: 'api.gettotawer-mesto.nomoredomains.icu',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;