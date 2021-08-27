import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import UserStore from './store/UserStore';
import {createContext} from 'react';

export const AuthContext = createContext(null);

ReactDOM.render(
	<AuthContext.Provider value={{user: new UserStore()}}>
		<App />
	</AuthContext.Provider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
