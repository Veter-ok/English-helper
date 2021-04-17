import React from 'react';
// import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import {Container, AppBar, Typography} from '@material-ui/core';

function Header(props) {
	return (
	<div>
		<Container maxidth="lg">
			<AppBar position="static" color="inherit">
			<Typography variant="h2" align="center">{props.title}</Typography>
			<ul className="menu-bar">
				<li><a href="/about">About</a></li>
				<li><a href="/">Home</a></li>
				<li><a href="/account/login">Login</a></li>
				<li><a href="/account/reg">Start</a></li>
			</ul>
			</AppBar>
		</Container>
	</div>
	);
}

export default Header;