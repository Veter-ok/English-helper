import React, {Component} from 'react';
import Header from '../../components/header';
import './Register.css'

export default class Register extends Component {
	constructor(props){
		super(props);
		this.state = {
			name: '',
			email: '',
			password: '',
			password2: '',
			error_msg: '',
			succes_msg: ''
		}

		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.handleChangePassword2 = this.handleChangePassword2.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChangeName(event){
		this.setState({name: event.target.value});
	}

	handleChangeEmail(event){
		this.setState({email: event.target.value});
	}

	handleChangePassword(event){
		this.setState({password: event.target.value});
	}

	handleChangePassword2(event){
		this.setState({password2: event.target.value});
	}

	handleSubmit(e){
		e.preventDefault();
		fetch('http://localhost:5000/account/reg', {
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({
				'name' : this.name.value,
				'email' : this.email.value,
				'password' : this.password.value,
				'password2' : this.password2.value
			})
		}).then(res => {
			return res.json()
		})
		.then(data => {
			if (data.status){
				this.setState({succes_msg: data.msg});
			}else{
				this.setState({error_msg: data.msg});
			}
		})
		.catch(error => console.log('ERROR'));	
	}

	render() {
		return(
		<div>
			<Header title="Регистрация"></Header>
			<form className="register-form" onSubmit={this.handleSubmit}>
				<div className="content-form">
					<h1>Регестрация</h1>
					<p className="error-msg">{this.state.error_msg}</p>
					<p className="succes-msg">{this.state.succes_msg}</p>
					<div className="input-and-info">
						<div className="content-input-name">
							<input type="name" name="name" className="input-name" ref={(ref) => {this.name = ref}} value={this.state.name} onChange={this.handleChangeName} placeholder="Имя"/>
						</div>
						<div className="content-input-email">
							<input type="email" name="email" className="input-email" ref={(ref) => {this.email = ref}} value={this.state.email} onChange={this.handleChangeEmail} placeholder="Электронная почта"/>
						</div>
						<div className="content-input-password">
							<input type="password" name="password" className="input-password" ref={(ref) => {this.password = ref}} value={this.state.password} onChange={this.handleChangePassword} placeholder="Пароль"/>
						</div>
						<div className="content-input-password2">
							<input type="password" name="password2" className="input-password2" ref={(ref) => {this.password2 = ref}} value={this.state.password2} onChange={this.handleChangePassword2} placeholder="Повторить пароль"/>
						</div>
						<div className="group-accept-register">
							<button type="submit" className="accept-register" name="btn">Регестрация</button>
						</div>
					</div>
				</div>
			</form>
		</div>
		);
	}
}