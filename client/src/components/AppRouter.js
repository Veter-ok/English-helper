import {Switch, Route, Redirect} from 'react-router-dom';
import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../index'
import { authRoutes, publicRoutes} from '../routes';
import { DASHBOARD_ROUTE, HOME_ROUTE} from '../utils/consts';
import { observer } from 'mobx-react-lite';


export const AppRouter = observer(() => {
	const {user} = useContext(AuthContext);
	if (user.isAuth){
		return (
			<Switch>
				{authRoutes.map(({path, Component}) => 
					<Route key={path} path={path} component={Component} exact/>
				)}
				<Redirect to={DASHBOARD_ROUTE}/>
			</Switch>
			)
	}else{
		return (
			<Switch>
				{publicRoutes.map(({path, Component}) => 
					<Route key={path} path={path} component={Component} exact/>
				)}
				<Redirect to={HOME_ROUTE}/>
			</Switch>
		);
	}
})