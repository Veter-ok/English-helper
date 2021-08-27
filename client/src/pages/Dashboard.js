import {useContext} from 'react';
import Header from '../components/header';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Button, Grid, Typography} from '@material-ui/core';
import { AuthContext } from '../index';

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
  }
}));

export const DashboardPage = () => {
  const {user} = useContext(AuthContext);
  const classes = useStyles();

  return (
    <div>
      <Header title="Dashboard"></Header>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={5}>
            <Paper elevation={5} className={classes.paper}>
              <Typography className={classes.img_text}>
                Слов выучили
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Paper elevation={5} className={classes.paper}>
              Слов выучили
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}