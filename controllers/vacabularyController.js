const translate = require('@vitalets/google-translate-api');
const User = require('../model/User');

class Vacabulary {
	async search_word(req, res){
		const {word, from, to} = req.body
		if (!word){
			return res.json({msg: ""})
		}
		translate(word, {from: from, to: to}).then(ans=> {
			if (ans.from.language.iso === from){
				return res.status(200).json({msg: ans.text});
			}else{
				console.log(ans)
				return res.status(500).json({});
			}
		}).catch(err => {
			return res.status(500).json({});
		});
	}

	async add_know(req, res){
		const {word, translation, words, user} = req.body
		const new_words = words
		new_words[word] = translation
		User.updateOne({email: user.email}, {know: new_words}, function(err, result){
			return res.json({status: true, words: new_words})
		});
	}

	async add_learn(req, res){
		const {word, translation, words, user} = req.body
		const new_words = words
		new_words[word] = translation
		User.updateOne({email: user.email}, {learn: new_words}, function(err, result){
			return res.json({status: true, words: new_words})
		});
	}

	async delete_learn(req, res){
		const {words, _id} = req.body
		User.updateOne({_id: _id}, {learn: words}, (err, result) => {
			if (err) return res.json({status: false, msg: err})
			return res.json({status: true, msg: 'ok'})
		});
	}

	async delete_know(req, res){
		const {words, _id} = req.body
		User.updateOne({_id: _id}, {know: word}, (err, result) => {
			if (err) return res.json({status: false, msg: err})
			return res.json({status: true, msg: 'ok'})
		});
	}
}

module.exports = new Vacabulary();