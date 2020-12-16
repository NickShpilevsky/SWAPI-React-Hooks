import React, {useEffect, useState} from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core';
import axios from "axios";
import SwAppBar from '../../components/SwAppBar';
import List from "./List/List";
import Info from "./Info/Info";
import globalStyles from "../../styles/global";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    backgroundImage: 'url(/images/background.jpg);',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    minWidth: '100%',
    minHeight: '100%',
  },

  title: {
    color: '#FFF',
    width: '8rem',
  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '25rem',
  },

  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputRoot: {
    color: 'inherit',
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: '100%',
  },

  wrapper: {
    display: 'flex',
    padding: theme.spacing(2, 2),
    height: '680px',

  },

  right: {
    display: 'flex',
    alignItems: 'center',

    position: 'absolute',
    right: 0,
    marginRight: '2rem',
  },

  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },

  text: {
    marginLeft: '2rem',
  },

  email: {
    marginRight: '1rem',
  },

  textField: {
    marginTop: '7px',
    marginBottom: '7px',
    marginRight: '1rem',
  }
}));

const HeroesList = props => {
  const [allData, setAllData] = useState([]);
  const [info, setInfo] = useState();
  const [searchValue, setSearchValue] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [liked, setLiked] = useState({});
  const [showLiked, setShowLiked] = useState(false);
  let [page, setPage] = useState(0);
  let [check, setCheck] = useState(0);

  async function fetchData(searchValue) {
    const response = await axios(`https://swapi.dev/api/people/${typeof searchValue === "number" && page ? `?page=${searchValue}` : `?search=${searchValue}`}`);
    for (let i = 0; i < response.data.results.length; i++) {
      let homeworld = await axios(response.data.results[i].homeworld);
      response.data.results[i].homeworld = homeworld.data.name;
    }
    return response.data.results;
  }

  useEffect(() => {
    if (showLiked) {
      setPage(1);
      setAllData(Object.values(liked).filter(item => item));
    }
  },[showLiked, liked]);

  useEffect(() => {
    if (!showSearch) {
      fetchData(page).then((data) => {
        setAllData([...allData, ...data]);
      });
    }
  }, [showSearch, check]);

  useEffect(() => {
    setPage(++page);
  }, [check]);

  const classes = useStyles();
    return(
      <div className={classes.grow}>
        <SwAppBar
          setAllData={setAllData}
          setPage={setPage}
          user={props.user}
          fetchData={fetchData}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          liked={liked}
          showLiked={showLiked}
          setShowLiked={setShowLiked}
        />
        <div className={classes.wrapper}>
          <List data={allData}
                liked={liked}
                setLiked={setLiked}
                showLiked={showLiked}
                showSearch={showSearch}
                check={check}
                setCheck={setCheck}
                setInfo={setInfo}/>
          <Info info={info}/>
        </div>
      </div>
    )
};

export default withStyles(globalStyles)(HeroesList);