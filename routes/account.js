const express = require('express');
const User = require('../model/User')
const router = express.Router();

router.get('/login', (req, res) => {
	res.send('login');
});

router.post('/login', (req, res) => {
	User.findByEmail(req.body.email, (user, err) => {
		if (err) throw err
		if (!user){
			return res.json({status: false, msg : 'пользователь не найден'})
		}else{
			return res.json({status: true, msg : 'пользователь найден'})
		}
	});
});

router.get('/reg', (req, res) => {
	res.send('register');
});

router.post('/reg', (req, res) => {
	const newUser = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	});
	if (req.body.password === req.body.password2){
		User.findByEmail(req.body.email, (user, error) => {
			if (error) throw error
			if (user){
				return res.json({status: false, msg: 'пользователь с этим email уже существует'})
			}else{
				User.addNewUser(newUser, (err, user) => {
					if (err){
						console.log(err);
						return res.json({status: false, msg: 'пользователь не добавлен'});
					}else{
						return res.json({status: true, msg: 'пользователь добавлен'});
					}
				})
			}
		});
	}else{
		return res.json({status: false, msg: 'неверный повторный пароль'})
	}
});

module.exports = router;