import Router from 'next/router';
import {setCookie,removeCookie} from '../../utils/cookie'
import {decodeJwt} from '../../utils/decodeJwt'
import {GenerateJwt} from '../../utils/encoder'
import {API_URL,API_URL_LOCAL} from '../../utils/config'


export const actionTypes = {
  AUTHENTICATE: 'AUTHENTICATE',
  DEAUTHENTICATE: 'DEAUTHENTICATE',
  REAUTHENTICATE: 'REAUTHENTICATE'
}

// gets token from the api and stores it in the redux store and in cookie
export const authenticate = (email,password,notifId) => {
  return dispatch => {
    let pa = new Promise(function (resolve,reject) {
      fetch(`${API_URL}/auth/login`,{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          email,password,notifId
        })
      })
      .then(response => {
        return response.json()
      })
      .then(response => {
        if (response.status == 400) {
            resolve(response.status)
        } else if (response.status == 200) {
            let usr_token = GenerateJwt({
              username: response.data.username,
            })

            setCookie('usr_token', usr_token);
            setCookie('token', response.data.token);

            const id = decodeJwt(response.data.token).id
            const role = decodeJwt(response.data.token).role
            const username = response.data.username

            // * kurang idusere dan token
            dispatch({type: actionTypes.AUTHENTICATE, payload: {
              idusers: id,
              token: response.data.token,
              role: role,
              username: username
            }});

            resolve(response)

            Router.push('/')

        }

      })
    })

    return pa

  }
}

// gets the token from the cookie and saves it in the store
export const reauthenticate = (idusers,token,role,username) => {
    return dispatch => {
      dispatch({type: actionTypes.REAUTHENTICATE, payload: {idusers,token,role,username}});
    };
};

// removing the token
export const deauthenticate = (token) => {
    return (dispatch) => {
      let pa = new Promise(function (resolve,reject) {
        fetch(`${API_URL}/auth/logout`,{
          method:"POST",
          headers:{
            'Authorization': 'Bearer ' + token,
          }
        })
        .then(response => {
          return response.json()
        })
        .then(response => {
          if (response.status == 400) {
            resolve(response)
          } else if (response.status == 200) {
            dispatch({type: actionTypes.DEAUTHENTICATE});
            removeCookie('token')
            Router.replace('/login');

          }

        })
      })

      return pa

    };
};