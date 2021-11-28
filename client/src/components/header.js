import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../index';
import {observer} from 'mobx-react-lite'
import { NavLink } from 'react-router-dom';
import './header.css'
import { ABOUT_ROUTE, DASHBOARD_ROUTE, HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, TEST_ROUTE, VOCABULARY_ROUTE } from '../utils/consts';

const Header = observer((props) => {
	const {user} = useContext(AuthContext);
	const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (option) => {
		setAnchorEl(null);
	};

	return (
		<div>
			<header>
				<div className="logo">
					<h1>English Helper</h1>
				</div>
				<div className="menu-bar">
					{user.isAuth ?
						<ul>
							<li className="links"><NavLink to={TEST_ROUTE}>Test</NavLink></li>
							<li className="links"><NavLink to={VOCABULARY_ROUTE}>Vocabulary</NavLink></li>
							<li className="links"><NavLink to={DASHBOARD_ROUTE}>Dashboard</NavLink></li>
							<li className="links"><NavLink to={PROFILE_ROUTE}>Account</NavLink></li>
						</ul>
						:
						<ul>
							<li className="links"><NavLink to={ABOUT_ROUTE}>About</NavLink></li>
							<li className="links"><NavLink to={HOME_ROUTE}>home</NavLink></li>
							<li className="links"><NavLink to={LOGIN_ROUTE}>Login</NavLink></li>
							<li className="links"><NavLink to={REGISTRATION_ROUTE}>Sing Up</NavLink></li>
						</ul>
					}
				</div>
			</header>
		</div>
	);
});

export default Header;