import React from 'react';
import Header from '../components/header';
// import {GetData} from '../hooks/http.hook';

// https://10.0.0.2:2000/
class WelcomePage extends React.Component{
	componentDidMount() {
		// fetch('https://jsonplaceholder.typicode.com/todos/1')
		fetch('http://localhost:5000/')
  		.then(response => response.json())
  		.then(json => console.log(json))
	}

	render(){
		return (
			<div>
				<Header title="Welcome"></Header>
				{/* <button onClick={this.componentDidMount}>кнопка</button> */}
			</div>
		);
	}
}

export default WelcomePage