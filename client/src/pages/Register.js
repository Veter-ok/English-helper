import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Button, TextField, Container} from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import Header from '../components/header';
import { LOGIN_ROUTE } from '../utils/consts';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: 100,
		marginLeft: 50,
		maxWidth: "90%",
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	specialInputText:{
		marginBottom: 20,
	}
}));

export const RegisterPage = observer(() => {
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [password2, setPassword2] = useState('');
	const [error_msg, setErrorMsg] = useState('');

	const classes = useStyles();

	const registration = async (event) => {
		event.preventDefault();
		axios.post('/api/user/reg', {
			'name' : name,
			'email' : email,
	 		'password' : password,
	 		'password2' : password2
		}).then(response => {
			if (response.data.status){
		 		history.push(LOGIN_ROUTE);
		 	}else{
		 		setErrorMsg(response.data.msg);
			}
		}).catch(error => {console.log(error)})
	}
	
	return(
		<div>
			<Header title="Регистрация"></Header>
			<Container maxWidth="sm">
				<Paper elevation={3} variant="outlined" className={classes.paper}>
					<h1>Регестрация</h1>
					<p className="error-msg">{error_msg}</p>
					<TextField fullWidth required className={classes.specialInputText} label="Имя" value={name} onChange={(e) => setName(e.target.value)}/>
					<TextField fullWidth required className={classes.specialInputText} label="Электронная почта" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
					<TextField fullWidth className={classes.specialInputText} label="Пароль" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)}/>
					<TextField className={classes.specialInputText} fullWidth label="Пароль" type="password" autoComplete="current-password" value={password2} onChange={(e) => setPassword2(e.target.value)}/>
					<Button variant="contained" color="primary" onClick={registration}>Регестрация</Button>
				</Paper>
			</Container>
		</div>
	);
})