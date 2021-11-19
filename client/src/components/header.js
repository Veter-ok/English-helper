import React from 'react';
import { useContext } from 'react';
import {Toolbar, AppBar, Typography, IconButton, Menu, MenuItem} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/Menu';
import { AuthContext } from '../index';
import {observer} from 'mobx-react-lite'
import { NavLink } from 'react-router-dom';
import { ABOUT_ROUTE, DASHBOARD_ROUTE, HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, TEST_ROUTE, VOCABULARY_ROUTE } from '../utils/consts';
import { makeStyles } from '@material-ui/core/styles';

const options = [
	'Test',
	'Vocabulary',
	'Dashboard',
	'Account'
];

const NAV = {
	'Test': TEST_ROUTE,
	'Vocabulary': VOCABULARY_ROUTE,
	'Dashboard': DASHBOARD_ROUTE,
	'Account': PROFILE_ROUTE
}
  

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
		listStyleType: 'none',
		[theme.breakpoints.only('xl')]: {
			backgroundColor: 'red',
			marginLeft: 150,
			display: 'inline-block'
		},
		[theme.breakpoints.only('lg')]: {
			marginLeft: 100,
			display: 'inline-block'
		},
		[theme.breakpoints.only('md')]: {
			marginLeft: 50,
			display: 'inline-block'
		},
		[theme.breakpoints.only('sm')]: {
			marginLeft: 10,
			display: 'inline-block'
		},
		[theme.breakpoints.only('xs')]: {
			marginLeft: 10,
		},
	},
	test: {
		color: 'white',
		textTransform: 'uppercase',
		textDecoration: 'none',
		padding: 10,
		borderRadius: 10
	},
	nav_link_2: {
		color: 'black',
		textDecoration: 'none'
	}
  }));
  

const Header = observer((props) => {
	const {user} = useContext(AuthContext);
	const classes = useStyles();
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
			<AppBar position="static">
				<Toolbar>
					<IconButton aria-label="more" id="long-button" aria-controls="long-menu" aria-expanded={open ? 'true' : undefined} aria-haspopup="true" onClick={handleClick}>
                    	<MoreVertIcon/>
      				</IconButton>
     				<Menu id="long-menu"
        				MenuListProps={{'aria-labelledby': 'long-button'}}
        				anchorEl={anchorEl}
        				open={open}
        				onClose={handleClose}
						PaperProps={{
							style: {
								maxHeight: 48 * 4.5,
								width: '20ch',
							},
						}}
     				>
						{options.map((option) => (
							<MenuItem key={option} selected={option === 'Pyxis'} onClick={() => handleClose(option)}>
								<NavLink to={NAV[option]} className={classes.nav_link_2}>
									{option}
								</NavLink>
							</MenuItem>
						))}
					</Menu>
					<Typography variant="h6" className={classes.title}>
						{props.title}
					</Typography>
					<Typography variant="h6" className={classes.title}>
						{user.isAuth ?
							<ul className="menu-bar">
								<li className={classes.links}><NavLink className={classes.test} to={TEST_ROUTE}>Test</NavLink></li>
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