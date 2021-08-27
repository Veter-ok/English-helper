const translate = require('@vitalets/google-translate-api');
const User = require('../model/User');

class Vacabulary {
	async search_word(req, res){
		const {word, from, to} = req.body
		if (!word){
			return res.json({msg: ""})
		}
		translate(word, {from: from, to: to}).then(ans=> {
			return res.json({msg: ans.text});
		}).catch(err => {
			console.error(err);
		});
	}

	async add_word(req, res){
		const {word, translation, user} = req.body
		User.updateOne({words: user.words}, {user: user.words.push({word: translation})}, function(err, result){
			return res.json({status: true})
		});
	}
}

module.exports = new Vacabulary();