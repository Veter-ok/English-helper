import {useContext} from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Button, Grid, Typography, List} from '@material-ui/core';
import { AuthContext } from '../index';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import './dashboard.css'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'relative',
    color: theme.palette.text.secondary,
    padding: 10,
    maxHeight: 400,
    minHeight: 400,
    overflow: 'auto'
  },
  button: {
    marginLeft: '42%',
    marginRight: '42%',
  },
  basic_text:{
    textAlign: 'left',
    marginLeft: 20,
  },
  img_text: {
    textAlign: 'center'
  },
  large: {
    width: theme.spacing(18),
    height: theme.spacing(18),
    marginLeft: '33%',
    marginBottom: 20, 
    marginTop: 10, 
  },
  inputTextStyle:{
    marginTop: 20,
    width: '51%'
  },
  words_block: {
    margin: 10,
    padding: 10,
    backgroundColor: "#ececec"
  }
}));

export const DashboardPage = observer(() => {
  const {user} = useContext(AuthContext);
  const classes = useStyles();

  const deleteWordLern = async (word) => {
    console.log(user.learn[word])
    delete user.learn[word];
    console.log(Object.keys(user.learn))
    axios.post('/api/vocabulary/delete-learn', {
	 		"words": user.learn,
      "_id": user.user.id
    }).then(response => {
      console.log(response);
    }).catch(error => {console.log(error)})
  }

  const deleteWordKnow = async (word) => {
    delete user.know[word];
    console.log(user.id, user.user.id)
    axios.post('/api/vocabulary/delete-know', {
	 		"words": user.know,
      "id": user.user.id
    }).then(response => {
      console.log(response);
      console.log(Object.keys(user.know))
    }).catch(error => {console.log(error)})
  }


  return (
    <div>
      <Header title="Dashboard"></Header>
      <div className="content">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={5} className={classes.paper} >
              <List>
                <h3>Слов выучили: {Object.keys(user.know).length}</h3>
                  {Object.keys(user.know).map(key => (
                    <Paper key={key} className={classes.words_block}>
                      <Typography className={classes.img_text}>
                        {key} - {user.know[key]}
                      </Typography>
                      <Button key={key} variant="contained" color="secondary" className={classes.button} onClick={() => {deleteWordKnow(key)}}>Удалить</Button>
                    </Paper>
                  ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={5} className={classes.paper}>
              <h3>Слов не знаете: {Object.keys(user.learn).length}</h3>
              {Object.keys(user.learn).map(key => (
                  <Paper elevation={5} key={key} className={classes.words_block}>
                    <Typography className={classes.img_text}>
                      {key} - {user.learn[key]}
                    </Typography>
                    <Button variant="contained" key={key} color="secondary" className={classes.button} onClick={() => {deleteWordLern(key)}}>Удалить</Button>
                  </Paper>
                ))
              }
            </Paper>
          </Grid>
        </Grid>
      </div>
      <Footer></Footer>
    </div>
  );
})