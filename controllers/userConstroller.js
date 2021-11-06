const User = require('../model/User');
const jwt = require("jsonwebtoken");
const jwt_decode = require('jwt-decode');

const bcrypt = require('bcrypt');

class UserController {
	async registration(req, res){
		const {name, email, password, password2} = req.body;
		if (!email || !password){
			return res.json({status: false, msg: 'email и пароль обязательные поля'})
		}
		if (password !== password2){
			return res.json({status: false, msg: 'неверный повторный пароль'})
		}
		const user = await User.findOne({email: email})
		if (user){
			return res.json({status: false, msg: 'пользователь с этим email уже существует'})
		}
		const hashPassword = await bcrypt.hash(password, 5);
		const newUser = new User({
			name: name,
			email: email,
			password: hashPassword,
			know: {},
			learn: {}
		});
		await newUser.save()
		return res.json({status: true});
	}
	
	async login(req, res){
		const {email, password} = req.body;
		if (!email || !password){
			return res.json({status: false, msg: 'email и пароль обязательные поля'})
		}
		const user = await User.findOne({email: email})
		if (user){
			const isMath = await User.cheakPassword(password, user.password);
			if (isMath){
				const token = jwt.sign(
					{email: email, name: user.name, password: password},
					process.env.SECRET_KEY,
					{expiresIn: '12h'});
				const newUser = {
					token: token,
					id: user._id,
					email: email,
					name: user.name,
					password: password,
				}
				return res.json({status: true, token: token, user: newUser, know: user.know, learn: user.learn});
			}else{
				return res.json({status: false, msg: 'неверный пароль'});
			}
		}else{
			return res.json({status: false, msg: 'пользователь не найден'});
		}
	}

	async check(req, res){
		const {token, email, password} = req.body
		if (!token){
			res.json({status: false})
		}
		jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
			if (err){
				res.status(500).json({})
			}else{
				const userDB = await User.findOne({email: email})
				const user = {
					token: token,
					id: userDB._id,
					email: userDB.email,
					name: userDB.name,
					password: password
				}
				res.status(200).json({status: true, user: user, know: userDB.know, learn: userDB.learn})
			}
		});
	}

	async edit(req, res){
		const {name, email, new_name, new_email, new_password} = req.body
		if (!new_name || !new_email || !new_password){
			return res.json({status: false, msg: 'имя, email и пароль обязательно заполнены'})
		}else{
			const user = await User.findOne({name: name, email: email})
			console.log(user)
			const hashPassword = await bcrypt.hash(new_password, 5);
			User.updateOne({name: name, email: email, password: user.password}, {name: new_name, email: new_email, password: hashPassword}, function(err, result) {
				const token = jwt.sign(
					{id: user._id, email: new_email, name: new_name, password: new_password},
					process.env.SECRET_KEY,
					{expiresIn: '5s'});
				const newUser = {
					token: token,
					name: new_name,
					email: new_email,
					password: new_password
				}
				if (err) throw err
				return res.json({status: true, user: newUser});
			});
		}
	}
}

module.exports = new UserController();