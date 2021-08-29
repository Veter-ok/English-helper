import {useContext} from 'react';
import Header from '../components/header';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Button, Grid, Typography} from '@material-ui/core';
import { AuthContext } from '../index';
import { observer } from 'mobx-react-lite';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 30,
    flexGrow: 1,
  },
  paper: {
    position: 'relative',
    color: theme.palette.text.secondary,
    padding: 20,
    height: 400
  },
  button_style_1: {
    position: 'absolute',
	  bottom: 10,
    marginLeft: 20
  },
  button_style_2: {
	  position: 'absolute',
    bottom: 10,
    marginLeft: 150
  },
  basic_text:{
    textAlign: 'left',
    marginLeft: 20
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
    padding: 10
  }
}));

export const DashboardPage = observer(() => {
  const {user} = useContext(AuthContext);
  const classes = useStyles();

  return (
    <div>
      <Header title="Dashboard"></Header>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={5} className={classes.paper}>
              <p>Слов выучили</p>
                {Object.keys(user.know).map(key => (
                  <Paper key={key} className={classes.words_block}>
                    <Typography className={classes.img_text}>
                      {key} - {user.know[key]}
                      {/* {console.log("ok")} */}
                      {/* <Button variant="contained" color="secondary">Удалить</Button> */}
                    </Typography>
                  </Paper>
                ))}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={5} className={classes.paper}>
              <p>Слов не знаете</p>
              {Object.keys(user.learn).map(key => (
                  <Paper key={key} className={classes.words_block}>
                    <Typography className={classes.img_text}>
                      {key} - {user.learn[key]}
                    </Typography>
                  </Paper>
                ))
              }
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
})