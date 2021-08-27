import {makeAutoObservable} from "mobx";

export default class UserStore {
	constructor(){
		this._Auth = false;
		this._user = {};
		makeAutoObservable(this)
	}

	setIsAuth(bool){
		this._Auth = bool;
	}

	setUser(user){
		this._user = user;
	}

	get isAuth(){
		return this._Auth;
	}

	get user(){
		return this._user;
	}
}