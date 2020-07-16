import React, {useEffect, useState} from 'react';
import FacebookLogin from 'react-facebook-login';
import { LinkedIn } from 'react-linkedin-login-oauth2';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {Grid, Paper} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: 'url(/images/background.jpg);',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '24rem',
    height: '60rem',
    width: '100%',
    alignItems: 'center',
  },

  paper: {
    width: '20rem',
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
    height: '20rem', //'80vh',
    marginTop: '5rem',
  },
}));

const Authorization = props => {

  let [check, setCheck] = useState();

  useEffect(() => {
    console.log(check);
  }, [check]);

  const responseFacebook = response => {
    if(response) {
      props.authorization(true);
      props.getUserInfo(response);
    } else {
      console.log('No Response');
    }
  };

  const responseLinkedIn = (response) => {
    console.log('Here');
    setCheck(response);
  };

  const linkedInFailure = (error) => {
    console.log(error.errorMessage);
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
            <Grid item>
              <LinkedIn
                clientId="78o49u3o5sq6ul"
                onSuccess={responseLinkedIn}
                onFailure={linkedInFailure}
                scope={["r_liteprofile","r_emailaddress"]}
                redirectUri="https://localhost:3000/auth"
                text="Login With LinkedIn"
              />
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
};

export default Authorization;