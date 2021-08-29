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
	know: {
		type: Map,
		of: String
	},
	learn: {
		type: Map,
		of: String
	}
});

const User = module.exports = mongoose.model('User', UserShema)

module.exports.findByEmail = function(email_from_user, callback) {
	const query = {email:email_from_user};
	User.find(query, callback);
}

module.exports.cheakPassword = async function(password_from_user, password_hash){
	const isMath = await bcrypt.compare(password_from_user,password_hash);
	if (!isMath){
		return false;
	}else{
		return true;
	}
}

module.exports.addNewUser = async function(newUser){
	const hashedPassword = await bcrypt.hash(newUser.password, 12);
	newUser.password = hashedPassword;
	await newUser.save()
}