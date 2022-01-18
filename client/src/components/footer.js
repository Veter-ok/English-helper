import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../index';
import {observer} from 'mobx-react-lite'
import './footer.css'

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