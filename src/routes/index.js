import React, { useState, useEffect } from 'react'; // ???
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Redirect from "react-router-dom/es/Redirect";
import { withStyles } from '@material-ui/core';

import { Authorization, HeroesList } from '../pages';
import globalStyles from '../styles/global';

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

export default withStyles(globalStyles)(Routes);