import React from 'react';
import {Paper} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '17rem',
    padding: theme.spacing(1, 1),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.white,
  },

  title: {
    marginBottom: '1rem',
  },

  row: {
    display: 'flex',
    alignItems: 'center',
  },

  itemTitle: {
    fontWeight: 500,
    marginRight: '1rem',
  },

  info: {
    marginRight: '1rem',
  }
}));

const HeroCard = props => {
  const sendInfo = () => {
    props.setInformation(props.hero);
  };

  const classes = useStyles();
  return(
    <Paper elevation={5} className={classes.paper}>
      <h2 className={classes.title}>{props.hero.name}</h2>
      <div className={classes.row}>
        <div>
          <p className={classes.itemTitle}>gender:</p>
          <p className={classes.itemTitle}>birth year:</p>
        </div>
        <div className={classes.info}>
          <p>{props.hero.gender}</p>
          <p>{props.hero.birth_year}</p>
        </div>
        <Button variant="outlined" color="secondary" onClick={sendInfo}>more</Button>
      </div>
    </Paper>
  )
};

export default HeroCard;