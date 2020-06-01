import React from 'react';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import HomePage from '../pages/HomePage';

const Routes = () => {
  const baseURL = process.env.PUBLIC_URL;
  return (
    <Router>
      <Switch>
        <Route exact path={baseURL + '/'} component={HomePage} />
      </Switch>
    </Router>
  );
}

export default Routes;
