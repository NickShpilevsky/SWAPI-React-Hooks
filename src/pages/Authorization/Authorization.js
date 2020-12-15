import React from 'react';
import FacebookLogin from 'react-facebook-login';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {Grid, Paper} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: 'url(/images/background.jpg);',
    position: 'fixed',
    top: 0,
    left: 0,
    minWidth: '100%',
    minHeight: '100%',
    alignItems: 'center',
  },

  paper: {
    width: '23rem',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.main,
    alignItems: 'center',
    padding: theme.spacing(5, 5),
    marginTop: '5rem',
  },

  image: {
    width: '50rem',
    backgroundImage: 'url(/images/sw_logo.png);',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '24rem',
    height: '20rem',
    marginTop: '5rem',
  },
}));

const Authorization = props => {

  const responseFacebook = response => {
    if(response){
      props.authorization(true);
      props.getUserInfo(response);
    }
  };

  const classes = useStyles();
    return (
      <div className={classes.container}>
        <div className={classes.image} />
        <Paper elevation={5} className={classes.paper}>
          <Grid container spacing={1} direction="row" justify="center" alignItems="center">
            <Grid item>
              <FacebookLogin
                appId="320314542705859"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
              />
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
};

export default Authorization;