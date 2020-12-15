import React, {useState, useEffect} from 'react';
import ToolBar from '@material-ui/core/ToolBar';
import {AppBar, Typography, Button, Avatar, TextField} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";

import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    color: '#FFF',
    width: '8rem',
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

  left: {
    marginRight: '2rem',
  },

  email: {
    marginRight: '1rem',
  },

  textField: {
    width: '200px',
    marginTop: '7px',
    marginBottom: '7px',
    marginRight: '1rem',
  }
}));

const SwAppBar = props => {
  const { fetchData, searchValue, showSearch, setShowSearch, setSearchValue, setAllData, user, showLiked, setShowLiked, setPage } = props;
  const [autocomplete, setAutocomplete] = useState(false);

  async function fetchAutocomplete() {
    let [array, a, response] = [[], 1];
    do {
      response = await axios(`https://swapi.dev/api/people/?page=${a}`);
      for (let j = 0; j < response.data.results.length; j++) {
        array.push(response.data.results[j].name);
      }
      a++;
    } while(response.data.next);
    return array;
  }

  const setLiked = () => {
    setShowLiked(!showLiked);
    if (showLiked) {
      setAllData([]);
      setShowSearch(false);
      setSearchValue('');
    }
  };

  const hideSearch = () => {
    setShowSearch(false);
    setSearchValue('');
    setAllData('');
    setPage(1);
    setShowLiked(false);
  };

  const search = (e) => {
    e.preventDefault();
    if (searchValue) {
      fetchData(searchValue).then((data) => {
        setShowSearch(true);
        setAllData(data);
      });
    }
  };

  const takeSearchValue = (e, value) => {
    setSearchValue(value);
  };

  const searchButton = () => {
    if (showSearch) return (
      <Button variant="outlined" color="secondary" onClick={hideSearch}>hide search</Button>
    );
  };

  useEffect(()=> {
    if(!autocomplete) {
      localStorage.getItem('autocomplete') ?
        setAutocomplete(JSON.parse(localStorage.getItem('autocomplete')))
      :
        fetchAutocomplete().then((data) => {
          localStorage.setItem('autocomplete', JSON.stringify(data));
          setAutocomplete(data);
        });
    }
  }, [autocomplete]);

  const classes = useStyles();
  return (
    <AppBar position="sticky">
      <ToolBar>
        <Typography className={classes.title} variant="h6" noWrap>
          Star Wars
        </Typography>
        <form onSubmit={search}>
          <Autocomplete
            onChange={takeSearchValue}
            onInputChange={takeSearchValue}
            inputValue={searchValue || ''}
            renderInput={(params) =>
              <TextField
                { ...params }
                className={classes.textField}
                color="secondary"
                variant="outlined"
                id="search"
                label="search"
              />
            }
            options={autocomplete || ['Loading...']}
            getOptionLabel={(option) => option}
          />
        </form>
        {searchButton()}
        <div className={classes.right}>
          <Button className={classes.left} variant="outlined" color="inherit" onClick={setLiked}>{showLiked ? 'hide' : 'liked '}<FavoriteIcon /></Button>
          <Typography variant="h6" noWrap className={classes.text}>
            {`${user ? user.name : 'Hey'}, may the force be with you!`}
          </Typography>
          <Avatar alt="Name" src={user ? user.picture.data.url : null} className={classes.avatar} />
        </div>
      </ToolBar>
    </AppBar>
  )
};

export default SwAppBar;