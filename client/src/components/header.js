import React from 'react';
import { useContext } from 'react';
import {Toolbar, AppBar, Typography, IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { AuthContext } from '../index';
import {observer} from 'mobx-react-lite'
import { NavLink } from 'react-router-dom';
import { ABOUT_ROUTE, DASHBOARD_ROUTE, HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, VOCABULARY_ROUTE } from '../utils/consts';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
	  flexGrow: 1,
	},
	menuButton: {
	  marginRight: theme.spacing(2),
	},
	title: {
		color: 'white',
		flexGrow: 1,
	},
	links: {
		marginLeft: 100,
		display: 'inline-block'
	},
	test: {
		color: 'white',
		textTransform: 'uppercase',
		textDecoration: 'none',
		padding: 10,
		borderRadius: 10
	}
  }));
  

const Header = observer((props) => {
	const {user} = useContext(AuthContext);
	const classes = useStyles();

	return (
		<div>
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						{props.title}
					</Typography>
					<Typography variant="h6" className={classes.title}>
						{user.isAuth ?
							<ul className="menu-bar">
								<li className={classes.links}><NavLink className={classes.test} to={ABOUT_ROUTE}>About</NavLink></li>
								<li className={classes.links}><NavLink className={classes.test} to={VOCABULARY_ROUTE}>Vocabulary</NavLink></li>
								<li className={classes.links}><NavLink className={classes.test} to={DASHBOARD_ROUTE}>Dashboard</NavLink></li>
								<li className={classes.links}><NavLink className={classes.test} to={PROFILE_ROUTE}>Account</NavLink></li>
							</ul>
							:
							<ul className="menu-bar">
								<li className={classes.links}><NavLink className={classes.test} to={ABOUT_ROUTE}>About</NavLink></li>
								<li className={classes.links}><NavLink className={classes.test} to={HOME_ROUTE}>home</NavLink></li>
								<li className={classes.links}><NavLink className={classes.test} to={LOGIN_ROUTE}>Login</NavLink></li>
								<li className={classes.links}><NavLink className={classes.test} to={REGISTRATION_ROUTE}>Sing Up</NavLink></li>
							</ul>
						}
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
});

export default Header;