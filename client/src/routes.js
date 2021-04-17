import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import LoginPage from './pages/LoginPage/Login';
import RegisterPage from './pages/RegisterPage/Register';
import {DashboardPage} from './pages/Dashboard';
import {ProfilePage} from './pages/Profile';
import WelcomePage from './pages/Welcome'; 

export const useRoutes = isAuthenticated => {
	if (isAuthenticated){
		return (
			<Switch>
				<Route path="/dashboard" exact>
					<DashboardPage/>
				</Route>
				<Route path="/profile/:id" >
					<ProfilePage/>
				</Route>
				<Redirect to="/dashboard"/>
			</Switch>
		)
	}
	return (
		<Switch>
			<Route path="/account/login" exact>
				<LoginPage/>
			</Route>
			<Route path="/account/reg" exact>
				<RegisterPage/>
			</Route>
			<Route path="/" exact>
				<WelcomePage/>
			</Route>
			<Redirect to="/"/>
		</Switch>
	)
}