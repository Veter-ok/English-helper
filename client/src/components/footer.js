import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../index';
import {observer} from 'mobx-react-lite'
import { NavLink } from 'react-router-dom';
import './footer.css'
import { ABOUT_ROUTE, DASHBOARD_ROUTE, HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, TEST_ROUTE, VOCABULARY_ROUTE } from '../utils/consts';

const Footer = observer((props) => {
	const {user} = useContext(AuthContext);

	return (
		<div>
			<footer>
				<div className="content-footer">
					<ul>
						<li>Phone number: +7(xxx)xxx-xx-xx</li>
						<li>Instagram: @xxxx</li>
						<li>Vk: xxxx</li>
					</ul>
				</div>
			</footer>
		</div>
	);
});

export default Footer;