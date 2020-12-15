import React, {useState} from 'react';
import {Paper, Button} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '17rem',
    padding: theme.spacing(1, 1, 1, 1),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
  },

  title: {
    marginBottom: '1rem',
  },

  row1: {
    display: 'flex',
    alignItems: 'center',
  },

  row2: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px'
  },

  button1: {
    marginRight: '3px',
  },

  button2: {
    marginLeft: '3px',
  },

  itemTitle: {
    fontWeight: 500,
  },

  info: {
    marginLeft: '10px',
  },
}));

const HeroCard = props => {
  const {hero, setInfo, liked, setLiked } = props;
  const [like, setLike] = useState(Boolean(!liked[hero.name]));

  const sendInfo = () => {
    setInfo(hero);
  };

  const likeDislike = () => {
    return liked[hero.name] ?
      setLiked({...liked, [hero.name]: null}) | setLike(true)
      :
      setLiked({...liked, [hero.name]: hero}) | setLike(false);
  };

  const classes = useStyles();
  return(
    <Paper elevation={5} className={classes.paper}>
      <h2 className={classes.title}>{hero.name}</h2>
      <div className={classes.row1}>
        <div>
          <p className={classes.itemTitle}>gender: </p>
          <p className={classes.itemTitle}>home world: </p>
        </div>
        <div className={classes.info}>
          <p>{hero.gender}</p>
          <p>{hero.homeworld || 'unknown'}</p>
        </div>
      </div>
      <div className={classes.row2}>
        <Button className={classes.button1} variant="outlined" color="inherit" fullWidth={true} onClick={likeDislike}>{like ? <FavoriteIcon/> : <NotInterestedIcon />}</Button>
        <Button className={classes.button2} variant="outlined" color="secondary" fullWidth={true} onClick={sendInfo}>more</Button>
      </div>
    </Paper>
  )
};

export default HeroCard;