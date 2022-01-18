import {useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Paper, Button, TextField, Container, CircularProgress, Typography, Fab, Tooltip} from '@material-ui/core';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Header from '../components/header';
import axios from 'axios';
import { AuthContext } from '../index';

const useStyles = makeStyles((theme) => ({
	root: {
	  padding: theme.spacing(10)
	},
	paper: {
	  padding: theme.spacing(2),
	  textAlign: 'center',
	  color: theme.palette.text.secondary,
	},
	fab: {
		margin: theme.spacing(2),
	},
	inputBox: {
		padding: 20,
		display: 'flex',
		alignItems: 'centre',
		justifyContent: 'space-between'
	},
	inputText: {
		minWidth: "70%",
		marginRight: 10
	},
	buttonTransalte: {
		minWidth: "30%"
	},
	translatePaper: {
		padding: 5
	}
  }));


export const Vacabulary = () => {
	const {user} = useContext(AuthContext);
	const [word, setWord] = useState();
	const [translation, setTranslation] = useState();
	const [newWord, setNewWord] = useState(true)
	const [statusSearch, setStatusSearch] = useState(false);
	const [statusAdd, setStatusAdd] = useState(false)
	const [complexity, setComplexity] = useState();

	const classes = useStyles();

	// https://webplatformcourse.com/bonus/speech-synthesis-api/
	function speak(text){
		let speech = new SpeechSynthesisUtterance(text)
		speech.lang = "en-US"
		let voices = window.speechSynthesis.getVoices()
		for(let i = 0; i < voices.length; i++){
			if (voices[i].lang === "en-US" && voices[i].name === "Alex"){
				speech.voice = voices[i]
				break
			}
		}
 		window.speechSynthesis.speak(speech)
	}

	const searchWord = async (event) => {
		event.preventDefault();
		setStatusSearch(true);
		axios.post('/api/vocabulary/search', {
			"word": word,
		 	"from": "en",
			"to": "ru"
		}).then(response => {
			if (response.data.msg in user.know){
				setNewWord(false)
			}else{
				setNewWord(true)
			}
			setComplexity((String(response.data.msg).length * 10 / 15).toFixed(1));
			setTranslation(response.data.msg);
			setStatusSearch(false);
		}).catch(error => console.error(error))
	}

	const know = async (event) => {
		event.preventDefault()
		setStatusAdd(true)
		axios.post('/api/vocabulary/add_know', {
			"word": word,
			"translation": translation,
			"user": user.user,
			"words": user.know
		}).then(response => {
			user.setKnow(response.data.words)
			setStatusAdd(false)
		}).catch(error => {console.log(error)})	
	}

	const learn = async (event) => {
		event.preventDefault()
		setStatusAdd(true)
		axios.post('/api/vocabulary/add_learn', {
			"word": word,
			"translation": translation,
	 		"user": user.user,
	 		"words": user.learn
		}).then(response => {
			user.setLearn(response.data.words)
			setStatusAdd(false)
		}).catch(error => {console.log(error)})		
	}

	return(
		<div>
			<Header title="Vocabulary"></Header>
				<Container className={classes.root} maxWidth="sm">
					<Paper className={classes.paper}>
						<div className={classes.inputBox} >
							{/* <TextField required fullWidth className={classes.inputText} id="standard-required" label="Required" value={word} onChange={(event) => setWord(event.target.value.replace(/[^A-Za-z-]/g, ''))}/> */}
							<TextField required fullWidth className={classes.inputText} id="standard-required" label="Required" value={word} onChange={(event) => setWord(event.target.value)}/>
							<Button onClick={searchWord} className={classes.buttonTransalte} variant="contained"style={{fontSize: 12}}>Перевести</Button>
						</div>
						{
							statusSearch ?
							<CircularProgress color="secondary" />
							:
							<div></div>
						}
					</Paper>
				</Container>
			<div className="content">
				{
					!translation ?
					<div></div>
					:
					<Grid container spacing={3}>
						<Grid item xs={12} sm={8}>
							<Paper className={classes.translatePaper}>
								{/* <h2>{translation}</h2> */}
								<TextField id="outlined-basic" label="Перевод" variant="outlined" defaultValue={translation} onChange={(e) => setTranslation(e.target.value)} className={classes.inputTextStyle}/>
								<Tooltip title="Play" aria-label="play">
									<Fab color="primary" onClick={() => {speak(word)}}>
										<PlayCircleOutlineIcon/>
        							</Fab>
      							</Tooltip>
								{
									newWord ?
									<div>
										<Button variant="contained" color="secondary" onClick={learn} >Учить</Button>
										<Button variant="contained" color="primary" onClick={know}>Знаю</Button>
									</div>
									:
									<h4>Вы знаете это слово <span>&#9989;</span></h4>
								}
								{
									statusAdd ?
									<CircularProgress className={classes.circularProgress}  color="secondary" />
									:
									<div></div>
	            				}
								{/* большая кнопка плюс */}
								{/* <Tooltip title="Add" aria-label="add">
        							<Fab color="primary" className={classes.fab} onClick={addWord}>
          								<AddIcon />
        							</Fab>
      							</Tooltip> */}
							</Paper>
						</Grid>
						<Grid item xs={12} sm={4}>
							<Paper>
								<h2>Сложность слова</h2> 
								<p>{complexity}/10</p>
							</Paper>
						</Grid>
					</Grid>
				}
			</div>
		</div>
	)
}