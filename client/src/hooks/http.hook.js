import React from 'react';

export default class GetData extends React.Component {
	async componnetMidMount() {
		const url = 'http://localhost:5000';
		const response = fetch(url);
		const data = response.json();
		console.log(data);
	}
	// const [loading, setLoading] = useState(initalState=false);
	// const [error, setError] = useState(initalState=false);

	// const request = callBack(async (url, method='GET', body=null, headers = {}) => {
	// 	setLoading(true);
	// 	try{
	// 		const response = fetch(url, {method, body, headers});
	// 		const data = await response.json()

	// 		if (!response.ok) {
	// 			throw new Error(data.message || 'Что-то пошло нет так')
	// 		}
	// 		setLoading(false)
	// 		return data
	// 	}catch(e){
	// 		setLoading(false)
	// 		setError(e.message)
	// 		throw e
	// 	}
	// }, []);
	// const clearError = () => setError(null);


	// return {loading, request, error, clearError}
}