import {makeAutoObservable} from "mobx";

export default class UserStore {
	constructor(){
		this._Auth = false;
		this._user = {};
		this._knowWords = {};
		this._learnWords = {}
		makeAutoObservable(this)
	}

	setIsAuth(bool){
		this._Auth = bool;
	}

	setUser(user){
		this._user = user;
	}

	setKnow(words){
		this._knowWords = words;
	}

	setLearn(words){
		this._learnWords = words
	}

	get isAuth(){
		return this._Auth;
	}

	get user(){
		return this._user;
	}

	get know(){
		return this._knowWords;
	}

	get learn(){
		return this._learnWords;
	}
}