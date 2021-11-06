import {useContext, useEffect, useState} from 'react';
import Header from '../components/header';
import {makeStyles} from '@material-ui/core/styles';
import {Paper, Button, Typography, Card, CardContent, CardActions, Box} from '@material-ui/core';
import { AuthContext } from '../index';
import { observer } from 'mobx-react-lite';

const useStyles = makeStyles((theme) => ({
	root: {
	  margin: 30,
	  flexGrow: 1,
	},
	card: {
		minWidth: '25%',
		marginLeft: '37.5%',
		marginRight: '37.5%'
	},
	box: {
		backgroundColor: '#3f51b5',
		margin: 10
	},
	button: {
		minWidth: '70%',
		marginLeft: '15%',
		marginRight: '15%',
		marginTop: 15,
		marginBottom: 15,
		color: 'white',
		backgroundColor: '#6978d1'
	}
}));

export const TestPage = observer(() => {
	const {user} = useContext(AuthContext);
	const [list_words, setListWords] = useState([])
	const [list_answer, setListAnswer] = useState([])
	const [currentlyWord, setCurrentlyWord] = useState()
	const [currentlyAnswer, setCurrentlyAnswer] = useState()
	const [currentlyAnswers, setCurrentlyAnswers] = useState([])
	const [currentlyIndex, setCurrentlyIndex] = useState(0)
	const [response, setResponse] = useState()
	const classes = useStyles();
	
	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}

	function generationAnswers(correct, len){
		let answers = []
		let pos = getRandomInt(len)
		let key = 0
		let index = 0
		for(let i = 0; i < len; i++){
			if (i === pos){
				answers.push(correct)
			}else{
				do {
					index = getRandomInt(Object.keys(user.learn).length)
					key = Object.keys(user.learn)[index]
				}while (answers.indexOf(user.learn[key]) !== -1 || user.learn[key] === correct)
				answers.push(user.learn[key])
			}
		}
		return answers
	}

	function speak(text){
		let speech = new SpeechSynthesisUtterance();
		speech.lang = "en";
		speech.text = text;
		let voices = window.speechSynthesis.getVoices()
		speech.voice = voices[0];
 		window.speechSynthesis.speak(speech);
	}

	function generationTask(){
		let max = 0
		if (Object.keys(user.learn).length > 5){
			max = 5
		}else{
			max = Object.keys(user.learn).length
		}
		let list_words = []
		let list_ans = []
		let index = 0
		for(let i = 0; i < max; i++){
			index = getRandomInt(max)
			while (list_words.indexOf(Object.keys(user.learn)[index]) !== -1){
				index = getRandomInt(max)
			}
			list_words.push(Object.keys(user.learn)[index])
			list_ans.push(user.learn[Object.keys(user.learn)[index]])
		}
		return [list_words, list_ans, max]
	}

	const checkAnswer = async (ans) => {
		if (ans === currentlyAnswer){
			setResponse("correct")
			setTimeout(() => {setResponse("")}, 1500);
			let index = currentlyIndex + 1
			setCurrentlyIndex(index)
			setCurrentlyAnswers(generationAnswers(list_answer[currentlyIndex], list_words.length))
			setCurrentlyWord(list_words[currentlyIndex])
			setCurrentlyAnswer(list_answer[currentlyIndex])
			speak(currentlyWord)
		}else{
			setResponse("wrong")
			setTimeout(() => {setResponse("")}, 1500);
		}
	}

	useEffect(() => {
		let res = generationTask()
		let list_words = res[0]
		let list_answer = res[1]
		let lenght = res[2]
		setCurrentlyAnswers(generationAnswers(list_answer[0], lenght))
		setListAnswer(list_answer)
		setListWords(list_words)
		setCurrentlyWord(list_words[0])
		setCurrentlyAnswer(list_answer[0])
	}, [])

	return (
	  <div>
		<Header title="Test"></Header>
		<div className={classes.root}>
		<Card className={classes.card}>
			<CardContent>
				<Typography variant="h5" align="center" component="div">
					{currentlyWord}
				</Typography>
				<Typography align="center" component="div">
					{response}
				</Typography>
			</CardContent>
			<CardActions>
				<Box className={classes.box}>
					{currentlyAnswers.map(key => (
  						<Button className={classes.button} onClick={() => checkAnswer(key)}>{key}</Button>
					))}
				</Box>
			</CardActions>
		</Card>
		</div>
	  </div>
	);
  })