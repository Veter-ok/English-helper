import {BrowserRouter} from 'react-router-dom';
import React, { useEffect, useContext} from 'react';
import jwt_decode from 'jwt-decode';
import { AuthContext } from './index';
import axios from 'axios';
import { AppRouter } from './components/AppRouter';
import { observer } from 'mobx-react-lite';


export const App = observer(() => {
  const {user} = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem("token") !== null){
      axios.post('/api/user/auth', {
        "token": localStorage.getItem("token"),
        "email": jwt_decode(localStorage.getItem("token")).email,
        "password": jwt_decode(localStorage.getItem("token")).password
      }).then(response => {
        user.setIsAuth(true);
        user.setUser(response.data.user);
        user.setKnow(response.data.know);
        user.setLearn(response.data.learn)
      }).catch(error => {
        console.log(error)
        user.setIsAuth(false);
      })
    }
  }, [])

  return ( 
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  );
});