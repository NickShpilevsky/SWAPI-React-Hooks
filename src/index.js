import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Redirect from "react-router-dom/es/Redirect";
import {Authorization, HeroesList} from "./pages";
import './index.css';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './themes';

function Routes() {
  const [authorized, setAuthorized] = useState(false);
  const [user, setUser] = useState(null);

  const authorize = () => {
    setAuthorized(true);
  };

  const getUserInfo = (info) => {
    setUser(info);
  };

  useEffect(() => {
  }, [authorized]);

  return(
    <Router>
       <Switch>
         <Route path="/auth">
           <Authorization authorization={authorize} getUserInfo={getUserInfo}/>
         </Route>
         <Route path="/list">
           <HeroesList user={user}/>
         </Route>
       </Switch>
       {
         authorized ? <Redirect to="/list" /> : <Redirect to="/auth" />
       }
     </Router>
  )
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Routes />
  </ThemeProvider>,
  document.getElementById('root')
);