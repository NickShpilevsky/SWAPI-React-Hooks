import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import HeroCard from '../HeroCard';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    height: '50rem',
  },
  gridList: {
    width: 1200,
    height: 1000,
  },

  loading: {
    backgroundImage: 'url(/images/loading.gif);',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '50rem',
    width: '50rem',
  }
}));

const List = props => {
  const tmp = props.data;
  const classes = useStyles();
  return (
    props.data ? (
      <div className={classes.root}>
        <GridList cellHeight={160} className={classes.gridList} cols={4}>
          {tmp.map((hero) => (
            <GridListTile key={hero.name} cols={1}>
              <HeroCard
                key={hero.name}
                hero={hero}
                setInformation={props.setInformation}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    ) : (
      <div className={classes.loading} />
    )
  )
};


// export default connect(store => ({ heroesList: store.allHeroes }))(List);
export default List;