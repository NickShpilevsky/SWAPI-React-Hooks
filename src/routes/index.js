import React, { useEffect } from 'react'; // ???
import { useSelector } from 'react-redux'; // ???
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import LS from '../tools/LocalStorage';
import { Authorization, HeroesList } from '../pages';

function Routes() {
  const store = useSelector(data => data);
  const LocalStorage = new LS();

  useEffect(() => {
    LocalStorage.set('data', store);
  });

  return(
    <Router>
      <Switch>
        <Route path="/auth">
          <Authorization />
        </Route>
        <Route path="/list">
          <HeroesList />
        </Route>
      </Switch>
      {
        store.authorized ? <Redirect to="/list" /> : <Redirect to="/auth" />
      }
    </Router>
  )
}

export default Routes;