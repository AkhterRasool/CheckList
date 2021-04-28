import React from 'react';
import { Link, Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login'

import './App.css'
import Registration from './components/Registration/Registration';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector(state => state.user)
  const dummyUserValue = {
    name: 'dummyuser',
    password: 'dummydummy',
    confirmPassword: 'dummydummy',
    email: 'randomuser@dummy.com'
  }
  
  return (
    <div>
      <Router>
        {
          (!user || !user.isLoggedIn) ? 
          (<div id='nav-bar'>
            <ul>
              <li>
                <Link to="/register">Registration</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </div>) : <Redirect to="/home" />
        }
        <Switch>
          <Route path="/logout">
            <Redirect to="/login" />
          </Route>
          <Route path="/login">
            <Login dummyUserValue={dummyUserValue}/>
          </Route>
          <Route path="/register">
            <Registration dummyUserValue={dummyUserValue}/>
          </Route>
          <Route path="/home">
            {user && user.isLoggedIn ? <Home /> : <Redirect to="/login"/>}
          </Route>
          <Route path="/">
            <Redirect to="/login"/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
  
}

export default App;
