import {useContext, useState} from 'react';
import Header from '../components/header';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Button, Grid, TextField, Typography, OutlinedInput, InputAdornment, IconButton, CircularProgress, Box} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Avatar from '@material-ui/core/Avatar';
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
    marginLeft: 20,
    marginTop: 20,
    width: '51%'
  }, 
  circularProgress: {
    position: 'absolute',
    bottom: 10,
    marginLeft: 250
  }
}));

const ProfilePage = observer(() => {
  const {user} = useContext(AuthContext);
  const [name, setName] = useState(user.user.name)
  const [email, setEmail] = useState(user.user.email)
  const [password, setPassword] = useState(user.user.password)
  const [showPassword, setShowPassword] = useState(false)
  const [statusProcess, setStatusProcess] = useState(false);
  const classes = useStyles();

  const logOut = (event) => {
    event.preventDefault();
    user.setIsAuth(false);
  }

  const save = async (event) => {
    event.preventDefault();
    setStatusProcess(true)
    await fetch(process.env.REACT_APP_API_URL + '/user/edit_user', {
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({
        "name": user.user.name,
				"email": user.user.email,
				"password": user.user.password,
        "new_name": name,
				"new_email": email,
				"new_password": password
			})
			}).then(res => {
				return res.json()
				})
			.then(data => {
        if (data.status){
          user.setUser(data.user);
          localStorage.removeItem('token')
          localStorage.setItem("token", data.user.token)
          setStatusProcess(false);
        }
			})
			.catch(error => console.log(error));
  }

  return (
    <div>
    	<Header title="Profile"></Header>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Paper className={classes.paper}>
              <Avatar alt="Remy Sharp" className={classes.large} />
              <Typography className={classes.img_text}>
                {user.user.name}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper className={classes.paper}>
              <Box>
                <Typography className={classes.basic_text}>
                  Изменить данные
                </Typography>
                <TextField id="outlined-basic" label="Имя" variant="outlined" defaultValue={name} onChange={(e) => setName(e.target.value)} className={classes.inputTextStyle}/>
                <TextField id="outlined-basic" label="Email" variant="outlined" defaultValue={email} onChange={(e) => setEmail(e.target.value)} className={classes.inputTextStyle}/>
                <OutlinedInput id="standard-adornment-password" type={showPassword? 'text' : 'password'} className={classes.inputTextStyle} value={password} onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                 </InputAdornment>
                 }
                />
              </Box>
              <Button variant="contained" color="secondary" onClick={save} className={classes.button_style_1}>Сохранить</Button>
              {
							statusProcess ?
							<CircularProgress className={classes.circularProgress}  color="secondary" />
							:
							<div></div>
	            }
              <Button variant="contained" color="primary" onClick={logOut} className={classes.button_style_2}>Выйти</Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
})

export default ProfilePage;