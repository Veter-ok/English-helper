import {useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Paper, Button, TextField, Container, CircularProgress, Typography, Fab, Tooltip} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Header from '../components/header';
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
	const [error, setError] = useState();
	const [statusAdd, setStatusAdd] = useState(false)
	const [complexity, setComplexity] = useState();

	const classes = useStyles();

	const searchWord = async (event) => {
		event.preventDefault();
		setStatusSearch(true);
		await fetch(process.env.REACT_APP_API_URL + '/vacabulary/search', {
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({
				"word": word,
				"from": "en",
				"to": "ru"
			})
		}).then(json => {
			if (json.ok){
				return json.json()
			}else{
				throw new Error('Network response was not ok');
			}
		}).then(data => {
			if (word in user.know){
				setNewWord(false)
			}else{
				setNewWord(true)
			}
			setComplexity((String(word).length * 10 / 15).toFixed(1));
			setError("")
			setTranslation(data.msg);
			setStatusSearch(false);
		}).catch(error => {
			setStatusSearch(false);
			setError(error)
		});
	}

	const know = async (event) => {
		event.preventDefault()
		setStatusAdd(true)
		await fetch(process.env.REACT_APP_API_URL + '/vacabulary/add_know', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				"word": word,
				"translation": translation,
				"user": user.user,
				"words": user.know
			})
		}).then(json => json.json())
		.then(data => {
			if (data.status){
				user.setKnow(data.words)
				setStatusAdd(false)
			}
		})	
	}

	const learn = async (event) => {
		event.preventDefault()
		setStatusAdd(true)
		await fetch(process.env.REACT_APP_API_URL + '/vacabulary/add_learn', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				"word": word,
				"translation": translation,
				"user": user.user,
				"words": user.learn
			})
		}).then(json => json.json())
		.then(data => {
			if (data.status){
				user.setLearn(data.words)
				setStatusAdd(false)
			}
		})	
	}

	return(
		<div>
			<Header title="Vocabulary"></Header>
				<Container className={classes.root} maxWidth="sm">
					<Paper className={classes.paper}>
						<div className={classes.inputBox} >
							<TextField required fullWidth className={classes.inputText} id="standard-required" label="Required" value={word} onChange={(event) => setWord(event.target.value.replace(/[^A-Za-z]/g, ''))}/>
							<Button onClick={searchWord} className={classes.buttonTransalte} variant="contained"style={{fontSize: 12}}>Перевести</Button>
						</div>
						{
							statusSearch ?
							<CircularProgress color="secondary" />
							:
							<div></div>
						}
						{
							error ?
							<Typography>
								{error}
							</Typography>
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
								<h2>{translation}</h2>
								{
									newWord ?
									<div>
										<Button variant="contained" color="secondary" onClick={learn} className={classes.button_style_1}>Учить</Button>
										<Button variant="contained" color="primary" onClick={know} className={classes.button_style_2}>Знаю</Button>
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