import React, { useState } from 'react';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';

const Routes = () => {
  const baseURL = process.env.PUBLIC_URL;

  const [userID, setUserID] = useState('');
  const [loggedIn, setLoggedIn] = useState('');

  return (
    <Router>
      <Switch>
        <Route exact path={baseURL + '/'} render={(props) => <HomePage {...props} userID={userID} setUserID={setUserID} setLoggedIn={setLoggedIn} />} />
        <Route exact path={baseURL + '/dashboard'} render={(props) => loggedIn ? <DashboardPage {...props} userID={userID} /> : <HomePage {...props} userID={userID} setUserID={setUserID} setLoggedIn={setLoggedIn} />} />
      </Switch>
    </Router>
  );
}

export default Routes;
