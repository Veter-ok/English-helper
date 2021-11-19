import {useContext, useEffect, useState} from 'react';
import Header from '../components/header';
import {makeStyles} from '@material-ui/core/styles';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import {Paper, Button, Typography, Card, CardContent, CardActions, Box, Tooltip, Fab} from '@material-ui/core';
import { AuthContext } from '../index';
import { observer } from 'mobx-react-lite';

const useStyles = makeStyles((theme) => ({
	root: {
	  margin: 30,
	  flexGrow: 1,
	},
	paper: {
		minWidth: "30%",
		marginLeft: '35%',
		marginRight: '35%',
		marginBottom: 20,
	}, 
	card: {
		[theme.breakpoints.only('lg')]: {
			minWidth: '25%',
			marginLeft: '37.5%',
			marginRight: '37.5%',
		},
		[theme.breakpoints.only('md')]: {
			minWidth: '50%',
			marginLeft: '25%',
			marginRight: '25%',
		},
		[theme.breakpoints.only('sm')]: {
			minWidth: '70%',
			marginLeft: '15%',
			marginRight: '15%',
		},
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
	const [listWords, setListWords] = useState([])
	const [length, setlength] = useState(0)
	const [listAnswer, setListAnswer] = useState([])
	const [currentlyWord, setCurrentlyWord] = useState()
	const [currentlyAnswer, setCurrentlyAnswer] = useState()
	const [currentlyAnswers, setCurrentlyAnswers] = useState([])
	const [currentlyIndex, setCurrentlyIndex] = useState()
	
	const [response, setResponse] = useState()
	const classes = useStyles();
	
	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}

	function generationAnswers(correct){
		let answers = []
		let pos = getRandomInt(5)
		let key = 0
		let index = 0
		for(let i = 0; i < 5; i++){
			if (i === pos){
				answers.push(correct)
			}else{
				do {
					index = getRandomInt(Object.keys(user.learn).length)
					key = Object.keys(user.learn)[index]
				}while (answers.indexOf(user.learn[key]) !== -1 || user.learn[key] === correct)
				console.log(index, key)
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
		let max = Object.keys(user.learn).length
		let list_words = []
		let list_ans = []
		let index = 0
		let len = 0
		if (max >= 10){
			len = 10
		}else if (max >= 5){
			len = 10
		}else{
			len = max
		}
		setlength(len)
		for(let i = 0; i < len; i++){
			do {
				index = getRandomInt(max)
			}while (list_words.indexOf(Object.keys(user.learn)[index]) !== -1)
			list_words.push(Object.keys(user.learn)[index])
			list_ans.push(user.learn[Object.keys(user.learn)[index]])
		}
		setCurrentlyAnswers(generationAnswers(list_ans[0], len))
		setCurrentlyIndex(0)
		setListAnswer(list_ans)
		setListWords(list_words)
		setCurrentlyWord(list_words[0])
		setCurrentlyAnswer(list_ans[0])
		speak(list_words[0])
	}

	const checkAnswer = async (ans) => {
		if (ans === currentlyAnswer){
			setResponse("correct")
			let index = currentlyIndex + 1
			setTimeout(() => {
				setResponse("")
				if (currentlyIndex + 1 === length){
					generationTask()
				}else{
					setCurrentlyIndex(index)
					setCurrentlyAnswers(generationAnswers(listAnswer[index], listWords.length))
					setCurrentlyWord(listWords[index])
					setCurrentlyAnswer(listAnswer[index])
					speak(listWords[index])
				}
			}, 1500);
		}else{
			setResponse("wrong")
			setTimeout(() => {
				setResponse("")
				listWords.push(currentlyWord)
				listAnswer.push(currentlyAnswer)
				setListWords(listWords)
				setListAnswer(listAnswer)
				setlength(length + 1)
			}, 1500);
		}
	}

	useEffect(() => {
		generationTask();
	}, [])

	return (
	  <div>
		<Header title="Test"></Header>
		<div className={classes.root}>
		<Paper className={classes.paper} elevation={3}>
			<Typography variant="h6" align="center">
				{currentlyIndex + 1}/{length}
			</Typography>
		</Paper>
		<Card className={classes.card} elevation={3}>
			<CardContent>
				<Typography variant="h5" align="center" component="div">
					{currentlyWord}
				</Typography>
				<Typography align="center" component="div">
					{response}
				</Typography>
				<Tooltip title="Play" aria-label="play">
					<Fab color="primary" onClick={() => {speak(currentlyWord)}}>
						<PlayCircleOutlineIcon/>
        			</Fab>
      			</Tooltip>
			</CardContent>
			<CardActions>
				<Box className={classes.box}>
					{currentlyAnswers.map(key => (
  						<Button className={classes.button} key={key} onClick={() => checkAnswer(key)}>{key}</Button>
					))}
				</Box>
			</CardActions>
		</Card>
		</div>
	  </div>
	);
  })