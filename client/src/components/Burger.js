import React from 'react';
import { useState, useContext} from 'react';
import { AuthContext } from '../index';
import {observer} from 'mobx-react-lite'
import { NavLink } from 'react-router-dom';
import './burger.css'
import { ABOUT_ROUTE, DASHBOARD_ROUTE, HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, TEST_ROUTE, VOCABULARY_ROUTE } from '../utils/consts';

const Burger = observer((props) => {
	const {user} = useContext(AuthContext);
	const [isActive, setIsAcrive] = useState(false);

	return (
		<div>
			<div className="burger" onClick={() => setIsAcrive(!isActive)}>
				<div className="line"></div>
				<div className="line"></div>
				<div className="line"></div>
			</div>
			{user.isAuth ?
				<div className={isActive ? "burger-menu" : "burger-menu-active"}>
					<ul>
						<li><NavLink to={TEST_ROUTE}>Test</NavLink></li>
						<li><NavLink to={VOCABULARY_ROUTE}>Vocabulary</NavLink></li>
						<li><NavLink to={DASHBOARD_ROUTE}>Dashboard</NavLink></li>
						<li><NavLink to={PROFILE_ROUTE}>Account</NavLink></li>
					</ul>
				</div>
				:
				<div className={isActive ? "burger-menu" : "burger-menu-active"}>
					<ul>
						<li><NavLink to={ABOUT_ROUTE}>About</NavLink></li>
						<li><NavLink to={HOME_ROUTE}>home</NavLink></li>
						<li><NavLink to={LOGIN_ROUTE}>Login</NavLink></li>
						<li><NavLink to={REGISTRATION_ROUTE}>Sing Up</NavLink></li>
					</ul>
				</div>
			}
		</div>
	);
});

export default Burger;