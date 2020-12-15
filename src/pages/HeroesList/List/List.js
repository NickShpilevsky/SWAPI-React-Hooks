import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import HeroCard from '../HeroCard/HeroCard';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    maxHeight: window.screen.availHeight,
    overflow: 'auto',
  },
  gridList: {
    width: 1000,
  },

  loading: {
    backgroundImage: 'url(/images/loading.gif);',
    backgroundPosition: 'center',
    height: '200px',
    width: '100%',
  }
}));

const List = props => {
  let { data, check, setCheck, liked, setLiked, setInfo, showSearch, showLiked } = props;
  const [loadingElement, setLoadingElement] = useState(null);

  const observer = React.useRef(
    new IntersectionObserver(
      entries => {
        const first = entries[0];
        if (first.isIntersecting) {
          setCheck(++check);
        }
      },
      {threshold: 0.5}
    )
  );

  const loading = () => {
    if(!showSearch && !showLiked) return(
      <GridListTile key={1} cols={3}>
        <div ref={setLoadingElement} className={classes.loading} />
      </GridListTile>
    )
  };

  useEffect(() => {
    if (observer.current && loadingElement) {
      const [currentElement, currentObserver] = [loadingElement, observer.current];
      currentObserver.observe(currentElement);
      return () => currentObserver.unobserve(currentElement);
    }
  }, [loadingElement]);

  const classes = useStyles();
  return (
      <div className={classes.root}>
        <GridList cellHeight={170} className={classes.gridList} cols={3} spacing={4}>
          {
            data ? data.map((hero) => (
            <GridListTile key={hero.name} cols={1}>
              <HeroCard
                key={hero.name}
                hero={hero}
                showLiked={showLiked}
                liked={liked}
                setLiked={setLiked}
                setInfo={setInfo}
              />
            </GridListTile>
            )) : null
          }
          {loading()}
        </GridList>
      </div>
  )
};

export default List;