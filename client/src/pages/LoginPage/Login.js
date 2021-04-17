import {useState, useContext} from 'react';
import './Login.css';
import {UserContext} from '../../UserContext';
import Header from '../../components/header';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error_msg, setErrorMsg] = useState('');
	const [succes_msg, setSuccesMsg] = useState('');

	function handleSubmit(event) {
		event.preventDefault();
		fetch('http://localhost:5000/account/login', {
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({
				"email": email,
				"password": password
			})
		}).then(res => {
			return res.json()
			})
		.then(data => {
			  if (data.status){
				setSuccesMsg(data.mag);
			  }else{
				setErrorMsg(data.msg);
			  }
			})
	  	.catch(error => console.log(error));
  }
	return (
	<div>
		<Header title="Login"></Header>
		<form className="login-form" onSubmit={handleSubmit}>
				<div className="content-form">
					<h1>вход</h1>
					<p className="error-msg">{error_msg}</p>
					<p className="succes-msg">{succes_msg}</p>
					<div className="input-and-info">
						<div className="content-input-email">
							<input type="text" className="input-email" name="email" placeholder="электронная почта" value={email} onChange={(e) => setEmail(e.target.value)}/>
						</div>
						<div className="content-input-password">
							<input type="password" className="input-password" name="password" placeholder="пароль" value={password} onChange={(e) => setPassword(e.target.value)}/>
						</div>
						<div className="group-accept-login">
							<a className="create-account" href="/account/reg">Создать аккаунт</a>
							<button type="submit" className="accept-login" name="btn">Вход</button>
						</div>
					</div>
				</div>
			</form>
	</div>
	);
}