const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserShema = mongoose.Schema({
	name: {
		type: String,
		maxlenght: 5
	},
	email: {
		type: String
	},
	password: {
		type: String
	},
	date: {
		type: Date
	}
});

const User = module.exports = mongoose.model('User', UserShema)

module.exports.findByEmail = function(email, callback) {
	const query = {email:email};
	User.findOne(query, callback);
}

module.exports.addNewUser = function(newUser, callback){
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newUser.password, salt, (err, hash) => {
			if (err) throw err
			newUser.password = hash
			newUser.save(callback)
		});
	});
}
