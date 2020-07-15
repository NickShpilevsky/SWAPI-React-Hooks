import React, {useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles, fade } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import axios from "axios";

import List from "./List";
import Info from "./Info";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    backgroundImage: 'url(/images/background.jpg);',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '950px',
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
  const [allData, setAllData] = useState();
  const [name, setName] = useState();
  const [url, setUrl] = useState();
  const [email, setEmail] = useState();
  const [info, setInfo] = useState();
  const [searchValue, setSearchValue] = useState('');
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    if (!isSearch) {
      async function fetchData() {
        let data =[];
        for (let i = 1; i <= 9; i++) {
          const response = await axios(`https://swapi.dev/api/people/?page=${i}`);
          for (let j = 0; j < response.data.results.length; j++) {
            data.push(response.data.results[j]);
          }
        }
        return data
      }

      fetchData().then((data) => {
        setAllData(data);
      });
    }
  }, [isSearch]);

  useEffect(() => {
    setEmail(props.user ? props.user.email : 'None');
    setName(props.user ? props.user.name : 'Hey');
    setUrl(props.user ? props.user.picture.data.url : null);
  }, [props.user]);

  const setInformation = data => {
    setInfo(data);
  };

  const takeSearchText = (e) => {
    setSearchValue(e.target.value);
  };

  const search = (e) => {
    e.preventDefault();
    if (searchValue !== '') {
      async function fetchData() {
        let data;
        const response = await axios(`https://swapi.dev/api/people/?search=${searchValue}`);
        data = response.data.results;
        return data
      }
      fetchData().then((data) => {
        console.log(data);
        setIsSearch(true);
        setAllData(data);
      });
    }
  };

  const classes = useStyles();
    return(
      <div className={classes.grow}>
        <AppBar position="sticky">
          <ToolBar>
            <Typography className={classes.title} variant="h6" noWrap>
              Star Wars
            </Typography>
                <form onSubmit={search}>
                  <TextField
                    className={classes.textField}
                    value={searchValue}
                    onChange={takeSearchText}
                    variant="outlined"
                    id="search"
                    label="search"
                  />
                </form>
            <Button variant="outlined" color="secondary" onClick={() => {setIsSearch(false); setSearchValue('')}}>hide search</Button>
            <Typography variant="h6" noWrap className={classes.text}>
              {`${name}, may the force be with you!`}
            </Typography>
            <div className={classes.right}>
              <Typography variant="h6" noWrap className={classes.email}>
                {`E-mail: ${email}`}
              </Typography>
              <Avatar alt="Name" src={url} className={classes.avatar} />
            </div>
          </ToolBar>
        </AppBar>
        <div className={classes.wrapper}>
          <List data={allData} setInformation={setInformation}/>
          <Info info={info}/>
        </div>
      </div>
    )
};

export default HeroesList;