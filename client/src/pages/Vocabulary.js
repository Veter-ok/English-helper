import {useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Paper, Button, TextField, Container, CircularProgress, Fab, Tooltip} from '@material-ui/core';
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
	const [statusSearch, setStatusSearch] = useState(false);
	const [complexity, setComplexity] = useState();

	const classes = useStyles();

	const validator = (event) => {
		var i = event.target.value
		i = i.replace(/[^A-Za-z]/g, '')
		setWord(i)
	}

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
			return json.json()
		}).then(data => {
			setComplexity((String(word).length * 10 / 15).toFixed(1));
			setTranslation(data.msg);
			setStatusSearch(false);
		})
		.catch(error => console.log(error));
	}

	const know = async (event) => {
		event.preventDefault()
		alert(word)
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
			}
		})	
	}

	const learn = async (event) => {
		event.preventDefault()
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
			}
		})	
	}

	return(
		<div>
			<Header title="Vocabulary"></Header>
				<Container className={classes.root} maxWidth="sm">
					<Paper className={classes.paper}>
						<div className={classes.inputBox} >
							<TextField required fullWidth className={classes.inputText} id="standard-required" label="Required" value={word} onChange={validator}/>
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
								<h2>Перевод</h2> 
								<p>{translation}</p>
								<Button variant="contained" color="secondary" onClick={learn} className={classes.button_style_1}>Учить</Button>
              					{/* {
									statusProcess ?
									<CircularProgress className={classes.circularProgress}  color="secondary" />
									:
									<div></div>
	            				} */}
              					<Button variant="contained" color="primary" onClick={know} className={classes.button_style_2}>Знаю</Button>
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