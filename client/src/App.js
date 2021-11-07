import {BrowserRouter} from 'react-router-dom';
import React, { useEffect, useContext} from 'react';
import jwt_decode from 'jwt-decode';
import { AuthContext } from './index';
import { AppRouter } from './components/AppRouter';
import { observer } from 'mobx-react-lite';


export const App = observer(() => {
  const {user} = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem("token") !== null){
      fetch(process.env.REACT_APP_API_URL + '/user/auth', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          "token": localStorage.getItem("token"),
          "email": jwt_decode(localStorage.getItem("token")).email,
          "password": jwt_decode(localStorage.getItem("token")).password
        })
        }).then(response => {
          if (response.ok){
            return response.json()
          }else{
            throw new Error('Network response was not ok');
          }
        }).then(data => {
          user.setIsAuth(true);
          user.setUser(data.user);
          user.setKnow(data.know);
          user.setLearn(data.learn)
        }).catch(error => {
          user.setIsAuth(false);
        });
    }
  }, [])

  return ( 
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  );
});