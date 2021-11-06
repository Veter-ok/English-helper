import {useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Snackbar, Paper, Button, TextField, Container} from '@material-ui/core';
import Header from '../components/header';
import { AuthContext } from '../index';
import {useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import {DASHBOARD_ROUTE, REGISTRATION_ROUTE } from '../utils/consts'; 

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: 100,
		marginLeft: 50,
		maxWidth: "90%",
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	buttonGroup: {
		marginTop: 25,
		display: 'flex',
		justifyContent: 'space-between'
	}
}));

const LoginPage = observer(() => {
	const {user} = useContext(AuthContext);
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error_msg, setErrorMsg] = useState('');

	const classes = useStyles();

	const logIn = async (event) => {
		event.preventDefault();
		console.log('click1')
		await fetch(process.env.REACT_APP_API_URL + '/user/login', {
				method: 'post',
				headers: {'Content-Type':'application/json'},
				body: JSON.stringify({
					"email": email,
					"password": password
				})
		}).then(res =>  res.json())
		.then(data => {
			if (data.status){
				console.log('click2')
				user.setIsAuth(true);
				user.setUser(data.user);
				user.setKnow(data.know)
				user.setLearn(data.learn)
				localStorage.setItem("token", data.token)
				history.push(DASHBOARD_ROUTE);
			}else{
				setErrorMsg(data.msg);
			}
		}).catch(error => console.log(error));
	}
	return (
		<div>
			<Header title="Login"></Header>
			<Container maxWidth="sm">
				<Paper elevation={3} variant="outlined" className={classes.paper}>
					<h1>вход</h1>
					{
						!error_msg ?
						<div></div>
						:
						<Snackbar anchorOrigin={{vertical: 'bottom',horizontal: 'left',}}autoHideDuration={6000} message="Note archived"/>
					}
					<p className="error-msg">{error_msg}</p>
					<TextField fullWidth required id="standard-required" label="Электронная почта" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
					<TextField fullWidth id="standard-password-input" label="Пароль" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)}/>
					<div className={classes.buttonGroup}>
						<Button onClick={() => history.push(REGISTRATION_ROUTE)} variant="contained" color="primary">Создать аккаунт</Button>
						<Button onClick={logIn} variant="contained" color="secondary">Войти</Button>
					</div>
				</Paper>
			</Container>
		</div>
	);
})

export default LoginPage;